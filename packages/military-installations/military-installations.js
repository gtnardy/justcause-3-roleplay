'use strict';

jcmp.militaryInstallations = {};
jcmp.bavariumValue = 10;

const jobs = [];
jobs[13] = 1;
jobs[14] = -1;

setInterval(function() {
	for (let k in jcmp.militaryInstallations) {
		let military = jcmp.militaryInstallations[k];

		if (military.protection > 0)
			military.protection = Math.max(0, military.protection - 1);

		if (military.domination == 0) {
			if (military.percentDomination > 0)
				military.percentDomination = Math.max(0, military.percentDomination - 10);

			else if (military.percentDomination < 0)
				military.percentDomination = Math.min(0, military.percentDomination + 10);

		} else if (military.domination == 1) {
			if (military.percentDomination < 100)
				military.percentDomination = Math.min(100, military.percentDomination + 10);

		} else if (military.domination == -1) {
			if (military.percentDomination > -100)
				military.percentDomination = Math.max(-100, military.percentDomination - 10);

		}
	}
	SendToAllPlayers();
}, 60000);

jcmp.events.AddRemoteCallable('SetMilitaryVehicle', function(player, idVehicle, idSite) {
	if (typeof player.vehicle === 'undefined')
		return;

	jcmp.SQL.execute(
		"INSERT INTO MilitaryInstallationVehicle SET ?",
		{idVehicle: idVehicle,
		idSite: idSite,
		position: jcmp.utils.vector3.stringify(player.vehicle.position),
		rotation: jcmp.utils.vector3.stringify(player.vehicle.rotation)}
	);
});

// gov total
const tickMilitaryInstallation = setInterval(() => {
	for (let mil in jcmp.militaryInstallations) {
		let military = jcmp.militaryInstallations[mil];
		if (military.bavarium > 0 && military.domination != 0) {
			let bavariumToReduce = Math.max(Math.min(military.bavarium, 50), 0);

			jcmp.events.Call("SetMilitaryInstallationValue", military.idSite, "bavarium", military.bavarium - bavariumToReduce, true);
			if (military.domination == 1) {
				jcmp.events.Call("SetRoleplayValue", "money", jcmp.money + Math.floor(bavariumToReduce * jcmp.bavariumValue));
			}
		}
	}
}, 3600000);

//domination -100 a 100
jcmp.events.Add("ServerLoaded", function() {
	jcmp.SQL.query(
		`SELECT
			*
		FROM MilitaryInstallation`,
		null,
		function (rows) {
			rows.forEach(function(row) {
				jcmp.militaryInstallations[row.idSite] = {
					id: row.id,
					idSite: row.idSite,
					domination: row.domination,
					percentDomination: row.domination * 100,
					type: row.type,
					bavarium: row.bavarium,
					vehicles: [],
					protection: 0
				};
			});
			UpdateStats();
		}
	);
});

function UpdateStats() {
	let totalBases = 0;
	let govDomination = 0;
	let rebelsDomination = 0;
	jcmp.govBavarium = 0;
	jcmp.rebelsBavarium = 0;

	for (let k in jcmp.militaryInstallations) {
		let military = jcmp.militaryInstallations[k];
		if (military.type != 2) {
			totalBases++;
			if (military.domination == 1) {
				govDomination++;
				jcmp.govBavarium += military.bavarium;
			} else if (military.domination == -1) {
				rebelsDomination++;
				jcmp.rebelsBavarium += military.bavarium;
			}
		}
	}

	jcmp.govDomination = Math.floor(govDomination / totalBases * 100).toFixed(1);
	jcmp.rebelsDomination = Math.floor(rebelsDomination / totalBases * 100).toFixed(1);
}

function SendToPlayer(player) {
	jcmp.events.CallRemote("UpdateMilitaryInstallations", player, JSON.stringify(jcmp.militaryInstallations));
}

function SendToAllPlayers() {
	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;
		SendToPlayer(jcmp.loggedPlayers[p]);
	}
}

jcmp.events.AddRemoteCallable("UnloadedBavarium", function(player, idSite, kilo) {

	if (jcmp.militaryInstallations[idSite]) {
		jcmp.militaryInstallations[idSite].bavarium += kilo;

		jcmp.SQL.execute(
			"UPDATE MilitaryInstallation SET bavarium = ? WHERE id = ?",
			[jcmp.militaryInstallations[idSite].bavarium, jcmp.militaryInstallations[idSite].id]
		);
		UpdateStats();
		SendToAllPlayers();
	}
});

// true military, false rebels
jcmp.events.AddRemoteCallable("DominatingMilitaryInstallation", function(player, idSite, side, firstTime) {

	if (!jcmp.militaryInstallations[idSite] || jcmp.militaryInstallations[idSite].type == 2 || jcmp.militaryInstallations[idSite].protection > 0)
		return;

	let percentDominationBefore = jcmp.militaryInstallations[idSite].percentDomination;

	jcmp.militaryInstallations[idSite].percentDomination += side * 3;
	jcmp.militaryInstallations[idSite].percentDomination = (side == 1) ? Math.min(jcmp.militaryInstallations[idSite].percentDomination, 100) : Math.max(jcmp.militaryInstallations[idSite].percentDomination, -100);

	if (jcmp.militaryInstallations[idSite].domination == side && jcmp.militaryInstallations[idSite].percentDomination == side * 100 && percentDominationBefore != jcmp.militaryInstallations[idSite].percentDomination) {
		Defended(jcmp.militaryInstallations[idSite]);

	} else if (jcmp.militaryInstallations[idSite].domination != side && jcmp.militaryInstallations[idSite].percentDomination == side * 100) {
		Dominated(jcmp.militaryInstallations[idSite]);

	} else if ((side == 1 && jcmp.militaryInstallations[idSite].domination == -1 && jcmp.militaryInstallations[idSite].percentDomination > 0) ||
		(side == -1 && jcmp.militaryInstallations[idSite].domination == 1 && jcmp.militaryInstallations[idSite].percentDomination < 0)) {
		Cleaned(jcmp.militaryInstallations[idSite]);
	}

	SendToAllPlayers();

	if (firstTime) {
        for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
            if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
                continue;

			if (jobs[jcmp.loggedPlayers[p].idJob] == -side) {
				jcmp.events.CallRemote("MilitaryInstallationBeingDominated", jcmp.loggedPlayers[p], idSite);
			}
		}
	}
});

function Defended(military) {
	military.protection = 120;

	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

		if (jcmp.loggedPlayers[p].sites[11] == military.idSite && jobs[jcmp.loggedPlayers[p].idJob] == military.domination) {
			jcmp.events.Call("JobDone", jcmp.loggedPlayers[p], 250, 500);
			jcmp.notifications.send(jcmp.loggedPlayers[p], "SITE_NAME_11", "MILITARYINSTALLATIONS_DEFENDED", [500, 250], "flag", "town-liberated");
		}
	}
}

function Dominated(military) {
	military.protection = 360;
	let domination = Math.floor(military.percentDomination / 100);

	jcmp.events.Call("SetMilitaryInstallationValue", military.idSite, "domination", domination, false);

	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

		if (jcmp.loggedPlayers[p].sites[11] == military.idSite && jobs[jcmp.loggedPlayers[p].idJob] == domination) {
			jcmp.events.Call("JobDone", jcmp.loggedPlayers[p], 500, 1000);
			jcmp.notifications.send(jcmp.loggedPlayers[p], "SITE_NAME_11", "MILITARYINSTALLATIONS_DOMINATED", [1000, 500], "flag", "town-liberated");
		}
	}

	jcmp.events.CallRemote("MilitaryInstallationNewDomination", null, military.idSite, domination);
	jcmp.events.Call("UpdateVehiclesMilitaryInstallations", military.idSite);
}

function Cleaned(military) {
	let domination = -military.domination;

	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

        if (jcmp.loggedPlayers[p].sites[11] == military.idSite && jobs[jcmp.loggedPlayers[p].idJob] == domination) {
            jcmp.notifications.send(jcmp.loggedPlayers[p], "SITE_NAME_11", "MILITARYINSTALLATIONS_CLEANED", false, "flag");
        }

        if (jobs[jcmp.loggedPlayers[p].idJob] == -domination) {
            jcmp.events.CallRemote("MilitaryInstallationNewCleaned", jcmp.loggedPlayers[p], military.idSite);
        }
	}
	jcmp.events.Call("SetMilitaryInstallationValue", military.idSite, "domination", 0, false);
}

jcmp.events.Add('SetMilitaryInstallationValue', function (idSite, index, value, sendToPlayers) {

	if (jcmp.militaryInstallations[idSite]) {
		jcmp.militaryInstallations[idSite][index] = value;

		jcmp.SQL.execute(
			"UPDATE MilitaryInstallation SET " + index + " = ? WHERE id = ?",
			[value, jcmp.militaryInstallations[idSite].id]
		);

		UpdateStats();
		if (sendToPlayers)
			SendToAllPlayers();
	}
});


jcmp.events.AddRemoteCallable("GetMilitaryInstallations", function(player) {
	SendToPlayer(player);
});