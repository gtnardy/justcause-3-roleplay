'use strict';

jcmp.events.AddRemoteCallable('spawnmenu/remote/spawnVehicle', (player, modelhash) => {
    if (jcmp.events.Call('spawnmenu/local/spawnVehicle', player, modelhash).filter(r => r === false).length > 0) {
        return;
    }

    const vehicle = new Vehicle(modelhash, player.aimPosition, player.rotation);
    jcmp.events.Call('spawnmenu/local/vehicleSpawned', player, vehicle);
});

jcmp.events.AddRemoteCallable('spawnmenu/remote/spawnWeapon', (player, modelhash) => {
    if (jcmp.events.Call('spawnmenu/local/spawnWeapon', player, modelhash).filter(r => r === false).length > 0) {
        return;
    }

    player.GiveWeapon(modelhash, 398, true);
    jcmp.events.Call('spawnmenu/local/weaponSpawned', player, modelhash);
});

jcmp.events.AddRemoteCallable('spawnmenu/remote/toggleAttr', (player, nitrous, enabled) => {
    jcmp.events.Call('spawnmenu/local/attrToggled', player, nitrous, enabled);

    if (typeof player.vehicle !== 'undefined') {
        if (nitrous) {
            player.vehicle.nitroEnabled = enabled;
        } else {
            player.vehicle.turboJumpEnabled = enabled;
        }
    }
});