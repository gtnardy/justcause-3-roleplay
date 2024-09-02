
jcmp.events.AddRemoteCallable("Anchor", function(player) {
	if (typeof player.vehicle === 'undefined')
		return;

	player.vehicle.linearVelocity = new Vector3f(0, 0, 0);
});
