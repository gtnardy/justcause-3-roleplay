'use strict';

var gpsPOI = null;
var gpsBlacklist = ["9", "10", "11", "13", "15", "16", "18", "19", "23"];
var gpsPOI = null;

const priceKillYourself = 300;
const SERVICES_JOBS = ["PARAMEDIC", "TAXI", /*"POLICE",*/ "LAWYER", "MECHANIC"];

function clearGPS() {
	jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_CLEARED"), success: true});
	if (gpsPOI) {
		gpsPOI.Destroy();
		gpsPOI = null;
	}
}


jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
	if (key != 77) return;

	if (allowed) {
		Menu();
	}
});


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id == "MODERATION_SITE_NAME")
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETSITE_NAME", {value: value, subTxt: value, success: true});

	if (id == "MODERATION_SITE_MINDISTANCE")
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE", {value: Number(value), subTxt: value, success: true});
});


jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.itemId == "GPS_LIST") {
		setGPS(args.value);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_NEWSPAPER") {
		jcmp.events.Call("ActiveNewspaper", true);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_NATIONALID") {
		jcmp.ui.CallEvent("ActiveNationalID", JSON.stringify({
            id: jcmp.localPlayerData.steamId,
            name: jcmp.localPlayerData.nname,
            job: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
            land: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.licenseCar),
            landBike: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.licenseBike),
            sea: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.licenseSea),
            air: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.licensePlane),
            airHelis: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.licenseHeli),
            health: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.healthInsurance),
            life: jcmp.languages.get("COMMON_YESNO_" + jcmp.localPlayerData.lifeInsurance),
            country: jcmp.localPlayerData.country,
        }));
        return;
	}

	if (args.itemId == "INTERACTION_MENU_HELPEPANEL") {
		jcmp.ui.CallEvent("ActiveHelpPanel", true);
		return;
	}

	if (args.bodyId == "INTERACTION_MENU_MODERATION_KICK_LIST") {
		if (!jcmp.utils.checkPermissions(2))
			return;

		jcmp.events.CallRemote("KickPlayer", args.value);
		return;
	}

	if (args.bodyId == "INTERACTION_MENU_SERVICES_LIST") {
		jcmp.events.Call("ServicesMakeCall", args.value, 60);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_MODERATION_SETSITE_NAME") {
		jcmp.events.Call("SetInputText", "MODERATION_SITE_NAME", jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_NAME"), args.value, 30);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE") {
		jcmp.events.Call("SetInputText", "MODERATION_SITE_MINDISTANCE", jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE"), args.value, 5);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_MODERATION_SETVEHICLE_SET") {
		if (!jcmp.utils.checkPermissions(3))
			return;

		if (!jcmp.localPlayerData.vehicle) {
			jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST", {notify: "You must be in a vehicle", error: true});
			return;
		}

		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST", {notify: "Setting actual vehicle in your actual position...", success: true});
		jcmp.events.CallRemote("SetVehicle", -1, args.values["INTERACTION_MENU_MODERATION_SETVEHICLE_JOB"]);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_MODERATION_SETSITE_SET") {
		if (!jcmp.utils.checkPermissions(3))
			return;

		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST", {notify: "Setting site", success: true});
		jcmp.events.CallRemote("SetVehicle", -1, args.values["INTERACTION_MENU_MODERATION_SETVEHICLE_JOB"]);
		jcmp.events.CallRemote("SetSite", args.values["INTERACTION_MENU_MODERATION_SETSITE_NAME"], args.values["INTERACTION_MENU_MODERATION_SETSITE_IDSITETYPE"], args.values["INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE"], jcmp.localPlayerData.sites[10] ? jcmp.localPlayerData.sites[10].id : -1);
		return;
	}

	if (args.itemId == "INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE") {
		if (!jcmp.utils.checkPermissions(3))
			return;

		if (!jcmp.localPlayerData.vehicle) {
			jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST", {notify: "You must be in a vehicle", error: true});
			return;
		}

		jcmp.events.CallRemote("DelVehicle");
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST", {notify: "Deleting this vehicle spawn (if exists)...", success: true});
		return;
	}

	if (args.itemId == "INTERACTION_MENU_KILLYOURSELF") {

		if (jcmp.localPlayerData.moneyBank < priceKillYourself) {
			jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY_IN_BANK"), error: true});
			return;
		}

		jcmp.events.CallRemote("KillYourself");
		return;
    }
    
	if (args.itemId == "INTERACTION_MENU_PERSONALVEHICLE_LOCATE") {
		jcmp.events.CallRemote("PersonalVehicleGetPOI");
        return;
    }
    
	if (args.itemId == "INTERACTION_MENU_PERSONALVEHICLE_LOCK") {
        jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_PERSONALVEHICLE_LOCK", {subTxt: jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.locked ? jcmp.languages.get("HOUSE_VEHICLE_UNLOCKED") :  jcmp.languages.get("HOUSE_VEHICLE_LOCKED"), success: true});
        jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.locked = !jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.locked;
        
        jcmp.events.CallRemote("SwitchLockPersonalVehicle");
        return;
    }
});


jcmp.events.AddRemoteCallable("PersonalVehicleSetPOI", function(position) {
	setPOI(jcmp.utils.vector3.parse(position), jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.plate);
});


jcmp.events.Add("SetGPS", function(position, text) {
	setPOI(position, text);
});


jcmp.events.Add("ClearGPS", function() {
	clearGPS();
});


jcmp.events.Add("CustomMenuSelected_interaction-menu-custom-menu", function(args) {
    if (args.hover)
        return;
        
	if (args.itemId == "INTERACTION_MENU_LASTRADIO")
	    jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "lastRadio", args.value);

	if (args.itemId == "INTERACTION_MENU_SOUNDTRACK")
	    jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "soundtrackVolume", args.value);
});


function setupItemGPS(menu) {
	let item_gps = {
		id: "GPS_LIST",
		txt: jcmp.languages.get("GPS_LABEL"),
		description: jcmp.languages.get("GPS_LABEL_DESCRIPTION"),
		innerValues: [
			{txt: jcmp.languages.get("GPS_CLEAR"), value: "0"},
			{txt: jcmp.languages.get("GPS_JOB_SPAWN"), value: "-1"},
		],
	};

	if (jcmp.localPlayerData.house) {
		item_gps.innerValues.push({txt: jcmp.languages.get("GPS_HOUSE_LOCATION"), value: "-2"});
	}

	for (let key in jcmp.sitesType) {
		if (gpsBlacklist.indexOf(key) == -1) {
			let item = {txt: jcmp.languages.get("SITE_NAME_" + key), value: key};
			item_gps.innerValues.push(item);
		}
	}

	menu.body.items.push(item_gps);
}

function setupItemPreferences(menu) {
	let item_preferences = {
		id: "INTERACTION_MENU_PREFERENCES",
		txt: jcmp.languages.get("INTERACTION_MENU_PREFERENCES"),
		description: jcmp.languages.get("INTERACTION_MENU_PREFERENCES_DESCRIPTION"),
		body: {
			id: "INTERACTION_MENU_PREFERENCES_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_PREFERENCES")},
			items: [],
		}
	};

	let item_preferences_lastradio = {
		id: "INTERACTION_MENU_LASTRADIO",
		txt: jcmp.languages.get("INTERACTION_MENU_LASTRADIO"),
		description: jcmp.languages.get("INTERACTION_MENU_LASTRADIO_DESCRIPTION"),
		innerValues: [
			{txt: "Radio Off", value: 0},
			{txt: "K-DST", value: 3},
			{txt: "K-Rose", value: 2},
			{txt: "K-Jah West", value: 9},
			{txt: "Radio X", value: 7},
			{txt: "Master Sounds 98.3", value: 10},
			{txt: "SF-UR", value: 5},
			{txt: "Bounce FM", value: 4},
			{txt: "CSR 103.9", value: 8},
			{txt: "Playback FM", value: 1},
			{txt: "Radio Los Santos", value: 6},
			{txt: "WCTR", value: 11},
		],
	};

	if (jcmp.localPlayerData.hasRadioFalloutNewVegas) {
		item_preferences_lastradio.innerValues.push({txt: "New Vegas", value: 12});
		item_preferences_lastradio.innerValues.push({txt: "Mojave", value: 13});
	}

	item_preferences_lastradio.innerValues[jcmp.localPlayerData.lastRadio].default = true;
	item_preferences.body.items.push(item_preferences_lastradio);

	let item_preferences_soundtrack = {
		id: "INTERACTION_MENU_SOUNDTRACK",
		txt: jcmp.languages.get("INTERACTION_MENU_SOUNDTRACK"),
		description: jcmp.languages.get("INTERACTION_MENU_SOUNDTRACK_DESCRIPTION"),
		innerValues: [
			{txt: "OFF", value: 0},
			{txt: "1", value: 1},
			{txt: "2", value: 2},
			{txt: "3", value: 3},
			{txt: "4", value: 4},
			{txt: "5", value: 5},
			{txt: "6", value: 6},
			{txt: "7", value: 7},
			{txt: "8", value: 8},
			{txt: "9", value: 9},
			{txt: "10", value: 10},
		],
	};

	item_preferences_soundtrack.innerValues[jcmp.localPlayerData.soundtrackVolume].default = true;
	item_preferences.body.items.push(item_preferences_soundtrack);

	menu.body.items.push(item_preferences);
}

function setupItemMyJob(menu) {
	let returns = jcmp.events.Call("GetJobInteractionMenu");
	let items_job_custom = [];

	for (let e in returns) {
		if (returns[e])
			items_job_custom = returns[e];
	}

	let job = jcmp.jobs[jcmp.localPlayerData.idJob];

	let item_job_commands = {
		id: "INTERACTION_MENU_JOB_COMMANDS",
		txt: jcmp.languages.get("INTERACTION_MENU_JOB_COMMANDS"),
		description: jcmp.languages.get("INTERACTION_MENU_JOB_COMMANDS_DESCRIPTION"),
		body: {
			id: "INTERACTION_MENU_JOB_COMMANDS_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_JOB_COMMANDS")},
			items: [],
		}
	};

	let hasCommands = false;
	for (let command in jcmp.commands) {
		if (jcmp.commands[command].idJobs && jcmp.commands[command].idJobs.indexOf(jcmp.localPlayerData.idJob) >= 0) {
			hasCommands = true;

			let languageCommand = "COMMANDS_DESCRIPTION_" + jcmp.commands[command].command;

			let item_command = {
				id: "INTERACTION_MENU_JOB_COMMAND_" + command,
				txt: "/" + jcmp.commands[command].command,
				description: jcmp.languages.get(languageCommand),
				descriptionList: [],
			};

			for (let p in jcmp.commands[command].parameters) {

				let languageParameter = languageCommand;
				if (jcmp.commands[command].parameters[p].parameter == "player")
					languageParameter = "COMMANDS_DESCRIPTION_COMMON_PLAYER";
				else
					languageParameter += "_" + jcmp.commands[command].parameters[p].parameter;

				item_command.txt += " <span style='color: #00CED1'>[" + jcmp.languages.get(languageParameter) + "]</span>";
			}

			item_job_commands.body.items.push(item_command);
		}
	}

	if (hasCommands)
        items_job_custom.unshift(item_job_commands);

	items_job_custom.unshift({
		id: "INTERACTION_MENU_JOB_INFORMATION",
		txt: jcmp.languages.get("INTERACTION_MENU_JOB_INFORMATION"),
		description: jcmp.languages.get("JOB_TUTORIAL_" + jcmp.localPlayerData.idJob),
		descriptionList: [
			{txt: jcmp.languages.get("TOWNHALL_LABEL_SALARY"), subTxt: "$" + job.salary},
		],
	});
	
	let item_job = {
		id: "INTERACTION_MENU_JOB",
		txt: jcmp.languages.get("INTERACTION_MENU_MY_JOB"),
		subTxt: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
		description: jcmp.languages.get("INTERACTION_MENU_JOB_DESCRIPTION"),
		body: {
			id: "INTERACTION_MENU_JOB_LIST",
			subheader: {txt: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob)},
			items: items_job_custom,
		}
	};

	menu.body.items.push(item_job);
}

function setupItemServices(menu) {
	let items_services = [];
	
	for (let i = SERVICES_JOBS.length - 1; i >= 0; i--) {
		let item = {
			id: "INTERACTION_MENU_SERVICES_" + SERVICES_JOBS[i],
			txt: jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + SERVICES_JOBS[i]),
			description: jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_DESCRIPTION_" + SERVICES_JOBS[i]),
			special: "close",
			value: SERVICES_JOBS[i],
		};
		
		if (jcmp.localPlayerData.arrested) {
			item.disabled = true;
			if (SERVICES_JOBS[i] == "LAWYER")
				item.disabled = false;
		} else if (SERVICES_JOBS[i] == "LAWYER")
			item.disabled = true;

		if (jcmp.myServicesCalls[SERVICES_JOBS[i]])
			item.disabled = true;

		items_services.push(item);
	}

	let item_services = {
		id: "INTERACTION_MENU_SERVICES",
		txt: jcmp.languages.get("INTERACTION_MENU_SERVICES"),
		description: jcmp.languages.get("INTERACTION_MENU_SERVICES_DESCRIPTION"),
		body: {
			id: "INTERACTION_MENU_SERVICES_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_SERVICES")},
			items: items_services,
		}
	};

	menu.body.items.push(item_services);
}

function setupItemNewspaper(menu) {
	let item_newspaper = {
		id: "INTERACTION_MENU_NEWSPAPER",
		txt: jcmp.languages.get("INTERACTION_MENU_NEWSPAPER"),
		description: jcmp.languages.get("INTERACTION_MENU_NEWSPAPER_DESCRIPTION"),
		special: "close",
	};

    menu.body.items.push(item_newspaper);
}

function setupItemHelpPanel(menu) {
	let item_helppanel = {
		id: "INTERACTION_MENU_HELPEPANEL",
		txt: jcmp.languages.get("INTERACTION_MENU_HELPEPANEL"),
		description: jcmp.languages.get("INTERACTION_MENU_HELPEPANEL_DESCRIPTION"),
		special: "close",
	};

	menu.body.items.push(item_helppanel);
}

function setupItemRaceLobbies(menu) {
	jcmp.events.CallRemote("GetAllRaces", jcmp.raceNetworkId);

	let item_races = {
		id: "RACECREATELOBBY_MENU_LOBBIES",
		txt: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBIES"),
		description: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBIES_DESCRIPTION"),
		subTxt: "...",
		disabled: true,
		body: {
			id: "RACECREATELOBBY_MENU_LOBBIES_LIST",
			subheader: {txt: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBIES")},
			items: [],
		},
    };

	menu.body.items.push(item_races);
}

function setupItemPersonalVehicle(menu) {
    let vehicleData = jcmp.playerVehicles[jcmp.localPlayer.networkId];

	let item_personalvehicles = {
		id: "INTERACTION_MENU_PERSONALVEHICLE",
		txt: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE"),
		description: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE_DESCRIPTION"),
        disabled: !vehicleData,
        body: {
			id: "INTERACTION_MENU_PERSONALVEHICLE_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE")},
			items: [
                {
                    id: "INTERACTION_MENU_PERSONALVEHICLE_LOCATE",
                    txt: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE_LOCATE"),
                    description: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE_LOCATE_DESCRIPTION"),
                },
            ],
		},
    };

    if (vehicleData) {
        
        item_personalvehicles.body.items.push({
            id: "INTERACTION_MENU_PERSONALVEHICLE_LOCK",
            txt: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE_LOCK"),
            subTxt: vehicleData.vehicle.locked ? jcmp.languages.get("HOUSE_VEHICLE_LOCKED") :  jcmp.languages.get("HOUSE_VEHICLE_UNLOCKED"),
            description: jcmp.languages.get("INTERACTION_MENU_PERSONALVEHICLE_LOCK_DESCRIPTION"),
        });
    }

	menu.body.items.push(item_personalvehicles);
}

function setupItemModeration(menu) {
	if (jcmp.localPlayerData.permissions >= 2) {

		let item_moderation = {
			id: "INTERACTION_MENU_MODERATION",
			txt: jcmp.languages.get("INTERACTION_MENU_MODERATION"),
			description: jcmp.languages.get("INTERACTION_MENU_MODERATION_DESCRIPTION"),
			body: {
				id: "INTERACTION_MENU_MODERATION_LIST",
				subheader: {txt: jcmp.languages.get("INTERACTION_MENU_MODERATION")},
				items: [
					{
						id: "INTERACTION_MENU_MODERATION_KICK",
						txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_KICK"),
						body: {
							id: "INTERACTION_MENU_MODERATION_KICK_LIST",
							subheader: {txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_KICK")},
							items: []
						}
					},
					{
						// {parameter: "idSiteType", type: "number"},
						// {parameter: "minDistance", type: "string"},
						// {parameter: "province", type: "number"},
						// {parameter: "name", type: "string"},

						id: "INTERACTION_MENU_MODERATION_SETSITE",
						txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE"),
						disabled: jcmp.localPlayerData.permissions < 3,
						body: {
							id: "INTERACTION_MENU_MODERATION_SETSITE_LIST",
							subheader: {txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE")},
							items: [
								{
									id: "INTERACTION_MENU_MODERATION_SETSITE_IDSITETYPE",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_IDSITETYPE"),
									innerValues: [
										{txt: jcmp.languages.get("SITE_NAME_1"), value: 1},
										{txt: jcmp.languages.get("SITE_NAME_2"), value: 2},
										{txt: jcmp.languages.get("SITE_NAME_3"), value: 3},
										{txt: jcmp.languages.get("SITE_NAME_4"), value: 4},
										{txt: jcmp.languages.get("SITE_NAME_5"), value: 5},
										{txt: jcmp.languages.get("SITE_NAME_6"), value: 6},
										{txt: jcmp.languages.get("SITE_NAME_7"), value: 7},
										{txt: jcmp.languages.get("SITE_NAME_8"), value: 8},
										{txt: jcmp.languages.get("SITE_NAME_9"), value: 9},
										{txt: jcmp.languages.get("SITE_NAME_10"), value: 10},
										{txt: jcmp.languages.get("SITE_NAME_11"), value: 11},
										{txt: jcmp.languages.get("SITE_NAME_12"), value: 12},
										{txt: jcmp.languages.get("SITE_NAME_13"), value: 13},
										{txt: jcmp.languages.get("SITE_NAME_14"), value: 14},
										{txt: jcmp.languages.get("SITE_NAME_15"), value: 15},
										{txt: jcmp.languages.get("SITE_NAME_16"), value: 16},
										{txt: jcmp.languages.get("SITE_NAME_17"), value: 17},
										{txt: jcmp.languages.get("SITE_NAME_18"), value: 18},
										{txt: jcmp.languages.get("SITE_NAME_19"), value: 19},
										{txt: jcmp.languages.get("SITE_NAME_20"), value: 20},
										{txt: jcmp.languages.get("SITE_NAME_21"), value: 21},
									],
								},
								{
									id: "INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_MINDISTANCE"),
									subTxt: "0",
									value: 0,
								},
								{
									id: "INTERACTION_MENU_MODERATION_SETSITE_NAME",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_NAME"),
									subTxt: "NULL",
									value: "NULL",
								},
								{
									id: "INTERACTION_MENU_MODERATION_SETSITE_SET",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETSITE_SET"),
									color: "rgba(24, 66, 117, 0.8)",
									special: "submit",
								},
							]
						}
					},
					{
						id: "INTERACTION_MENU_MODERATION_SETVEHICLE",
						txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE"),
						disabled: jcmp.localPlayerData.permissions < 3,
						body: {
							id: "INTERACTION_MENU_MODERATION_SETVEHICLE_LIST",
							subheader: {txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE")},
							items: [
								// {
									// id: "INTERACTION_MENU_MODERATION_SETVEHICLE_COLOR",
									// txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_COLOR"),
									// innerValues: [
										// {txt: jcmp.languages.get("INTERACTION_MENU_RANDOM"), value: -1}
									// ],
								// },
								{
									id: "INTERACTION_MENU_MODERATION_SETVEHICLE_JOB",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_JOB"),
									innerValues: [
										{txt: jcmp.languages.get("INTERACTION_MENU_PUBLIC"), value: -1}
									],
								},
								{
									id: "INTERACTION_MENU_MODERATION_SETVEHICLE_SET",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_SET"),
									description: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_SET_DESCRIPTION"),
									color: "rgba(24, 66, 117, 0.8)",
									special: "submit",
								},
								{
									id: "INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE",
									txt: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE"),
									description: jcmp.languages.get("INTERACTION_MENU_MODERATION_SETVEHICLE_DELETE_DESCRIPTION"),
									color: "rgba(221, 75, 57, 0.8)",
								},
							]
						}
					},
				]
			}
		};

		// setvehicle colors
		// item_moderation.body.items[1].body.items[0].innerValues.push();
		// {txt: jcmp.languages.get("GPS_JOB_SPAWN"), value: "-1"},

		for (let j in jcmp.jobs) {
			if (jcmp.jobs[j]) {
				item_moderation.body.items[2].body.items[0].innerValues.push({
					txt: jcmp.languages.get("JOB_NAME_" + j),
					value: j,
				});
			}
		}

		for (let p in jcmp.playersData) {
			item_moderation.body.items[0].body.items.push({
				id: "INTERACTION_MENU_MODERATION_KICK_PLAYER_" + p,
				txt: jcmp.playersData[p].name,
				description: jcmp.languages.get("INTERACTION_MENU_MODERATION_KICK_DESCRIPTION"),
				special: "confirm",
				value: p,
			});
		}

		menu.body.items.push(item_moderation);
	}
}

function setupItemKillYourself(menu) {
	let item_killyourself = {
		id: "INTERACTION_MENU_KILLYOURSELF",
		txt: jcmp.languages.get("INTERACTION_MENU_KILLYOURSELF"),
		subTxt: "$ " + priceKillYourself,
		description: jcmp.languages.get("INTERACTION_MENU_KILLYOURSELF_DESCRIPTION"),
	};

	menu.body.items.push(item_killyourself);
}

function setupItemMyAccount(menu) {

	let item_vip = {
		id: "INTERACTION_MENU_VIP",
		txt: jcmp.languages.get("INTERACTION_MENU_VIP"),
		description: jcmp.languages.get("INTERACTION_MENU_VIP_DESCRIPTION"),
		disabled: jcmp.localPlayerData.vip ? false : true,
		body: {
			id: "INTERACTION_MENU_VIP_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_VIP")},
			items: [],
		},
	};
	
	if (jcmp.localPlayerData.vip) {
		item_vip.body.items.push({
			id: "INTERACTION_MENU_VIP_INFORMATION",
			txt: jcmp.languages.get("INTERACTION_MENU_VIP_INFORMATION"),
			descriptionList: [
				{txt: jcmp.languages.get("INTERACTION_MENU_VIP_INFORMATION_LEVEL"), subTxt: jcmp.languages.get("VIP_LEVEL_" + jcmp.localPlayerData.vip)},
				{txt: jcmp.languages.get("INTERACTION_MENU_VIP_INFORMATION_EXPIRATION"), subTxt: jcmp.localPlayerData.vipFinishDate},
			],
		});
	}
	

	let item_myaccount = {
		id: "INTERACTION_MENU_MYACCOUNT",
		txt: jcmp.languages.get("INTERACTION_MENU_MYACCOUNT"),
		description: jcmp.languages.get("INTERACTION_MENU_MYACCOUNT_DESCRIPTION"),
		body: {
			id: "INTERACTION_MENU_MYACCOUNT_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_MYACCOUNT")},
			items: [
				{
					id: "INTERACTION_MENU_NATIONALID",
					txt: jcmp.languages.get("INTERACTION_MENU_NATIONALID"),
					description: jcmp.languages.get("INTERACTION_MENU_NATIONALID_DESCRIPTION"),
					special: "close",
				},
				item_vip,
				{
					id: "INTERACTION_MENU_DISCORDLINK",
					txt: jcmp.languages.get("INTERACTION_MENU_DISCORDLINK"),
					subTxt: jcmp.localPlayerData.discordCode ? jcmp.languages.get("INTERACTION_MENU_DISCORDLINK_NOTASSOCIATED") : `<img src='${jcmp.localPlayerData.discordAvatar}' class='verified'/>`,
					description: jcmp.localPlayerData.discordCode ? jcmp.languages.get("INTERACTION_MENU_DISCORDLINK_DESCRIPTION") : jcmp.languages.get("INTERACTION_MENU_DISCORDLINK_DESCRIPTION_ASSOCIATED"),
					descriptionList: jcmp.localPlayerData.discordCode ? [{txt: jcmp.languages.get("INTERACTION_MENU_DISCORDLINK_COMMAND"), subTxt: "<span class='command'>!linkaccount " + jcmp.localPlayerData.discordCode + "</span>"}] : null,
				}
			],
		}
	};

	menu.body.items.push(item_myaccount);
}

function Menu() {

	let menu = {
		key: 77,
		id: "interaction-menu-custom-menu",
		header: {img: "interaction-menu.jpg", title: jcmp.localPlayerData.nname, font: "'Norican', cursive"},
		body: {
			id: "INTERACTION_MENU_LIST",
			subheader: {txt: jcmp.languages.get("INTERACTION_MENU_LABEL"), count: true},
			items: [],
		}
	};

	setupItemGPS(menu);
	setupItemMyJob(menu);
	setupItemServices(menu);
	setupItemMyAccount(menu);
	setupItemPersonalVehicle(menu);
	setupItemHelpPanel(menu);
	setupItemRaceLobbies(menu);
	setupItemKillYourself(menu);
	setupItemPreferences(menu);
	setupItemNewspaper(menu);
	setupItemModeration(menu);

	if (jcmp.localPlayerData.arrested) {
		for (let i = menu.body.items.length - 1; i >= 0; i--) {
			if (["INTERACTION_MENU_SERVICES", "INTERACTION_MENU_HELPEPANEL", "INTERACTION_MENU_MYACCOUNT", "INTERACTION_MENU_MODERATION", "INTERACTION_MENU_NEWSPAPER"].indexOf(menu.body.items[i].id) == -1) {
				menu.body.items[i].disabled = true;
			}
		}
	}

	jcmp.events.Call('OpenCustomMenu', menu, false);
}


function setPOI(position, txt) {
	if (gpsPOI) {
		gpsPOI.Destroy();
		gpsPOI = null;
	}

	gpsPOI = new POI(10, position);
	gpsPOI.text = txt;
	gpsPOI.minDistance = 2;
	gpsPOI.maxDistance = 40000;
	gpsPOI.clampedToScreen = true;

	jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_SETTED", [txt]), success: true});
}


function setGPS(id) {
	if (id == "0") {
		clearGPS();
		return;
	}

	if (id == "-1") {
		let position = jcmp.utils.vector3.parse(jcmp.jobs[jcmp.localPlayerData.idJob].spawnPosition);
		if (position)
			setPOI(position, jcmp.languages.get("GPS_JOB_SPAWN"));
		else
			jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_SITE_NOT_FOUND"), error: true});
		return;
	}

	if (id == "-2") {
		let position = jcmp.utils.vector3.parse(jcmp.sites[jcmp.localPlayerData.house].position);
		if (position)
			setPOI(position, jcmp.languages.get("GPS_HOUSE_LOCATION"));
		else
			jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_SITE_NOT_FOUND"), error: true});
		return;
	}

	if (!jcmp.sitesType[id]) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_SITE_NOT_FOUND"), error: true});
		return;
	}

	var closeSite = {position: null, distance: 100000};

	for (var key in jcmp.sites) {

		if (jcmp.sites[key].idSiteType == id) {
			let sitePosition = jcmp.sites[key].position;
			var distance = jcmp.utils.vector3.distance(sitePosition, jcmp.localPlayer.position);

			if (distance < closeSite.distance) {
				closeSite = {position: sitePosition, distance: distance};
			}
		}
	}

	if (!closeSite.position) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("GPS_SITE_NOT_FOUND"), error: true});
		return;
	}

	setPOI(closeSite.position, jcmp.languages.get("SITE_NAME_" + id));
}


jcmp.ui.AddEvent('TickSecond', function() {
	if (!gpsPOI)
		return;

	if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, gpsPOI.position) <= 5)
		gpsPOI.Destroy();
});