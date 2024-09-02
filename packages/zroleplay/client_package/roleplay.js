const ui = new WebUIWindow('HUD_ui', `package://roleplay/ui/hud.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;
ui.hidden = true;

const fixedUi = new WebUIWindow('FIXED_ui', `package://roleplay/ui/fixed.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
fixedUi.autoResize = true;

var afkLastPosition = jcmp.localPlayer.position;
var afkCode = null;
var afkTimer = 5;
var timeToSpawn = 0;
var hideHud = false;
var gameLoading = false;
var timeModified = false;
var firstTimeLoading = true;

var textures = [];

const weather = {};
weather[0] = {min: 60, max: 95};
weather[1] = {min: 57, max: 70};
weather[2] = {min: 60, max: 75};
weather[3] = {min: 59, max: 73};
weather[4] = {min: 50, max: 64};
weather[5] = {min: 35, max: 50};


jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "FIXED_ui")
		fixedUi.BringToFront();
	else if (id == "HUD_ui")
		ui.BringToFront();
});


jcmp.events.Call("AddCommand",
	{
		command: "help",
		permissions: 1,
		callback: function(args) {
			jcmp.ui.CallEvent('chat_message', jcmp.languages.get("COMMANDS_HELP_LABEL"), 0, 255, 255);
			for (var command in jcmp.commands) {
				if (jcmp.commands[command].permissions <= jcmp.localPlayerData.permissions && !jcmp.commands[command].idJobs) {
					jcmp.chat.print("[#00FFFF]/" + command + " [#ffffff]// " + jcmp.languages.get("COMMANDS_DESCRIPTION_" + command));

				}
			}
			jcmp.ui.CallEvent('chat_message', "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", 0, 255, 255);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "unstuck",
		cooldown: 1,
		permissions: 1,
		callback: function(args) {
			jcmp.events.CallRemote("Unstuck");
			jcmp.localPlayerData.disableNextTeleportAnimation = true;
			return true;
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "pos",
		permissions: 4,
		callback: function(args) {
			jcmp.events.CallRemote("DebugPosition");
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "rot",
		permissions: 4,
		callback: function(args) {
			jcmp.events.CallRemote("DebugRotation");
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "togglehud",
		permissions: 1,
		callback: function(args) {
			hideHud = !hideHud;
			jcmp.events.Call("HideHUD", hideHud, hideHud, hideHud, hideHud);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "camera",
		permissions: 1,
		subcommands: {
			attach: {
				callback: function(args) {
					jcmp.localPlayer.camera.attachedToPlayer = !jcmp.localPlayer.camera.attachedToPlayer;
				}
			},
			fov: {
				parameters: [
					{parameter: "value", type: "number"}
				],
				callback: function(args) {
					jcmp.localPlayer.camera.fieldOfView = args.value;
				}
			},
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "sethour",
		permissions: 1,
		parameters: [
			{parameter: "hour", type: "number"}
		],
		callback: function(args) {
			if (!jcmp.utils.checkIsVip(2))
				return;

			timeModified = true;
			jcmp.world.SetTime(args.hour, 0, 0);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "afk",
		permissions: 1,
		parameters: [
			{parameter: "code", type: "number"}
		],
		callback: function(args) {
			if (!afkCode) {
				jcmp.notifications.add("", jcmp.languages.get("ROLEPLAY_NOT_AFK"), "cancel");
				return;
			}

			if (afkCode != args.code) {
				jcmp.notifications.add("", jcmp.languages.get("ROLEPLAY_AFK_WRONG_CODE"), "cancel");
				return;
			}

			jcmp.events.CallRemote("CreateAttribute", jcmp.localPlayer.networkId, "afk", false);
			afkCode = null;
			afkTimer = 5;
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "pay",
		permissions: 1,
		cooldown: 30,
		parameters: [
			{parameter: "player", type: "cplayer"},
			{parameter: "amount", type: "panumber"},
		],
		callback: function(args) {
			if (args.amount <= 0 || args.amount > 10000) {
				jcmp.notifications.add("", jcmp.languages.get("COMMON_VALUE_MUST_BE_BETWEEN", [1, 10000]), "cancel");
				return;
			}

			let totalValue = Math.ceil(args.amount + args.amount * 0.1);
			if (jcmp.localPlayerData.money < totalValue) {
				jcmp.notifications.add("", jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY_DESC", [totalValue]), "cancel");
				return;
			}

			jcmp.notifications.add("", jcmp.languages.get("ROLEPLAY_PAY_PAID", [args.amount, Math.ceil(args.amount * 0.1), args.player.name]), "salary");
			jcmp.events.CallRemote("Pay", args.player.networkId, args.amount);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "tc",
		permissions: 4,
		parameters: [
			{parameter: "id", type: "number"}
		],
		callback: function(args) {
            jcmp.events.CallRemote("TC", args.id);       
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "setseat",
		permissions: 4,
		parameters: [
			{parameter: "seat", type: "number"}
		],
		callback: function(args) {
			jcmp.events.CallRemote("SetSeat", args.seat);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "bring",
		parameters: [
			{parameter: "player", type: "player"}
		],
		permissions: 4,
		callback: function(args) {
			jcmp.notifications.add("", "Bringing " + args.player.name, "player");
			jcmp.events.CallRemote("BringPlayer", args.player.networkId);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "tp",
		parameters: [
			{parameter: "player", type: "player"}
		],
		permissions: 4,
		callback: function(args) {
			jcmp.localPlayerData.disableNextTeleportAnimation = true;
			jcmp.notifications.add("", "Teleporting to " + args.player.name, "player");
			jcmp.events.CallRemote("TeleportPlayer", args.player.networkId);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "language",
		parameters: [
			{parameter: "language", type: "string"}
		],
		permissions: 1,
		callback: function(args) {
			if (args.language == "en" || args.language == "pt" || args.language == "de") {
				jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "language", args.language);
			} else
				jcmp.ui.CallEvent('chat_message', "Invalid language! (en | pt | de)", 255, 0, 0);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "setatr",
		parameters: [
			{parameter: "attribute", type: "string"},
			{parameter: "player", type: "player"},
			{parameter: "value", type: "number"},
		],
		permissions: 4,
		callback: function(args) {
			// if (args.player) {
				jcmp.events.CallRemote("SetAttribute", args.player.networkId, args.attribute, args.value);
			// } else
				// jcmp.ui.CallEvent('chat_message', "Player not found!", 255, 0, 0);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "tpp",
		parameters: [
			{parameter: "position", type: "position"}
		],
		permissions: 4,
		callback: function(args) {
			jcmp.localPlayerData.disableNextTeleportAnimation = true;
			let positionStr = jcmp.utils.vector3.stringify(args.position);
			jcmp.ui.CallEvent('chat_message', "Teleporting to " + positionStr, 0, 255, 255);
			jcmp.events.CallRemote("Teleport", positionStr);

		}
	}
);


jcmp.ui.AddEvent('ToKey', function(event, key) {
	let allowed = !jcmp.hasMenuOpened && !jcmp.isChatOpened && !jcmp.isInputTextOpened && !jcmp.isHelpPanelOpened && !jcmp.isNewspaperOpened && !jcmp.isAlertScreenOpened && !jcmp.localPlayerData.racing && !jcmp.localPlayerData.testingDriving && jcmp.localPlayerData.loaded && !jcmp.isNationalIdOpened;

	let arrayMenus = {
		hasMenuOpened: jcmp.hasMenuOpened,
		isChatOpened: jcmp.isChatOpened,
		isInputTextOpened: jcmp.isInputTextOpened,
		isHelpPanelOpened: jcmp.isHelpPanelOpened,
        isNewspaperOpened: jcmp.isNewspaperOpened,
		isAlertScreenOpened: jcmp.isAlertScreenOpened,
		isNationalIdOpened: jcmp.isNationalIdOpened,
		loaded: jcmp.localPlayerData.loaded,
	};

	jcmp.ui.CallEvent("Key" + event, key, allowed, JSON.stringify(arrayMenus));
	jcmp.events.Call("Key" + event, key, allowed, arrayMenus);
});


jcmp.ui.AddEvent('SetControlsEnabled', function(bool) {
	SetControlsEnabled(bool);
});


jcmp.events.Add('SetControlsEnabled', function(bool) {
	SetControlsEnabled(bool);
});


function SetControlsEnabled(bool) {
	if (!bool) {
		jcmp.localPlayer.controlsEnabled = true;
		jcmp.localPlayer.controlsEnabled = false;
	} else if (!jcmp.localPlayerData.handcuffed && (!jcmp.hasMenuOpened || !jcmp.hasMenuOpened.freezes) && !jcmp.isChatOpened && (!jcmp.localPlayerData.racing || jcmp.localPlayerData.racing == 2) && !jcmp.isInputTextOpened && !jcmp.isHelpPanelOpened && !jcmp.isNewspaperOpened && !jcmp.isAlertScreenOpened && !jcmp.isNationalIdOpened) {
		jcmp.localPlayer.controlsEnabled = true;
	}
}

jcmp.events.AddRemoteCallable('ReceivedPay', function(amount, playerName) {
	jcmp.notifications.add("", jcmp.languages.get("ROLEPLAY_PAY_RECEIVED", [amount, playerName]), "salary");
});


jcmp.events.Add('LocalPlayerVehicleExited', function(vehicle, seatIndex) {
	if (jcmp.localPlayerData.lastRadio != null)
        jcmp.events.CallRemote("SaveAttribute", "lastRadio", jcmp.localPlayerData.lastRadio);
        
	if (seatIndex == 0) {
        if (jcmp.localPlayerData.fuel != null)
            jcmp.events.CallRemote("SaveAttribute", "fuel", jcmp.localPlayerData.fuel);

        jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({fuel: false}));
    }
});


jcmp.events.Add("LocalPlayerVehicleEntered", function(vehicle, seatIndex) {
	if (jcmp.localPlayerData.level <= 1)
		jcmp.events.Call("StartTutorial", "VEHICLE");

	if (vehicle.type == 9 && seatIndex >= 6) {
		jcmp.notifications.add("", jcmp.languages.get("COMMON_CANT_DO_IT"), "cancel");
		jcmp.events.CallRemote("EjectVehicle", seatIndex);
	}

	if (seatIndex == 0)
		jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({fuel: jcmp.localPlayerData.fuel}));
});


jcmp.events.AddRemoteCallable('LocalPlayerValueChange', function(index, value) {
	LocalPlayerValueChange(index, JSON.parse(value));
});


jcmp.events.Add('SetLocalPlayerValue', function(index, value) {
	LocalPlayerValueChange(index, value);
});


jcmp.events.AddRemoteCallable('LocalPlayerValuesChange', function(values) {
	values = JSON.parse(values);
	for (let key in values) {
		LocalPlayerValueChange(key, values[key]);
	}
});


// default false
jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, false);
jcmp.localPlayer.SetAbilityEnabled(0xE060F641, false);
jcmp.localPlayer.SetAbilityEnabled(0xCEEFA27A, false);
jcmp.localPlayer.wingsuit.boostEnabled = false;


function createTexture(src, position, rotationFactor, rotation, scaleFactor, centralize) {
    let scale = new Vector3f(scaleFactor, scaleFactor, scaleFactor);

    let data = {
        texture: new Texture(src),
        matrix: (new Matrix()).Translate(position),
    };

    if (rotation)
        data.matrix = data.matrix.Rotate(rotationFactor, rotation);

    if (centralize)
        data.matrix = data.matrix.Translate(new Vector3f(-data.texture.size.x / 2 * scale.x, data.texture.size.y / 2 * scale.y, 0));

    data.matrix = data.matrix.Scale(scale);

    textures.push(data);
}
      
// move to prototypes
jcmp.ui.AddEvent("LocalPlayerLoaded", function() {
	UpdateDate();
	jcmp.events.CallRemote("PlayerLoaded");

	jcmp.events.Call("BringUiToFront", "police_radio_ui");
	jcmp.events.Call("BringUiToFront", "notifications_ui");
	jcmp.events.Call("BringUiToFront", "HUD_ui");
	jcmp.events.Call("BringUiToFront", "FIXED_ui");
	
	jcmp.events.Call("BringUiToFront", "custom-menu-ui");
	jcmp.events.Call("BringUiToFront", "radio_ui");
	
	jcmp.events.Call("BringUiToFront", "helppanel_ui");
	jcmp.events.Call("BringUiToFront", "national_id");
	jcmp.events.Call("BringUiToFront", "news_ui");
	
	jcmp.events.Call("BringUiToFront", "input_ui");
	jcmp.events.Call("BringUiToFront", "chat_ui");
	jcmp.events.Call("BringUiToFront", "alert_ui");
});


const whitelistHUD = ["money", "level", "experience", "maxExperience", "fuel", "hungry", "thirsty", "wantedStarsCount", "creatingCharacter", "statsStealth", "statsStamina", "statsDriving", "statsFlying", "statsLungCapacity", "statsStrength"];


// move to prototypes
function LocalPlayerValueChange(index, value) {
	jcmp.localPlayerData[index] = value;

	if (whitelistHUD.indexOf(index) != -1) {
		UpdateHUDData(index, value);
	}

	switch (index) {
		case "loaded":
			jcmp.ui.CallEvent("chat2/ToggleEnabled", true);
            break;
        
		case "permissions":
			if (value >= 4) {
				jcmp.localPlayer.SetAbilityEnabled(0xCB836D80, true);
				jcmp.localPlayer.SetAbilityEnabled(0xE060F641, true);
				jcmp.localPlayer.wingsuit.boostEnabled = true;
				jcmp.localPlayer.wingsuit.boostCooldown = 0;
				jcmp.localPlayer.wingsuit.boostDuration = 500000;
				jcmp.localPlayer.wingsuit.boostPower = 2000;
			}

			jcmp.ui.CallEvent("UpdateLocalPlayerPermissions", value);
			break;

		case "hasParachute":
			jcmp.localPlayer.SetAbilityEnabled(0xCEEFA27A, value == 1);
			break;

		case "hasWingsuit":
			UpdateVIP();
			break;

		case "vip":
			jcmp.ui.CallEvent("UpdateVIP", value);
			UpdateVIP();
			break;

		case "wingsuitLevel":
			UpdateVIP();
			break;

		case "afk":
			UpdateAFK(value);
			break;

		case "language":
			UpdateHUDLabels();
            break;
            
        case "jobLevels":
            if ([1, 3, 5, 18].indexOf(jcmp.localPlayerData.idJob) != -1) {
                
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({jobData: false}));
            } else {
                let curJob = value[jcmp.localPlayerData.idJob];
                if (!curJob) {
                    curJob = {
                        level: 1,
                        experience: 0,
                        maxExperience: 500,
                    }
                }
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({jobData: curJob}));
            }
            break;

        case "idJob":
            if ([1, 3, 5, 18].indexOf(value) != -1) {
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({jobData: false}));
            } else {
                let cJob = jcmp.localPlayerData.jobLevels ? jcmp.localPlayerData.jobLevels[value] : false;
                if (!cJob) {
                    cJob = {
                        level: 1,
                        experience: 0,
                        maxExperience: 500,
                    }
                }            
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({jobName: jcmp.languages.get("JOB_NAME_" + value), jobData: cJob}));
            }

            if ([8, 9, 20].indexOf(value) != -1) {
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({
                    catchedCount: {actual: jcmp.localPlayerData.catchedCount, max: (value == 8 ? 200 : 100), name: jcmp.languages.get("CATCHER_PRODUCT_NAME_" + value)}
                }));
            } else {
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({catchedCount: false}));
            }
            break;

        case "color":
            jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({color: value}));
            break;

        case "catchedCount":
            if ([8, 9, 20].indexOf(jcmp.localPlayerData.idJob) != -1) {
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({
                    catchedCount: {actual: value, max: (jcmp.localPlayerData.idJob == 8 ? 200 : 100), name: jcmp.languages.get("CATCHER_PRODUCT_NAME_" + jcmp.localPlayerData.idJob)}
                }));
            } else {
                jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({catchedCount: false}));
            }
            break;
        
        case "experienceBonuses":
            // 	if (value <= 5)
            //     jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({newPlayerBonus: jcmp.languages.get("HUD_NEW_PLAYER_BONUS", "50")}));
            // else
            //     jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({newPlayerBonus: false}));
            let experienceLabels = [];
            for (let id in value) {
                experienceLabels.push(jcmp.languages.get("EXPERIENCE_BONUS_LABEL_" + id, [value[id]]));
            }
            jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({experienceBonuses: experienceLabels}));
            break;
    }
    
	jcmp.events.Call("LocalPlayerValueChange", index, value);
}


function UpdateAFK(isAFK) {
	if (isAFK) {
		afkCode = Math.floor(Math.random() * 9000) + 1000;
		jcmp.ui.CallEvent("UpdateAFKUI", jcmp.languages.get("ROLELAY_AFK", [afkCode]));

	} else {
		jcmp.ui.CallEvent("UpdateAFKUI", null);
	}

}

jcmp.events.Add("chat_ready", function() {
	jcmp.ui.CallEvent("UpdateVIP", jcmp.localPlayerData.vip);
});


function UpdateVIP() {
	if (!jcmp.localPlayerData.vip)
		return;

	if (jcmp.localPlayerData.vip == 2 && jcmp.localPlayerData.permissions < 4) {

		if (jcmp.localPlayerData.hasWingsuit)
			jcmp.localPlayer.SetAbilityEnabled(0xE060F641, true);

		if (jcmp.localPlayerData.wingsuitLevel != null) {
			jcmp.localPlayer.wingsuit.boostEnabled = true;

			switch (jcmp.localPlayerData.wingsuitLevel) {
				case 0:
					jcmp.localPlayer.wingsuit.boostCooldown = 1000;
					jcmp.localPlayer.wingsuit.boostDuration = 0;
					jcmp.localPlayer.wingsuit.boostPower = 0;
					break;

				case 1:
					jcmp.localPlayer.wingsuit.boostCooldown = 10;
					jcmp.localPlayer.wingsuit.boostDuration = 3;
					jcmp.localPlayer.wingsuit.boostPower = 1;
					break;

				case 2:
					jcmp.localPlayer.wingsuit.boostCooldown = 10;
					jcmp.localPlayer.wingsuit.boostDuration = 5;
					jcmp.localPlayer.wingsuit.boostPower = 2;
					break;

				case 3:
					jcmp.localPlayer.wingsuit.boostCooldown = 10;
					jcmp.localPlayer.wingsuit.boostDuration = 6;
					jcmp.localPlayer.wingsuit.boostPower = 3;
					break;
			}
		}
	}

}


function UpdateDate() {
	if (timeModified)
		return;

	var globalDate = new Date();

	jcmp.world.weather = jcmp.utils.getWeather();
	jcmp.world.SetTime(globalDate.getUTCHours(), globalDate.getUTCMinutes(), 0);
}


jcmp.ui.AddEvent('TickFiveMinutes', function() {
    let dataToSave = {};
	if (jcmp.localPlayerData.hungry !== null && jcmp.localPlayerData.thirsty !== null) {
        dataToSave.hungry = jcmp.localPlayerData.hungry;
        dataToSave.thirsty = jcmp.localPlayerData.thirsty;
	}

    dataToSave.statsStamina = jcmp.localPlayerData.statsStamina;
    dataToSave.statsLungCapacity = jcmp.localPlayerData.statsLungCapacity;
    dataToSave.statsFlying = jcmp.localPlayerData.statsFlying;
    dataToSave.statsDriving = jcmp.localPlayerData.statsDriving;
    dataToSave.statsStealth = jcmp.localPlayerData.statsStealth;
    dataToSave.statsStrength = jcmp.localPlayerData.statsStrength;

	if (jcmp.localPlayerData.vehicle) {
        dataToSave.fuel = jcmp.localPlayerData.fuel;
        dataToSave.lastRadio = jcmp.localPlayerData.lastRadio;
    }
    
	jcmp.events.CallRemote("SaveAttributes", JSON.stringify(dataToSave));
});


jcmp.ui.AddEvent('TickMinute', function() {
    UpdateDate();

	afkTimer -= 1;
	if (afkTimer <= 0) {
		if (!jcmp.localPlayerData.afk && jcmp.utils.vector3.distance(afkLastPosition, jcmp.localPlayer.position) <= 5) {
			jcmp.events.CallRemote("CreateAttribute", jcmp.localPlayer.networkId, "afk", true);
		}
		afkTimer = 5;
		afkLastPosition = jcmp.localPlayer.position;
	}
});


jcmp.events.Add('GameTeleportCompleted', () => {
	jcmp.events.CallRemote("GameTeleportCompleted");

	if (jcmp.localPlayerData.respawnRotation) {
		jcmp.localPlayer.rotation = jcmp.localPlayerData.respawnRotation;
		jcmp.localPlayerData.respawnRotation = null;
	}

	if (gameLoading == 13 && !jcmp.localPlayer.camera.attachedToPlayer)
        gameLoading = 12;
        
});


jcmp.events.Add('GameTeleportInitiated', () => {
	if (jcmp.localPlayerData.disableNextTeleportAnimation) {
		jcmp.localPlayerData.disableNextTeleportAnimation = false;
		return;
	}

	if (jcmp.localPlayerData.racing || jcmp.localPlayerData.testingDriving)
		return;

	jcmp.ui.CallEvent("FlashBlackScreen", 1000);
	jcmp.events.Call("HideHUD", true, true, true, true);
	jcmp.localPlayer.camera.attachedToPlayer = false;
	gameLoading = 13;
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({loading: 1}));
    fixedUi.BringToFront();
});


function UpdateHUDData(index, value) {
	let data = {};
	data[index] = value;
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify(data));
}


jcmp.events.Add("HideHUD", function(hud, menus, notifications, alertUi) {
	if (!hud && jcmp.localPlayerData.creatingCharacter)
		return;

	ui.hidden = hud;
});


function UpdateHUDStats() {

}


function UpdateHUDLabels() {

	let labels = {
		"fuel-label": jcmp.languages.get("HUD_FUEL"),
		"hungry-label": jcmp.languages.get("HUD_HUNGER"),
		"thirsty-label": jcmp.languages.get("HUD_THIRST"),
		"thirsty-label": jcmp.languages.get("HUD_THIRST"),
		"player-stats-stealth span": jcmp.languages.get("HUD_STATS_STEALTH"),
		"player-stats-stamina span": jcmp.languages.get("HUD_STATS_STAMINA"),
		"player-stats-driving span": jcmp.languages.get("HUD_STATS_DRIVING"),
		"player-stats-flying span": jcmp.languages.get("HUD_STATS_FLYING"),
		"player-stats-lungcapacity span": jcmp.languages.get("HUD_STATS_LUNGCAPACITY"),
		"player-stats-strength span": jcmp.languages.get("HUD_STATS_STRENGTH"),
	};

	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({labels: labels}));
}


jcmp.events.Add('LocalPlayerEnterSite', function(site) {
	if (site.idSiteType != 10 && site.idSiteType != 11)
		return;

	let currentSite = {
		provinceName: site.provinceName,
		cityName: site.name
	};

	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({currentSite: currentSite}));

	if (site.idSiteType == 11) {
		UpdateMilitaryInstallationHUD(site);
	}
});


function UpdateMilitaryInstallationHUD(site) {
	if (!jcmp.militaryInstallations[site.id])
		return;

	let hasJobConquest = jcmp.localPlayerData.idJob == 13 || jcmp.localPlayerData.idJob == 14;

	let currentSite = {
		domination: jcmp.militaryInstallations[site.id].domination,
		currentMilitaryBavarium: jcmp.militaryInstallations[site.id].bavarium,
	};

	if (hasJobConquest && jcmp.militaryInstallations[site.id].type != 2) {
		currentSite.percentDomination = jcmp.militaryInstallations[site.id].percentDomination;

		currentSite.hud_conquesting = Math.abs(currentSite.percentDomination) != 100 ? jcmp.languages.get("HUD_CONQUEST_CONQUESTING") : "";
	}

	if (jcmp.militaryInstallations[site.id].protection > 0) {
		currentSite.currentMilitaryProtection = jcmp.militaryInstallations[site.id].protection;
	}

	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({currentSite: currentSite}));
}


jcmp.events.Add('MilitaryInstallationsUpdated', function() {
	if (!jcmp.localPlayerData.sites[11])
		return;

	UpdateMilitaryInstallationHUD(jcmp.localPlayerData.sites[11]);
});


jcmp.events.Add('LocalPlayerExitSite', function(site) {
	if (site.idSiteType != 10 && site.idSiteType != 11)
		return;

	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({currentSite: false}));
});


jcmp.events.Add("LoadingScreenComplete", function() {
    jcmp.events.Call("PreLoadingScreenComplete");
	jcmp.localPlayer.camera.attachedToPlayer = true;

	if (jcmp.localPlayerData.loadingCompleteCameraPosition) {
		jcmp.localPlayer.camera.attachedToPlayer = false;
		jcmp.localPlayer.camera.position = jcmp.localPlayerData.loadingCompleteCameraPosition;
		jcmp.localPlayerData.loadingCompleteCameraPosition = null;
	}

	if (jcmp.localPlayerData.loadingCompleteCameraRotation) {
		jcmp.localPlayer.camera.attachedToPlayer = false;
		jcmp.localPlayer.camera.rotation = jcmp.localPlayerData.loadingCompleteCameraRotation;
		jcmp.localPlayerData.loadingCompleteCameraRotation = null;
	}
});


jcmp.ui.AddEvent('TickSecond', function() {
	if (gameLoading !== false) {

		if (gameLoading == 13) {
			jcmp.localPlayer.camera.rotation = new Vector3f(1.55, 0, 0);
			jcmp.localPlayer.camera.position = new Vector3f(jcmp.localPlayer.position.x, jcmp.localPlayer.position.y + 500, jcmp.localPlayer.position.z);
			jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({startedMotion: true}));
		}

		if (gameLoading <= 0) {
			
			if (firstTimeLoading) {
				jcmp.events.Call("LocalPlayerFullLoaded");
				firstTimeLoading = false;
				
				if (!jcmp.localPlayerData.creatingCharacter)
					jcmp.events.Call("ActiveNewspaper", true);
			}

			jcmp.events.Call("HideHUD", false, false, false, false);
			jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({startedMotion: true, loading: false}));
			gameLoading = false;
			jcmp.events.Call("LoadingScreenComplete");
		}

		if (gameLoading && gameLoading <= 12) {

			jcmp.localPlayer.camera.rotation = new Vector3f(1.55, 0, 0);

			if (gameLoading == 4) {
				gameLoading = 0;
				jcmp.localPlayer.camera.position = new Vector3f(jcmp.localPlayer.position.x, jcmp.localPlayer.position.y + 25, jcmp.localPlayer.position.z);
			}

			if (gameLoading == 8) {
				gameLoading = 4;
				jcmp.localPlayer.camera.position = new Vector3f(jcmp.localPlayer.position.x, jcmp.localPlayer.position.y + 155, jcmp.localPlayer.position.z);
			}

			if (gameLoading == 12) {
				gameLoading = 8;
				jcmp.localPlayer.camera.position = new Vector3f(jcmp.localPlayer.position.x, jcmp.localPlayer.position.y + 350, jcmp.localPlayer.position.z);
			}

			jcmp.ui.CallEvent("PlaySound", "teleporting");
		}
	}

	for (let p = 0; p < jcmp.players.length; p++) {
		if (jcmp.players[p].networkId && typeof jcmp.playersData[jcmp.players[p].networkId] !== 'undefined')
            jcmp.playersData[jcmp.players[p].networkId].networkPlayer = jcmp.players[p];
    }
    
	// Check parachute
	if (!jcmp.localPlayer.IsAbilityEnabled(0xCEEFA27A) && (jcmp.localPlayer.baseState == 498269113 || jcmp.localPlayer.baseState == 797682887 || jcmp.localPlayer.baseState == 643896334))
	    jcmp.localPlayer.baseState = 29430622;
});


// move to prototypes
jcmp.events.AddRemoteCallable("PlayerValueChange", function(playerNetworkId, index, value) {
    PlayerValueChange(playerNetworkId, index, JSON.parse(value));
});


// move to prototypes
function PlayerValueChange(playerNetworkId, index, value) {
    if (!jcmp.playersData[playerNetworkId])
        jcmp.playersData[playerNetworkId] = {};

    jcmp.playersData[playerNetworkId][index] = value;

    jcmp.events.Call("PlayerValueChange", jcmp.playersData[playerNetworkId], index, value);
}


jcmp.events.Add("PlayerValueChange", function(playerData, index, value) {
    if (index === "name" || index === "color") // || index ==="afk" || index === "handcuffed")
        playerData.nametag = null;
});


jcmp.events.AddRemoteCallable("PlayerCreated", function(playerData, firstTime) {
    playerData = JSON.parse(playerData);
    
    if (playerData.networkId == jcmp.localPlayer.networkId)
        return;

	jcmp.notifications.add("", jcmp.languages.get(("ROLEPLAY_PLAYER_ENTERED" + (firstTime ? "_FIRST" : "")), [playerData.name, playerData.country]), "player");
    createPlayerData(playerData);
});


jcmp.events.AddRemoteCallable("PlayerDisconnected", function(networkId) {
	if (jcmp.playersData[networkId]) {

        jcmp.events.Call("PlayerDisconnected", jcmp.playersData[networkId]);
        
        // if (jcmp.playersData[networkId].nametag)
        //     jcmp.playersData[networkId].nametag.Destroy();
		if (jcmp.playersData[networkId].networkPlayer)
        	delete jcmp.playersData[networkId].networkPlayer;
        delete jcmp.playersData[networkId];
    }
});


jcmp.events.AddRemoteCallable("UpdatePlayersData", function(playersData, roleplayMoney, roleplayGovBavarium, roleplayRebelsBavarium, roleplayGovDomination, roleplayRebelsDomination, roleplayOldMoney, fuelValue, bavariumValue, totalPlayers) {

    if (playersData) {
        playersData = JSON.parse(playersData);

        for (let p in playersData) {
            createPlayerData(playersData[p]);
        }
    }

	jcmp.roleplayData.money = roleplayMoney;
	jcmp.roleplayData.oldMoney = roleplayOldMoney;

	jcmp.roleplayData.fuelValue = fuelValue;
	jcmp.roleplayData.bavariumValue = bavariumValue;

	jcmp.roleplayData.govBavarium = roleplayGovBavarium;
	jcmp.roleplayData.rebelsBavarium = roleplayRebelsBavarium;
	jcmp.roleplayData.govDomination = roleplayGovDomination;
	jcmp.roleplayData.rebelsDomination = roleplayRebelsDomination;
	jcmp.roleplayData.totalPlayers = totalPlayers;

});


jcmp.ui.AddEvent('GetScoreboardPlayers', function() {
    let players = [];
	for (let p in jcmp.playersData) {

        players.push({
            name: jcmp.playersData[p].name,
            color: jcmp.playersData[p].color,
            jobName: jcmp.languages.get("JOB_NAME_" + jcmp.playersData[p].idJob) + (jcmp.playersData[p].jobLevel ? " [" + jcmp.playersData[p].jobLevel + "]" : ""),
            tags: jcmp.playersData[p].tags,
            badges: jcmp.playersData[p].badges,
            networkId: jcmp.playersData[p].networkId,
            level: jcmp.playersData[p].level,
            country: jcmp.playersData[p].country,
			ping: jcmp.playersData[p].ping,
			avatar: jcmp.playersData[p].discordAvatar
        });
	}
	jcmp.ui.CallEvent('SetScoreboardPlayers', JSON.stringify(players));
});


function createPlayerData(playerData) {
    for (let key in playerData) {
        PlayerValueChange(playerData.networkId, key, playerData[key]);
    }
}


// Vector3f(chocalho, prato, direção)
// const div2 = new Vector2f(2, 2);
const headPosition = new Vector3f(0, 0.4, 0);
const shadow = new Vector3f(0.7, 0.7, 0);
const black = new RGBA(0, 0, 0, 255);
// const sizeNametag = new Vector2f(300, 50);
// const textDivision = sizeNametag.div(div2);
// let distanceNametag = 100;
// let maxPercent = 0.4;
// const distanceFactor = (sizeNametag.div(new Vector2f(distanceNametag, distanceNametag))).mul(new Vector2f(maxPercent, maxPercent));

// function createNametag(playerData) {

//     if (playerData.nametag) {
//         playerData.nametag.CallEvent("UpdateNametag", JSON.stringify({tags: playerData.tags, name: playerData.name, color: playerData.color, afk: playerData.afk, handcuffed: playerData.handcuffed}));
//         return;
//     }
    
//     if (playerData.networkId == jcmp.localPlayer.networkId)
//         return;

//     playerData.nametag = new WebUIWindow('nametag_ui_' + playerData.networkId, `package://roleplay/ui/nametag.html`, new Vector2(sizeNametag.x, sizeNametag.y));

//     playerData.nametag.autoResize = false;
//     playerData.nametag.hidden = true;
//     playerData.nametag.autoRenderTexture = false;
    
//     playerData.nametag.AddEvent("NametagLoaded", function() {
//         playerData.nametag.CallEvent("UpdateNametag", JSON.stringify({tags: playerData.tags, name: playerData.name, color: playerData.color, afk: playerData.afk, handcuffed: playerData.handcuffed}));
//     });
// }


jcmp.events.Add('LocalPlayerFullLoaded', function() {
	try {
		createTexture(`package://roleplay/ui/images/welcome.png`, new Vector3f(8572, 1130, 5933), 1, new Vector3f(0, 2, 0), 0.015, false);
		createTexture(`package://roleplay/ui/images/welcome_unemployed.png`, new Vector3f(8580, 1126, 5912), 0.5, new Vector3f(0, 1, 0), 0.03, true);
		createTexture(`package://roleplay/ui/images/welcome_newjob.png`, new Vector3f(8437, 1127, 5705), 3.5, new Vector3f(0, 3, 0), 0.03, true);
		createTexture(`package://roleplay/ui/images/welcome_newjob.png`, new Vector3f(8514, 1143, 5167), 4, new Vector3f(0, 1, 0), 0.01, true);
	} catch (error) {
		jcmp.events.Call('ScriptError', "roleplay.js", 0, error, "");
	}

	jcmp.events.Add('Render', (scriptingRenderer) => {
		let playerCameraPosition = jcmp.localPlayer.camera.position;
		
		for (let p = jcmp.players.length - 1; p >= 0; p--) {
			let player = jcmp.players[p];
			
			if (!jcmp.playersData[player.networkId] || !jcmp.playersData[player.networkId].name) // || !jcmp.playersData[player.networkId].nametag)
				continue;

			let playerData = jcmp.playersData[player.networkId];

			if (playerData.networkId == jcmp.localPlayer.networkId)
				continue;

			let distance = jcmp.utils.vector3.distance(playerCameraPosition, player.position);
			
			if (distance > 100)
				continue;

			let matrix = player.GetBoneTransform(0xA877D9CC, scriptingRenderer.dtf);
			
			if (!playerData.nametag) {
				playerData.nametag = {
					textSize: scriptingRenderer.MeasureText(playerData.name, 16, "Arial"),
					color: jcmp.utils.hex2rgba(playerData.color),
				};
			}

            let vector2df = scriptingRenderer.WorldToScreen(matrix.position.add(headPosition));
            
            if (vector2df.x <= 1 || vector2df.y <= 1)
				continue;

			let v3 = new Vector3f(vector2df.x - playerData.nametag.textSize.x / 2, vector2df.y, 0.5);
			
			scriptingRenderer.DrawText(playerData.name, v3.add(shadow), playerData.nametag.textSize, black, 16, "Arial");
			scriptingRenderer.DrawText(playerData.name, v3, playerData.nametag.textSize, playerData.nametag.color, 16, "Arial");
			
			// let distanceFactorMul = distanceFactor.mul(new Vector2f(distance, distance));

			// let vector2df = (scriptingRenderer.WorldToScreen(player.GetBoneTransform(0xA877D9CC, scriptingRenderer.dtf).position.add(headPosition))).sub(textDivision.sub(distanceFactorMul.div(div2)));

			// if (vector2df.x <= 1 || vector2df.y <= 1)
			// 	continue;

			// scriptingRenderer.DrawTexture(playerData.nametag.texture, vector2df, sizeNametag.sub(distanceFactorMul));
		}
	});

	jcmp.events.Add('GameUpdateRender', (scriptingRenderer) => {
		for (let t = textures.length - 1; t >= 0; t--) {
			if (!textures[t])
				continue;
			scriptingRenderer.SetTransform(textures[t].matrix);
			scriptingRenderer.DrawTexture(textures[t].texture, jcmp.utils.vector3.zero, textures[t].texture.size);
		}
	});
});


jcmp.ui.AddEvent('TickSecond', function() {
	jcmp.events.Call("TickSecond");
});


jcmp.ui.AddEvent('Tick3Seconds', function() {
	jcmp.events.Call("Tick3Seconds");
});


jcmp.ui.AddEvent('KeyHold', function(args) {
	jcmp.events.Call("KeyHold", args);
});


jcmp.ui.AddEvent('Tick18Seconds', function() {
	jcmp.events.Call("Tick18Seconds");
});


jcmp.ui.AddEvent('Tick2Ms', function() {
	jcmp.events.Call("Tick2Ms");
});


jcmp.events.Add('ScriptError', (file, line, err, trace) => {
    jcmp.events.CallRemote("ClientError", JSON.stringify({file: file, line: line, err: err, trace: trace}));
});