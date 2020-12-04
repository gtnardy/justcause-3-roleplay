'use strict';


// function NewVIPCode() {
	// jcmp.SQL.query(
	// `INSERT INTO VIPCode SET ?`,
	// {code: , available: 1});
// }
jcmp.events.Add("PlayerLoaded", function(player) {
	UpdateVIP(player);
});


function UpdateVIP(player) {
	jcmp.SQL.query(
		`SELECT
			level
		FROM VIP
		WHERE
			idPlayer = ?
			AND NOW() <= finishDate
		ORDER BY finishDate ASC
		LIMIT 1`,
		player.client.steamId,
		function (vipLevel) {

			if (vipLevel.length > 0) {
                let tags = player.tags;
                tags.push({name: 'VIP', color: "#f1c40f"});
                
                player.createValue("tags", tags);
                player.createValue("vip", vipLevel[0].level);
                
                if (vipLevel[0].level == 2 && !player.experienceBonuses["BONUS_VIP"]) {
                    player.experienceBonuses["BONUS_VIP"] = 5;
                    player.createValue("experienceBonuses", player.experienceBonuses);
                }
                    
				jcmp.SQL.query(
					`SELECT
						DATE_FORMAT(finishDate, "%d %M %Y") AS 'finishDate'
					FROM VIP
					WHERE
						idPlayer = ?
						AND NOW() <= finishDate
					ORDER BY finishDate ASC
					LIMIT 1`,
					player.client.steamId,
					function (vipFinishDate) {
						if (vipFinishDate.length > 0) {
							player.createValue("vipFinishDate", vipFinishDate[0].finishDate);
						}
                    },
                    player
				);
			}
        },
        player
	);
}


jcmp.events.AddRemoteCallable("ActivateVip", function(player, code) {
	NewVIP(player, code);
});


function NewVIP(player, code) {

	jcmp.SQL.query(
		`SELECT
			id,
			level
		FROM VIPCode
		WHERE
			id = ?
		LIMIT 1`,
		code,
		function (vipCode) {
			if (vipCode.length == 0) {
				jcmp.chat.send(player, "Invalid VIP code!", 255, 0, 0);
				return;
			}

			jcmp.SQL.query(
				`SELECT
					finishDate
				FROM VIP
				WHERE
					idPlayer = ? AND
					finishDate >= NOW()
				ORDER BY finishDate DESC
				LIMIT 1`,
				player.client.steamId,
				function (results) {

					let date = jcmp.utils.getDate("fullwtime");

					// ja tem vip
					if (results.length > 0) {
						date = results[0].finishDate;
					}

					jcmp.SQL.query(
						"INSERT INTO VIP SET idPlayer = ?, finishDate = DATE_FORMAT(NOW() + INTERVAL 30 DAY, '%Y-%m-%d'), level = ?, vipCode = ?",
						[player.client.steamId, vipCode[0].level, vipCode[0].id],
						function (results) {
							jcmp.chat.broadcast("[SERVER] The player " + player.nname + " has just activated his VIP! Congratulations!", 255, 20, 147);

							if (vipCode[0].level == 1) {
                                jcmp.events.Call("SetPlayerMoney", player, 10000);
                                jcmp.events.Call("ExperienceUP", player, 5000);
							} else if (vipCode[0].level == 2) {
                                jcmp.events.Call("SetPlayerMoney", player, 30000);
                                jcmp.events.Call("ExperienceUP", player, 15000);
							}
							UpdateVIP(player);

							jcmp.SQL.query(
								`DELETE FROM VIPCode WHERE id = ?`,
								[vipCode[0].id],
								function (a) {}
							);

						}
					);

				}
			);

		}
	);


}
