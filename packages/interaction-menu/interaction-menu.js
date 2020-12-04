
const priceKillYourself = 300;

jcmp.events.AddRemoteCallable("KillYourself", function(player) {
	if (player.moneyBank < priceKillYourself)
		return;
	
    jcmp.events.Call('SetPlayerMoneyBank', player, -priceKillYourself, "Suicide");
	player.health = 0;
});