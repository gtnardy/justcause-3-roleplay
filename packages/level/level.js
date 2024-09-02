'use strict';

const experienceTime = 20;


// 20 minutes give experience to everyone
setInterval(function() {
    jcmp.console.print("[SERVER] Experience time!");
    
	for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;

		let player = jcmp.loggedPlayers[p];

		if (!player.afk) {
			let experience = Math.floor(Math.min(player.maxExperience / 6, 500));
			ExperienceUP(player, experience);
			Salary(player);
			jcmp.events.CallRemote("ExperienceTime", player, experience);
        }
	}

}, experienceTime * 60000);


jcmp.events.Add('ExperienceUP', function(player, incomeExperience) {
	ExperienceUP(player, incomeExperience);
});


function Salary(player) {
	player.setValue("playedTime", player.playedTime + experienceTime);
	
	if (player.playedTime % 60 != 0)
		return;
		
	let salary = jcmp.jobs[player.idJob].salary;
	if (!salary)
		salary = 0;
	
    jcmp.events.Call('SetPlayerMoneyBank', player, salary, "Salary");
	jcmp.events.CallRemote("SalaryTime", player, salary);
        
    if ((!player.afk || player.vip && player.vip == 2) && player.moneyBank > 0) {
        let savings = 0.005;
        if (player.vip && player.vip == 2)
            savings = 0.01;
        
        let savingsValue = Math.floor(player.moneyBank * savings);
        
        jcmp.events.Call('SetPlayerMoneyBank', player, savingsValue, "Savings");

        if (player.moneyBank > 200000)
            jcmp.events.Call('SetPlayerMoneyBank', player, Math.floor((player.moneyBank - 200000) * -savings), "Income Tax");
    }
}


function ExperienceUP(player, incomeExperience) {
	// if levelled up
	if (player.experience + incomeExperience >= player.maxExperience) {

		let experience = player.experience;

		player.setValue("level", player.level + 1);
		player.setValue("maxExperience",  (player.level - 1) * 200 + 1000);
		player.experience = 0;
		
		ExperienceUP(player, experience + incomeExperience - player.maxExperience);
		
		jcmp.events.CallRemote("LevelUp", player);
		return;
	}
	
	player.setValue("experience", player.experience + incomeExperience);
}


jcmp.events.Add("PlayerValueChange", function(player, index, value) {
	if (index != "level")
        return;
    
    if (value <= 5) {
        if (!player.experienceBonuses["BONUS_NEWBIE"]) {
            player.experienceBonuses["BONUS_NEWBIE"] = 50;
            player.createValue("experienceBonuses", player.experienceBonuses);
        }
    } else {
        if (player.experienceBonuses["BONUS_NEWBIE"]) {
            delete player.experienceBonuses["BONUS_NEWBIE"];
            player.createValue("experienceBonuses", player.experienceBonuses);
        }
    }
});