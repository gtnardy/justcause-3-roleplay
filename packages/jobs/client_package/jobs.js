'use strict';

jcmp.jobs = [];
jcmp.jobTypes = [];


jcmp.events.AddRemoteCallable("VehicleReservedForJob", function(idJob) {
	jcmp.notifications.add("", jcmp.languages.get("TOWNHALL_VEHICLE_RESERVED_FOR", [jcmp.languages.get("JOB_NAME_" + idJob)]), "cancel", "cancel");
});


jcmp.events.AddRemoteCallable("VehicleReservedForTypeJob", function(idJobType) {
	jcmp.notifications.add("", jcmp.languages.get("TOWNHALL_VEHICLE_RESERVED_FOR", [jcmp.languages.get("JOBTYPE_NAME_" + idJobType)]), "cancel", "cancel");
});


jcmp.events.AddRemoteCallable("JobLevelUp", function() {
	jcmp.notifications.add("", jcmp.languages.get("JOB_LEVEL_UP"), "fireworks", "magic");
});


jcmp.events.Call("AddCommand",
	{
		command: "job",
		permissions: 1,
		callback: function(args) {
			jcmp.ui.CallEvent('chat_message', jcmp.languages.get("COMMANDS_JOB_HELP_LABEL", [jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob)]), 0, 255, 255);
			jcmp.ui.CallEvent('chat_message', jcmp.languages.get("COMMANDS_JOB_HELP_DESCRIPTION_" + jcmp.localPlayerData.idJob), 255, 255, 255);
			
			let hasCommands = false;
			for (var command in jcmp.commands) {
				if (jcmp.commands[command].idJobs && jcmp.commands[command].idJobs.indexOf(jcmp.localPlayerData.idJob) >= 0) {
					hasCommands = true;
					jcmp.events.Call("DescribeCommand", command);
					//jcmp.chat.print("/" + jcmp.commands[key].command + " [#FFFFFF]- " + jcmp.languages.get("COMMANDS_DESCRIPTION_" + jcmp.commands[key].command), 0, 255, 255);
				}
			}
			if (!hasCommands)
				jcmp.ui.CallEvent('chat_message', jcmp.languages.get("COMMANDS_JOB_HELP_NO_COMMANDS"), 255, 255, 255);
			jcmp.ui.CallEvent('chat_message', "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~", 0, 255, 255);
		}
	}
);


jcmp.ui.AddEvent('TickFiveMinutes', function() {
	if (jcmp.localPlayerData.cooldownJobChange > 0)
		jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "cooldownJobChange", Math.max(jcmp.localPlayerData.cooldownJobChange - 5, 0));

});


// Update the jobs received from server
jcmp.events.AddRemoteCallable('UpdateJobs', function(args) {
	args = JSON.parse(args);
	
	jcmp.jobs = args.jobs;
	jcmp.jobTypes = args.jobTypes;
});