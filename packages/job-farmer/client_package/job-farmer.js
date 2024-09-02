'use strict';


var isHarvesting = false;
var jobEvents = [];
var workEvents = [];
var vehicles = [943568602, 3100982204];

// fazer uma divisão para obter o centro
var jobs = [
	{
		startPosition: new Vector3f(8449, 1114, 5679),
		center: new Vector3f(8527, 1099, 5675),
		centers: [new Vector3f(8549, 1096, 5672), new Vector3f(8488, 1107, 5671)],
		minDistance: 42,
		maxHarvest: 650

	},
	{
		startPosition: new Vector3f(8647, 1091, 5804),
		center: new Vector3f(8676, 1092, 5823),
		centers: [new Vector3f(8676, 1092, 5823)],
		minDistance: 40,
		maxHarvest: 750
		// 2 min
	},
	{
		startPosition: new Vector3f(8737, 1086, 5905),
		center: new Vector3f(8733, 1083, 5953),
		centers: [new Vector3f(8733, 1083, 5953)],
		minDistance: 40,
		maxHarvest: 700
	},
	{
		startPosition: new Vector3f(8764, 1054, 6163),
		center: new Vector3f(8777, 1045, 6221),
		centers: [new Vector3f(8785, 1043, 6216), new Vector3f(8784, 1043, 6261)],
		minDistance: 55,
		maxHarvest: 700
	},
	{
		startPosition: new Vector3f(8663, 1121, 5446),
		center: new Vector3f(8695, 117, 5391),
		centers: [new Vector3f(8704, 1113, 5381), new Vector3f(8685, 1120, 5400)],
		minDistance: 35,
		maxHarvest: 650
	}
];


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "idJob") {
		quitHarvest();

		for (let idJob in jobs) {
			jcmp.events.Call("DeleteSite", "JOB_FARMER_STARTING_" + idJob);
		}

		for (let e = jobEvents.length - 1; e >= 0; e--) {
			jcmp.events.Remove(jobEvents[e]);
		}
		
		jobEvents = [];

		if (value == 6) {
			for (let idJob in jobs) {
				jcmp.events.Call("AddSite", "JOB_FARMER_STARTING_" + idJob, jcmp.languages.get("FARMER_HARVEST_BEGINNING"), jobs[idJob].startPosition, 10, 800, 25, "JOB_FARMER_STARTING", idJob);
			}

			jobEvents = [
				jcmp.events.Add('KeyHold', function(id) {
					if (id == "KeyHoldStartHarvesting" && jcmp.localPlayerData.sites["JOB_FARMER_STARTING"])
						startHarvest();
				}),

				jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
					if (key != 70 || !jcmp.localPlayerData.sites["JOB_FARMER_STARTING"] || isHarvesting)
						return;
				
					jcmp.ui.CallEvent("StartKeyHold", "KeyHoldStartHarvesting", "Starting", 70, 1500);
				}),

				jcmp.events.Add("LocalPlayerEnterSite", function(site) {
					if (site.idSiteType == "JOB_FARMER_STARTING" && !isHarvesting) {
						jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("FARMER_HARVEST_BEGINNING"), "[F]", jcmp.languages.get("FARMER_BUTTON_PRESS"));
						jcmp.ui.CallEvent("PlaySound", "trigger");
						return;
					}
				}),
				
				jcmp.events.Add("LocalPlayerExitSite", function(site) {
					if (site.idSiteType == "JOB_FARMER_STARTING") {
						jcmp.ui.CallEvent("UpdateActionUI", false);
						return;
					}
				}),	
			];
		}
	}
});


function updateJobUI(active) {

	let jobUI = {
		header: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
		progress1: {
			text: jcmp.languages.get("FARMER_PERCENT_DONE", [Math.floor(90 * isHarvesting.distance / isHarvesting.harvest.maxHarvest), 90]),
			progressActual: isHarvesting.distance,
			progressTotal: isHarvesting.harvest.maxHarvest,
			active: active,
		},
		progress2: {
			text: jcmp.languages.get("FARMER_BONUS_FAST"),
			progressActual: isHarvesting.timeBonus - isHarvesting.timeSpent,
			progressTotal: isHarvesting.timeBonus,
			active: isHarvesting.timeSpent < isHarvesting.timeBonus,
		},
	};

	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify(jobUI));

}


function createBonusSpot() {
	if (!isHarvesting)
		return;

	if (isHarvesting.poiBonus)
		return;

	let randomPosition = isHarvesting.poi.position;
	let randomSin = Math.random() * 2 - 1;
	let randomCos = Math.random() * 2 - 1;

	randomPosition.x += randomSin * isHarvesting.harvest.minDistance;
	randomPosition.y += 10;
	randomPosition.z += randomCos * isHarvesting.harvest.minDistance;

	let poi = new POI(12, randomPosition);
	poi.text = jcmp.languages.get("FARMER_CROP_BONUS");
	poi.minDistance = 0;
	poi.maxDistance = 1000;
	poi.clampedToScreen = true;

	isHarvesting.poiBonus = poi;
	jcmp.ui.CallEvent("PlaySound", "menulittle");
}


function quitHarvest() {
	if (!isHarvesting)
		return;

	if (isHarvesting.poiBonus)
		isHarvesting.poiBonus.Destroy();

	for (let c in isHarvesting.harvest.centers) {
		jcmp.events.Call("DeleteSite", "JOB_FARMER_CENTERS_" + c);
	}

	isHarvesting.poi.Destroy();
	isHarvesting.poiVehicle.Destroy();

	isHarvesting = false;
	for (let e = workEvents.length - 1; e >= 0; e--) {
		jcmp.events.Remove(workEvents[e]);
	}
	
	workEvents = [];

    jcmp.events.CallRemote("CreateAttribute", "working", false);
	jcmp.ui.CallEvent('UpdateJobUI', false);
	jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));
}


function endHarvest() {

	let experience = Math.floor(20 * isHarvesting.harvest.maxHarvest / 750) * 10;
	if (isHarvesting.timeSpent <= isHarvesting.timeBonus)
		experience += experience * 0.1;

	let payment = Math.floor(experience / 2);

	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMER_END", [payment, experience]), "money", "mission-complete");
	jcmp.events.CallRemote("JobDone", payment, experience);

	quitHarvest();
}


function startHarvest() {

	if (isHarvesting) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMET_YET_HARVESTING"), "cancel", "cancel");
		return;
	}

	if (!jcmp.localPlayerData.sites["JOB_FARMER_STARTING"]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMER_NOT_IN_BEGINNING"), "cancel", "cancel");
		return;
	}

	if (!jcmp.localPlayerData.vehicle || vehicles.indexOf(jcmp.localPlayerData.vehicle.modelHash) == -1) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMER_NOT_IN_TRACTOR"), "cancel", "cancel");
		return;
	}

	let harvest = jobs[jcmp.localPlayerData.sites["JOB_FARMER_STARTING"].value];

	isHarvesting = {
		poi: new POI(25, harvest.center),
		poiVehicle: new POI(19, jcmp.localPlayerData.vehicle.position),
		harvest: harvest,
		vehicle: jcmp.localPlayerData.vehicle,
		distance: 0,
		timeout: 60,
		timeSpent: 0,
		timeBonus: Math.floor(harvest.maxHarvest / 7),
	};

	if (jcmp.localPlayerData.vehicle.nitroEnabled || jcmp.localPlayerData.vehicle.turboJumpEnabled)
		isHarvesting.timeBonus = isHarvesting.timeBonus * 0.7;

	for (let c in harvest.centers) {
		jcmp.events.Call("AddSite", "JOB_FARMER_CENTERS_" + c, "", harvest.centers[c], harvest.minDistance, 0, 0, "JOB_FARMER_CENTERS", false);
	}

	isHarvesting.poi.text = jcmp.languages.get("FARMER_CENTER_FARM");
	isHarvesting.poi.minDistance = 0;
	isHarvesting.poi.maxDistance = 500;
	isHarvesting.poi.clampedToScreen = true;

	isHarvesting.poiVehicle.text = jcmp.languages.get("FARMER_TRACTOR");
	isHarvesting.poiVehicle.minDistance = 5;
	isHarvesting.poiVehicle.maxDistance = 30000;
	isHarvesting.poiVehicle.clampedToScreen = true;

	jcmp.ui.CallEvent("UpdateActionUI", false);

	updateJobUI(true);

    jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMER_START"), "tractor", "finished");
	jcmp.events.CallRemote("CreateAttribute", "working", jcmp.localPlayerData.sites["JOB_FARMER_STARTING"].value);

	for (let e = workEvents.length - 1; e >= 0; e--) {
		jcmp.events.Remove(workEvents[e]);
	}

	workEvents = [
		jcmp.events.Add('GameRender', function(renderer) {
			if (!isHarvesting) return;

			if (isHarvesting.poiBonus) {
				let posBonus = isHarvesting.poiBonus.position;
				
				if (posBonus) {
					posBonus.y = jcmp.localPlayer.position.y;
					isHarvesting.poiBonus.position = posBonus;
				}
			}
	
			let pos = isHarvesting.vehicle.position;
			if (!pos)
				return;
			pos.y += 3;
			isHarvesting.poiVehicle.position = pos;
		}),

		jcmp.events.Add('Tick18Seconds', function() {
			createBonusSpot();
		}),

		jcmp.events.Add('Tick2Ms', function() {
			if (!isHarvesting)
				return;

			if (isHarvesting.poiBonus && jcmp.utils.vector3.distance2d(jcmp.localPlayer.position, isHarvesting.poiBonus.position) <= 5 && jcmp.localPlayerData.vehicle && isHarvesting.vehicle.networkId == jcmp.localPlayerData.vehicle.networkId) {
				jcmp.ui.CallEvent("PlaySound", "blop");
				isHarvesting.poiBonus.Destroy();
				isHarvesting.poiBonus = false;
				isHarvesting.distance += 30;
			}
		}),

		jcmp.events.Add('TickSecond', function() {
			if (!isHarvesting)
				return;

			isHarvesting.timeout = isHarvesting.timeout - 1;
			isHarvesting.timeSpent++;

			if (jcmp.localPlayerData.vehicle && isHarvesting.vehicle.networkId == jcmp.localPlayerData.vehicle.networkId) {

				if (jcmp.localPlayerData.sites["JOB_FARMER_CENTERS"]) {

					jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));

					isHarvesting.distance += Math.min(jcmp.localPlayerData.vehicle.linearVelocity.length, 15);
					isHarvesting.timeout = 60;

					if (isHarvesting.distance >= isHarvesting.harvest.maxHarvest) {
						endHarvest();
						return;
					}

				} else {
					jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: {
						label: jcmp.languages.get("HUD_ALERT"),
						text: jcmp.languages.get("FARMER_BACK_FARM"),
						time: isHarvesting.timeout <= 30 ? "00:" + ("0" + isHarvesting.timeout).slice(-2) : "",
					}}));
				}

			} else {
				jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: {
					label: jcmp.languages.get("HUD_ALERT"),
					text: jcmp.languages.get("FARMER_BACK_TRACTOR"),
					time: isHarvesting.timeout <= 30 ? "00:" + ("0" + isHarvesting.timeout).slice(-2) : "",
				}}));
			}

			updateJobUI(jcmp.localPlayerData.vehicle && jcmp.localPlayerData.sites["JOB_FARMER_CENTERS"]);

			if (isHarvesting.timeout <= 0) {
				jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("FARMER_QUITTED"), "cancel", "cancel");
				quitHarvest();
				return;
			}
		}),
	];
}