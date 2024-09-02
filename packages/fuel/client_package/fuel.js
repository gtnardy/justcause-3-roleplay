'use strict';


const expenseByType = [];
expenseByType[4] = 0.000005; //car
expenseByType[6] = 0.000002; //bike
expenseByType[8] = 0.000006; //heli
expenseByType[9] = 0.000005; //boat
expenseByType[16] = 0.00001; //plane
//0.000005 * 1000rpm = 0.6 liters/minute w/ 500ms tick


jcmp.ui.AddEvent('TickFiveSeconds', function(x) {
	if (!jcmp.localPlayerData.vehicle || jcmp.localPlayerData.seat != 0)
		return;
	
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({fuel: jcmp.localPlayerData.fuel}));
});


jcmp.ui.AddEvent('TickSecond', function(x) {

	if (!jcmp.localPlayerData.vehicle || jcmp.localPlayerData.seat != 0)
		return;
	
	if (jcmp.localPlayerData.racing || jcmp.localPlayerData.testingDriving)
		return;
	
	if (jcmp.localPlayerData.fuel <= 0) {
		jcmp.localPlayerData.fuel = 0;
		jcmp.events.CallRemote('PlayerEmptyFuel');
		jcmp.notifications.add("", jcmp.languages.get("FUEL_NOT_ENOUGH_FUEL"), "fuel", "cancel");
		return;
	}
	
	// optimize this
	var expense = expenseByType[jcmp.localPlayerData.vehicle.type];
	if (expense == null) expense = 0.000005;
	
	expense = expense * jcmp.localPlayerData.vehicle.engineRPM;
	
	if (jcmp.localPlayerData.vehicle.type == 8 || jcmp.localPlayerData.vehicle.type == 16)
		expense = expense / (1 + jcmp.localPlayerData.statsFlying * 0.003); // 25%-
	else
		expense = expense / (1 + jcmp.localPlayerData.statsDriving * 0.003);
		
	jcmp.localPlayerData.fuel -= expense;
	
});