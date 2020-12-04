'use strict';

const tank = 100;
jcmp.fuelValue = 2;


function Fuel(player, currentFuel, quantity) {
	
	if (quantity > 0) {
		quantity = Number(Math.min(currentFuel + quantity, tank) - currentFuel);
		const price = Math.floor(quantity * jcmp.fuelValue);
		
		if (player.money >= price) {
			player.setValue("fuel", currentFuel + quantity);
			jcmp.events.Call("SetPlayerMoney", player, -price);
		}
	}
};


jcmp.events.AddRemoteCallable('Fuel', function(player, currentFuel, quantity) {
	Fuel(player, currentFuel, quantity);
});