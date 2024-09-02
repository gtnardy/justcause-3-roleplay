'use strict';


jcmp.events.AddRemoteCallable("Deposit", function(player, quantity) {
	if (quantity <= 0)
		return;

	if (player.money < quantity) {
		quantity = Math.max(player.money, 0);
	}
	
    jcmp.events.Call('SetPlayerMoneyBank', player, quantity, "Deposit");
	jcmp.events.Call("SetPlayerMoney", player, -quantity);
});


jcmp.events.AddRemoteCallable("Withdraw", function(player, quantity) {
	if (quantity <= 0)
		return;
	
	if (player.moneyBank < quantity) {
		quantity = Math.max(player.moneyBank, 0);
	}	
	
    jcmp.events.Call('SetPlayerMoneyBank', player, -quantity, "Withdraw");
	jcmp.events.Call("SetPlayerMoney", player, quantity);
});