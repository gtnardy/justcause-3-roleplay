'use strict';

jcmp.raceNetworkId = false;
var creatingLobby = false;

function updateCreateLobbyMenuVehicleClass() {
	if (!creatingLobby)
		return;

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS_LIST", {cleanItems: true});
	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS", {disabled: true, subTxt: ""});

	let firstClass = null;
	let classes = [];

	switch (creatingLobby.vehicleType) {
		case 1:
			classes = [14, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
			break;
		case 2:
			classes = [19, 18, 17, 16, 15];
			break;
	}

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS_LIST", {addItem: {
		id: "RACECREATELOBBY_MENU_VEHICLE_CLASS_ALL",
		txt: jcmp.languages.get("VEHICLE_CLASS_CHOOSE"),
		description: jcmp.languages.get("VEHICLE_CLASS_CHOOSE_DESCRIPTION"),
		body: {
			id: "RACECREATELOBBY_MENU_VEHICLE_CLASS_ALL_LIST",
			subheader: {txt: jcmp.languages.get("VEHICLE_CLASS_CHOOSE")},
			items: [],
		},
	}});

	let items = [];

	for (let c = classes.length - 1; c >= 0; c--) {
		let cl = classes[c];

		if (!firstClass)
			firstClass = cl;

		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS_LIST", {addItem: {
			id: "RACECREATELOBBY_MENU_VEHICLE_CLASS_" + cl,
			txt: jcmp.languages.get("VEHICLE_CLASS_" + cl),
			special: "confirm",
			value: cl,
		}});

		for (let v in jcmp.vehiclesClasses[cl]) {
			let vehicleData = jcmp.vehiclesData[jcmp.vehiclesClasses[cl][v]];
			if (vehicleData.z80)
				continue;

			items.push({
				id: "RACECREATELOBBY_MENU_VEHICLE_CLASS_" + cl + "_" + v,
				txt: vehicleData.name,
				description: "<img src='http://justcauserp.com/images/vehicles/" + vehicleData.model_name + ".png'>",
				special: "confirm2",
				value: jcmp.vehiclesClasses[cl][v],
			});
		}
	}

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS_ALL_LIST", {addItems: items});

	if (firstClass) {
		creatingLobby.vehicleClass = firstClass;
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS", {disabled: false, subTxt: jcmp.languages.get("VEHICLE_CLASS_" + firstClass)});
	} else {
		creatingLobby.vehicleClass = -1;
	}
}


function updateListLobbies() {

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LOBBIES_LIST", {cleanItems: true});

	if (jcmp.racesLobby.length > 0) {
		for (let l in jcmp.racesLobby) {
			let lobby = jcmp.racesLobby[l];
			let race = jcmp.races[lobby.idRace];

			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LOBBIES_LIST", {addItem: {
				id: "RACECREATELOBBY_MENU_LOBBY_" + lobby.id,
				txt: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBY_HOSTNAME", [lobby.hostName]),
				description: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBY_DESCRIPTION"),
				descriptionList: [
					{txt: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBY_LABEL_HOSTNAME"), subTxt: lobby.host},
					{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_NAME"), subTxt: race.name},
					{txt: jcmp.languages.get("RACECREATOR_MENU_VEHICLE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_" + race.vehicleType)},
					{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_TYPE_" + race.type)},
					{txt: jcmp.languages.get("RACELOBBY_MENU_RACE_LAPS"), subTxt: lobby.laps},
					lobby.raceBet ? {txt: jcmp.languages.get("RACELOBBY_MENU_RACE_BET"), subTxt: "$" + lobby.raceBet} : null,
					{txt: jcmp.languages.get("RACECREATELOBBY_MENU_LOBBY_LABEL_PLAYERS"), subTxt: lobby.playersCount + "/" + race.maxPlayers},
					{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_RECORD"), subTxt: (race.recordPlayer ? (race.recordPlayer + " (" + jcmp.utils.maskTime(race.recordTime) + ")") : "--")},
				],
				value: l,
			}});
		}
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LOBBIES", {disabled: false, subTxt: ""});
	} else {
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LOBBIES", {disabled: true, subTxt: "..."});
	}

}


function updateCreateLobbyMenuTracks() {
    if (!creatingLobby)
        return;

    jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_TRACK_LIST", {cleanItems: true});
    jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_TRACK", {disabled: true, subTxt: "..."});

    let firstRace = null;
    let items = [];

    for (let r in jcmp.racesOrdered) {
        let race = jcmp.races[jcmp.racesOrdered[r]];

		if (!((jcmp.localPlayerData.permissions == 4 || race.submitted || race.idOwner == jcmp.localPlayerData.steamId) && race.vehicleType == creatingLobby.vehicleType))
			continue;

        if (!firstRace)
            firstRace = race;

        let evaluation = jcmp.utils.getRaceEvaluation(race.thumbsUp, race.thumbsDown);
        let race_description = "<div class='race-image-container'><img class='race-image' src='http://justcauserp.com/images/races/" + race.id  + ".jpg'></div>";

        race_description += race.description || jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_ACCEPT_NO_DESCRIPTION");

        items.push({
            id: "RACECREATELOBBY_MENU_TRACK_" + race.id,
            txt: race.name,
            subTxt:  race.approved ? "<img src='http://justcauserp.com/images/rp_tm_verified.png' class='logo-tm'/>" : evaluation,
            description: jcmp.localPlayerData.permissions == 4 && !race.approved ? jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_CHOOSE_DESCRIPTION_MODERATION") : jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_CHOOSE_DESCRIPTION"),
            descriptionList: [
                {txt: jcmp.languages.get("RACELOBBY_MENU_RACE_CREATED_BY"), subTxt: race.ownerName},
                {txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_MAXPLAYERS"), subTxt: race.maxPlayers},
                {txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_TYPE_" + race.type)},
                {txt: jcmp.languages.get("RACECREATOR_MENU_VEHICLE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_" + race.vehicleType)},
                {txt: jcmp.languages.get("RACECREATOR_MENU_CHECKPOINT_RADIUS"), subTxt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_" + race.checkpointRadius)},
                {txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_RECORD"), subTxt: (race.recordPlayer ? (race.recordPlayer + " (" + jcmp.utils.maskTime(race.recordTime) + ")") : "--")},
                {txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_EVALUATION"), subTxt: evaluation + " (" + race.thumbsUp + "/" + race.thumbsDown + ")"},
            ],
            body: {
                id: "RACECREATELOBBY_MENU_TRACK_ACCEPT_LIST",
                subheader: {txt: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_INFORMATION")},
                items: [
                    {
                        id: "RACECREATELOBBY_MENU_TRACK_ACCEPT_DESCRIPTION",
                        txt: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_ACCEPT_DESCRIPTION"),
                        description: race_description,
                    },
                    {
                        id: "RACECREATELOBBY_MENU_TRACK_ACCEPT",
                        txt: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_ACCEPT_CONFIRM"),
                        description: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_ACCEPT_CONFIRM_DESCRIPTION"),
                        color: "rgb(38, 87, 146)",
                        special: "confirm2",
                        value: race.id,
                    }
                ],
            }
        });

    }

    jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_TRACK_LIST", {addItems: items});

    if (firstRace) {
        creatingLobby.idRace = firstRace.id;
        jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_TRACK", {disabled: false, subTxt: firstRace.name});
        jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_DONE", {disabled: false});
    } else {
        jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_DONE", {disabled: true});
        creatingLobby.idRace = -1;
    }
	
}


jcmp.events.Add("CustomMenuSelected_race-create-lobby-custom-menu", function(args) {
	if (args.itemId == "RACECREATELOBBY_MENU_RACE_TYPE" && !args.hover) {
		creatingLobby.vehicleType = args.value;
		updateCreateLobbyMenuTracks();
		updateCreateLobbyMenuVehicleClass();
	}
});


function enterLobby(id, menuItemId) {

	let lobby = jcmp.racesLobby[id];

	if (lobby.raceBet > jcmp.localPlayerData.money) {
		jcmp.events.Call('UpdateCustomMenuItem', menuItemId, {error: true, notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY")});
		return;
	}

	jcmp.events.Call("CloseCustomMenu");
	jcmp.events.CallRemote("EnterRaceLobby", lobby.id);
	creatingLobby = null;
}


jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.bodyId == "RACECREATELOBBY_MENU_LOBBIES_LIST") {
		enterLobby(args.value, args.bodyId);
		return;
	}
});


jcmp.events.Add("CustomMenuPressed_race-create-lobby-custom-menu", function(args) {
	if (args.bodyId == "RACECREATELOBBY_MENU_LOBBIES_LIST") {
		enterLobby(args.value, args.bodyId);
		return;
	}

	if (args.itemId == "RACECREATELOBBY_MENU_TRACK_ACCEPT") {
		creatingLobby.idRace = args.value;
		let race = jcmp.races[args.value];

		if (race.type == 1)
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LAPS", {disabled: false});
		else
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_LAPS", {disabled: true, subTxt: "1"});

		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_TRACK", {disabled: false, subTxt: race.name});
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_DONE", {disabled: false});
		return;
	}

	if (args.bodyId == "RACECREATELOBBY_MENU_VEHICLE_CLASS_LIST") {
		creatingLobby.vehicleClass = args.value;
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS", {disabled: false, subTxt: jcmp.languages.get("VEHICLE_CLASS_" + args.value)});
		return;
	}

	if (args.bodyId == "RACECREATELOBBY_MENU_VEHICLE_CLASS_ALL_LIST") {
		creatingLobby.vehicleClass = args.value;
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_VEHICLE_CLASS", {disabled: false, subTxt: jcmp.vehiclesData[args.value].name});
		return;
	}

	if (args.itemId == "RACECREATELOBBY_MENU_DONE") {
		if (args.values["RACECREATELOBBY_MENU_RACE_BET"] > jcmp.localPlayerData.money) {
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATELOBBY_MENU_CREATE_LOBBY_LIST", {error: true, notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY")});
			return;
		}

		creatingLobby.laps = args.values["RACECREATELOBBY_MENU_LAPS"] || 1;
		creatingLobby.nitroEnabled = args.values["RACECREATELOBBY_MENU_NITRO_ENABLED"];
		creatingLobby.turboJumpEnabled = args.values["RACECREATELOBBY_MENU_TURBOJUMP_ENABLED"];
		creatingLobby.raceBet = args.values["RACECREATELOBBY_MENU_RACE_BET"];

		jcmp.events.CallRemote("CreateRaceLobby", creatingLobby.idRace, creatingLobby.laps, creatingLobby.vehicleClass, creatingLobby.nitroEnabled, creatingLobby.turboJumpEnabled, creatingLobby.raceBet);
		jcmp.events.Call("CloseCustomMenu");
		creatingLobby = null;
		return;
	}
});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 17) return;

	creatingLobby = {
		idRace: -1,
		vehicleType: 1,
		vehicleClass: 2,
		nitroEnabled: false,
		turboJumpEnabled: false,
		raceBet: 0,
	};

	jcmp.events.CallRemote("GetAllRaces", jcmp.raceNetworkId);

	let menu = {
        id: "race-create-lobby-custom-menu",
		header: {title: jcmp.languages.get("SITE_NAME_17"), color: "#184275", font: "'Norican', cursive"},
		body: {
			id: "RACECREATELOBBY_MENU_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_17")},
			items: [
				{
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
				},
				{
					id: "RACECREATELOBBY_MENU_CREATE_LOBBY",
					txt: jcmp.languages.get("RACECREATELOBBY_MENU_CREATE_LOBBY"),
					description: jcmp.languages.get("RACECREATELOBBY_MENU_CREATE_LOBBY_DESCRIPTION"),
					body: {
						id: "RACECREATELOBBY_MENU_CREATE_LOBBY_LIST",
						subheader: {txt: jcmp.languages.get("RACECREATELOBBY_MENU_CREATE_LOBBY")},
						items: [
							{
								id: "RACECREATELOBBY_MENU_RACE_TYPE",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE"),
								innerValues: [
									{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_1"), value: 1},
									{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_2"), value: 2},
									//{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_3"), value: 3},
									//{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_4"), value: 4},
								],
								description: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE_DESCRIPTION"),
							},
							{
								id: "RACECREATELOBBY_MENU_TRACK",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK"),
								subTxt: "...",
								disabled: true,
								description: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_DESCRIPTION"),
								body: {
									id: "RACECREATELOBBY_MENU_TRACK_LIST",
									subheader: {txt: jcmp.languages.get("RACECREATELOBBY_MENU_TRACK_LIST"), count: true},
									items: [],
								},
							},
							{ // checar tipo da corrida
								id: "RACECREATELOBBY_MENU_LAPS",
								txt: jcmp.languages.get("RACE_MENU_LAPS"),
								description: jcmp.languages.get("RACECREATELOBBY_MENU_LAPS_DESCRIPTION"),
								innerValues: [
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
							},
							{
								id: "RACECREATELOBBY_MENU_VEHICLE_CLASS",
								txt: jcmp.languages.get("RACE_MENU_VEHICLE_CLASS"),
								subTxt: "",
								description: jcmp.languages.get("RACECREATELOBBY_MENU_VEHICLE_CLASS_DESCRIPTION"),
								body: {
									id: "RACECREATELOBBY_MENU_VEHICLE_CLASS_LIST",
									subheader: {txt: jcmp.languages.get("RACE_MENU_VEHICLE_CLASS"), count: true},
									items: [],
								},
								disabled: true,
							},
							{
								id: "RACECREATELOBBY_MENU_NITRO_ENABLED",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_NITRO_ENABLED"),
								description: jcmp.languages.get("RACECREATELOBBY_MENU_NITRO_ENABLED_DESCRIPTION"),
								innerValues: [
									{txt: jcmp.languages.get("COMMON_NO"), value: false},
									{txt: jcmp.languages.get("COMMON_YES"), value: true},
								],
							},
							{
								id: "RACECREATELOBBY_MENU_TURBOJUMP_ENABLED",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_TURBOJUMP_ENABLED"),
								description: jcmp.languages.get("RACECREATELOBBY_MENU_TURBOJUMP_ENABLED_DESCRIPTION"),
								innerValues: [
									{txt: jcmp.languages.get("COMMON_NO"), value: false},
									{txt: jcmp.languages.get("COMMON_YES"), value: true},
								],
							},
							{
								id: "RACECREATELOBBY_MENU_RACE_BET",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_BET"),
								description: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_BET_DESCRIPTION"),
								innerValues: [
									{txt: jcmp.languages.get("COMMON_NONE"), value: 0},
									{txt: "$100", value: 100},
									{txt: "$200", value: 200},
									{txt: "$300", value: 300},
									{txt: "$400", value: 400},
									{txt: "$500", value: 500},
									{txt: "$1000", value: 1000},
									{txt: "$2000", value: 2000},
									{txt: "$3000", value: 3000},
									{txt: "$4000", value: 4000},
									{txt: "$5000", value: 5000},
									{txt: "$10000", value: 10000},
									{txt: "$20000", value: 20000},
									{txt: "$30000", value: 30000},
									{txt: "$40000", value: 40000},
									{txt: "$50000", value: 50000},
									{txt: "$100000", value: 100000},
								],
							},
							{
								id: "RACECREATELOBBY_MENU_DONE",
								txt: jcmp.languages.get("RACECREATELOBBY_MENU_DONE"),
								description: jcmp.languages.get("RACECREATELOBBY_MENU_DONE_DESCRIPTION"),
								color: "rgb(38, 87, 146)",
								special: "submit",
							},
						],
					},
				},
			],
		},
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);

	updateCreateLobbyMenuVehicleClass();
});


jcmp.events.AddRemoteCallable("UpdatePlayerAllRaces", function(lobbies, races, racesOrdered, rNetworkId) {
	jcmp.racesLobby = JSON.parse(lobbies);

	if (races) {
		jcmp.racesOrdered = JSON.parse(racesOrdered);
		jcmp.races = JSON.parse(races);
		jcmp.raceNetworkId = rNetworkId;
	}

	updateCreateLobbyMenuTracks();
	updateListLobbies();
});
