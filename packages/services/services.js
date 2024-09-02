'use strict';

const JOBS_HASH = {
	12: "TAXI",
	16: "TAXI",
	4: "PARAMEDIC",
	7: "POLICE",
	15: "LAWYER",
	3: "MECHANIC",
}

jcmp.events.AddRemoteCallable("ServicesNewCall", function(player, jobHash, timeout, message) {
	ServicesNewCall(player, jobHash, timeout, message);
});

jcmp.events.Add("ServicesNewCall", function(player, jobHash, timeout, message) {
	ServicesNewCall(player, jobHash, timeout, message);
});
// && jcmp.loggedPlayers[p].networkId != player.networkId
function ServicesNewCall(player, jobHash, timeout, message) {
	player.servicesCall[jobHash] = true;
	let hasPlayers = false;

	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) && jcmp.loggedPlayers[p].loaded && JOBS_HASH[jcmp.loggedPlayers[p].idJob] == jobHash) {
			jcmp.events.CallRemote("ServicesNewCall", jcmp.loggedPlayers[p], jobHash, player.networkId, player.nname, jcmp.utils.vector3.stringify(player.position), timeout, message);
			hasPlayers = true;
		}
	}

	if (hasPlayers) {
		jcmp.events.CallRemote("ServicesNewCallSuccess", player, jobHash, timeout);
		player.servicesCall[jobHash] = true;
	} else
		jcmp.notifications.send(player, jobHash, "SERVICES_NOT_CALLED", [jobHash], "cancel", "cancel");
}

jcmp.events.Add("ServicesDeleteCall", function(player, jobHash) {
	ServicesDeleteCall(player, jobHash);
});

function ServicesDeleteCall(player, jobHash) {
	player.servicesCall[jobHash] = false;
	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) && jcmp.loggedPlayers[p].loaded && JOBS_HASH[jcmp.loggedPlayers[p].idJob] == jobHash) {
			jcmp.events.CallRemote("ServicesDeleteCall", jcmp.loggedPlayers[p], player.networkId);
		}
	}

	jcmp.events.CallRemote("ServicesDeleteMyCall", player, jobHash);
}

jcmp.events.AddRemoteCallable("ServicesCallAccepted", function(player, networkPlayerId) {
	let playerCalled = jcmp.utils.player.getById(networkPlayerId);

	if (!playerCalled) {
		jcmp.events.CallRemote("PlayerNotFound", player);
		return;
	}

	let hashId = JOBS_HASH[player.idJob];

	if (!playerCalled.servicesCall[hashId]) {
		jcmp.notifications.send(player, "JOB_NAME_" + player.idJob, "SERVICES_PLAYER_NOT_REQUESTED", false, "cancel", "cancel");
		return;
	}
	
	if (hashId == "LAWYER") {
		jcmp.events.Call("ReleasePrisioner", player, playerCalled);
	} else {
		jcmp.events.CallRemote("ServicesCallAcceptedYours", playerCalled, hashId, player.nname);
		jcmp.events.CallRemote("ServicesCallAccepted", player, playerCalled.nname, jcmp.utils.vector3.stringify(playerCalled.position));
	}

	ServicesDeleteCall(playerCalled, hashId);
});

jcmp.events.Add("PlayerValueChange", function(player, index, value) {
	if (index != "arrested")
		return;

	if (value)
		return;

	if (!player.servicesCall["LAWYER"])
		return;
	
	ServicesDeleteCall(player, "LAWYER");
});