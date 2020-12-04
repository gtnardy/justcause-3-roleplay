'use strict';

jcmp.jobs = [];
jcmp.jobTypes = [];


jcmp.events.AddRemoteCallable("JobDone", function(player, payment, experience) {
	JobDone(player, payment, experience);
});


jcmp.events.Add("JobDone", function(player, payment, experience) {
	JobDone(player, payment, experience);
});


function JobDone(player, payment, experience) {
	payment = Math.floor(payment);
	experience = Math.floor(experience);

    let bonus = 0;
    for (let b in player.experienceBonuses) {
        bonus += player.experienceBonuses[b];
    }
    bonus = bonus / 100;

	if (payment) {
        payment += Math.floor(payment * bonus);
        jcmp.events.Call("SetPlayerMoney", player, payment);
    }

	if (experience) {
        experience += Math.floor(experience * bonus);
        jcmp.events.Call("ExperienceUP", player, experience);

        if (player.jobLevels && [1, 3, 5, 18].indexOf(player.idJob) == -1) {
            
            if (!player.jobLevels[player.idJob]) {
                player.jobLevels[player.idJob] = {
                    level: 1,
                    experience: 0,
                    maxExperience: 500,
                };
            }

            player.jobLevels[player.idJob].experience += experience;
            
            if (player.jobLevels[player.idJob].experience >= player.jobLevels[player.idJob].maxExperience) {
                player.jobLevels[player.idJob].level++;
                player.jobLevels[player.idJob].experience -= player.jobLevels[player.idJob].maxExperience;
                player.jobLevels[player.idJob].maxExperience = (player.jobLevels[player.idJob].level - 1) * 100 + 500;
                jcmp.events.CallRemote("JobLevelUp", player);
            }

            let sqlData = [
                player.client.steamId,
                player.idJob,
                player.jobLevels[player.idJob].experience,
                player.jobLevels[player.idJob].level,
            ];

            jcmp.SQL.execute(
                `INSERT INTO JobLevel (idPlayer, idJob, experience, level) 
                VALUES( 
                    '${player.client.steamId}',
                    ${player.idJob},
                    ${player.jobLevels[player.idJob].experience},
                    ${player.jobLevels[player.idJob].level}
                )

                ON DUPLICATE KEY UPDATE 
                    idPlayer = '${player.client.steamId}',
                    idJob = ${player.idJob},
                    experience = ${player.jobLevels[player.idJob].experience},
                    level = ${player.jobLevels[player.idJob].level};`,
                null
            );

            player.createValue("jobLevels", player.jobLevels);
        }
    }
}


jcmp.events.Add("PlayerValueChange", function(player, index, value) {
	if (index != "idJob")
		return;

	player.setValue("color", jcmp.jobs[value].color);
});


jcmp.events.Add("ServerLoaded", function() {
	// Load from database all Sites
	jcmp.SQL.query(
		`SELECT
			*
		FROM Job
		ORDER BY level`,
		null,
		function (rows) {
			rows.forEach(function(row) {
				jcmp.jobs[row.id] = row;
			});
		}
	);

	for (let idJobType = 1; idJobType <= 3; idJobType++) {
		jcmp.SQL.query(
			`SELECT
				*
			FROM Job
			WHERE idJobType = ?
			ORDER BY level`,
			[idJobType],
			function (rows) {
				jcmp.jobTypes[idJobType] = rows;
			}
		);
	}
});


function SendToPlayer(player) {
	jcmp.events.CallRemote("UpdateJobs", player, JSON.stringify({jobTypes: jcmp.jobTypes, jobs: jcmp.jobs}));
}


jcmp.events.Add("PlayerLoaded", function(player) {
	SendToPlayer(player);
});