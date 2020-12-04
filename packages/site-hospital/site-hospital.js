'use strict';

jcmp.events.AddRemoteCallable("BuyInsurance", function(player, id, value) {
	if (player.money < value)
		return;

	jcmp.events.Call("SetPlayerMoney", player, -value);
	player.setValue(id, true);
});

jcmp.events.AddRemoteCallable('Heal', function(player, priceHeal) {
	if (player.money < priceHeal)
		return;

	jcmp.events.Call("SetPlayerMoney", player, -priceHeal);

	player.health = 1000;
});

jcmp.events.AddRemoteCallable('Resurrect', function(player) {
	jcmp.events.Call("SetPlayerMoneyBank", player, -100, "Hospital");

	jcmp.events.CallRemote("LocalPlayerRessurect", player);
	player.Respawn();
});

jcmp.events.Add('PlayerRespawn', function(player) {
	if (!jcmp.utils.validatePlayer(player) || !player.loaded || !player.toRespawn || player.arrested)
		return;

	jcmp.events.CallRemote("LocalPlayerResurrected", player, false);

	player.setValue("hungry", 40);
	player.setValue("thirsty", 50);
	player.saveValue("health", 800);

	if (player.level > 5) {
		if (!player.lifeInsurance)
			jcmp.events.Call("SetPlayerMoney", player, -Math.floor(player.money / 4));

		if (!player.healthInsurance)
			jcmp.events.Call("SetPlayerMoneyBank", player, -100, "Hospital");
	}

	if (player.toRespawn)
		player.toRespawn = null;

	if (player.servicesCall["PARAMEDIC"])
		jcmp.events.Call("ServicesDeleteCall", player, "PARAMEDIC");
});

jcmp.events.Add("RevivePlayer", function(player) {
	player.respawnPosition = player.position;
	jcmp.events.CallRemote("LocalPlayerResurrected", player, true);
	player.health = 1;
	player.Respawn();
});

jcmp.events.Add('PlayerDeathAfter', function(player, killer, reason) {
	if (player.arrested) {
		player.toRespawn = 10000;
		return;
	}

	jcmp.events.CallRemote("LocalPlayerDeath", player, reason);

	var closeHospital = {position: player.respawnPosition, distance: 100000};

	for (let key in jcmp.sites) {

		if (jcmp.sites[key].idSiteType == 2) {
			let hospitalPosition = jcmp.utils.vector3.parse(jcmp.sites[key].position);
			var distance = jcmp.utils.vector3.distance(hospitalPosition, player.position);

			if (distance < closeHospital.distance) {
				closeHospital = {position: hospitalPosition, distance: distance}
			}
		}
	}

	player.respawnPosition = closeHospital.position;
	player.saveValue("position", player.position);

	if (player.toRespawn)
		player.toRespawn = null;

	player.toRespawn = 300000;

	jcmp.events.Call("ServicesNewCall", player, "PARAMEDIC", 180, "I've just died and need a Paramedic!");
});

jcmp.events.Add("ServerLoaded", function() {
	setInterval(function() {
		for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
			if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
				continue;
				
			let player = jcmp.loggedPlayers[p];

			if (!player.toRespawn)
				continue;

			player.toRespawn -= 2000;

			if (player.toRespawn <= 0) {
				player.Respawn();
				player.toRespawn = null;
			}
		}
	}, 2000);
});