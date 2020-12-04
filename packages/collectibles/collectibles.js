'use strict';

jcmp.events.AddRemoteCallable("FoundCollectible", function(player, type) {
    let reward = 200; // SHRINE

    if (type == "AUDIOTAPE")
        reward = 100;

    if (type == "TREASURE")
        reward = 200;

    if (type == "TOMB")
        reward = 300;
    
    jcmp.events.Call("SetPlayerMoney", player, reward / 2);
    jcmp.events.Call("ExperienceUP", player, reward);
});