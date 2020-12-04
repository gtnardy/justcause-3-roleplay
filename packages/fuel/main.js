'use strict';

jcmp.events.AddRemoteCallable('PlayerEmptyFuel', function(player) {
	const vehicle = player.vehicle;
	if (vehicle != null) {
		vehicle.driver = null;
	}
});