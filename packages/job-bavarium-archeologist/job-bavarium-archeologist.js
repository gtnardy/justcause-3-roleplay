'use strict'

var bavarium_cache = {};
const BAVARIUM_SITES_COUNT = 98;

const MAGNETIC_DETECTOR_PRICE = {
	1: 3000,
	2: 4000,
	3: 5000,
	4: 6000,
	5: 7000,
};

jcmp.events.AddRemoteCallable("BuyMagneticDetectorUpgrade", function(player) {
	if (player.magneticDetectorLevel >= 5)
		return;

	let price = MAGNETIC_DETECTOR_PRICE[player.magneticDetectorLevel + 1];

	if (player.money < price)
		return;

	jcmp.events.Call("SetPlayerMoney", player, -price);
	player.setValue("magneticDetectorLevel", player.magneticDetectorLevel + 1);
});


jcmp.events.AddRemoteCallable("BavariumAcheologistDigged", function(player, indexSite) {
	if (bavarium_cache[indexSite]) {
		delete bavarium_cache[indexSite];
		console.log("bavarium removed " + indexSite);
	}
});

function AddBavariumToCache() {
	let bavariumSite = Math.floor(Math.random() * BAVARIUM_SITES_COUNT);

	if (bavarium_cache[bavariumSite]) {
		if (bavarium_cache[bavariumSite].timeout) {
			delete bavarium_cache[bavariumSite].timeout;
		}
	}

	bavarium_cache[bavariumSite] = {
		active: true,
	};

	console.log("new bavarium added " + bavariumSite);
	SendToPlayers(null);
}

function SendToPlayers(players) {
	jcmp.events.CallRemote("UpdateBavariumCache", players, JSON.stringify(bavarium_cache));
}

jcmp.events.Add("PlayerLoaded", function(player) {
	SendToPlayers(player);
});

AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();
AddBavariumToCache();

setInterval(function() {
	AddBavariumToCache();
}, 1200000);