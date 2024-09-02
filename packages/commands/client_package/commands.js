'use strict';

jcmp.commands = {};

var commandsTimeout = [];


jcmp.events.Add('LocalPlayerChat', (msg) => {
	if (msg.startsWith('/')) {
		let args = msg.match(/(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')|(\S+)/g) || [];

		for(var i = 1; i < args.length; i++) {
			if(args[i].substr(0, 1) === '"' || args[i].substr(0,1) === "'")
				args[i] = JSON.parse(args[i]);
		}

		let commandName = args.splice(0, 1)[0].substr(1);
		
		jcmp.events.Call('ExecuteCommand', commandName, args);
		return false;
	}
});


jcmp.ui.AddEvent('TickSecond', function() {
	for (var key in commandsTimeout) {
		commandsTimeout[key].timeout--;
		if (commandsTimeout[key].timeout <= 0) {
			commandsTimeout[key].timeout = null;
			//delete commandsTimeout[key];
			commandsTimeout.splice(key, 1);
		}
	}

});


function executeCommand(command, args) {

	let commandData = jcmp.commands[command];

	if (!commandData) {
		jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_COMMAND_DOESNT_EXIST"), "cancel", "cancel");
		return;
	}

	if (jcmp.localPlayerData.arrested && jcmp.localPlayerData.permissions != 4 && ["lawyer", "afk", "help", "report"].indexOf(command) == -1) {
		jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_NOT_ALLOWED_NOW"), "cancel", "cancel");
		return;
	}

	if (jcmp.localPlayerData.handcuffed || ((jcmp.localPlayerData.testingDriving || jcmp.localPlayerData.racing) && ["afk"].indexOf(command) == -1)) {
		jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_NOT_ALLOWED_NOW"), "cancel", "cancel");
		return;
	}

	if (commandData.permissions > jcmp.localPlayerData.permissions || (commandData.idJobs && commandData.idJobs.indexOf(jcmp.localPlayerData.idJob) == -1)) {
		jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_COMMAND_NOT_PERMISSION"), "cancel", "cancel");
		return;
	}

	if (commandData.timeout) {
		jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_MUST_WAIT", [commandData.timeout]), "cancel", "cancel");
		return;
	}

	let commandDataMajor = commandData;

	let subcommand = null;
	if (commandData.subcommands) {

		subcommand = args[0];

		if (!subcommand) {
			jcmp.chat.print(jcmp.languages.get("COMMANDS_CORRECT_USAGE"), 255, 0, 0);
			describeCommand(command, commandData);
			return;
		}

		if (!commandData.subcommands[subcommand]) {
			jcmp.notifications.add(jcmp.languages.get("COMMON_COMMAND"), jcmp.languages.get("COMMANDS_COMMAND_DOESNT_EXIST"), "cancel", 15, true, false, "cancel");
			describeCommand(command, commandData);
			return;
		}

		args.splice(0, 1);
		commandData = commandData.subcommands[subcommand];
	}

	let returnArgs = {};

	if (commandData.parameters) {

		if (commandData.parameters.length == 1 && commandData.parameters[0].type != "number" && args.length > 0) {
			args = [args.join(" ")];
		}

		if (args.length == 0 || args.length != commandData.parameters.length) {
			jcmp.chat.print(jcmp.languages.get("COMMANDS_CORRECT_USAGE"), 255, 0, 0);
			describeSubcommand(command, subcommand, commandData);
			return;
		}

		for (var i = 0; i < commandData.parameters.length; i++) {

			let data = jcmp.utils.validateData(commandData.parameters[i].type, args[i]);

			if (!isValidData(commandData.parameters[i].parameter, commandData.parameters[i].type, data))
				return;

			returnArgs[commandData.parameters[i].parameter] = data;
		}
	}

	if (commandData.callback(returnArgs) && commandDataMajor.cooldown) {
		commandDataMajor.timeout = commandDataMajor.cooldown;
		commandsTimeout.push(commandDataMajor);
	}
}


jcmp.events.Add("ExecuteCommand", function(command, args) {
	executeCommand(command, args);
});


jcmp.events.Add("AddCommand", function(args) {
	jcmp.commands[args.command] = args;
});


jcmp.events.Add("DescribeCommand", function(command) {
	describeCommand(command, jcmp.commands[command]);
});


function describeCommand(command, commandData) {

	//let commandData = jcmp.commands[command];

	if (!commandData) {
		jcmp.chat.print("command not found", 255, 0, 0);
		return;
	}

	if (commandData.subcommands) {
		for (var subcommand in commandData.subcommands) {
			describeSubcommand(command, subcommand, commandData.subcommands[subcommand]);
		}
	} else {
		describeSubcommand(command, null, commandData);
	}

}


function describeSubcommand(command, subcommand, commandData) {

	let commandStr = "[#00FFFF]/" + command;
	let descriptionStr = "COMMANDS_DESCRIPTION_" + command;

	if (subcommand)	{
		commandStr += " " + subcommand;
		descriptionStr += "_" + subcommand;
	}

	if (commandData.parameters) {

		commandStr += "[#00CED1]";
		for (var p = 0; p < commandData.parameters.length; p++) {

			let parameter = commandData.parameters[p];
			if (parameter.type == "player" || parameter.type == "cplayer" || parameter.type == "ccplayer" || parameter.type == "splayer")
				commandStr += " [" + jcmp.languages.get("COMMANDS_DESCRIPTION_COMMON_PLAYER") + "]";
			else
				commandStr += " [" + jcmp.languages.get(descriptionStr + "_" + parameter.parameter) + "]";
		}
	}

	commandStr += " [#ffffff]// " + jcmp.languages.get(descriptionStr);
	jcmp.chat.print(commandStr, 255, 0, 0);
}


function isValidData(name, type, data) {

	if (data === null) {

		switch(type) {
			case "number":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_MUST_BE_NUMBER", [name]), "cancel", "cancel");
				return false;

			case "panumber":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_MUST_BE_POSITIVE_NUMBER", [name]), "cancel", "cancel");
				return false;

			case "player":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_PLAYER_NOT_FOUND"), "cancel", "cancel");
				return false;

			case "oplayer":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_PLAYER_NOT_FOUND"), "cancel", "cancel");
				return false;

			case "cplayer":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_PLAYER_NOT_CLOSE"), "cancel", "cancel");
				return false;

			case "splayer":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_PLAYER_NOT_CLOSE"), "cancel", "cancel");
				return false;

			case "ccplayer":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_PLAYER_NOT_CLOSE"), "cancel", "cancel");
				return false;

			case "position":
				jcmp.notifications.add("", jcmp.languages.get("COMMANDS_INVALID_POSITION"), "cancel", "cancel");
				return false;
		}
	}

	if (data === false) return false;

	return true;
}
