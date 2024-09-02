'use strict';

var raceNetworkId = 0;

jcmp.orderedRaces = [];
jcmp.races = [];
jcmp.racesLobby = [];

var raceCount = 1;


jcmp.events.AddRemoteCallable("CreateRaceLobby", function(player, idRace, laps, vehicleClass, nitroEnabled, turboJumpEnabled, raceBet) {
	createRaceLobby(player, Number(idRace), Number(laps), Number(vehicleClass), JSON.parse(nitroEnabled), JSON.parse(turboJumpEnabled), Number(raceBet));
});


jcmp.events.AddRemoteCallable("EnterRaceLobby", function(player, idLobby) {
	addPlayerInLobby(player, idLobby);
});


jcmp.events.AddRemoteCallable("ApproveRace", function(player, idRace, approved) {
	let race = jcmp.races[idRace];
	if (!race)
		return;

	if (approved) {
		jcmp.SQL.execute(
			"UPDATE Race SET approved = 1 WHERE id = ?",
			[idRace]
		);
		race.approved = 1;
	} else {
		jcmp.SQL.execute(
			"UPDATE Race SET disapproved = 1 WHERE id = ?",
			[idRace]
		);
		delete jcmp.races[idRace];
	}
	raceNetworkId++;
});


jcmp.events.AddRemoteCallable("EvaluateRace", function(player, idRace, evaluation) {
	let race = jcmp.races[idRace];
	if (!race)
		return;

	let field = evaluation ? "thumbsUp" : "thumbsDown";

	race[field] += 1;

	jcmp.SQL.execute(
		"UPDATE Race SET " + field + " = " + field + " + 1 WHERE id = ?",
		[idRace]
	);
});


function createRaceLobby(player, idRace, laps, vehicleClass, nitroEnabled, turboJumpEnabled, raceBet) {
	let race = jcmp.races[idRace];
	if (!race) {
		jcmp.notifications.send(player, "RACE_LABEL", "RACE_RACE_DOESNT_EXIST", false, "cancel", "cancel");
		return;
	}

	let lobby = {
		id: raceCount,
		idRace: idRace,
		players: {},
		playersCount: 0,
		hostStarted: false,
		preparingRace: false,
		laps: laps,
		vehicleClass: vehicleClass,
		turboJumpEnabled: turboJumpEnabled,
		nitroEnabled: nitroEnabled,
		raceBet: raceBet,
		totalBets: 0,
		playersFinished: 0,
		reward: race.approved ? (laps * race.checkpoints.length * 3) : 0,
		maxPlayers: race.startings.length,
	};

	jcmp.racesLobby[lobby.id] = lobby;

	addPlayerInLobby(player, lobby.id, true);

	raceCount++;
}


jcmp.events.Add('PlayerDestroyedAfter', function(player) {
	removePlayerFromLobby(player, true);
});


jcmp.events.Add('PlayerDeath', function(player, killer, reason) {
	removePlayerFromLobby(player, false);
});


jcmp.events.AddRemoteCallable('InvitePlayers', function(player) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let race = jcmp.races[lobby.idRace];

    for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

		let invited = jcmp.loggedPlayers[p];

		if (getPlayerLobby(invited))
			return;

		jcmp.notifications.send(invited, "RACECREATELOBBY_RACE_LOBBY", "RACELOBBY_LOBBY_CREATED", [race.name, player.nname], "flag");
	}
});


jcmp.events.AddRemoteCallable('LobbyReady', function(player) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	lobby.players[player.networkId].ready = true;

	if (lobby.players[player.networkId].isHost) {
		lobby.hostStarted = 21;
		updateLobbyPlayers(lobby, false, false, true, false);
	}

	updateLobbyPlayers(lobby, false, true, false, false);
});


jcmp.events.AddRemoteCallable('LobbyChangedOptions', function(player, vehicleChoosen) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	if (vehicleChoosen) {
		lobby.players[player.networkId].vehicleChoosen = Number(vehicleChoosen);

		let race = jcmp.races[lobby.idRace];
		let currentStarting = race.startings[lobby.players[player.networkId].placing - 1];

		spawnVehicle(player, jcmp.utils.vector3.parse(currentStarting.position), jcmp.utils.vector3.parse(currentStarting.rotation), false, false);
	}
});


jcmp.events.AddRemoteCallable('UpdatePlayerDistance', function(player, distanceUntilNextCheckpoint) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	lobby.players[player.networkId].distanceUntilNextCheckpoint = Number(distanceUntilNextCheckpoint);
});


jcmp.events.AddRemoteCallable('FinishRace', function(player) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let playerData = lobby.players[player.networkId];

	playerData.finished = new Date();

    updatePlayerRecordTime(playerData, playerData.currentLap + 1);

    let playerVehicle = getPlayerVehicle(player);
    if (playerVehicle) {
		jcmp.events.Call("DestroyVehicle", playerVehicle);
		player.raceVehicle = false;
	}

	let reward = lobby.reward + lobby.reward * ((lobby.playersCount - 1) * 0.1);

	let race = jcmp.races[lobby.idRace];

	switch (lobby.playersFinished) {
		case 0:
			reward += lobby.totalBets;

			if (!race.recordTime || race.recordTime > playerData.recordTime) {

				race.recordTime = playerData.recordTime;
				race.recordPlayer = player.nname;

				playerData.record = true;

				jcmp.SQL.execute(
					"UPDATE Race SET ? WHERE id = " + lobby.idRace,
					{
						recordTime: race.recordTime,
						recordPlayer: race.recordPlayer,
					}
				);
                raceNetworkId++;
			}
			break;

		case 1:
			reward = reward / 2;
			break;

		case 2:
			reward = reward / 4;
			break;

		default:
			reward = 0;
			break;
	}

	reward = Math.floor(reward);

	if (reward > 0) {
		jcmp.events.Call("JobDone", playerData.player, reward, reward);
		playerData.reward = reward;
	}

	lobby.playersFinished++;

	// if (lobby.playersFinished === lobby.playersCount) {
	// 	// all finished
	// }

	updateLobbyPlayers(lobby, false, true, false, false);
});


jcmp.events.AddRemoteCallable('UpdateCheckpoint', function(player, currentCheckpoint, currentLap) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let playerData = lobby.players[player.networkId];
	if (!playerData)
		return;

    playerData.currentCheckpoint = currentCheckpoint;
    
    updatePlayerRecordTime(playerData, currentLap);

	playerData.currentLap = currentLap;
});


function updatePlayerRecordTime(playerData, currentLap) {
    if (playerData.currentLap == currentLap)
        return;
    
    let curLapTime = new Date() - playerData.startedTime;
    playerData.startedTime = new Date();

    if (!playerData.recordTime || curLapTime < playerData.recordTime)
        playerData.recordTime = curLapTime;
}


function getPlayerLobby(player) {
	if (!player.racing) {
		return null;
	}

	let idLobby = player.racing;

 	let lobby = getLobby(idLobby);
	if (!lobby) {
		jcmp.console.print("[ERROR] Race - Lobby for " + player.nname + " doesn't exist!");
		return null;
	}
	return lobby;
}


function getLobby(idLobby) {
	if (jcmp.racesLobby[idLobby]) {
		return jcmp.racesLobby[idLobby];
	}
	return null;
}


function updatePlayersPlacing(lobby) {
	let placings = [];
	for (let p in lobby.players) {

		let player = lobby.players[p];

		let indexToInsert = 0;
		for (let pp in placings) {

			let pplayer = lobby.players[placings[pp]];

			if (player.finished) {
				if (!pplayer.finished || player.finished < pplayer.finished) {
					indexToInsert = pp;
					break;
				}
				indexToInsert++;
				continue;
            }
            
			if (player.left) {
				indexToInsert++;
				continue;
            }

			if (player.currentLap > pplayer.currentLap) {
				indexToInsert = pp;
				break;
			} else if (player.currentLap == pplayer.currentLap && player.currentCheckpoint > pplayer.currentCheckpoint) {
				indexToInsert = pp;
				break;
			} else if (player.currentCheckpoint == pplayer.currentCheckpoint && player.distanceUntilNextCheckpoint < pplayer.distanceUntilNextCheckpoint) {
				indexToInsert = pp;
				break;
			}

			indexToInsert++;
		}

		placings.splice(indexToInsert, 0, player.networkId);
	}

	for (let pp in placings) {
		// console.log(pp + " " + lobby.players[placings[pp]].player.nname);
		lobby.players[placings[pp]].placing = (Number(pp) + 1);
	}
}


function getDefaultVehicle(type, vehicleClass) {
	if (jcmp.vehiclesData[vehicleClass])
		return vehicleClass;
		
	for (let v in jcmp.vehiclesData) {
		if (jcmp.vehiclesData[v].type == type && (!jcmp.vehiclesData[v].class || vehicleClass == jcmp.vehiclesData[v].class) && !jcmp.vehiclesData[v].z80)
			return Number(v);
	}
	return vehicleClass;
}


function addPlayerInLobby(player, idLobby, isHost) {
	if (player.racing) {
		jcmp.notifications.send(player, "RACE_LABEL", "RACE_ALREADY_RACING", false, "cancel", "cancel");
		return;
	}

	let lobby = getLobby(idLobby);
	if (!lobby)
		return;

	if (lobby.racing || lobby.hostStarted || lobby.preparingRace) {
		jcmp.notifications.send(player, "RACE_LABEL", "RACE_IS_HAPPENING", false, "cancel", "cancel");
		return;
	}

	if (lobby.playersCount >= lobby.maxPlayers) {
		jcmp.notifications.send(player, "RACE_LABEL", "RACE_LOBBY_IS_FULL", false, "cancel", "cancel");
		return;
	}

	lobby.playersCount++;

	let race = jcmp.races[lobby.idRace];

	lobby.players[player.networkId] = {
		player: player,
		name: player.nname,
		networkId: player.networkId,
		placing: lobby.playersCount,
		vehicle: null,
		vehicleChoosen: getDefaultVehicle(race.vehicleType, lobby.vehicleClass),
		currentCheckpoint: 0,
		currentLap: 1,
		distanceUntilNextCheckpoint: 10000,
		finished: false,
		racing: false,
		lastPosition: player.position,
		startedTime: null,
        recordTime: null,
        record: null,
		isHost: isHost,
		reward: null,
	};

	if (isHost)
		lobby.hostName = player.nname;

	player.dimension = lobby.id;
	player.racing = lobby.id;
	player.invulnerable = true;
	player.saveValue("position", player.position);

	let currentStarting = race.startings[lobby.players[player.networkId].placing - 1];

	let playerPosition = jcmp.utils.vector3.parse(currentStarting.position);
    let playerRotation = jcmp.utils.vector3.parse(currentStarting.rotation);
    
    playerRotation = jcmp.utils.vector3.rotateY(playerRotation, (playerRotation.y > 0 ? 1 : -1) * Math.PI / 2);

    player.rotation = playerRotation;

    playerPosition = jcmp.utils.vector3.moveAngle(playerPosition, jcmp.utils.vector3.rotateY(playerRotation, 0.5).y, 2);
    player.position = playerPosition;

	jcmp.events.CallRemote("UpdateLobbyCamera", player, JSON.stringify({rotation: jcmp.utils.vector3.stringify(player.rotation)}));

	spawnVehicle(player, jcmp.utils.vector3.parse(currentStarting.position), jcmp.utils.vector3.parse(currentStarting.rotation), false, false);

	updateLobbyPlayers(lobby, player, false, true, true);
	updateLobbyPlayers(lobby, false, true, false, false);
}


jcmp.events.Add("ServerLoaded", function() {
	LoadRaces();
	
	setInterval(function() {
		for (let l in jcmp.racesLobby) {

			let lobby = jcmp.racesLobby[l];

			if (lobby.hostStarted) {
				lobby.hostStarted--;

				if (lobby.hostStarted <= 0) {
					startRace(lobby);
				}
			}

			if (lobby.preparingRace) {
				lobby.preparingRace--;

				if (lobby.preparingRace <= 0) {
					lobby.racing = true;
					for (let p in lobby.players) {
						lobby.players[p].startedTime = new Date();
					}                
				}
			}
		}

		for (let l in jcmp.racesLobby) {
			let lobby = jcmp.racesLobby[l];
			if (lobby.racing) {
				updatePlayersPlacing(lobby);
				updateLobbyPlayers(lobby, false, true, false, false);
			}
		}
	}, 1000);
});


function spawnVehicle(player, position, rotation, automaticEnter, up) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let playerData = lobby.players[player.networkId];
	if (!playerData)
		return;

    const raceVehicle = getPlayerVehicle(player);
	if (raceVehicle) {
		jcmp.events.Call("DestroyVehicle", raceVehicle);
		player.raceVehicle = false;
	}

	if (up)
		position = new Vector3f(position.x, position.y + 3, position.z);

	const vehicle = new Vehicle(playerData.vehicleChoosen, position, rotation);
	vehicle.nitroEnabled = lobby.nitroEnabled;
	vehicle.turboJumpEnabled = lobby.turboJumpEnabled;
	vehicle.dimension = lobby.id;
	vehicle.isRacing = true;

	if (automaticEnter)
		vehicle.SetOccupant(0, player);

	player.raceVehicle = vehicle;
}


function getPlayerVehicle(player) {
    if (typeof player.raceVehicle !== 'undefined' && player.raceVehicle)
        return player.raceVehicle;
    
    return null;
}


jcmp.events.Add('PlayerVehicleEnteredAfter', function(player, vehicle, seatIndex) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	vehicle.nitroEnabled = lobby.nitroEnabled;
	vehicle.turboJumpEnabled = lobby.turboJumpEnabled;
});


function startRace(lobby) {
	lobby.hostStarted = false;
	lobby.preparingRace = 8;

	updateLobbyPlayers(lobby, false, false, true, false);

	let race = jcmp.races[lobby.idRace];
	for (let p in lobby.players) {
		jcmp.events.Call("SetPlayerMoney", lobby.players[p].player, -lobby.raceBet);
		lobby.totalBets += lobby.raceBet;
		lobby.players[p].ready = null;

        let currentStarting = race.startings[lobby.players[p].placing - 1];
        
        let playerVehicle = getPlayerVehicle(lobby.players[p].player);
        if (playerVehicle) {
            playerVehicle.position = jcmp.utils.vector3.parse(currentStarting.position);
            playerVehicle.rotation = jcmp.utils.vector3.parse(currentStarting.rotation);
            playerVehicle.SetOccupant(0, lobby.players[p].player);
        }
	}
}


jcmp.events.AddRemoteCallable("RespawnVehicle", function(player) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let race = jcmp.races[lobby.idRace];
	let currentPosition = null;

	if (lobby.players[player.networkId].currentCheckpoint > 0)
		currentPosition = race.checkpoints[lobby.players[player.networkId].currentCheckpoint - 1];
	else
		currentPosition = race.startings[race.startings.length - 1];

	spawnVehicle(player, jcmp.utils.vector3.parse(currentPosition.position), jcmp.utils.vector3.parse(currentPosition.rotation), true, true);
});


jcmp.events.AddRemoteCallable("LeaveRace", function(player) {
	removePlayerFromLobby(player, false);
});


function removePlayerFromLobby(player, leftServer) {
	let lobby = getPlayerLobby(player);
	if (!lobby)
		return;

	let playerData = lobby.players[player.networkId];
	if (!playerData)
		return;

	if (playerData.left)
		return;

    let playerVehicle = getPlayerVehicle(player);
	if (playerVehicle) {
		jcmp.events.Call("DestroyVehicle", playerVehicle);
        player.raceVehicle = false;

		if (player.timeoutRace) {
			clearTimeout(player.timeoutRace);
			player.timeoutRace = null;
		}
	}

	if (!leftServer) {
		player.respawnPosition = playerData.lastPosition;
		player.Respawn();
		delete player.racing;
		player.dimension = 0;
		player.invulnerable = false;

		jcmp.events.CallRemote("LeaveLobby", player);
	}

	lobby.playersCount--;

	let isHost = playerData.isHost;

	if (lobby.racing || lobby.preparingRace) {
		playerData.left = true;
	} else
		delete lobby.players[player.networkId];

	if (lobby.playersCount <= 0) {
		destroyLobby(lobby.id);
		return;
	}

	if (isHost)
		newHost(lobby);

	updateLobbyPlayers(lobby, false, true, false, false);
}


function newHost(lobby) {
	for (let networkId in lobby.players) {
		if (lobby.players[networkId].player && !lobby.players[networkId].player.left) {
			lobby.players[networkId].isHost = true;
			lobby.players[networkId].ready = false;
			lobby.hostName = lobby.players[networkId].name;
			return;
		}
	}
}


function destroyLobby(idLobby) {
	if (!jcmp.racesLobby[idLobby])
		return;

	delete jcmp.racesLobby[idLobby];
}


function updateLobbyPlayers(lobby, player, updatePlayers, updateData, updateRaceData) {
	let data = {};

	if (updateData) {
		data.id = lobby.id;
		data.idRace = lobby.idRace;
		data.hostStarted = lobby.hostStarted;
		data.preparingRace = lobby.preparingRace;
		data.laps = lobby.laps;
		data.raceBet = lobby.raceBet;
		data.maxPlayers =  lobby.maxPlayers;
	}

	if (updatePlayers) {
		data.playersCount = lobby.playersCount;
		data.players = [];

		for (let networkId in lobby.players) {

			let playerData = {
				name: lobby.players[networkId].name,
				networkId: lobby.players[networkId].networkId,
				placing: lobby.players[networkId].placing,
			};


			// deixar dinamico isso
			if (lobby.players[networkId].left)
				playerData.left = lobby.players[networkId].left;

			if (lobby.players[networkId].ready)
				playerData.ready = lobby.players[networkId].ready;

			if (lobby.players[networkId].finished)
				playerData.finished = lobby.players[networkId].finished;

			if (lobby.players[networkId].isHost)
				playerData.isHost = true;

			if (lobby.players[networkId].reward)
				playerData.reward = lobby.players[networkId].reward;

			if (lobby.players[networkId].record)
				playerData.record = lobby.players[networkId].record;

			if (lobby.players[networkId].recordTime)
				playerData.recordTime = lobby.players[networkId].recordTime;

			data.players.push(playerData);
		}
	}

	if (updateRaceData) {
		data.race = jcmp.races[lobby.idRace];
		data.vehicleClass = lobby.vehicleClass;
	}

	if (player) {
		if (lobby.players[player.networkId].isHost)
			data.isHost = true;

		jcmp.events.CallRemote("UpdateLobby", player, JSON.stringify(data));
	} else {
		for (let p in lobby.players) {
			if (lobby.players[p].player && !lobby.players[p].left)
				jcmp.events.CallRemote("UpdateLobby", lobby.players[p].player, JSON.stringify(data));
		}
	}
}


jcmp.events.AddRemoteCallable("SubmitRace", function(player, name, description, imageUrl, type, vehicleType, checkpointRadius, startings, checkpoints, editing, edited, saving) {
	startings = JSON.parse(startings);
	checkpoints = JSON.parse(checkpoints);

	jcmp.notifications.send(player, "JOB_NAME_18", "RACER_CREATING", false, "car");

	if (!editing || (editing && edited)) {
		jcmp.SQL.query(
			"REPLACE INTO Race SET ?",
			{
				id: editing || "null",
				idOwner: player.client.steamId,
				name: name,
				description: description,
				type: type,
				vehicleType: vehicleType,
				checkpointRadius: checkpointRadius,
				submitted: !saving,
			},
			function(results) {

				let executeQuery = "";

				if (editing) {
					executeQuery += "DELETE FROM RaceSpot WHERE idRace = " + editing + ";";
					delete jcmp.races[editing];
				}

				for (let s = 0; s < startings.length; s++) {
					executeQuery += "INSERT INTO RaceSpot SET idRace = " + results.insertId + ", position = '" + startings[s].position + "', rotation = '" + startings[s].rotation + "', indexSpot = " + s + ", type = 1;";
				}

				for (let c = 0; c < checkpoints.length; c++) {
					executeQuery += "INSERT INTO RaceSpot SET idRace = " + results.insertId + ", position = '" + checkpoints[c].position + "', rotation = '" + checkpoints[c].rotation + "', indexSpot = " + c + ", type = 2;";
				}

				jcmp.SQL.query(
					executeQuery,
					null,
					function(r) {
						LoadRaces(results.insertId);
						jcmp.notifications.send(player, "JOB_NAME_18", saving ? "RACER_SAVED" : "RACER_CREATED", [results.insertId], "car");
					}
				);

				if (imageUrl)
					jcmp.events.Call("UploadRaceImage", imageUrl, results.insertId + ".jpg");
			}
		);
	} else {
		jcmp.SQL.query(
			"UPDATE Race SET ? WHERE id = " + editing,
			{
				name: name,
				description: description,
				type: type,
				vehicleType: vehicleType,
				checkpointRadius: checkpointRadius,
				recordTime: null,
				recordPlayer: null,
				submitted: !saving,
			},
			function(results) {
				LoadRaces(editing);
				jcmp.notifications.send(player, "JOB_NAME_18", saving ? "RACER_SAVED" : "RACER_CREATED", [editing], "car");

				if (imageUrl)
					jcmp.events.Call("UploadRaceImage", imageUrl, editing + ".jpg");
			}
		);
	}
});


function SendToPlayerAllRaces(player, sendRaces) {
	// refazer apenas deletando startings e checkpoints
	let races = false;
	if (sendRaces) {
		races = {};
		for (let r in jcmp.races) {
			races[jcmp.races[r].id] = {
				id: jcmp.races[r].id,
				name: jcmp.races[r].name,
				description: jcmp.races[r].description,
				type: jcmp.races[r].type,
				vehicleType: jcmp.races[r].vehicleType,
				checkpointRadius: jcmp.races[r].checkpointRadius,
				approved: jcmp.races[r].approved,
				submitted: jcmp.races[r].submitted,
				thumbsUp: jcmp.races[r].thumbsUp,
				thumbsDown: jcmp.races[r].thumbsDown,
				ownerName: jcmp.races[r].ownerName,
				idOwner: jcmp.races[r].idOwner,
				maxPlayers: jcmp.races[r].startings.length,
				recordTime: jcmp.races[r].recordTime,
				recordPlayer: jcmp.races[r].recordPlayer,
			};
		}
	}

	let lobbies = [];
	for (let id in jcmp.racesLobby) {
		lobbies.push({
			id: jcmp.racesLobby[id].id,
			idRace: jcmp.racesLobby[id].idRace,
			playersCount: jcmp.racesLobby[id].playersCount,
			laps: jcmp.racesLobby[id].laps,
			raceBet: jcmp.racesLobby[id].raceBet,
			vehicleClass: jcmp.racesLobby[id].vehicleClass,
			nitroEnabled: jcmp.racesLobby[id].nitroEnabled,
			turboJumpEnabled: jcmp.racesLobby[id].turboJumpEnabled,
			hostName: jcmp.racesLobby[id].hostName,
		});
	}

	jcmp.events.CallRemote("UpdatePlayerAllRaces", player, JSON.stringify(lobbies), races ? JSON.stringify(races) : false, races ? JSON.stringify(jcmp.orderedRaces) : false, raceNetworkId);
}


function SendToPlayerOwnRaces(player) {
	let playerRaces = [];
	for (let r in jcmp.races) {
		if (jcmp.races[r].idOwner == player.client.steamId)
			playerRaces.push(jcmp.races[r]);
	}

	jcmp.events.CallRemote("UpdatePlayerOwnRaces", player, JSON.stringify(playerRaces));
}


jcmp.events.AddRemoteCallable("GetMyRaces", function(player) {
	SendToPlayerOwnRaces(player);
});


jcmp.events.AddRemoteCallable("GetAllRaces", function(player, rNetworkId) {
	SendToPlayerAllRaces(player, (!rNetworkId || rNetworkId != raceNetworkId));
});


function LoadRaces(id) {
	if (!id)
        jcmp.races = [];
        
    jcmp.orderedRaces = [];

    raceNetworkId++;

	jcmp.SQL.query(
		`SELECT
			Race.id,
			Race.name,
			Race.description,
			Race.type,
			Race.vehicleType,
			Race.approved,
			Race.thumbsUp,
			Race.thumbsDown,
			Race.idOwner,
			Race.recordTime,
			Race.recordPlayer,
			Race.submitted,
			Race.checkpointRadius,
            Player.nname AS 'ownerName',
			(thumbsUp / (thumbsUp + thumbsDown)) AS 'evaluation'
		FROM Race
		INNER JOIN Player ON Player.id = Race.idOwner
		WHERE disapproved = false
		ORDER BY approved DESC, evaluation DESC, thumbsUp DESC`,
		[id, id],
		function (rows) {

			rows.forEach(function(row) {

                jcmp.orderedRaces.push(row.id);

                if (!id || id == row.id) {
                    jcmp.races[row.id] = row;
                    jcmp.races[row.id].startings = [];
                    jcmp.races[row.id].checkpoints = [];

                    jcmp.SQL.query(
                        "SELECT * FROM RaceSpot WHERE ? ORDER BY indexSpot",
                        {idRace: row.id},
                        function (rowsSpot) {

                            rowsSpot.forEach(function(rowSpot) {

                                let spotData = {
                                    position: rowSpot.position,
                                    rotation: rowSpot.rotation,
                                };

                                if (rowSpot.type == 1)
                                    jcmp.races[row.id].startings.push(spotData);
                                else if (rowSpot.type == 2)
                                    jcmp.races[row.id].checkpoints.push(spotData);

                            });
                        }
                    );
                }
			});
		}
	);
}