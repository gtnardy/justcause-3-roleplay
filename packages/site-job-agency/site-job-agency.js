'use strict';

const priceChangeName = 5000;


jcmp.events.AddRemoteCallable("ChooseJob", function(player, idJob, tp) {
	if (!jcmp.jobs[idJob] || jcmp.jobs[idJob].level > player.level || player.cooldownJobChange > 0)
		return;
		
	player.setValue("idJob", idJob);
	
	if (jcmp.jobs[idJob].cooldown)
		player.setValue("cooldownJobChange", jcmp.jobs[idJob].cooldown);
	else
		player.setValue("cooldownJobChange", 0);
	
	if (tp)
        player.position = jcmp.utils.vector3.parse(jcmp.jobs[player.idJob].spawnPosition);
    
    jcmp.events.CallRemote("JobChoosen", player, idJob);

	if (idJob == 8 || idJob == 9) {
		player.setValue("catchedCount", 0);
	}
});


jcmp.events.AddRemoteCallable("ChangeName", function(player, name) {
	
	if (player.money < priceChangeName || !player.vip)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -priceChangeName);
	player.setValue("nname", name);
});