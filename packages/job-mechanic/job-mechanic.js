'use strict';

jcmp.events.AddRemoteCallable("MECHANIC_GETIN", function(player, networkId) {
    let vehicle = null;
    for (let v = jcmp.vehicles.length - 1; v >= 0; v--) {
        if (typeof jcmp.vehicles[v] === 'undefined')
            continue;
        if (jcmp.utils.vector3.distance(jcmp.vehicles[v].position, player.position) < 3) {
            vehicle = jcmp.vehicles[v];
            break;
        }
    }

    if (!vehicle)
        return;
        
    vehicle.SetOccupant(0, player);
});


jcmp.events.AddRemoteCallable("MECHANIC_PAINT", function(player, color, price) {
	if (typeof player.vehicle === 'undefined') return;
    if (player.money < price) return;
    
    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "primaryColor", color);

	player.vehicle.primaryColor = color;
    jcmp.events.Call("SetPlayerMoney", player, -price);
});


jcmp.events.AddRemoteCallable("MECHANIC_REPAIR", function(player, price) {
	if (typeof player.vehicle === 'undefined') return;
    if (player.money < price) return;

	player.vehicle.health = 1000;
    jcmp.events.Call("SetPlayerMoney", player, -price);
});


jcmp.events.AddRemoteCallable("MECHANIC_NITRO", function(player, price) {
	if (typeof player.vehicle === 'undefined') return;
    if (player.money < price) return;
    
    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "nitroEnabled", true);

	player.vehicle.nitroEnabled = true;
    jcmp.events.Call("SetPlayerMoney", player, -price);
});


jcmp.events.AddRemoteCallable("MECHANIC_TURBOJUMP", function(player, price) {
	if (typeof player.vehicle === 'undefined') return;
    if (player.money < price) return;

    if (player.vehicle.personal)
        jcmp.events.Call("UpdateVehicleData", player.vehicle, "turboJumpEnabled", true);

	player.vehicle.turboJumpEnabled = true;
    jcmp.events.Call("SetPlayerMoney", player, -price);
});


jcmp.events.AddRemoteCallable("MECHANIC_ROLLOVER", function(player, price) {
	if (typeof player.vehicle === 'undefined') return;
    if (player.money < price) return;

	let pos = new Vector3f(player.vehicle.position.x, player.vehicle.position.y + 0.5, player.vehicle.position.z);
	let rot = new Vector3f(player.vehicle.rotation.x, player.vehicle.rotation.y, 0);

	(player.vehicle).position = pos;
	(player.vehicle).rotation = rot;
    jcmp.events.Call("SetPlayerMoney", player, -price);
});
