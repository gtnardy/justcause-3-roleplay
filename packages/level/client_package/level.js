'use strict';

jcmp.events.AddRemoteCallable("LevelUp", function() {
	jcmp.notifications.add("", jcmp.languages.get("LEVEL_UP"), "fireworks", "magic");
});


jcmp.events.AddRemoteCallable("ExperienceTime", function(experience) {	
	jcmp.notifications.add("", jcmp.languages.get("LEVEL_EXPERIENCE_TIME", [experience]), "hourglass");
});


jcmp.events.AddRemoteCallable("SalaryTime", function(salary) {
	jcmp.notifications.add("", jcmp.languages.get("LEVEL_SALARY_TIME", [salary]), "salary");
});