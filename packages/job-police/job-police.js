'use strict';

const hashes = {};
hashes["terrorism"] = 7;
hashes["attemptedmurder"] = 8;


jcmp.events.AddRemoteCallable("Suspect", function(police, suspectedNetworkId, type) {
	let suspected = jcmp.utils.player.getById(suspectedNetworkId);
	if (!suspected) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, suspected.position) > 7) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}

	for (let key in suspected.wantedStars) {
		if (suspected.wantedStars[key].isSuspect && suspected.wantedStars[key].idWantedStarType == hashes[type]) {
			jcmp.events.Call("AddWantedStar", suspected, suspected.wantedStars[key].idWantedStarType, false);
			return;
		}
	}

	jcmp.notifications.send(police, "JOB_NAME_" + police.idJob, "POLICE_PLAYER_NOT_SUSPECT", false, "cancel", "cancel");
});


jcmp.events.AddRemoteCallable("Inspect", function(police, inspectedNetworkId) {
	let inspected = jcmp.utils.player.getById(inspectedNetworkId);
	if (!inspected) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, inspected.position) > 7) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}

	let wantedStars = [];
	for (var id in inspected.wantedStars) {
		wantedStars.push({idWantedStarType: inspected.wantedStars[id].idWantedStarType, isSuspect: inspected.wantedStars[id].isSuspect});
	}

	let data = {
        name: inspected.nname,
        steamId: inspected.client.steamId,
		idJob: inspected.idJob,
		weapons: inspected.weapons,
		weaponCarryPermit: inspected.weaponCarryPermit,
        licenseCar: inspected.licenseCar,
        licenseBike: inspected.licenseBike,
        licenseHeli: inspected.licenseHeli,
        licensePlane: inspected.licensePlane,
        licenseSea: inspected.licenseSea,
        healthInsurance: inspected.healthInsurance,
        lifeInsurance: inspected.lifeInsurance,
		country: inspected.country,
		wantedStars: wantedStars,
	};


	jcmp.events.CallRemote("InspectedPlayer", police, JSON.stringify(data));
	jcmp.events.CallRemote("Inspected", inspected, police.nname);
});


jcmp.events.AddRemoteCallable("CuffCar", function(police, cuffedNetworkId, vehicleNetworkId) {
	let cuffed = jcmp.utils.player.getById(cuffedNetworkId);

	if (!cuffed) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

    let vehicle = null;
    for (let v = jcmp.roleplayVehicles.length - 1; v >= 0; v--) {
        if (typeof jcmp.roleplayVehicles[v] === 'undefined' || !jcmp.roleplayVehicles[v].position)
			continue;
			
        if (jcmp.utils.vector3.distance(jcmp.roleplayVehicles[v].position, police.position) < 5) {
            vehicle = jcmp.roleplayVehicles[v];
            break;
        }
    }

    if (!vehicle) {
		jcmp.notifications.send(police, "JOB_NAME_" + police.idJob, "POLICE_NOT_CLOSE_TO_VEHICLE", false, "cancel", "cancel");
		return;
	}

	vehicle.SetOccupant(3, cuffed);

	cuffed.setValue("handcuffed", true);
	jcmp.notifications.send(police, "JOB_NAME_" + police.idJob, "POLICE_CUFFEDCAR_PLAYER", [cuffed.nname], "cuffed");
	jcmp.notifications.send(cuffed, "POLICE_HANDCUFFED", "POLICE_YOU_HAVE_BEEN_HANDCUFFEDCAR_BY", [police.nname], "cuffed");
});


jcmp.events.AddRemoteCallable("Cuff", function(police, cuffedNetworkId) {

	let cuffed = jcmp.utils.player.getById(cuffedNetworkId);
	if (!cuffed) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, cuffed.position) > 12) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}

	cuffed.setValue("handcuffed", true);
	jcmp.notifications.send(police, "JOB_NAME_" + police.idJob, "POLICE_CUFFED_PLAYER", [cuffed.nname], "cuffed");
	jcmp.notifications.send(cuffed, "POLICE_HANDCUFFED", "POLICE_YOU_HAVE_BEEN_HANDCUFFED_BY", [police.nname], "cuffed");
});


jcmp.events.AddRemoteCallable("Uncuff", function(police, cuffedNetworkId) {

	let cuffed = jcmp.utils.player.getById(cuffedNetworkId);
	if (!cuffed) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, cuffed.position) > 12) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}
	cuffed.setValue("handcuffed", false);

	if (police.client.networkId != cuffedNetworkId) {
		jcmp.notifications.send(police, "JOB_NAME_" + police.idJob, "POLICE_UNCUFFED_PLAYER", [cuffed.nname], "uncuffed");
		jcmp.notifications.send(cuffed, "POLICE_UNCUFFED", "POLICE_YOU_HAVE_BEEN_UNCUFFED_BY", [police.nname], "uncuffed");

	}
});


jcmp.events.AddRemoteCallable("Halt", function(police, haltedNetworkId) {

	let halted = jcmp.utils.player.getById(haltedNetworkId);
	if (!halted) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, halted.position) > 100) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}

	jcmp.notifications.send(halted, "POLICE_HALT", "POLICE_YOU_HAVE_BEEN_HALTED_BY", [police.nname], "police", "police-blow");
});


jcmp.events.AddRemoteCallable("Arrest", function(police, arrestedNetworkId) {

	let arrested = jcmp.utils.player.getById(arrestedNetworkId);
	if (!arrested) {
		jcmp.events.CallRemote("PlayerNotFound", police);
		return;
	}

	if (jcmp.utils.vector3.distance(police.position, arrested.position) > 12) {
		jcmp.events.CallRemote("PlayerNotClose", police);
		return;
	}

	let arrestedPrice = Arrest(arrested);
	if (!arrestedPrice) {
		jcmp.notifications.send(police, "SITE_NAME_6", "POLICE_UNARRESTED", false, "cancel", "cancel");
		return;
	}

	let payment = Math.floor(arrestedPrice * 0.3);

	jcmp.events.Call("JobDone", police, Math.floor(payment / 2), payment);

	jcmp.notifications.send(arrested, "POLICE_ARRESTED", "POLICE_ARRESTED_BY", [police.nname], "jail");
	jcmp.notifications.send(police, "SITE_NAME_6", "POLICE_ARRESTED_PLAYER", [arrested.name, Math.floor(payment / 2), payment], "jail");
});


jcmp.events.Add("Arrest", function(arrested) {
	return Arrest(arrested);
});


function Arrest(arrested) {

	let wantedStars = 0;
	let totalTime = 0;
    let totalCost = 0;
    
	for (var key in arrested.wantedStars) {
		if (!arrested.wantedStars.isSuspect) {
			let wantedStarData = jcmp.wantedStarsData[arrested.wantedStars[key].idWantedStarType];
			totalTime += wantedStarData.timeJail;
			wantedStars += wantedStarData.stars;
			totalCost += wantedStarData.cost;
		}
	}

	if (totalTime == 0 || wantedStars < 2)
		return 0;

	jcmp.SQL.execute(
		"DELETE FROM WantedStar WHERE idPlayer = ?",
		[arrested.client.steamId]
	);

	arrested.createValue("wantedStars", []);

	if (arrested.health <= 0) {
		arrested.respawnPosition = jcmp.prisonPosition;
		arrested.Respawn();
	} else {
		arrested.position = jcmp.prisonPosition;
	}

	jcmp.events.Call('SetPlayerMoneyBank', arrested, -totalCost, "Prison");
	arrested.setValue("handcuffed", false);
	arrested.setValue("arrested", totalTime);

	jcmp.notifications.send(arrested, "POLICE_ARRESTED", "POLICE_ARRESTED_COST", [totalCost], "jail");
	arrested.weapons.forEach(function(weapon){
		arrested.RemoveWeapon(weapon.modelHash);
	});

	return totalCost;
}
