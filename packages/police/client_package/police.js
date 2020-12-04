
var available911 = [];

const prisonPosition = new Vector3f(8329, 1085, 4744);
var timeout = 120;

jcmp.wantedStarsData = [];
jcmp.wantedStarsData[1] = {cost: 500, unique: true, stars: 1, timeJail: 300, cooldown: 300}; // Ilegal Weapon Carry
jcmp.wantedStarsData[2] = {cost: 1000, unique: false, stars: 3, timeJail: 600}; // Murder
jcmp.wantedStarsData[3] = {cost: 600, unique: true, stars: 1, timeJail: 300, cooldown: 300}; // Not Carrying License
jcmp.wantedStarsData[4] = {cost: 200, unique: false, stars: 1, timeJail: 120}; // Speeding
jcmp.wantedStarsData[5] = {cost: 150, unique: false, stars: 1, timeJail: 240}; // Theft Auto
jcmp.wantedStarsData[6] = {cost: 1000, unique: true, stars: 2, timeJail: 300, cooldown: 1200}; // Illegal Fishing
jcmp.wantedStarsData[7] = {cost: 300, unique: false, stars: 2, timeJail: 300}; // Terrorism
jcmp.wantedStarsData[8] = {cost: 300, unique: false, stars: 2, timeJail: 300}; // Attempted Murder
jcmp.wantedStarsData[9] = {cost: 300, unique: false, stars: 1, timeJail: 120}; // Police Resistance

jcmp.events.Call("AddCommand",
	{
		command: "aw",
		permissions: 4,
		parameters: [
			{parameter: "id", type: "number"}
		],
		callback: function(args) {
			AddWantedStar(args.id);
		}

	}
);


jcmp.events.Call("AddCommand",
	{
		command: "rw",
		permissions: 4,
		parameters: [
			{parameter: "id", type: "number"}
		],
		callback: function(args) {
			RemoveWantedStar(args.id);
		}

	}
);


jcmp.events.Call("AddCommand",
	{
		command: "911",
		permissions: 1,
		subcommands: {
			theftauto: {
				callback: function(args) {
					Automatic911("TheftAuto911", 5);
				}
			},
			resistance: {
				callback: function(args) {
					Automatic911("Resistance911", 9);
				}
			},
			terrorism: {
				parameters: [{parameter: "player", type: "splayer"}],
				callback: function(args) {
					Call911(args.player, 7);
				}
			},
			attemptedmurder: {
				parameters: [{parameter: "player", type: "splayer"}],
				callback: function(args) {
					Call911(args.player, 8);
				}
			},
		}

	}
);


jcmp.events.Add("AddAvailable911", function(id, stealerId, stealerName) {

	available911[id] = {countdown: 60, stealerId: stealerId, stealerName: stealerName};
});


function Call911(player, idWantedStarType) {
	jcmp.events.CallRemote("Call911", player.networkId, idWantedStarType, true);
	jcmp.notifications.add("911", jcmp.languages.get("POLICE_YOU_HAVE_DENOUNCED", [player.nname, jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType)]), "police");
}


function Automatic911(type, idWantedStar) {
	if (!available911[type]) {
		jcmp.notifications.add("911", jcmp.languages.get("POLICE_YOU_HAVE_NOTHING_TO_DENOUNCE"), "police", "cancel");
		return;
	}

	jcmp.events.CallRemote("Call911", available911[type].stealerId, idWantedStar, false);
	jcmp.notifications.add("911", jcmp.languages.get("POLICE_YOU_HAVE_DENOUNCED", [available911[type].stealerName, jcmp.languages.get("WANTEDSTAR_NAME_5"), available911[type].stealerName]), "police");

	delete available911[type];
}


function RemoveWantedStar(idWantedStar) {
	jcmp.events.CallRemote("RemoveWantedStar", idWantedStar);
}


function FreeWantedStar(idWantedStarType) {

	let wantedStarData = jcmp.wantedStarsData[idWantedStarType];
	if (!wantedStarData || !wantedStarData.cooldown) {
		return;
	}

	let wantedStars = jcmp.localPlayerData.wantedStars;
    for (let i = 0; i < wantedStars.length; i++) {
		if (wantedStars[i].idWantedStarType == idWantedStarType) {
			wantedStars[i].cooldown = wantedStarData.cooldown;
			return;
		}
	}
}


function AddWantedStar(idWantedStarType) {

	let wantedStarData = jcmp.wantedStarsData[idWantedStarType];
	if (!wantedStarData) {
		jcmp.chat.print("nonexistent wanted - please call the admins with code: " + idWantedStarType);
		return false;
	}

	if (wantedStarData.unique) {
		let wantedStars = jcmp.localPlayerData.wantedStars;
		for (let i = 0; i < wantedStars.length; i++) {
			if (wantedStars[i].idWantedStarType == idWantedStarType) {
				wantedStars[i].cooldown = null;
				return false;
			}
		}
	}

	jcmp.events.CallRemote("AddWantedStar", idWantedStarType);
	return true;
}


jcmp.events.Add("AddWantedStar", function(idWantedStarType) {
	AddWantedStar(idWantedStarType);
});


jcmp.events.Add("FreeWantedStar", function(idWantedStarType) {
	FreeWantedStar(idWantedStarType);
});


jcmp.events.AddRemoteCallable("RemovedWantedStar", function(idWantedStarType, isSuspect) {
    if (!isSuspect) {
        jcmp.events.Call("SetLocalPlayerValue", "wantedStarsCount", jcmp.localPlayerData.wantedStarsCount - jcmp.wantedStarsData[idWantedStarType].stars);

        jcmp.notifications.add(jcmp.languages.get("SITE_NAME_6"), jcmp.languages.get("POLICEDEPARTMENT_REMOVED_WANTED", [jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType)]), "wantedstar");
    }
});


jcmp.events.AddRemoteCallable("AddedWantedStar", function(idWantedStarType, isSuspect) {
	let stars = jcmp.wantedStarsData[idWantedStarType].stars;

	if (isSuspect)
		jcmp.notifications.add(jcmp.languages.get("POLICE_SUSPECT"), jcmp.languages.get("POLICEDEPARTMENT_NEW_SUSPECT", [jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType)]), "magnifier", "police-radio");
	else
		jcmp.notifications.add(jcmp.languages.get("POLICE_WANTED"), jcmp.languages.get("POLICEDEPARTMENT_NEW_WANTED", [jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType), stars]), "wantedstar", "police-radio");
});


jcmp.events.Add("LocalPlayerValueChange", function(index, wantedStars){
    if (index !== "wantedStars")
        return;

	let stars = 0;

    for (let i = 0; i < wantedStars.length; i++) {

		if (wantedStars[i].isSuspect) {
            wantedStars[i].cooldown = 600;
            continue;
        }

        let wantedStarData = jcmp.wantedStarsData[wantedStars[i].idWantedStarType];
        if (wantedStarData.cooldown)
            wantedStars[i].cooldown = wantedStarData.cooldown;

        stars += wantedStarData.stars;
	}

	jcmp.events.Call("SetLocalPlayerValue", "wantedStarsCount", stars);
});


jcmp.events.AddRemoteCallable('PlayerHijackVehicle', function(vehicleNetworkId, stealerNetworkId) {

	let vehicle = null;
	for (var key in jcmp.vehicles) {
		if (jcmp.vehicles[key].networkId == vehicleNetworkId) {
			vehicle = jcmp.vehicles[key];
		}
	}

	if (!vehicle) return;

	let stealerPlayer = jcmp.utils.player.getById(stealerNetworkId);
	if (!stealerPlayer) return;

	available911["TheftAuto911"] = {countdown: 60, stealerName: stealerPlayer.nname, stealerId: stealerPlayer.networkId};

	jcmp.notifications.add(jcmp.languages.get("POLICE_STOLEN_VEHICLE"), jcmp.languages.get("POLICE_YOU_HAVE_BEEN_STOLEN"), "car");
});

// to work
jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "handcuffed") {
		jcmp.events.Call("SetControlsEnabled", !value);
		timeout = 120;

		if (!value)
			jcmp.ui.CallEvent("UpdateHandcuffedUI", null);
	}

	if (index == "arrested") {
		if (!value)
			jcmp.ui.CallEvent("UpdateArrestedUI", null);

	}
});


jcmp.ui.AddEvent('TickMinute', () => {
	if (!jcmp.localPlayerData.arrested)
		return;

	jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "arrested", jcmp.localPlayerData.arrested);
});


jcmp.ui.AddEvent('TickSecond', () => {

	if (jcmp.localPlayerData.arrested) {

		jcmp.ui.CallEvent("UpdateArrestedUI", jcmp.languages.get("POLICE_ARRESTED"), jcmp.localPlayerData.arrested + " " + jcmp.languages.get("COMMON_SECONDS"));

		if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, prisonPosition) > 10) {
			jcmp.localPlayerData.disableNextTeleportAnimation = true;
			jcmp.events.CallRemote("FledFromPrison");
			jcmp.notifications.add(jcmp.languages.get("POLICE_PRISON"), jcmp.languages.get("POLICE_DONT_TRY_TO_ESCAPE"), "jail", "cancel");
		}

		jcmp.localPlayerData.arrested--;
		if (jcmp.localPlayerData.arrested <= 0) {

			jcmp.ui.CallEvent("UpdateArrestedUI", null);
			jcmp.notifications.add(jcmp.languages.get("POLICE_PRISON"), jcmp.languages.get("POLICE_YOU_ARE_FREE"), "jail");
			jcmp.events.CallRemote("FreedomFromPrison");
		}
	}

	if (jcmp.localPlayerData.handcuffed) {
		timeout--;

		jcmp.ui.CallEvent("UpdateHandcuffedUI", jcmp.languages.get("POLICE_HANDCUFFED"), timeout + " " + jcmp.languages.get("COMMON_SECONDS"));

		if (timeout <= 0) {

			jcmp.ui.CallEvent("UpdateHandcuffedUI", null);
			jcmp.localPlayerData.handcuffed = false;
			jcmp.events.CallRemote("Uncuff", jcmp.localPlayer.networkId);
			jcmp.notifications.add(jcmp.languages.get("POLICE_UNCUFFED"), jcmp.languages.get("POLICE_YOU_HAVE_BEEN_UNCUFFED"), "uncuffed");
		}

	}

	for (let a in available911) {
		available911[a].countdown--;
		if (available911[a].countdown <= 0) {
			delete available911[a];
			break;
		}
	}

    for (let i = 0; i < jcmp.localPlayerData.wantedStars.length; i++) {
		if (jcmp.localPlayerData.wantedStars[i].cooldown) {
			jcmp.localPlayerData.wantedStars[i].cooldown--;
			if (jcmp.localPlayerData.wantedStars[i].cooldown <= 0) {
				RemoveWantedStar(jcmp.localPlayerData.wantedStars[i].id);
			}
		}
	}
});


jcmp.ui.AddEvent('GetWantedPlayers', function() {
    let players = [];
	for (let p in jcmp.playersData) {
        if (!jcmp.playersData[p].wantedStars)
            continue;
            
        let wantedStarsCount = 0;
        for (let w = 0; w < jcmp.playersData[p].wantedStars.length; w++) {
            wantedStarsCount += jcmp.wantedStarsData[jcmp.playersData[p].wantedStars[w].idWantedStarType].stars;
        }
        
        if (wantedStarsCount > 0) {
            players.push({
                name: jcmp.playersData[p].name,
                wantedStarsCount: wantedStarsCount,
            });
        }
    }
    
	jcmp.ui.CallEvent('UpdatePoliceRadioData', JSON.stringify(players));
});