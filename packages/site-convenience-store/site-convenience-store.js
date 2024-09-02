'use strict';

const priceRadios = {
	hasRadioFalloutNewVegas: 9000
};

const priceParachute = 5000;
const priceWingsuit = 7000;
const priceWingsuitLevel = [];
priceWingsuitLevel[1] = 3000;
priceWingsuitLevel[2] = 6000;
priceWingsuitLevel[3] = 9000;


jcmp.events.AddRemoteCallable("BuyParachute", function(player) {
	if (player.money < priceParachute)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -priceParachute);
	player.setValue("hasParachute", true);
});


jcmp.events.AddRemoteCallable("BuyWingsuit", function(player) {
	if (player.money < priceWingsuit || player.vip != 2)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -priceWingsuit);
	player.setValue("hasWingsuit", true);
});


jcmp.events.AddRemoteCallable("BuyRadio", function(player, radio) {
	if (player.money < priceRadios[radio] || !player.vip)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -priceRadios[radio]);
	player.setValue(radio, true);
});


jcmp.events.AddRemoteCallable("BuyWingsuitLevel", function(player, level) {
	if (!priceWingsuitLevel[level])
		return;
	
	if (player.money < priceWingsuitLevel[level] || player.vip != 2)
		return;
	
	jcmp.events.Call("SetPlayerMoney", player, -priceWingsuitLevel[level]);
	player.setValue("wingsuitLevel", level);
});