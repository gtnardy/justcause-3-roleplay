const carryWeaponPrice = 4500;


jcmp.events.AddRemoteCallable('BuyWeaponCarry', function(player) {
	
	if (player.money < carryWeaponPrice || player.weaponCarryPermit)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -carryWeaponPrice);
	player.setValue("weaponCarryPermit", true);
});


jcmp.events.AddRemoteCallable('PayWantedStars', function(player) {
	
	let totalCost = 0;
	for (let key in player.wantedStars) {
		if (!player.wantedStars[key].isSuspect) {
			let wantedStarData = jcmp.wantedStarsData[player.wantedStars[key].idWantedStarType];
			totalCost += wantedStarData.cost;
		}
	}
	
	totalCost = Math.floor(totalCost * 0.75);
	
	if (totalCost == 0 || player.money < totalCost)
		return;

	jcmp.SQL.execute(
		"DELETE FROM WantedStar WHERE idPlayer = ? AND isSuspect = 0",
		[player.client.steamId]
	);
	
	jcmp.events.Call("SetPlayerMoney", player, -totalCost);
	
	player.createValue("wantedStars", []);
});