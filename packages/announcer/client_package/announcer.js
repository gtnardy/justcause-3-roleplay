'use strict';

var announce_count = 16;
var actualAnnounce = 0;

jcmp.ui.AddEvent('TickFiveMinutes', function() {
	if (announce_count == 0 || jcmp.localPlayerData.level > 10) return;
	jcmp.notifications.add(jcmp.languages.get("ANNOUNCE_LABEL"), jcmp.languages.get("ANNOUNCE_" + actualAnnounce), "info", false);
	actualAnnounce = ++actualAnnounce % announce_count;
	
});