
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

jcmp.prisonPosition = new Vector3f(8329, 1085, 4744);


jcmp.events.Add("PlayerValueChange", function(player, index, value) {
	if (index != "arrested")
		return;
	
	if (value <= 0)
		return;

	player.weapons.forEach(function(weapon){
		player.RemoveWeapon(weapon.modelHash);
	});
});


jcmp.events.AddRemoteCallable("FreedomFromPrison", function(player) {
	player.setValue("arrested", 0);
	player.position = new Vector3f(8327, 1075, 4772);
	jcmp.events.Call("UpdatePlayerWeapons", player);
});


jcmp.events.AddRemoteCallable("FledFromPrison", function(player) {
	if (player.health <= 0)
		return;
	
	player.position = jcmp.prisonPosition;
});


jcmp.events.AddRemoteCallable("Call911", function(player, stealerNetworkId, idWantedStarType, isSuspect) {
	
	let stealer = jcmp.utils.player.getById(stealerNetworkId);
	if (!stealer) {
		jcmp.events.CallRemote("PlayerNotFound", player);
		return;
	}
	
	AddWantedStar(stealer, idWantedStarType, isSuspect);
});


function AddWantedStar(player, idWantedStarType, isSuspect) {
	
	let wantedStarData = jcmp.wantedStarsData[idWantedStarType];
	if (!wantedStarData) {
		jcmp.console.print("WantedStar does not exists: " + player.nname + ": " + idWantedStarType);
		return;
	}
    
	for (let i = 0; i < player.wantedStars.length; i++) {
		if (player.wantedStars[i].idWantedStarType == idWantedStarType) {
			if (wantedStarData.unique) {
				jcmp.console.print("Unique WantedStar already exists: " + player.nname + ": " + idWantedStarType);
				return;				
			}
			
			if (player.wantedStars[i].isSuspect && !isSuspect) {
				RemoveWantedStar(player, idWantedStar);
			}
		}
	}

	// whitelist
	if ([2, 4, 5, 7, 8, 9].indexOf(idWantedStarType) != -1) {

        let locationName = false;
        if (player.sites[10] && jcmp.sites[player.sites[10]])
            locationName = jcmp.sites[player.sites[10]].name;

        if (!locationName)
            locationName = false;

        for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
            if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
                continue;

			if (jcmp.loggedPlayers[p].idJob == 7) {
 
				jcmp.events.CallRemote("Call911", jcmp.loggedPlayers[p], player.nname, idWantedStarType, isSuspect, locationName, jcmp.utils.vector3.stringify(player.position.add(new Vector3f(0, 1, 0))));
			}
		}
	}
	
	jcmp.SQL.query(
		"INSERT INTO WantedStar SET ?",
		{idPlayer: player.client.steamId, idWantedStarType: idWantedStarType, isSuspect: isSuspect},
		function(results) {
            let wantedStars = player.wantedStars;
            wantedStars.push({id: results.insertId, idWantedStarType: idWantedStarType, isSuspect: isSuspect});
            player.createValue("wantedStars", wantedStars);

            jcmp.events.CallRemote("AddedWantedStar", player, idWantedStarType, isSuspect);		
        },
        player
	);
}


function RemoveWantedStar(player, idWantedStar) {

    let indexWantedStar = getWantedStarIndex(player, idWantedStar);
	if (indexWantedStar === false) {
		jcmp.console.print("WantedStar not found: " + player.nname + ": " + idWantedStar);
		return;
    }
    
    let wantedStar = player.wantedStars[indexWantedStar];

	jcmp.SQL.query(
		"DELETE FROM WantedStar WHERE id = ? AND idPlayer = ?",
		[idWantedStar, player.client.steamId],
		function(results) {
            let wantedStars = player.wantedStars;
            wantedStars.splice(indexWantedStar, 1);
            player.createValue("wantedStars", wantedStars);

			jcmp.events.CallRemote("RemovedWantedStar", player, wantedStar.idWantedStarType, wantedStar.isSuspect);
        },
        player
	);
}


function getWantedStarIndex(player, idWantedStar) {
    for (let i = 0; i < player.wantedStars.length; i++) {
        if (player.wantedStars[i].id == idWantedStar)
            return i;
    }
    return false;
}


jcmp.events.AddRemoteCallable('RemoveWantedStar', function(player, idWantedStar) {
	RemoveWantedStar(player, idWantedStar);
});


jcmp.events.AddRemoteCallable('AddWantedStar', function(player, idWantedStar) {
	AddWantedStar(player, idWantedStar, false);
});


jcmp.events.Add('AddWantedStar', function(player, idWantedStar, isSuspect) {
	AddWantedStar(player, idWantedStar, isSuspect);
});

// 3 = tiro/explosao, 0 = afogado, 4 = impacto
jcmp.events.Add('PlayerDeath', function(player, killer, reason) {
	if (!player.loaded)
		return;

	if (killer && killer.client.steamId != player.client.steamId) {
		if (!player.sites[11] && !killer.sites[11]) {
			if (killer.idJob == 7) {
				
				let arrestedPrice = jcmp.events.Call("Arrest", player)[0];
				if (arrestedPrice && arrestedPrice > 0) {

					let payment = Math.floor(arrestedPrice * 0.15);

					jcmp.events.Call("JobDone", killer, Math.floor(payment / 2), payment);
					
					jcmp.notifications.send(player, "POLICE_ARRESTED", "POLICE_ARRESTED_BY", [killer.nname], "jail");
					jcmp.notifications.send(killer, "SITE_NAME_6", "POLICE_ARRESTED_PLAYER", [player.nname, Math.floor(payment / 2), payment], "jail");

					player.respawnPosition = player.position;
				} else {
					AddWantedStar(killer, 2, false);
				}
			} else {
				AddWantedStar(killer, 2, false);
			}
		}
		
	}
	jcmp.events.Call("PlayerDeathAfter", player, killer, reason);
});