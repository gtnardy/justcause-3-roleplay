'use strict';

var creatingRace = false;


jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.itemId == "INTERACTION_MENU_JOB_RACER_CREATE_RACE") {
		startCreation(null);
		return;
	}

	if (args.bodyId == "INTERACTION_MENU_JOB_RACER_MY_RACES_LIST") {
		editRace(args.value);
		return;
	}
});


jcmp.events.Add("CustomMenuSelected_racer-custom-menu", function(args) {
	if (args.hover)
		return;
		
	if (args.itemId == "RACECREATOR_MENU_CHECKPOINT_RADIUS") {
		for (let c = creatingRace.checkpoints.length - 1; c >= 0; c--) {
			creatingRace.checkpoints[c].checkpoint.radius = args.value;
		}
	}
});


jcmp.events.Add("CustomMenuPressed_racer-custom-menu", function(args) {

	if (args.itemId == "RACECREATOR_MENU_ADD_CHECKPOINT") {
		if (!jcmp.localPlayerData.vehicle) {
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("COMMON_NOT_IN_VEHICLE"), error: true});
			return;
		}
		addCheckpoint(jcmp.localPlayerData.vehicle.position, jcmp.localPlayerData.vehicle.rotation);
	
		if (creatingRace.editing)
			creatingRace.edited = true;
	}

	if (args.itemId == "RACECREATOR_MENU_ADD_STARTING_POSITION") {
		if (!jcmp.localPlayerData.vehicle) {
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("COMMON_NOT_IN_VEHICLE"), error: true});
			return;
		}
		addStarting(jcmp.localPlayerData.vehicle.position, jcmp.localPlayerData.vehicle.rotation);
	
		if (creatingRace.editing)
			creatingRace.edited = true;
	}

	if (args.itemId == "RACECREATOR_MENU_DELETE_CHECKPOINT") {
		deleteLastCheckpoint();
	}

	if (args.itemId == "RACECREATOR_MENU_DELETE_STARTING_POSITION") {
		deleteLastStarting();
	}

	if (args.itemId == "RACECREATOR_MENU_CANCEL")
		cleanCreation();

	if (args.itemId == "RACECREATOR_MENU_SUBMIT" || args.itemId == "RACECREATOR_MENU_SAVE") {

		if (creatingRace.startings.length < 2) {
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_MINIMUM_STARTINGS"), error: true});
			return;
		}

		if (creatingRace.checkpoints.length < 1) {
			jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_MINIMUM_CHECKPOINTS"), error: true});
			return;
		}
		
		if (args.itemId == "RACECREATOR_MENU_SAVE")
			creatingRace.saving = true;

		creatingRace.vehicleType = args.values["RACECREATOR_MENU_VEHICLE_TYPE"];
		creatingRace.type = args.values["RACECREATOR_MENU_TYPE"];
		creatingRace.checkpointRadius = args.values["RACECREATOR_MENU_CHECKPOINT_RADIUS"];

		jcmp.events.Call("SetInputTextArea", "RACECREATOR_DESCRIPTION", jcmp.languages.get("RACECREATOR_NEW_DESCRIPTION"), creatingRace.editing ? creatingRace.description : "", 150, 50, 3);

		jcmp.events.Call("CloseCustomMenu");
	}
});


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id == "RACECREATOR_DESCRIPTION") {
		creatingRace.description = value;
		jcmp.events.Call("SetInputText", "RACECREATOR_IMAGE", jcmp.languages.get("RACECREATOR_NEW_IMAGE"), "", 100);
		return;
	}

	if (id == "RACECREATOR_IMAGE") {
		creatingRace.imageUrl = value;
		jcmp.events.Call("SetInputText", "RACECREATOR_NAME", jcmp.languages.get("RACECREATOR_NEW_NAME"), creatingRace.editing ? creatingRace.name : (jcmp.localPlayerData.nname + "'s Race"), 20);
		return;
	}

	if (id == "RACECREATOR_NAME") {
		creatingRace.name = value;
		submitRace();
		return;
	}
});


jcmp.events.Add("GetJobInteractionMenu", function() {
	if (jcmp.localPlayerData.idJob == 18) {

		jcmp.events.CallRemote("GetMyRaces");

		let items = [
			{
				id: "INTERACTION_MENU_JOB_RACER_MY_RACES",
				txt: jcmp.languages.get("INTERACTION_MENU_JOB_RACER_MY_RACES"),
				body: {
					id: "INTERACTION_MENU_JOB_RACER_MY_RACES_LIST",
					subheader: {txt: jcmp.languages.get("INTERACTION_MENU_JOB_RACER_MY_RACES"), count: true},
					items: [],
				},
				subTxt: "...",
				disabled: true,
			},
			{
				id: "INTERACTION_MENU_JOB_RACER_CREATE_RACE",
				txt: jcmp.languages.get("INTERACTION_MENU_JOB_RACER_CREATE_RACE"),
				description: jcmp.languages.get("INTERACTION_MENU_JOB_RACER_CREATE_RACE_DESCRIPTION"),
			},
		];

		return items;
	}

	return false;
});


function editRace(indexRace) {

	let race = jcmp.localPlayerData.myRaces[indexRace];

	startCreation(race);

	for (let c in race.checkpoints) {
		addCheckpoint(jcmp.utils.vector3.parse(race.checkpoints[c].position), jcmp.utils.vector3.parse(race.checkpoints[c].rotation));
	}

	for (let s in race.startings) {
		addStarting(jcmp.utils.vector3.parse(race.startings[s].position), jcmp.utils.vector3.parse(race.startings[s].rotation));
	}
}


function startCreation(race) {
	if (creatingRace)
		return;

	creatingRace = {
		startings: [],
		checkpoints: [],
		type: 1,
		checkpointRadius: 15,
		vehicleType: 1,
		editing: false,
		edited: false,
		saving: false,
	};

	if (race) {
		creatingRace.editing = race.id;
		creatingRace.edited = false;
		creatingRace.name = race.name;
		creatingRace.description = race.description;
		creatingRace.imageUrl = false;
		creatingRace.type = race.type;
		creatingRace.checkpointRadius = race.checkpointRadius;
		creatingRace.vehicleType = race.vehicleType;
	}

	var menu = {
		key: -1,
		id: "racer-custom-menu",
		offsetX: "300px",
		lean: true,
		header: {title: jcmp.languages.get("RACECREATOR_MENU_RACE_CREATOR"), color: "#184275"},
		body: {
			id: "RACECREATOR_MENU_LIST",
			items: [
				{
					id: "RACECREATOR_MENU_INSTRUCTIONS",
					txt: jcmp.languages.get("RACECREATOR_MENU_INSTRUCTIONS"),
					description: jcmp.languages.get("RACECREATOR_MENU_INSTRUCTIONS_DESCRIPTION"),
				},
				{
					id: "RACECREATOR_MENU_VEHICLE_TYPE",
					txt: jcmp.languages.get("RACECREATOR_MENU_VEHICLE_TYPE"),
					description: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_DESCRIPTION"),
					innerValues: [
						{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_1"), value: 1, default: creatingRace.vehicleType == 1},
						{txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_2"), value: 2, default: creatingRace.vehicleType == 2},
						// {txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_3"), value: 3, default: creatingRace.vehicleType == 3},
						// {txt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_4"), value: 4, default: creatingRace.vehicleType == 4},
					]
				},
				{
					id: "RACECREATOR_MENU_TYPE",
					txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE"),
					description: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE_DESCRIPTION"),
					innerValues: [
						{txt: jcmp.languages.get("RACE_MENU_TYPE_2"), value: 2, default: creatingRace.type == 1},
						{txt: jcmp.languages.get("RACE_MENU_TYPE_1"), value: 1, default: creatingRace.type == 2},
					]
				},
				{
					id: "RACECREATOR_MENU_CHECKPOINT_RADIUS",
					txt: jcmp.languages.get("RACECREATOR_MENU_CHECKPOINT_RADIUS"),
					description: jcmp.languages.get("RACECREATOR_MENU_CHECKPOINT_RADIUS_DESCRIPTION"),
					innerValues: [
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_5"), value: 5, default: creatingRace.checkpointRadius == 5},
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_10"), value: 10, default: creatingRace.checkpointRadius == 10},
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_15"), value: 15, default: creatingRace.checkpointRadius == 15},
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_20"), value: 20, default: creatingRace.checkpointRadius == 20},
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_25"), value: 25, default: creatingRace.checkpointRadius == 25},
						{txt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_30"), value: 30, default: creatingRace.checkpointRadius == 30},
					]
				},
				{
					id: "RACECREATOR_MENU_ADD_STARTING_POSITION",
					txt: jcmp.languages.get("RACECREATOR_MENU_ADD_STARTING_POSITION"),
					subTxt: "0",
					description: jcmp.languages.get("RACECREATOR_MENU_ADD_STARTING_POSITION_DESCRIPTION"),
				},
				{
					id: "RACECREATOR_MENU_DELETE_STARTING_POSITION",
					txt: jcmp.languages.get("RACECREATOR_MENU_DELETE_STARTING_POSITION"),
					description: jcmp.languages.get("RACECREATOR_MENU_DELETE_STARTING_POSITION_DESCRIPTION"),
				},
				{
					id: "RACECREATOR_MENU_ADD_CHECKPOINT",
					txt: jcmp.languages.get("RACECREATOR_MENU_ADD_CHECKPOINT"),
					subTxt: "0",
					description: jcmp.languages.get("RACECREATOR_MENU_ADD_CHECKPOINT_DESCRIPTION"),
				},
				{
					id: "RACECREATOR_MENU_DELETE_CHECKPOINT",
					txt: jcmp.languages.get("RACECREATOR_MENU_DELETE_CHECKPOINT"),
					description: jcmp.languages.get("RACECREATOR_MENU_DELETE_CHECKPOINT_DESCRIPTION"),
				},
				{
					id: "RACECREATOR_MENU_SAVE",
					txt: jcmp.languages.get("RACECREATOR_MENU_SAVE"),
					description: jcmp.languages.get("RACECREATOR_MENU_SAVE_DESCRIPTION"),
					color: "rgba(46, 204, 113, 0.8)",
					special: "submit",
				},
				{
					id: "RACECREATOR_MENU_SUBMIT",
					txt: jcmp.languages.get("RACECREATOR_MENU_SUBMIT"),
					description: jcmp.languages.get("RACECREATOR_MENU_SUBMIT_DESCRIPTION"),
					color: "rgba(24, 66, 117, 0.8)",
					special: "submit",
				},
				{
					id: "RACECREATOR_MENU_CANCEL",
					txt: jcmp.languages.get("RACECREATOR_MENU_CANCEL"),
					description: jcmp.languages.get("RACECREATOR_MENU_CANCEL_DESCRIPTION"),
					color: "rgba(221, 75, 57, 0.8)",
					special: "close",
				},
			],
		}
	};

	jcmp.events.Call('OpenCustomMenu', menu, false);
}


function submitRace() {
	if (!checkCreatingRace())
		return;

	jcmp.events.CallRemote("SubmitRace", creatingRace.name, creatingRace.description, creatingRace.imageUrl, creatingRace.type, creatingRace.vehicleType, creatingRace.checkpointRadius, JSON.stringify(creatingRace.startings), JSON.stringify(creatingRace.checkpoints), creatingRace.editing, creatingRace.edited, creatingRace.saving);
	cleanCreation();
}


function checkCreatingRace() {
	if (!creatingRace)
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_ALREADY_CREATING"), error: true});

	return creatingRace;
}


function deleteLastCheckpoint() {
	if (creatingRace.checkpoints.length === 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_NO_SPOT_TO_DELETE"), error: true});
		return;
	}
	
	if (creatingRace.editing)
		creatingRace.edited = true;

	let spot = creatingRace.checkpoints.pop();
	if (spot.poi)
		spot.poi.Destroy();

	if (spot.checkpoint)
		spot.checkpoint.Destroy();

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_CHECKPOINT_DELETED"), success: true});
	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_ADD_CHECKPOINT", {subTxt: creatingRace.checkpoints.length});
}


function deleteLastStarting() {
	if (creatingRace.startings.length === 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_NO_SPOT_TO_DELETE"), error: true});
		return;
	}

	if (creatingRace.editing)
		creatingRace.edited = true;

	let spot = creatingRace.startings.pop();

	if (spot.poi)
		spot.poi.Destroy();

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_STARTING_DELETED"), success: true});
	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_ADD_STARTING_POSITION", {subTxt: creatingRace.startings.length});
}


function addStarting(position, rotation) {
	if (!checkCreatingRace())
		return;

	let poi = new POI(12, position);
	poi.text = "Starting #" + (creatingRace.startings.length + 1);
	poi.minDistance = 0;

	creatingRace.startings.push({
		position: jcmp.utils.vector3.stringify(position),
		rotation: jcmp.utils.vector3.stringify(rotation),
		poi: poi,
	});

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_CREATED_STARTING"), success: true});
	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_ADD_STARTING_POSITION", {subTxt: creatingRace.startings.length});
}


function addCheckpoint(position, rotation) {
	if (!checkCreatingRace())
		return;

	let poi = new POI(19, position);
	poi.text = "Checkpoint #" + (creatingRace.checkpoints.length + 1);
	poi.minDistance = 0;
	
	let checkpoint = new Checkpoint(1, 0x301477DB, position, rotation);
	checkpoint.radius = creatingRace.checkpointRadius;

	creatingRace.checkpoints.push({
		position: jcmp.utils.vector3.stringify(position),
		rotation: jcmp.utils.vector3.stringify(rotation),
		poi: poi,
		checkpoint: checkpoint,
	});

	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_LIST", {notify: jcmp.languages.get("RACECREATOR_CREATED_CHECKPOINT"), success: true});
	jcmp.events.Call('UpdateCustomMenuItem', "RACECREATOR_MENU_ADD_CHECKPOINT", {subTxt: creatingRace.checkpoints.length});
}


function cleanCreation() {
	if (!creatingRace)
		return;

	for (let s in creatingRace.startings) {
		creatingRace.startings[s].poi.Destroy();
		delete creatingRace.startings[s].poi;
	}

	for (let c in creatingRace.checkpoints) {
		creatingRace.checkpoints[c].poi.Destroy();
		creatingRace.checkpoints[c].checkpoint.Destroy();
		delete creatingRace.checkpoints[c].poi;
		delete creatingRace.checkpoints[c].checkpoint;
	}

	creatingRace = false;
}


jcmp.events.AddRemoteCallable("UpdatePlayerOwnRaces", function(races) {
	jcmp.localPlayerData.myRaces = JSON.parse(races);

	jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_RACER_MY_RACES_LIST", {cleanItems: true});
	for (let r in jcmp.localPlayerData.myRaces) {

		let race = jcmp.localPlayerData.myRaces[r];

		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_RACER_MY_RACES_LIST", {addItem: {
			id: "INTERACTION_MENU_JOB_RACER_MY_RACE_" + race.id,
			txt: race.name,
			subTxt: race.approved ? "<img src='http://justcauserp.com/images/rp_tm_verified.png' class='logo-tm'/>" : "",
			descriptionList: [
				{txt: "ID", subTxt: race.id},
				{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_TYPE_" + race.type)},
				{txt: jcmp.languages.get("RACECREATOR_MENU_VEHICLE_TYPE"), subTxt: jcmp.languages.get("RACE_MENU_VEHICLE_TYPE_" + race.vehicleType)},
				{txt: jcmp.languages.get("RACECREATOR_MENU_CHECKPOINT_RADIUS"), subTxt: jcmp.languages.get("RACE_MENU_CHECKPOINT_RADIUS_" + race.checkpointRadius)},
				{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_SUBMITTED"), subTxt: jcmp.languages.get("COMMON_YESNO_" + race.submitted)},
				{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_EVALUATION"), subTxt: jcmp.utils.getRaceEvaluation(race.thumbsUp, race.thumbsDown) + " (" + race.thumbsUp + "/" + race.thumbsDown + ")"},
				{txt: jcmp.languages.get("RACECREATELOBBY_MENU_RACE_RECORD"), subTxt: (race.recordPlayer ? (race.recordPlayer + " (" + jcmp.utils.maskTime(race.recordTime) + ")") : "--")},
			],
			description: jcmp.languages.get("RACECREATOR_MENU_EDIT_RACE"),
			value: r,
		}});
	}

	if (jcmp.localPlayerData.myRaces.length > 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_RACER_MY_RACES", {disabled: false, subTxt: ""});
	}
});
