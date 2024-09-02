'use strict';

jcmp.SQL = new (jcmp.events.Call("GetSQL")[0])();
jcmp.money = 0;
jcmp.oldMoney = 0;
jcmp.govBavarium = 0;
jcmp.rebelsBavarium = 0;
jcmp.govDomination = 0;
jcmp.rebelsDomination = 0;
jcmp.fuelValue = 0;
jcmp.bavariumValue = 0;
jcmp.totalPlayers = 0;
jcmp.newspaper = {};
jcmp.changelogs = [{version: 0, description: "", submitDate: ""}];
jcmp.news = [];
jcmp.tycoon = [];
jcmp.minimumLevel = 10;
jcmp.roleplayVehicles = [];

jcmp.loggedPlayers = [];

var disconnectingPlayers = {};

setInterval(function() {
	UpdatePlayersPing();
}, 30000);


setInterval(function() {
	jcmp.oldMoney = jcmp.money;
	UpdateRoleplayValue();
    UpdatePlayersData(false, false);
    LoadTycoon();
}, 3600000);


function UpdateRoleplayValue() {
	jcmp.fuelValue = Math.min(Math.max(Math.floor(300 - jcmp.money / 10000) / 100, 1), 4).toFixed(2);
	jcmp.bavariumValue = Math.min(Math.max(Math.floor(500 - jcmp.money / 10000) / 100, 5), 15).toFixed(2);

	jcmp.SQL.query(
		"SELECT COUNT(1) AS 'count' FROM Player",
		null,
		function (rows) {
			jcmp.totalPlayers = rows[0].count;
		}
	);

	jcmp.console.print("[SERVER] Updating roleplay values");
}


jcmp.events.AddRemoteCallable('TC', function(player, id) {

	// jcmp.SQL.query(
	// 	"UPDATE House SET ? WHERE idSite = ?",
	// 	[
    //         {
    //             garagePosition: jcmp.utils.vector3.stringify(player.vehicle.position),
    //             garageRotation: jcmp.utils.vector3.stringify(player.vehicle.rotation),
    //         },
    //         id
    //     ],
	// 	function (rows) {
	// 	}
	// );

});


jcmp.events.AddRemoteCallable('DebugPosition', function(player) {
    let pos = player.position;
    jcmp.console.print(`new Vector3f(${pos.x}, ${pos.y}, ${pos.z});`);
});


jcmp.events.AddRemoteCallable('DebugRotation', function(player) {
    let pos = player.rotation;
    jcmp.console.print(`new Vector3f(${pos.x}, ${pos.y}, ${pos.z});`);
});


jcmp.events.Add('PlayerValueChangeSave', function(player, index, value) {
	// Update Data
	if (index == "maxExperience" || index == "color" || index == "working")
		return;

	if (index == "position")
		value = jcmp.utils.vector3.stringify(value);

	jcmp.SQL.execute(
		"UPDATE Player SET " + index + " = ? WHERE id = ?",
		[value, player.client.steamId]
	);
});


jcmp.events.Add('PlayerValuesChangeSave', function(player, values) {
    let query = "UPDATE Player SET ";
    for (let index in values) {

        let value = values[index];
        if (index == "maxExperience" || index == "color" || index == "working")
            return;

        if (index == "position")
            value = jcmp.utils.vector3.stringify(value);

        query += index + " = '" + value + "', ";
    }

    query = query.slice(0, -2);
    query += " WHERE id = '" + player.client.steamId + "'";

	jcmp.SQL.execute(query);
});


jcmp.events.Add('PlayerDestroyed', function(player) {
    jcmp.console.print("[SERVER] destroying " + player.nname || player.name);
	for (let p = jcmp.loggedPlayers.length - 1; p >= 0; p--) {
		if (jcmp.loggedPlayers[p].client.steamId == player.client.steamId) {
			jcmp.loggedPlayers.splice(p, 1);
			jcmp.console.print("[SERVER] destroyed " + player.nname);
		}
	}

    if (!jcmp.utils.validatePlayer(player) || !player.loaded)
        return;

	if (!player.racing && !player.testingDriving) {
		jcmp.SQL.execute(
			"UPDATE Player SET ? WHERE id = ?",
			[
				{
					position: jcmp.utils.vector3.stringify(player.position),
					ipAddress: player.client.ipAddress,
					health: player.health,
					lastJoin: jcmp.utils.getDate("fullwtime"),
				},
				player.client.steamId
			]
		);
    }
    
	jcmp.console.print("[SERVER] disconnecting " + player.nname);
    disconnectingPlayers[player.client.steamId] = {
        idPlayer: player.client.steamId,
        joinedTime: player.joinedTime,
        exitTime: jcmp.utils.getDate(),
        state: player.racing ? "RACING" : (player.testingDriving ? "TESTDRIVING" : (player.working != false ? "WORKING" : "IDLE")),
        arrested: player.arrested,
        handcuffed: player.handcuffed,
    },

    jcmp.events.Call("PlayerDestroyedAfter", player);
	jcmp.events.CallRemote("PlayerDisconnected", null, player.networkId);
});


jcmp.events.Add('ClientDisconnected', (client, reason) => {
    jcmp.console.print("[SERVER] (" + client.steamId + ") " + client.name + " disconnected the server (" + reason + ")");
    
    if (disconnectingPlayers[client.steamId]) {
        disconnectingPlayers[client.steamId].quitReason = reason;
        jcmp.SQL.execute(
            "INSERT INTO LogPlayerSession SET ?",
            disconnectingPlayers[client.steamId]
        );
        delete disconnectingPlayers[client.steamId];
    }
});


jcmp.events.AddRemoteCallable("PlayerLoaded", function(player) {
    console.log("loaded " + player.name);
    jcmp.SQL.query(
        `SELECT banned FROM Player WHERE id = ?`,
        player.client.steamId,
        function (results) {
            console.log("floaded1");
            if (results.length == 0) {
                jcmp.SQL.query(
                    "INSERT INTO Player SET ?",
                    {
                        id: player.client.steamId, 
                        ipAddress: player.client.ipAddress, 
                        joinDate: jcmp.utils.getDate("fullwtime"),
                    },
                    function(x) {
                        console.log("floaded2");
                        UpdatePlayer(player, true);
                    },
                    player
                );

            } else {
                if (results[0].banned) {
                    jcmp.console.print(player.client.name + " foi kickado por estar banido.");
                    player.client.Kick("Fuck you.");
                } else {
                    UpdatePlayer(player, false);
                }
            }
        },
        player
    );    

});


function UpdatePlayer(player, firstTime) {
    console.log("updating player");
	jcmp.SQL.query(
		`SELECT
			nname,
			idJob,
			Job.spawnPosition AS 'jobSpawnPosition',
			position AS 'position',
			money,
			moneyBank,
			Player.level,
			experience,
			fuel,
			permissions,
			licenseCar,
			licenseBike,
			licenseHeli,
			licensePlane,
			licenseSea,
			lifeInsurance,
			healthInsurance,
			weaponCarryPermit,
			hungry,
			thirsty,
			color,
			language,
			health,
			playedTime,
			handcuffed,
			arrested,
			catchedCount,
			hasParachute,
			hasWingsuit,
			spawnAtHouse,
			wingsuitLevel,
			lastRadio,
			country,
			statsStealth,
			statsStamina,
			statsDriving,
			statsFlying,
			statsLungCapacity,
			statsStrength,
			cooldownJobChange,
            soundtrackVolume,
            collectibles,
            joinDate,
			personalVehicleActive,
			hasRadioFalloutNewVegas,
			discordId,
			magneticDetectorLevel
		FROM Player
		LEFT JOIN Job ON Player.idJob = Job.id
		WHERE Player.id = ?`,
		player.client.steamId,
		function (results) {
            jcmp.events.Call("CreatePlayer", player);

			let values = results[0];

			if (!values.spawnAtHouse) {
				if (values.level <= 5 && values.jobSpawnPosition && values.health > 0) {
					player.position = jcmp.utils.vector3.parse(values.jobSpawnPosition);
				} else if (values.position) {
					player.position = jcmp.utils.vector3.parse(values.position);
				}
			}

			let newPlayer = false;
			if (!values.nname) {
				newPlayer = true;
				values.nname = player.name;
			}

			player.toHealth = values.health;
            player.joinedTime = jcmp.utils.getDate();
            
			// blacklist
			delete values.jobSpawnPosition;
			delete values.position;
			delete values.health;

			values.steamId = player.client.steamId;
			values.maxExperience = (values.level - 1) * 200 + 1000;

			values.badges = {};

            if (jcmp.tycoon[0].idPlayer == player.client.steamId)
				values.badges["BADGE_TYCOON"] = true;

            if (values.playedTime >= 30000)
				values.badges["BADGE_500_SERVICE"] = true;
            else if (values.playedTime >= 15000)
				values.badges["BADGE_250_SERVICE"] = true;
            else if (values.playedTime >= 6000)
				values.badges["BADGE_100_SERVICE"] = true;
            else if (values.playedTime >= 3000)
				values.badges["BADGE_50_SERVICE"] = true;
            else if (values.playedTime >= 1500)
				values.badges["BADGE_25_SERVICE"] = true;
            else if (values.playedTime >= 600)
				values.badges["BADGE_10_SERVICE"] = true;

			if (!values.arrested)
				player.toUpdateWeapons = true;

			if (!values.country)
				jcmp.events.Call("UpdatePlayerFlag", player, firstTime);

			values.tags = [];
			
			switch(values.permissions) {
				case 5:
					values.tags.push({name: "Helper*", color: "#2ECC71"});
					break;

				case 4:
					values.tags.push({name: "Admin", color: "#E67E22"});
					break;

				case 3:
					values.tags.push({name: "Mod", color: "#3498DB"});
					break;

				case 2:
					values.tags.push({name: "Helper", color: "#2ECC71"});
					break;
			}
			
			// Discord
			if (values.discordId) {
				if (jcmp.discord.guild) {
					player.guildMember = jcmp.discord.guild.members.get(values.discordId);
					if (player.guildMember) {
						player.guildMember.setNickname(values.nname);
						values.badges["BADGE_DISCORD"] = true;
						player.createValue("discordAvatar", player.guildMember.user.avatarURL);
					}
				}
			} else {
				values.discordCode = (values.nname.slice(0, 4).toUpperCase() + player.client.steamId.slice(-4)).replace(" ", "_");
			}

			player.createValues(values);
			
			jcmp.events.CallRemote('chat2/store_name', player, player.nname);
			jcmp.events.CallRemote('chat2/AddPlayer', null, player.networkId, player.nname);

			jcmp.events.CallRemote("LocalPlayerLoadedData", player, firstTime, newPlayer);

			jcmp.SQL.query(
				`SELECT
					idSite,
					position
				FROM House INNER JOIN Site ON House.idSite = Site.id
				WHERE idOwner = ?`,
				player.client.steamId,
				function(houseResults) {

					if (houseResults.length > 0) {
						player.createValue("house", houseResults[0].idSite);
						
						if (player.spawnAtHouse)
							player.position = jcmp.utils.vector3.parse(houseResults[0].position);
                    }
                    
                    jcmp.SQL.query(
                        `SELECT 
                            id,
                            idWantedStarType,
                            isSuspect
                        FROM WantedStar
                        WHERE idPlayer = ?`,
                        [player.client.steamId],
                        function (wantedStars) {

                            player.createValue("wantedStars", wantedStars);

                            jcmp.SQL.query(
                                `SELECT 
                                    description,
                                    value,
                                    occurrenceDate
                                FROM BankStatement
                                WHERE idPlayer = ?
                                ORDER BY occurrenceDate DESC
                                LIMIT 10`,
                                [player.client.steamId],
                                function (bankStatements) {
    
                                    player.createValue("bankStatements", bankStatements);

                                    jcmp.SQL.query(
                                        `SELECT 
                                            idJob,
                                            level,
                                            experience
                                        FROM JobLevel
                                        WHERE idPlayer = ?`,
                                        [player.client.steamId],
                                        function (jobLevels) {
                                            
                                            let data = {};
                                            for (let r in jobLevels) {
                                                data[jobLevels[r].idJob] = {
                                                    level: jobLevels[r].level,
                                                    experience: jobLevels[r].experience,
                                                    maxExperience: (jobLevels[r].level - 1) * 100 + 500,
                                                };
                                            }
                                            
                                            player.createValue("jobLevels", data);

                                            if (!firstTime) {
                                                const playerData = GetData(player);
                                                jcmp.events.CallRemote("PlayerCreated", null, JSON.stringify(playerData), firstTime);
                                
                                                let log = "[SERVER] " + player.nname + " entered the server";
                                                jcmp.console.print(log);
                                                jcmp.discordOld.print(log);
											}
											
                                            // implementar loaded progressivo
                                            player.createValue("loaded", true);
                                            UpdatePlayersData(player, true);
                                            jcmp.events.Call("PlayerLoaded", player);                            
                                        },
                                        player
                                    );     
                                },
                                player
                            );                    
                        },
                        player
                    );
				},
                player
			);            
        },
        player
	);
}


jcmp.events.AddRemoteCallable("NewPlayer", function(player) {
	const playerData = GetData(player);
	jcmp.events.CallRemote("PlayerCreated", null, JSON.stringify(playerData), true);

	let log = "[SERVER] " + player.nname + " entered the server for the first time";
	jcmp.console.print(log);
	jcmp.discordOld.print(log);
});


function UpdatePlayersPing() {
	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
		if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

        jcmp.loggedPlayers[p].createValue("ping", jcmp.loggedPlayers[p].client.ping);
    }
}


function UpdatePlayersData(player, updatePlayers) {

    let playersData = false;

    if (updatePlayers) {
        playersData = {};
            
        for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
            if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
                continue;

            playersData[jcmp.loggedPlayers[p].networkId] = GetData(jcmp.loggedPlayers[p]);
        }
        playersData = JSON.stringify(playersData);
    }

	jcmp.events.CallRemote("UpdatePlayersData", player ? player : null,
		playersData,
		jcmp.money,
		jcmp.govBavarium,
		jcmp.rebelsBavarium,
		jcmp.govDomination,
		jcmp.rebelsDomination,
		jcmp.oldMoney,
		jcmp.fuelValue,
		jcmp.bavariumValue,
		jcmp.totalPlayers
	);
}


function GetData(player) {
	return {
        networkId: player.networkId,
        steamId: player.client.steamId,
		name: player.nname,
		color: player.color,
        idJob: player.idJob,
        jobLevel: player.getJobLevel(),
		permissions: player.permissions,
		level: player.level,
		vip: player.vip,
		ping: player.client.ping,
        country: player.country,
        tags: player.tags,
        wantedStars: player.wantedStars,
		badges: player.badges,
		discordAvatar: player.discordAvatar,
	};
}


jcmp.events.AddRemoteCallable('ClientError', function(player, array) {
	jcmp.console.print("[CLIENT-ERROR]");
	array = JSON.parse(array);
	jcmp.console.print(player.nname + ": " + array.file + ": " + array.line + ". Error: " + array.err + " - " + array.trace);
});


jcmp.events.AddRemoteCallable('Pay', function(player, playerToSendId, amount) {
	let playerToSend = jcmp.utils.player.getById(playerToSendId);
	if (!playerToSend) {
		jcmp.events.CallRemote("PlayerNotFound", player);
		return;
	}

	let totalValue = Math.ceil(amount + amount * 0.1);
	if (player.money < totalValue)
		return;

	player.setValue("money", player.money - totalValue);
	playerToSend.setValue("money", playerToSend.money + amount);
	jcmp.events.CallRemote("ReceivedPay", playerToSend, amount, player.nname);

	jcmp.console.print("[SERVER] " + player.nname + " sent $" + amount + " to " + playerToSend.nname);
});


jcmp.events.AddRemoteCallable('GameTeleportCompleted', function(player) {
	if (player.toHealth) {
		player.health = player.toHealth;
		player.toHealth = null;
	}

	if (player.toUpdateWeapons) {
		jcmp.events.Call("UpdatePlayerWeapons", player);
		player.toUpdateWeapons = null;
	}
});


jcmp.events.AddRemoteCallable('Unstuck', function(player) {
	let position = player.position;
	position.y += 2;
	player.position = position;

	jcmp.console.print("[SERVER] " + player.nname + " used /unstuck");
});


jcmp.events.AddRemoteCallable('SetSeat', function(player, seat) {
	if (typeof player.vehicle === 'undefined') return;
	player.vehicle.SetOccupant(seat, player);
});


jcmp.events.AddRemoteCallable('Teleport', function(player, position) {
	player.position = jcmp.utils.vector3.parse(position);
});


jcmp.events.AddRemoteCallable('TeleportPlayer', function(player, networkId) {
	let p = jcmp.utils.player.getById(networkId);
	if (!p) return;
	player.position = p.position;
});


jcmp.events.AddRemoteCallable('BringPlayer', function(player, networkId) {
	let p = jcmp.utils.player.getById(networkId);
	if (!p) return;
	p.position = player.position;
});


jcmp.events.AddRemoteCallable('SaveAttribute', function(player, atribute, value) {
	player.saveValue(atribute, value);
});


jcmp.events.AddRemoteCallable('SaveAttributes', function(player, values) {
	player.saveValues(JSON.parse(values));
});


jcmp.events.AddRemoteCallable('SetAttribute', function(player, playerId, atribute, value) {
	let p = jcmp.utils.player.getById(playerId);
	p.setValue(atribute, value);
});


jcmp.events.AddRemoteCallable('KickPlayer', function(player, playerToKick) {
	jcmp.console.print(playerToKick);
	let kicked = jcmp.utils.player.getById(playerToKick);
	if (!kicked) {
		jcmp.notifications.send(player, "", "Player does not exist", false, "cancel", "cancel");
	}
	kicked.Kick("kicked by moderation");
	jcmp.notifications.send(player, "", "The Player has been kicked", false, "player");
});


jcmp.events.AddRemoteCallable('CreateAttribute', function(player, atribute, value) {
	player.createValue(atribute, value);
});


jcmp.server.AddInputHandler(function (msg) {

	let args = msg.match(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')|(\S+)/g) || [];

	for (var i = 1; i < args.length; i++) {
		if(args[i].substr(0, 1) === '"' || args[i].substr(0,1) === "'")
			args[i] = JSON.parse(args[i]);
	}

	let commandName = args[0];
	args.splice(0, 1);

	let txt = args.join(" ");
	switch (commandName) {
		case "kick":
			let player = jcmp.utils.player.getById(args[0]);
			if (!player) {
				jcmp.console.print("Player does not exist");
				break;
			}
            player.Kick("kicked by console");
            return true;
			break;

		case "kickall":
			break;

		case "say":
			jcmp.chat.broadcast("[#e67e22][CONSOLE] " + txt);
            jcmp.console.print("[CONSOLE] " + txt);
            return true;
			break;
		
		case "message":
			jcmp.discordOld.print(`**${txt}**`);
			jcmp.chat.broadcast("[#e67e22][CONSOLE] " + txt);
            jcmp.console.print("[CONSOLE] " + txt);
			return true;
			break;

		case "close":
			break;
	}
	return false;

});


// function UpdateBans() {
// 	// Load from database all Bans
// 	jcmp.SQL.execute("UPDATE Ban SET time = time - 1");

// }


jcmp.events.Add("ServerLoaded", function() {
	jcmp.SQL.query(
		"SELECT * FROM Roleplay",
		null,
		function (rows) {
			jcmp.money = rows[0].money;
			jcmp.oldMoney = rows[0].money;
			jcmp.newspaper.headline = rows[0].newspaperHeadline,
			jcmp.newspaper.subheadline = rows[0].newspaperSubheadline,
			UpdateRoleplayValue();
		}
	);

	jcmp.SQL.query(
		"SELECT COUNT(1) AS 'count' FROM Player",
		null,
		function (rows) {
			jcmp.totalPlayers = rows[0].count;
		}
    );

	jcmp.events.Call("LoadChangelog");
    LoadTycoon();
});


function LoadTycoon() {
    jcmp.tycoon = [];
	jcmp.SQL.query(
		`SELECT
			money + moneyBank AS 'money',
            nname,
            id
		FROM Player
		ORDER BY (money + moneyBank) DESC
		LIMIT 5`,
		null,
		function (results) {
			for (let k in results) {
                jcmp.tycoon.push({
                    name: results[k].nname,
                    money: results[k].money,
                    idPlayer: results[k].id,
                });
            }
		}
	);
}


jcmp.events.Add('SetPlayerMoney', function (player, money) {
	player.setValue("money", player.money + money);
	jcmp.events.Call("SetRoleplayValue", "money", jcmp.money - money);
});


jcmp.events.Add('SetPlayerMoneyBank', function (player, money, description) {
	player.setValue("moneyBank", player.moneyBank + money);
    jcmp.events.Call("SetRoleplayValue", "money", jcmp.money + money);

	jcmp.SQL.execute(
		"INSERT INTO BankStatement SET ?",
		{
            idPlayer: player.client.steamId,
            description: description,
            value: money,
            occurrenceDate: jcmp.utils.getDate(),
        }
    );

    let bankStatements = player.bankStatements;
    bankStatements.unshift({
        description: description,
        value: money,
        occurrenceDate: jcmp.utils.getDate(),
    });

    if (bankStatements.length > 10)
        bankStatements.pop();

    player.createValue("bankStatements", bankStatements);
});


jcmp.events.Add('SetPlayerOfflineMoneyBank', function (idPlayer, money, description) {
	jcmp.events.Call("SetRoleplayValue", "money", jcmp.money + money);

	let player = jcmp.utils.player.getById(idPlayer);

	if (player) {
		player.setValue("moneyBank", player.moneyBank + money);
	} else {
		jcmp.SQL.execute(
			"UPDATE Player SET moneyBank = moneyBank + ? WHERE id = ?",
			[
				money,
				idPlayer
			]
		);
	}
	
	jcmp.SQL.execute(
		"INSERT INTO BankStatement SET ?",
		{
            idPlayer: idPlayer,
            description: description,
            value: money,
            occurrenceDate: jcmp.utils.getDate(),
        }
    );
});


jcmp.events.Add('SetRoleplayValue', function (index, value) {
	jcmp[index] = value;
	jcmp.SQL.execute(
		"UPDATE Roleplay SET " + index + " = ?",
		[value]
	);
});


jcmp.events.AddRemoteCallable("PlayerEnterSite", function(player, idSiteType, idSite) {
    if (idSiteType !== 13)
        return;
    
    let busDrivers = 0;
    for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

        let player = jcmp.loggedPlayers[p];
        if (player.idJob == 11 && player.working != false)
            busDrivers++;
    }

	jcmp.notifications.send(player, "SITE_NAME_13", ("BUS_STOP_WORKING_NOW" + (busDrivers !== 1 ? "_P" : "")), [busDrivers], "bus");
});


var lastIpsConnected = {};

jcmp.events.Add("ClientConnectRequest", function(playerName, ipAddress) {
    console.log("request: " + ipAddress);
    if (lastIpsConnected[ipAddress]) {
		console.log("desconectando lastIps");
		return false;
	}

    lastIpsConnected[ipAddress] = true;
});


setInterval(function() {
    lastIpsConnected = {};
}, 5000);

jcmp.events.Call("ServerLoaded");