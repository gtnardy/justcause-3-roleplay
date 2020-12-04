'use strict';

jcmp.events.AddRemoteCallable("Announce", function(player, text) {
	Announce(player.nname, text);
});

jcmp.events.Add("Announce", function(title, text) {
	Announce(title, text);
});

function Announce(title, text) {
	jcmp.notifications.broadcast("[#3498db]NEWS - " + title, "<i>" + text + "</i>", false, "newspaper", 30, true, false, "paper");

	if (jcmp.news.length >= 6)
		jcmp.news.pop();
        
	jcmp.news.unshift({text: text, player: title, date: jcmp.utils.getDate("fullwseconds")});
}