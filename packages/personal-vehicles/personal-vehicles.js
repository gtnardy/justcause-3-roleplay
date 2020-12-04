'use strict';

const priceVehicleInsurance = 150;
const dealerships = {
    [20]: {
        street: {
            position: new Vector3f(13041.3408203125, 1028.384033203125, 8224.37890625),
            rotation: new Vector3f(-0.005191586911678314, -0.9886892437934875, 0.0003051490639336407),
        },
    },
    [21]: {
        street: {
            position: new Vector3f(9635.724609375, 1043.83154296875, 8896.1640625),
            rotation: new Vector3f(-0.004238071385771036, -2.3572163581848145, -0.0002364483952987939),
        },
    },
    [22]: {
        street: {
            position: new Vector3f(11563.5966796875, 1265.748291015625, 7563.5966796875),
            rotation: new Vector3f(0.009447786025702953, -0.31301891803741455, -0.0006340972031466663),
        },
    },
}

function SetVehicleAttributes(player, vehicle, health, primaryColor, turboJumpEnabled, nitroEnabled) {
    
    vehicle.health = health;
    vehicle.primaryColor = primaryColor;
    vehicle.turboJumpEnabled = turboJumpEnabled;
    vehicle.nitroEnabled = nitroEnabled;
    
    if (player.timeouts["PERSONALVEHICLE_SPAWN1"])
        clearTimeout(player.timeouts["PERSONALVEHICLE_SPAWN1"]);

    if (player.timeouts["PERSONALVEHICLE_SPAWN2"])
        clearTimeout(player.timeouts["PERSONALVEHICLE_SPAWN2"]);

    if (player.timeouts["PERSONALVEHICLE_SPAWN3"])
        clearTimeout(player.timeouts["PERSONALVEHICLE_SPAWN3"]);

    player.timeouts["PERSONALVEHICLE_SPAWN1"] = setTimeout(function(v, h, pc, tje, ne) {
        v.health = h;
        v.primaryColor = pc;
        v.turboJumpEnabled = tje;
        v.nitroEnabled = ne;

        delete player.timeouts["PERSONALVEHICLE_SPAWN1"];
    }, 2000, vehicle, health, primaryColor, turboJumpEnabled, nitroEnabled);

    player.timeouts["PERSONALVEHICLE_SPAWN2"] = setTimeout(function(v, h, pc, tje, ne) {
        v.health = h;
        v.primaryColor = pc;
        v.turboJumpEnabled = tje;
        v.nitroEnabled = ne;

        delete player.timeouts["PERSONALVEHICLE_SPAWN2"];
    }, 5000, vehicle, health, primaryColor, turboJumpEnabled, nitroEnabled);

    player.timeouts["PERSONALVEHICLE_SPAWN3"] = setTimeout(function(v, h, pc, tje, ne) {
        v.health = h;
        v.primaryColor = pc;
        v.turboJumpEnabled = tje;
        v.nitroEnabled = ne;

        delete player.timeouts["PERSONALVEHICLE_SPAWN3"];
    }, 10000, vehicle, health, primaryColor, turboJumpEnabled, nitroEnabled);
}


function LoadVehicle(player) {
    if (typeof player.personalVehicle !== "undefined") {
        jcmp.events.CallRemote("PlayerVehicleDestroyed", null, player.networkId);
        player.personalVehicle.personal = false;
        player.personalVehicle.Destroy();
        player.personalVehicle = false;
    }

    jcmp.SQL.query(
        `SELECT 
            PlayerVehicle.*
        FROM PlayerVehicle
        WHERE PlayerVehicle.idPlayer = ?
        AND id = ?`,
        [
            player.client.steamId,
            player.personalVehicleActive
        ],
        function (playerVehicle) {
            if (playerVehicle.length == 0)
                return;
            
            playerVehicle = playerVehicle[0];

            let vehicle = new Vehicle(Number(playerVehicle.modelHash), jcmp.utils.vector3.parse(playerVehicle.position), jcmp.utils.vector3.parse(playerVehicle.rotation));

            SetVehicleAttributes(player, vehicle, Number(playerVehicle.health), Number(playerVehicle.primaryColor), Number(playerVehicle.turboJumpEnabled) ? true : false, Number(playerVehicle.nitroEnabled) ? true : false);

            player.personalVehicle = vehicle;
            
            let vehicleData = {
                networkId: vehicle.networkId,
                plate: playerVehicle.plate,
                locked: playerVehicle.locked,
            };

            jcmp.events.CallRemote("PlayerVehicleCreated", null, JSON.stringify({
                id: playerVehicle.id,
                owner: {
                    id: player.networkId,
                    name: player.nname,
                },
                vehicle: vehicleData,
            }));
            
            vehicle.personal = vehicleData;
            vehicle.personal.owner = player;
            vehicle.personal.id = playerVehicle.id;
        },
        player
    );
}


jcmp.events.Add('VehicleExploded', function(vehicle) {
    if (!vehicle.personal)
        return;

    jcmp.notifications.send(vehicle.personal.owner, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_EXPLODED", false, "car-key", "notification");
    jcmp.events.Call("UpdateVehicleData", vehicle, "health", 0);
});


jcmp.events.AddRemoteCallable('PersonalVehicleGetPOI', function(player) {
    if (!player.personalVehicle) {
        jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_UNABLE_LOCATE", false, "cancel", "cancel");
        return;
    }

    jcmp.events.CallRemote('PersonalVehicleSetPOI', player, jcmp.utils.vector3.stringify(player.personalVehicle.position));
});


jcmp.events.AddRemoteCallable('SwitchLockPersonalVehicle', function(player) {
    if (typeof player.personalVehicle === "undefined")
        return;

    jcmp.events.Call("UpdateVehicleData", player.personalVehicle, "locked", !player.personalVehicle.personal.locked);
});


jcmp.events.AddRemoteCallable('TriggerVehicleInsurance', function(player, idPersonalVehicle, respawn) {
    if (typeof player.personalVehicle === "undefined")
        return;

    if (player.money < priceVehicleInsurance)
		return;
	
    jcmp.events.Call('SetPlayerMoney', player, -priceVehicleInsurance);
    
    jcmp.SQL.query(
        `UPDATE PlayerVehicle SET health = 10000, position = ?, rotation = ? WHERE id = ? AND idPlayer = ?`,
        [
            jcmp.houses[player.house].garagePosition,
            jcmp.houses[player.house].garageRotation,
            idPersonalVehicle,
            player.client.steamId
        ],
        function (r) {
            if (respawn) {
                LoadVehicle(player);
                jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_INSURANCE_TRIGGERED", false, "car-key", "notification");
            }
        },
        player
    );
});

  
jcmp.events.AddRemoteCallable('SwitchPersonalVehicle', function(player, idPersonalVehicle) {
    player.setValue("personalVehicleActive", idPersonalVehicle);

    jcmp.SQL.query(
        `UPDATE PlayerVehicle SET position = ?, rotation = ? WHERE id = ? AND idPlayer = ?`,
        [
            jcmp.houses[player.house].garagePosition,
            jcmp.houses[player.house].garageRotation,
            idPersonalVehicle,
            player.client.steamId
        ],
        function (r) {
            LoadVehicle(player);
            jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_SWITCHED", false, "car-key", "notification");
        },
        player
    );

});


jcmp.events.AddRemoteCallable('SellVehicle', function(player) {
    if (!player.personalVehicle)
        return;   
        
    if (!player.vehicle || player.vehicle.networkId != player.personalVehicle.networkId)
        return;

    jcmp.SQL.query(
        `DELETE FROM PlayerVehicle WHERE id = ? AND idPlayer = ?`,
        [
            player.personalVehicleActive,
            player.client.steamId
        ],
        function (result) {
            let price = Math.floor(jcmp.vehiclesData[player.personalVehicle.modelHash].price * 0.75);

            jcmp.events.Call("SetPlayerMoney", player, price);

            player.setValue("personalVehicleActive", null);
            
            LoadVehicle(player);

            jcmp.notifications.send(player, "SITE_NAME_12", "PAYNSPRAY_VEHICLESOLD", [price], "car", "coins");
        },
        player
    );
});


jcmp.events.AddRemoteCallable('BuyDealership', function(player, modelHash, idSite) {
    if (player.money < jcmp.vehiclesData[modelHash].price)
        return;
        
    if (!player.house) {
        jcmp.notifications.send(player, "DEALERSHIP_LABEL", "DEALERSHIP_DONT_HAVE_HOUSE", false, "cancel", "cancel");
        return;
    }
    
    let house = jcmp.houses[player.house];

    jcmp.SQL.query(
        `SELECT COUNT(1) AS 'count' FROM PlayerVehicle WHERE idPlayer = ?`,
        player.client.steamId,
        function (result) {
            if (result[0].count >= house.garageSlots) {
                jcmp.notifications.send(player, "DEALERSHIP_LABEL", "DEALERSHIP_DONT_HAVE_ENOUGH_GARAGE_SLOT", false, "cancel", "cancel");
                return;
            }

            let dealership = dealerships[idSite];
            
            jcmp.SQL.query(
                `INSERT INTO PlayerVehicle SET ?`,
                {
                    idPlayer: player.client.steamId,
                    modelHash: modelHash,
                    position: jcmp.utils.vector3.stringify(dealership.street.position),
                    rotation: jcmp.utils.vector3.stringify(dealership.street.rotation),
                    plate: player.nname + "'s Vehicle",
                },
                function (result) {
                    jcmp.events.Call("SetPlayerMoney", player, -jcmp.vehiclesData[modelHash].price);
                    player.setValue("personalVehicleActive", result.insertId);
                    LoadVehicle(player);
                    jcmp.notifications.send(player, "DEALERSHIP_LABEL", "DEALERSHIP_PURCHASED_IT", [jcmp.vehiclesData[modelHash].name], "car-key", "coins");
                },
                player
            );
        },
        player
    );
});


jcmp.events.AddRemoteCallable('LoadGarage', function(player) {
    jcmp.SQL.query(
        `SELECT 
            id,
            plate,
            modelHash,
            nitroEnabled,
            turboJumpEnabled,
            locked,
            health
        FROM PlayerVehicle
        WHERE PlayerVehicle.idPlayer = ?`,
        [player.client.steamId],
        function (playerVehicles) {
            jcmp.events.CallRemote("LoadGarage", player, JSON.stringify(playerVehicles));                    
        },
        player
    );
});


jcmp.events.Add('UpdateVehicleData', function(vehicle, attribute, value) {
    if (typeof vehicle === "undefined")
        return;

    if (!vehicle.personal)
        return;

    jcmp.SQL.execute("UPDATE PlayerVehicle SET ? WHERE id = ?",
    [
        {[attribute]: value},
        vehicle.personal.id,
    ]);

    vehicle.personal[attribute] = value;

    jcmp.events.CallRemote("PlayerVehicleUpdated", null, vehicle.personal.owner.networkId, attribute, value);    
});


jcmp.events.Add('PlayerDestroyedAfter', function(player) {
    if (!player.personalVehicle)
        return;
        
    jcmp.SQL.execute("UPDATE PlayerVehicle SET ? WHERE idPlayer = ? AND id = ?",
    [
        {
            position: jcmp.utils.vector3.stringify(player.personalVehicle.position),
            rotation: jcmp.utils.vector3.stringify(player.personalVehicle.rotation),
            health: player.personalVehicle.destroyed ? 0 : player.personalVehicle.health,
        },
        player.client.steamId,
        player.personalVehicleActive,
    ]);

    jcmp.events.CallRemote("PlayerVehicleDestroyed", null, player.networkId);

    player.personalVehicle.position = new Vector3f(-12550, 1800, -12200);
    player.personalVehicle.personal = false;
    player.personalVehicle.Destroy();
    player.personalVehicle = false;
});


jcmp.events.Add("PlayerLoaded", function(player) {
    let playerVehicles = [];

    for (let p = jcmp.loggedPlayers.length - 1; p >= 0; p--) {
        if (jcmp.loggedPlayers[p].personalVehicle) {
            playerVehicles.push({
                id: jcmp.loggedPlayers[p].personalVehicle.personal.id,
                owner: {
                    id: jcmp.loggedPlayers[p].networkId,
                    name: jcmp.loggedPlayers[p].nname,
                },
                vehicle: {
                    networkId: jcmp.loggedPlayers[p].personalVehicle.networkId,
                    plate: jcmp.loggedPlayers[p].personalVehicle.personal.plate,
                    locked: jcmp.loggedPlayers[p].personalVehicle.personal.locked,
                }
            });
        }
    }

    jcmp.events.CallRemote("LoadPlayerVehicles", player, JSON.stringify(playerVehicles));

    player.timeouts["PERSONALVEHICLE_PLAYERLOADED"] = setTimeout(function(p) {
        LoadVehicle(p);
        delete player.timeouts["PERSONALVEHICLE_PLAYERLOADED"];
    }, 10000, player);
});