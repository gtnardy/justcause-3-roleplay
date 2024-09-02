'use strict';


var dyingThirsty = false,
	dyingHungry = false;

	
// Hunger and Thirsty per tick
jcmp.ui.AddEvent('TickSecond', function(x) {
	
	if (jcmp.localPlayerData.arrested) 
		return;
	
	if (jcmp.localPlayerData.racing)
		return;
	
	jcmp.localPlayerData.hungry = jcmp.localPlayerData.hungry - (0.025 / (1 + jcmp.localPlayerData.statsStamina * 0.004));
	jcmp.localPlayerData.thirsty = jcmp.localPlayerData.thirsty - (0.035 / (1 + jcmp.localPlayerData.statsStamina * 0.004));
	
	if (jcmp.localPlayerData.hungry <= 0) {
		jcmp.localPlayerData.hungry = 0;
		if (!dyingHungry)
			jcmp.notifications.add("", jcmp.languages.get("NECESSITIES_STARVING"), "skull", "cancel");
		
		jcmp.events.CallRemote("DyingHungry");
		dyingHungry = true;
	} else
		dyingHungry = false;
	
	if (jcmp.localPlayerData.thirsty  <= 0) {
		jcmp.localPlayerData.thirsty = 0;
		if (!dyingThirsty)
			jcmp.notifications.add("", jcmp.languages.get("NECESSITIES_DYING_DEHYDRATION"), "skull", "cancel");
		
		jcmp.events.CallRemote("DyingThirsty");
		dyingThirsty = true;
	} else
		dyingThirsty = false;
	
});


jcmp.ui.AddEvent('TickFiveSeconds', function(x) {
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({hungry: jcmp.localPlayerData.hungry, thirsty: jcmp.localPlayerData.thirsty}));
});

// Save data per minute
jcmp.ui.AddEvent('TickMinute', function(x) {
	dyingHungry = false;
	dyingThirsty = false;
});