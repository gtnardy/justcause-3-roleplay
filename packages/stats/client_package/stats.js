'use strict';


jcmp.ui.AddEvent('TickFiveSeconds', function() {

    if (jcmp.localPlayer.afk)
        return;
    
	let stealth = -0.004; //todo
	let stamina = -0.004;
	let lungCapacity = -0.004;
	let strength = -0.004; // todo
	let driving = -0.004;
	let flying = -0.004;
	
	if (jcmp.localPlayerData.vehicle && jcmp.localPlayerData.seat == 0 && jcmp.localPlayerData.vehicle.linearVelocity.length > 20) {
		
		// driving
		if ([8, 16].indexOf(jcmp.localPlayerData.vehicle.type) == -1)
			driving += 0.04;
		else
			// flying
			flying += 0.04;
	}
	
	switch(jcmp.localPlayer.baseState) {
		// swimming
		case 1949999968:
			lungCapacity += 0.1;
			break;
			
		// diving
		case 580748688:
			lungCapacity += 0.06;
			stamina += 0.05;
			break;
			
		// running
		case 2615599996:
			lungCapacity += 0.1;	
			stamina += 0.08;
			break;
			
		// jumping
		case 76745858:
			lungCapacity += 0.1;
			stamina += 0.08;
			break;
	}
	
	UpStats("statsSealth", stealth);
	UpStats("statsStamina", stamina);
	UpStats("statsLungCapacity", lungCapacity);
	UpStats("statsStrength", strength);
	UpStats("statsDriving", driving);
	UpStats("statsFlying", flying);

});


function UpStats(stats, value) {
	let oldValue = jcmp.localPlayerData[stats];
	jcmp.localPlayerData[stats] = Math.min(Math.max(jcmp.localPlayerData[stats] + value, 0), 100.9);
	
	
	if (Math.floor(jcmp.localPlayerData[stats]) != Math.floor(oldValue)) {
		let data = {};
		data[stats] = jcmp.localPlayerData[stats];
		jcmp.ui.CallEvent("UpdateHUD", JSON.stringify(data));
	}
}