'use strict';


jcmp.events.AddRemoteCallable("AddReport", function(player, text) {
	
	jcmp.SQL.execute(
		"INSERT INTO Report SET ?",
		{
			idPlayer: player.client.steamId,
			playerPosition: jcmp.utils.vector3.stringify(player.position),
			text: text
		}
	);
	
    for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

		if (jcmp.loggedPlayers[p].permissions >= 2) {
			jcmp.chat.send(jcmp.loggedPlayers[p], "[REPORT] " + player.nname + ": " + text, 0, 255, 255);
		}
	}
	
	jcmp.console.print("[REPORT] " + player.nname + ": " + text);
});


jcmp.events.AddRemoteCallable("ListReports", function(player, text) {
	
	jcmp.SQL.query(
		`SELECT
			Report.id,
			idPlayer,
			Player.nname AS 'name',
			playerPosition,
			date,
			text
		FROM Report INNER JOIN Player ON Player.id = idPlayer`,
		null,
		function(rows) {
			jcmp.chat.send(player, "~~~~~~~~~~~~~ Reports ~~~~~~~~~~~~~", 0, 255, 255);
			for (var key in rows) {
				jcmp.chat.send(player, "#" + rows[key].id + " [" + rows[key].date + "] " + rows[key].name + ": " + rows[key].text, 0, 255, 255);
			}
			jcmp.chat.send(player, "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", 0, 255, 255);
		}
	);
});


jcmp.events.AddRemoteCallable("DeleteReport", function(player, idReport) {
	
	jcmp.SQL.execute(
		`DELETE FROM Report WHERE id = ?`,
		[idReport]
	);
	
	jcmp.chat.send(player, "Report #" + idReport + " removed.", 0, 255, 255);
});

jcmp.events.AddRemoteCallable("GotoReport", function(player, idReport) {
	
	jcmp.SQL.query(
		`SELECT
			playerPosition
		FROM Report WHERE id = ?`,
		[idReport],
		function(rows) {
			if (rows.length > 0) {
				player.position = jcmp.utils.vector3.parse(rows[0].playerPosition);
				jcmp.chat.send(player, "Teleporting...", 0, 255, 255);
			} else {
				jcmp.chat.send(player, "Report not found!", 255, 0, 0);
			}
		}
	);
});