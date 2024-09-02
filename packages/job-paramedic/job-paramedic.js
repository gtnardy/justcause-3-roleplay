'use strict';

const PARAMEDIC_HEAL_PRICE = 40;

jcmp.events.AddRemoteCallable('HealAccepted', function(pacient, networkIdParamedic) {
	if (pacient.money < PARAMEDIC_HEAL_PRICE)
		return;
	
	pacient.setValue("money", pacient.money - PARAMEDIC_HEAL_PRICE);
	pacient.health = 1000;
	pacient.setValue("thirsty", Math.min(pacient.thirsty + 30, 100));
	pacient.setValue("hungry", Math.min(pacient.hungry + 15, 100));
});

jcmp.events.AddRemoteCallable('RevivePlayer', function(player, revivedNetworkId) {
    let revived = jcmp.utils.player.getById(revivedNetworkId);
	if (!revived)
        return;

    if (jcmp.utils.vector3.distance(revived.position, player.position) > 10) {
        jcmp.events.CallRemote("PlayerNotClose", player);
        return;
    }
	
	if (revived.health > 0) {
		jcmp.events.CallRemote("ParamedicNotDeath", player);
		return;
	}
	
	jcmp.events.Call("JobDone", player, 150, 300);
	jcmp.events.Call("RevivePlayer", revived);
	
	jcmp.events.CallRemote("Revived", revived, player.nname);
	jcmp.events.CallRemote("RevivedSuccessfully", player, revived.nname);
});