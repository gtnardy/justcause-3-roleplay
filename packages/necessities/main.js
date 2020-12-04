'use strict';

jcmp.events.AddRemoteCallable('DyingHungry', function(player) {

	// jcmp.events.CallRemote('chat_message', player, player.health, 255, 0, 0);
	player.health -= 2;
});

jcmp.events.AddRemoteCallable('DyingThirsty', function(player) {

	player.health -= 3;
});