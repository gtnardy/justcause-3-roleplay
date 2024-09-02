'use strict';

jcmp.events.AddRemoteCallable("BuySnackBarItem", function(player, hungry, thirsty, itemPrice, itemHunger, itemThirst) {
	
	if (player.money < itemPrice) {
		return;
	}
	
	jcmp.events.Call("SetPlayerMoney", player, -itemPrice);
	player.setValue("thirsty", Math.min(thirsty + itemThirst, 100));
	player.setValue("hungry", Math.min(hungry + itemHunger, 100));
});