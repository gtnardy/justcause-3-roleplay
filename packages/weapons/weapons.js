'use strict';

// type 1 pistol, 2 assault, 3 shotgun, 4 sniper, 5 bazooka, 6 heavy, 7 submachine
jcmp.weapons = {};
jcmp.weapons["4040374394"] = {name: "U-55S Pozhar", type: 1, slot: 0, price: 4000, minimumLevel: 10};
jcmp.weapons["3944301769"] = {name: "CS Spectre Mark V", type: 1, slot: 0, price: 4650, minimumLevel: 10};
jcmp.weapons["3305603558"] = {name: "The Little General", type: 1, slot: 0, price: 5000, minimumLevel: 12};
jcmp.weapons["2144721124"] = {name: "CS44 Peacebringer", type: 1, slot: 0, price: 5450, minimumLevel: 13};
jcmp.weapons["1394636892"] = {name: "CS27 Misfortune", type: 2, slot: 1, price: 8900, minimumLevel: 28};
jcmp.weapons["2621157955"] = {name: "CS Predator", type: 2, slot: 1, price: 10000, minimumLevel: 32};
jcmp.weapons["2307691279"] = {name: "U-39 Plechovka", type: 2, slot: 1, price: 9500, minimumLevel: 30};
jcmp.weapons["3681410946"] = {name: "UPM61", type: 2, slot: 1, price: 8500, minimumLevel: 25};
jcmp.weapons["1549148855"] = {name: "Automat U12", type: 3, slot: 1, price: 9000, minimumLevel: 25};
jcmp.weapons["2219364824"] = {name: "U-24 Zabijak", type: 3, slot: 0, price: 6700, minimumLevel: 15};
jcmp.weapons["37039781"] = {name: "CS110 Archangel", type: 4, slot: 6, price: 16500, minimumLevel: 45};
jcmp.weapons["3923877588"] = {name: "USV 45 Sokol", type: 4, slot: 6, price: 13500, minimumLevel: 40};
jcmp.weapons["3070823687"] = {name: "Capstone Hydra", type: 5, slot: 6, price: 17000, minimumLevel: 53, vip: true};
jcmp.weapons["2042423840"] = {name: "CS Negotiator", type: 5, slot: 6, price: 15000, minimumLevel: 48, vip: true};
jcmp.weapons["68160093"] = {name: "Fire Leech", type: 5, slot: 6, price: 18000, minimumLevel: 55, vip: true};
jcmp.weapons["1440484885"] = {name: "Urga Stupka-210", type: 5, slot: 6, price: 17500, minimumLevel: 56, vip: true};
jcmp.weapons["3913913650"] = {name: "UVK-13", type: 5, slot: 6, price: 20000, minimumLevel: 53};
jcmp.weapons["3191136252"] = {name: "GuitaRPG", type: 5, slot: 1, price: 19000, minimumLevel: 60, vip: true};
jcmp.weapons["3413507878"] = {name: "Urga Vdova 89", type: 6, slot: 1, price: 12000, minimumLevel: 37, vip: true};
jcmp.weapons["1709033370"] = {name: "Prizrak U4", type: 7, slot: 0, price: 7000, minimumLevel: 15};
jcmp.weapons["89410586"] = {name: "CS Wraith 225R", type: 7, slot: 0, price: 7900, minimumLevel: 18};
jcmp.weapons["2470879546"] = {name: "CS9 PDW-K", type: 7, slot: 0, price: 7550, minimumLevel: 17};


// //Save ammo
// jcmp.events.Add('PlayerDestroyedAfter', function(player) {

	// if (!player.client || !player.client.steamId || !player.weapons) return;
	//tem erro
	// for (let w in player.weapons) {
		// let weapon = player.weapons[w];
		// console.log(weapon.magazineAmmo + " " + weapon.reserveAmmo);
		// jcmp.SQL.execute(
			// "UPDATE Weapon SET ammo = ? WHERE idPlayer = ? AND idWeapon = ?",
			// [
				// weapon.magazineAmmo + weapon.reserveAmmo,
				// player.client.steamId,
				// weapon.modelHash
			// ]
		// );
	// }
	
// });