jcmp.events.AddRemoteCallable("TaxiStartRun", function(player, extra, priceKilometer) {
	if (typeof player.vehicle === 'undefined')
		return;

	let passenger = player.vehicle.GetOccupant(1);
	if (!passenger) {
		jcmp.events.CallRemote("TaxiNoPassenger", player);
		return;
	}

	if (passenger.money < extra) {
		jcmp.events.CallRemote("TaxiPassengerNoMoney", player);
		return;
	}

	jcmp.events.CallRemote("TaxiStartedRun", player, passenger.networkId, priceKilometer);
	jcmp.events.CallRemote("TaxiStartedRunPassenger", passenger, player.networkId, priceKilometer);
});


jcmp.events.AddRemoteCallable("TaxiPay", function(passenger, value) {
	if (passenger.money <= 0) return;
	passenger.setValue("money", passenger.money - value);
});


jcmp.events.AddRemoteCallable("TaxiReceive", function(driver, value) {
	jcmp.events.Call("JobDone", driver, value, value * 6);
});


jcmp.events.AddRemoteCallable("TaxiEndRun", function(player, otherNetworkId) {
	let other = jcmp.utils.player.getById(otherNetworkId);

	if (!other)
		return;

	jcmp.events.CallRemote("TaxiEndedRun", other);
});