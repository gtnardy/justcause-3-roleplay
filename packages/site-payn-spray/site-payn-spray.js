'use strict';

const repairPrice = 200;
const colorPrice = 150;
const nitroPrice = 500;
const turboJumpPrice = 700;
const platePrice = 1000;

jcmp.events.AddRemoteCallable("BuyColor", function(player, idColor) {

	if (player.money < colorPrice)
		return;

	if (typeof player.vehicle === 'undefined') return;
    
    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "primaryColor", idColor);

	jcmp.events.Call('SetPlayerMoney', player, -colorPrice);

	player.vehicle.primaryColor = idColor;
    player.vehicle.defaultColor = idColor;

});


jcmp.events.AddRemoteCallable("BuyTurboJump", function(player) {

	if (player.money < turboJumpPrice)
		return;

    if (typeof player.vehicle === 'undefined') return;
    
    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "turboJumpEnabled", true);

	jcmp.events.Call('SetPlayerMoney', player, -turboJumpPrice);

	player.vehicle.turboJumpEnabled = true;
});



jcmp.events.AddRemoteCallable("BuyNitro", function(player) {

	if (player.vip != 2 && player.money < nitroPrice)
		return;

    if (typeof player.vehicle === 'undefined') return;
    
    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "nitroEnabled", true);

	if (player.vip != 2)
		jcmp.events.Call('SetPlayerMoney', player, -nitroPrice);

	player.vehicle.nitroEnabled = true;
});


jcmp.events.AddRemoteCallable("BuyRepair", function(player) {

	if (player.money < repairPrice)
		return;

	if (typeof player.vehicle === 'undefined') return;

    if (player.vehicle.personal)
		jcmp.events.Call("UpdateVehicleData", player.vehicle, "health", 3000);
		
	jcmp.events.Call('SetPlayerMoney', player, -repairPrice);

	player.vehicle.health = 3000;
	player.vehicle.Repair();
});


jcmp.events.AddRemoteCallable("EnteredPaynSpray", function(player) {

	if (typeof player.vehicle === 'undefined') return;

	player.vehicle.defaultColor = player.vehicle.primaryColor;
	player.vehicle.linearVelocity = new Vector3f(0, 0, 0);
	// player.dimension = player.networkId;
	// vehicle.dimension = player.networkId;
	// vehicle.driver = null;

	// vehicle.SetOccupant(0, player);
});


jcmp.events.AddRemoteCallable("ChangeColor", function(player, idColor) {

	if (typeof player.vehicle === 'undefined') return;

	player.vehicle.primaryColor = idColor;
});


jcmp.events.AddRemoteCallable("ChangePlate", function(player, plate) {
	if (player.money < platePrice)
        return;
    
    if (typeof player.vehicle === 'undefined')
        return;

    if (!player.vehicle.personal)
        return;

    if (player.vehicle.personal.owner.networkId != player.networkId)
        return;
        
    jcmp.events.Call("UpdateVehicleData", player.vehicle, "plate", plate);
    player.personalVehicle.personal.plate = plate;
    jcmp.events.Call('SetPlayerMoney', player, -platePrice);
});


jcmp.events.AddRemoteCallable("ExitedPaynSpray", function(player) {

	if (typeof player.vehicle === 'undefined') return;

	// let position = new Vector3f(vehicle.position.x, vehicle.position.y, vehicle.position.z);

	player.vehicle.primaryColor = player.vehicle.defaultColor;
	// vehicle.position = position;
	// vehicle.driver = null;

	// player.dimension = 0;
	// vehicle.dimension = 0;
	// vehicle.SetOccupant(0, player);
});
