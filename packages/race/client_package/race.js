'use strict';

var lobby = null;
var events = [];

jcmp.racesOrdered = {};
jcmp.races = {};
jcmp.racesLobby = [];


jcmp.events.AddRemoteCallable("UpdateLobbyCamera", function(data) {
    data = JSON.parse(data);
    
    let rotation = jcmp.utils.vector3.parse(data.rotation);
    jcmp.localPlayerData.loadingCompleteCameraRotation = rotation;
    
    rotation = jcmp.utils.vector3.rotateY(rotation, -0.4);
    
    let cameraPosition = jcmp.utils.vector3.moveAngle(jcmp.localPlayer.position, rotation.y, 4);
    cameraPosition.y += 1.7;

    jcmp.localPlayerData.loadingCompleteCameraPosition = cameraPosition;

	// if (data.currentStarting && data.currentStarting.position && data.currentStarting.rotation) {

	// 	let cameraPosition = jcmp.utils.vector3.parse(data.currentStarting.position);
	// 	let rotation = jcmp.utils.vector3.parse(data.currentStarting.rotation);

	// 	jcmp.localPlayerData.respawnRotation = jcmp.utils.vector3.rotateY(rotation, Math.PI / 2 - 0.05);
	// 	rotation.x = 0.05;
	// 	jcmp.localPlayerData.loadingCompleteCameraRotation = jcmp.utils.vector3.rotateY(rotation, -Math.PI / 2 + 0.05);

	// 	let distance = 7;
	// 	cameraPosition.x += distance * Math.sin(-rotationY);
	// 	cameraPosition.y += 2;
	// 	cameraPosition.z += distance * Math.cos(rotationY);

	// 	jcmp.localPlayerData.loadingCompleteCameraPosition = cameraPosition;
	// }
});


jcmp.events.AddRemoteCallable("UpdateLobby", function(data) {
	data = JSON.parse(data);

	if (!lobby) {
		lobby = {
			currentLap: 1,
			currentCheckpoint: 0,
			racing: false,
			finished: false,
			timeoutLeftVehicle: 20,
			players: [],
		};

        jcmp.ui.CallEvent("SwitchRadioStation", 0);
		jcmp.events.Call("SetLocalPlayerValue", "racing", 1);
	
		for (let e = events.length - 1; e >= 0; e--) {
			jcmp.events.Remove(events[e]);
		}
	
		events = [			
			jcmp.events.Add('KeyHold', function(id) {
				if (id == "KeyHoldRespawnVehicleRace" && lobby && lobby.racing)
					respawnVehicle();
			}),

			jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
				if (key != 82 || !lobby || !lobby.racing)
					return;

				jcmp.ui.CallEvent("StartKeyHold", "KeyHoldRespawnVehicleRace", "", 82, 1000);
			}),

			jcmp.events.Add('TickSecond', function() {
				if (lobby.checkpoint) {
					jcmp.events.CallRemote("UpdatePlayerDistance", jcmp.utils.vector3.distance(jcmp.localPlayer.position, lobby.checkpoint.position));
				}

				if (lobby.changeLobbyOptionsTimeout) {
					lobby.changeLobbyOptionsTimeout--;
					if (lobby.changeLobbyOptionsTimeout <= 0)
						sendLobbyChangedOptions();
				}

				if (lobby.racing) {

					if (jcmp.localPlayerData.vehicle) {
						if (lobby.timeoutLeftVehicle < 20)
							jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));
						lobby.timeoutLeftVehicle = 20;
					} else {

						lobby.timeoutLeftVehicle--;

						jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: {
							label: jcmp.languages.get("HUD_ALERT"),
							text: jcmp.languages.get("HUD_BACK_VEHICLE"),
							time: lobby.timeoutLeftVehicle <= 15 ? "00:" + ("0" + lobby.timeoutLeftVehicle).slice(-2) : "",
						}}));

						if (lobby.timeoutLeftVehicle == 0) {
							leaveRace();
							jcmp.notifications.add(jcmp.languages.get("RACE_LABEL"), jcmp.languages.get("RACE_DESCLASSIFIED"), "flag");
							return;
						}
					}
				}

				if (lobby.hostStarted) {
					lobby.hostStarted--;
					if (lobby.hostStarted <= 5) {
						if (lobby.hostStarted <= 0) {
							jcmp.ui.CallEvent('PlaySound', "finished");
							jcmp.ui.CallEvent("FlashBlackScreen", 1100);
							jcmp.localPlayer.camera.attachedToPlayer = true;
						} else
							jcmp.ui.CallEvent('PlaySound', "menulittle");
					}
					jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_MENU_READY", {subTxt: jcmp.languages.get("RACELOBBY_MENU_HOST_COOLDOWN", [lobby.hostStarted])});
				}

				if (lobby.preparingRace) {
					lobby.preparingRace--;
					if (lobby.preparingRace <= 3) {

						if (lobby.preparingRace === 0) {
							raceGO();
						} else {
							jcmp.ui.CallEvent('PlaySound', "beep");
							jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({countdown: lobby.preparingRace}));
						}
					}

				}
			}),

			jcmp.events.Add('LoadingScreenComplete', function() {
				jcmp.events.Call("HideHUD", true, false, false, false);
				
				if (jcmp.localPlayerData.racing == 1)	
					jcmp.notifications.add(jcmp.languages.get("RACE_LABEL"), jcmp.languages.get("RACE_ENTERED"), "flag");
			}),			
		];
	}

	if (data.hostStarted && !lobby.hostStarted) {
		data.hostStarted--;
		jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_MENU_READY", {subTxt: jcmp.languages.get("RACELOBBY_MENU_HOST_COOLDOWN", [data.hostStarted])});
	}

	if (data.preparingRace && !lobby.preparingRace) {
		jcmp.localPlayer.camera.attachedToPlayer = true;
		jcmp.events.Call("CloseCustomMenu");
		jcmp.events.Call("SetControlsEnabled", false);
	}

	let oldPlayers = lobby.players;

	for (let i in data)
		lobby[i] = data[i];

	if (data.race)
		createLobbyMenu();

	if (data.players) {
		updatePlayersList();
		if (oldPlayers.length != data.players.length)
			jcmp.ui.CallEvent("PlaySound", "menuswitch");
	}
});


jcmp.events.Add("CustomMenuPressed_race-lobby-custom-menu", function(args) {
	if (args.itemId == "RACELOBBY_MENU_READY") {
		lobbyReady();
		return;
	}

	if (args.itemId == "RACELOBBY_MENU_INVITE") {
		invitePlayers();
		return;
	}

	if (args.itemId == "RACELOBBY_MENU_LEAVE") {
        leaveRace();
		return;
	}
});


function raceGO() {
	jcmp.ui.CallEvent('PlaySound', "beeplast");
	jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({countdown: "GO", checkpointLabel: lobby.currentCheckpoint + " | " + lobby.race.checkpoints.length, lapLabel: lobby.laps > 1 ? (lobby.currentLap + " | " + lobby.laps) : false, record: {player: lobby.race.recordPlayer, time: jcmp.utils.maskTime(lobby.race.recordTime)}}));
	updatePlayersHUDList();

    jcmp.events.Call("SetLocalPlayerValue", "racing", 2);
	jcmp.events.Call("SetControlsEnabled", true);

	lobby.racing = true;

	updateCheckpoints();
}


function respawnVehicle() {
	jcmp.ui.CallEvent("FlashBlackScreen", 1800);
	jcmp.events.CallRemote("RespawnVehicle");
}


jcmp.events.AddRemoteCallable("LeaveLobby", function() {
	
	for (let e = events.length - 1; e >= 0; e--) {
		jcmp.events.Remove(events[e]);
	}
	events = [];

	jcmp.localPlayerData.disableNextTeleportAnimation = false;
	lobby.racing = false;
	updateCheckpoints();
	lobby = null;

    jcmp.ui.CallEvent("SwitchRadioStation", jcmp.localPlayerData.lastRadio);
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));

    jcmp.events.Call("SetLocalPlayerValue", "racing", false);
	jcmp.ui.CallEvent("UpdateRaceUI", null);
	jcmp.ui.CallEvent("UpdateRacePlayersUI", null);
	jcmp.localPlayer.camera.attachedToPlayer = true;
	jcmp.ui.CallEvent('PlaySound', "close");
	jcmp.events.Call("HideHUD", false, false, false, false);
	jcmp.events.Call("SetControlsEnabled", true);
});


function leaveRace() {
	jcmp.events.CallRemote("LeaveRace");
}


jcmp.events.Add('Tick2Ms', function() {
	if (!lobby || !lobby.racing)
		return;

	if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, lobby.checkpoint.position) <= (lobby.checkpoint.radius + 3))
		enterCheckpoint();
});


function finishRace() {
	jcmp.localPlayerData.disableNextTeleportAnimation = true;
	lobby.racing = false;
	lobby.finished = true;

	let lastCheckpointPosition = lobby.checkpoint.position;
	let lastCheckpointAngle = lobby.checkpoint.rotation;

	updateCheckpoints();

	jcmp.events.Call("SetControlsEnabled", false);
	jcmp.localPlayer.camera.attachedToPlayer = false;

	lastCheckpointAngle = jcmp.utils.vector3.rotateY(lastCheckpointAngle, -Math.PI);

	lastCheckpointAngle.x = 0.45;
	jcmp.localPlayer.camera.rotation = lastCheckpointAngle;
	jcmp.localPlayer.camera.position = lastCheckpointPosition.add(new Vector3f(0, 3, 0));

	jcmp.ui.CallEvent("UpdateRaceUI", null);
	jcmp.ui.CallEvent("UpdateRacePlayersUI", null);
	jcmp.events.CallRemote("FinishRace");

	jcmp.ui.CallEvent("PlaySound", "mission-complete");
	createFinishRaceMenu();
}


function enterCheckpoint() {
	lobby.currentCheckpoint++;
	jcmp.ui.CallEvent("PlaySound", "finished");

	let nextLap = false;

	if (!lobby.race.checkpoints[lobby.currentCheckpoint]) {
		if (lobby.currentLap < lobby.laps) {
			lobby.currentLap++;
			lobby.currentCheckpoint = 0;
			nextLap = true;
		} else {
			finishRace();
			return;
		}
	}

	updateCheckpoints();
	jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({checkpointLabel: lobby.currentCheckpoint + " | " + lobby.race.checkpoints.length, lapLabel: lobby.laps > 1 ? (lobby.currentLap + " | " + lobby.laps) : false, restartStopwatch: nextLap}));
	jcmp.events.CallRemote("UpdateCheckpoint", lobby.currentCheckpoint, lobby.currentLap);
	jcmp.events.CallRemote("UpdatePlayerDistance", jcmp.utils.vector3.distance(jcmp.localPlayer.position, lobby.checkpoint.position));
}


function updateCheckpoints() {
	if (!lobby)
		return;

	if (lobby.checkpoint)
		lobby.checkpoint.Destroy();

	if (lobby.poi)
		lobby.poi.Destroy();

	if (lobby.nextPoi) {
        lobby.nextPoi.Destroy();
        lobby.nextPoi = null;
    }

	if (!lobby.racing)
		return;

	let pos = jcmp.utils.vector3.parse(lobby.race.checkpoints[lobby.currentCheckpoint].position);
	lobby.checkpoint = new Checkpoint(1, 0x301477DB, pos, jcmp.utils.vector3.parse(lobby.race.checkpoints[lobby.currentCheckpoint].rotation));
	lobby.checkpoint.maxDistance = 16000;
	lobby.checkpoint.radius = lobby.race.checkpointRadius;

	pos.y += 12;
	lobby.poi = new POI(25, pos);
	lobby.poi.minDistance = 2;
	lobby.poi.maxDistance = 16000;
	lobby.poi.text = "";
	lobby.poi.clampedToScreen = true;

	let nextPoi = lobby.currentCheckpoint + 1;
    if (!lobby.race.checkpoints[nextPoi]) {
        if (lobby.currentLap >= lobby.laps)
            return;
        nextPoi = 0;
    }

	let nextPos = jcmp.utils.vector3.parse(lobby.race.checkpoints[nextPoi].position);
	nextPos.y += 5;
	lobby.nextPoi = new POI(12, nextPos);
	lobby.nextPoi.text = "";
	lobby.nextPoi.maxDistance = 16000;
	lobby.nextPoi.clampedToScreen = true;
}


function invitePlayers() {
	jcmp.events.CallRemote("InvitePlayers");
	jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_MENU_INVITE", {description: jcmp.languages.get("RACELOBBY_MENU_INVITED"), success: true});
}


function lobbyReady() {
	if (lobby.isHost)
		jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_MENU_READY", {subTxt: jcmp.languages.get("RACELOBBY_STARTING")});
	else
		jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_MENU_READY", {subTxt: jcmp.languages.get("RACELOBBY_WAITING_FOR_HOST")});
	jcmp.events.CallRemote("LobbyReady");

	jcmp.ui.CallEvent("PlaySound", "starting");
}


function updatePlayersHUDList() {
	jcmp.ui.CallEvent('UpdateRacePlayersUI', JSON.stringify(lobby.players));
}


function updatePlayersList() {

	let playersOrdened = [];

	for (let p in lobby.players) {
        
        if (lobby.players[p].recordTime)
            lobby.players[p].recordTime = jcmp.utils.maskTime(lobby.players[p].recordTime);

		if (jcmp.localPlayer.networkId == lobby.players[p].networkId)
			lobby.players[p].isLocalPlayer = true;

		//playersOrdened.splice((lobby.players[p].placing - 1), 0, lobby.players[p]);
		playersOrdened[lobby.players[p].placing - 1] = lobby.players[p];
	}

	lobby.players = playersOrdened;

	if (lobby.racing) {
		updatePlayersHUDList();
	} else if (lobby.finished) {
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_PLAYERS_LIST", {cleanItems: true});

		for (let p in lobby.players) {
			let player = lobby.players[p];

			let subTxt = player.finished ? (player.reward ? "<span style='color: #2ecc71; margin-right: 5px'>$" + player.reward + "</span>" : "") : "";
			if (player.record)
				subTxt += "<span style='color: #f1c40f'>" + player.recordTime + "*</span>";
			else
				subTxt += player.recordTime;

			jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_PLAYERS_LIST", {addItem: {
				id: "RACEFINISH_PLAYER_" + player.networkId,
				txt: player.placing + ". " + player.name,
				subTxt: subTxt,
				disabled: !player.finished,
			}});

		}
	} else {
		jcmp.events.Call('UpdateCustomMenuItem', "race-lobby-players-custom-menu", {headerTxt: jcmp.languages.get("RACE_MENU_LOBBY_PLAYERS", [lobby.players.length, lobby.maxPlayers])});
		jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_PLAYERS_LIST", {cleanItems: true});

		for (let p in lobby.players) {
			let subTxt = "";

			if (lobby.players[p].isHost)
				subTxt = "<span style='color: #e67e22'>HOST</span>";

			if (lobby.players[p].ready)
				subTxt = "<span style='color: #2ecc71'>READY</span> " + subTxt;

			jcmp.events.Call('UpdateCustomMenuItem', "RACELOBBY_PLAYERS_LIST", {addItem: {
				id: "RACELOBBY_PLAYER_" + lobby.players[p].networkId,
				txt: lobby.players[p].name,
				subTxt: subTxt,
			}});
		}
	}
}


function createLobbyMenu() {

	let descriptionList = [
		{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_NAME"), subTxt: lobby.race.name},
		{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_CREATED_BY"), subTxt: lobby.race.ownerName},
		{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_TYPE_" + lobby.race.type)},
		{txt: jcmp.languages.get("RACECREATOR_MENU_VEHICLE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_" + lobby.race.vehicleType)},
		{txt: jcmp.languages.get("RACECREATOR_MENU_CHECKPOINT_RADIUS"), subTxt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_" + lobby.race.checkpointRadius)},
		{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_RATING"), subTxt: (lobby.race.approved ? "<img src='http://justcauserp.com/images/rp_tm_verified.png' class='logo-tm'/>" : "") + jcmp.utils.getRaceEvaluation(lobby.race.thumbsUp, lobby.race.thumbsDown)},
		{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_LAPS"), subTxt: lobby.laps},
		{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_RECORD"), subTxt: (lobby.race.recordPlayer ? (lobby.race.recordPlayer + " (" + jcmp.utils.maskTime(lobby.race.recordTime) + ")") : "--")},
		lobby.raceBet ? {txt: jcmp.languages.get("RACELOBBY_MENU_RACE_BET"), subTxt: "$" + lobby.raceBet} : null,
	];

	let item_vehicles = {
		id: "RACELOBBY_MENU_VEHICLE",
		txt: jcmp.languages.get("RACELOBBY_MENU_VEHICLE"),
		innerValues: [],
		description: jcmp.languages.get("RACELOBBY_MENU_VEHICLE_DESCRIPTION"),
		descriptionList: descriptionList,
	};

	if (jcmp.vehiclesClasses[lobby.vehicleClass]) {
		for (let v in jcmp.vehiclesClasses[lobby.vehicleClass]) {
			let vehicleData = jcmp.vehiclesData[jcmp.vehiclesClasses[lobby.vehicleClass][v]];
			if (vehicleData && !vehicleData.z80)
				item_vehicles.innerValues.push({txt: vehicleData.name, value: jcmp.vehiclesClasses[lobby.vehicleClass][v]});
		}
	} else {
		item_vehicles.innerValues.push({txt: jcmp.vehiclesData[lobby.vehicleClass].name, value: lobby.vehicleClass});
		item_vehicles.disabled = true;
	}

	let item_invite = {
		id: "RACELOBBY_MENU_INVITE",
		txt: jcmp.languages.get("RACELOBBY_MENU_INVITE"),
		description: jcmp.languages.get("RACELOBBY_MENU_INVITE_DESCRIPTION"),
		special: "disable",
		descriptionList: descriptionList,
	};

	let item_leave = {
		id: "RACELOBBY_MENU_LEAVE",
		txt: jcmp.languages.get("RACELOBBY_MENU_LEAVE"),
		description: jcmp.languages.get("RACELOBBY_MENU_LEAVE_DESCRIPTION"),
		special: "close",
		descriptionList: descriptionList,
	};

	let menu = {
		key: -1,
		id: "race-lobby-custom-menu",
		offsetX: "0",
		lean: true,
		header: {title: jcmp.languages.get("RACE_MENU_OPTIONS"), color: "#184275"},
		body: {
			id: "RACELOBBY_MENU_LIST",
			items: [
				item_vehicles,
				lobby.isHost ? item_invite : null,
				{
					id: "RACELOBBY_MENU_READY",
					txt: lobby.isHost ? jcmp.languages.get("RACELOBBY_MENU_START") : jcmp.languages.get("RACELOBBY_MENU_READY"),
					description: lobby.isHost ? jcmp.languages.get("RACELOBBY_MENU_START_DESCRIPTION") : jcmp.languages.get("RACELOBBY_MENU_READY_DESCRIPTION"),
					descriptionList: descriptionList,
					color: "rgb(38, 87, 146)",
					special: "submitdisable",
                },
                item_leave,
			],
		},
		parentMenu: {
			id: "race-lobby-players-custom-menu",
			lean: true,
			width: "400px",
			header: {title: jcmp.languages.get("RACE_MENU_LOBBY_PLAYERS", [1, "?"]), color: "#184275"},
			body: {
				id: "RACELOBBY_PLAYERS_LIST",
				items: [],
			}

		},
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
}


function createFinishRaceMenu() {

	var menu = {
		key: -1,
		offsetX: "0",
		id: "race-finish-custom-menu",
		lean: true,
		header: {title: jcmp.languages.get("RACE_MENU_OPTIONS"), color: "#184275"},
		body: {
			id: "RACEFINISH_MENU_LIST",
			items: [
				{
					id: "RACEFINISH_MENU_THUMBSUP",
					txt: jcmp.languages.get("RACEFINISH_MENU_THUMBSUP"),
					description: jcmp.languages.get("RACEFINISH_MENU_THUMBSUP_DESCRIPTION"),
				},
				{
					id: "RACEFINISH_MENU_THUMBSDOWN",
					txt: jcmp.languages.get("RACEFINISH_MENU_THUMBSDOWN"),
					description: jcmp.languages.get("RACEFINISH_MENU_THUMBSDOWN_DESCRIPTION"),
				},
				(jcmp.localPlayerData.permissions == 4 && !jcmp.races[lobby.idRace].approved) ? {
					id: "RACEFINISH_MENU_APPROVERACE",
					txt: jcmp.languages.get("RACEFINISH_MENU_APPROVERACE"),
					description: jcmp.languages.get("RACEFINISH_MENU_APPROVERACE_DESCRIPTION"),
				} : null,
				jcmp.localPlayerData.permissions == 4 ? {
					id: "RACEFINISH_MENU_DISAPPROVERACE",
					txt: jcmp.languages.get("RACEFINISH_MENU_DISAPPROVERACE"),
					description: jcmp.languages.get("RACEFINISH_MENU_DISAPPROVERACE_DESCRIPTION"),
				} : null,
				{
					id: "RACEFINISH_MENU_LEAVE",
					txt: jcmp.languages.get("RACEFINISH_MENU_LEAVE"),
					description: jcmp.languages.get("RACEFINISH_MENU_LEAVE_DESCRIPTION"),
					color: "#184275",
					special: "close"
				},
			],
		},
		parentMenu: {
			id: "race-finish-players-custom-menu",
			lean: true,
			width: "400px",
			header: {title: jcmp.languages.get("RACE_MENU_PLAYERS"), color: "#184275"},
			body: {
				id: "RACEFINISH_PLAYERS_LIST",
				items: [],
			}

		},
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
}


jcmp.events.Add("CustomMenuPressed_race-finish-custom-menu", function(args) {
	if (args.itemId == "RACEFINISH_MENU_APPROVERACE") {
		jcmp.events.CallRemote("ApproveRace", lobby.idRace, true);
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_APPROVERACE", {disabled: true, subTxt: "<span class='key icon-check'></span>", success: true, description: jcmp.languages.get("RACEFINISH_MENU_THANKS_EVALUATE")});
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_DISAPPROVERACE", {disabled: true, description: ""});
		return;
	}

	if (args.itemId == "RACEFINISH_MENU_DISAPPROVERACE") {
		jcmp.events.CallRemote("ApproveRace", lobby.idRace, false);
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_DISAPPROVERACE", {disabled: true, subTxt: "<span class='key icon-check'></span>", success: true, description: jcmp.languages.get("RACEFINISH_MENU_THANKS_EVALUATE")});
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_APPROVERACE", {disabled: true, description: ""});
		return;
	}

	if (args.itemId == "RACEFINISH_MENU_THUMBSUP") {
		jcmp.events.CallRemote("EvaluateRace", lobby.idRace, true);
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_THUMBSUP", {disabled: true, subTxt: "<span class='key icon-check'></span>", success: true, description: jcmp.languages.get("RACEFINISH_MENU_THANKS_EVALUATE")});
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_THUMBSDOWN", {disabled: true, description: ""});
		return;
	}

	if (args.itemId == "RACEFINISH_MENU_THUMBSDOWN") {
		jcmp.events.CallRemote("EvaluateRace", lobby.idRace, false);
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_THUMBSDOWN", {disabled: true, subTxt: "<span class='key icon-check'></span>", success: true, description: jcmp.languages.get("RACEFINISH_MENU_THANKS_EVALUATE")});
		jcmp.events.Call('UpdateCustomMenuItem', "RACEFINISH_MENU_THUMBSUP", {disabled: true, description: ""});
		return;
	}

	if (args.itemId == "RACEFINISH_MENU_LEAVE") {
		leaveRace();
		return;
	}
});


function sendLobbyChangedOptions() {
	if (!lobby.changeLobbyOptionsQueue)
		return;

	jcmp.events.CallRemote("LobbyChangedOptions", lobby.changeLobbyOptionsQueue);
	lobby.changeLobbyOptionsQueue = null;
	lobby.changeLobbyOptionsTimeout = 4;
}


function setLobbyChangedQueue(value) {
	lobby.changeLobbyOptionsQueue = value;

	if (lobby.changeLobbyOptionsTimeout && lobby.changeLobbyOptionsTimeout > 0)
		return;

	sendLobbyChangedOptions();
}


jcmp.events.Add("CustomMenuSelected_race-lobby-custom-menu", function(args) {
	if (args.itemId == "RACELOBBY_MENU_VEHICLE") {
		if (!args.hover)
			setLobbyChangedQueue(args.value);
	}
});
