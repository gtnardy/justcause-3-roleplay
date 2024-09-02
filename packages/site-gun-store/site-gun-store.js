'use strict';

jcmp.events.AddRemoteCallable("EquipWeapon", function(player, idWeapon) {
	EquipWeapon(player, idWeapon);
});


function EquipWeapon(player, idWeapon) {
	
	if (idWeapon == -1) {
		jcmp.SQL.query(
			"UPDATE Weapon SET equipped = 0 WHERE idPlayer = ?",
			[player.client.steamId],
			function() {
				UpdatePlayerWeapons(player);
            },
            player
		);
		return;
	}
	
	if (!player.weaponsData[idWeapon])
		return;
	
	let weaponData = jcmp.weapons[idWeapon];
	
	jcmp.SQL.query(
		"UPDATE Weapon SET equipped = 0 WHERE idPlayer = ? AND slot = ?",
		[
			player.client.steamId,
			weaponData.slot
		],
		function() {
			
			// for (let w in player.weapons) {
				// let weapon = player.weapons[w];
				// if (weapon && weapon.slotIndex == weaponData.slot)
					// player.RemoveWeapon(weapon.modelHash);
			// }
			
			jcmp.SQL.query(
				"UPDATE Weapon SET equipped = 1 WHERE idPlayer = ? AND idWeapon = ?",
				[
					player.client.steamId,
					idWeapon
				], function() {
					UpdatePlayerWeapons(player);
				}
			);
        },
        player
	);
}


jcmp.events.AddRemoteCallable("BuyWeapon", function(player, idWeapon) {
	
	if (player.weaponsData[idWeapon])
		return;
	
	let weaponData = jcmp.weapons[idWeapon];
	
	if (player.money < weaponData.price)
		return;	
	
	if (weaponData.vip && player.vip != 2)
		return;
	
	jcmp.SQL.query(
		"UPDATE Weapon SET equipped = 0 WHERE idPlayer = ? AND slot = ?",
		[
			player.client.steamId,
			weaponData.slot
		],
		function() {
			jcmp.SQL.query(
				"INSERT INTO Weapon SET ?",
				{
					idPlayer: player.client.steamId,
					idWeapon: idWeapon,
					ammo: 99999,
					equipped: true,
					slot: weaponData.slot
				}, function() {
					UpdatePlayerWeapons(player);
					jcmp.events.Call("SetPlayerMoney", player, -weaponData.price);
                },
                player
			);
        },
        player
	);
});

// mover para weapons
jcmp.events.Add("UpdatePlayerWeapons", function(player) {
	UpdatePlayerWeapons(player);
});

	
function UpdatePlayerWeapons(player) {
	
	player.weapons.forEach(function(weapon){
		player.RemoveWeapon(weapon.modelHash);
	});	
	
	let weaponsData = {};
	jcmp.SQL.query(
		`SELECT 
			idWeapon,
			ammo,
			equipped
		FROM Weapon
		WHERE idPlayer = ?`,
		player.client.steamId,
		function(weaponResults) {
			for (let w in weaponResults) {
				let weaponPlayer = weaponResults[w];
				if (weaponPlayer.equipped) {
					player.GiveWeapon(Number(weaponPlayer.idWeapon), weaponPlayer.ammo, false);
				}
				
				weaponsData[weaponPlayer.idWeapon] = {equipped: weaponPlayer.equipped};
			}
			player.createValue("weaponsData", weaponsData);
        },
        player
	);
}