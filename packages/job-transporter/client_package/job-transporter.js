'use strict';

// {to, payment, experience, vehicle}
var isTransporting = false;
var jobEvents = [];
var gameRenderEvent = null;

var jobs = {};
jobs[2] = {
	notificationImage: "box",
	unloadingSound: "vandoor",
	vehicles: [2627875542, 3874188721, 3910701466],
	unloadsAutomatically: false,
	unloadsAtHorn: false,
	mustStopToUnload: true,
	freightToMilitaryInstallation: true,
	distanceToUnload: 20,
	maxProductDamage: 1100,
	freights: [
		{
			startPosition: new Vector3f(8647, 1029, 6464),
			endPoints: [
				{
					unloadingPositions: [],
					idSites: [126],
					payment: 400,
					experience: 800
					//5.5
					//4 n
				},
				{
					unloadingPositions: [],
					idSites: [127],
					payment: 450,
					experience: 900
					//5
					//6 n
				},
				{
					unloadingPositions: [],
					idSites: [128],
					payment: 500,
					experience: 1000
					// 6.5
					// 4.5 n
				},
				{
					unloadingPositions: [],
					idSites: [129],
					payment: 350,
					experience: 700
					// 4
					// 3.4 n
				},
				{
					unloadingPositions: [],
					idSites: [130],
					payment: 250,
					experience: 500
					// 2.5
					//
				},
				{
					unloadingPositions: [],
					idSites: [131],
					payment: 360,
					experience: 720
					// 5
					// 3.7 n
				},
				{
					unloadingPositions: [],
					idSites: [133],
					payment: 500,
					experience: 1000
					// 5.5
					// 5.5 n
				},
				{
					unloadingPositions: [],
					idSites: [138],
					payment: 550,
					experience: 1100
					// 6
					// 6
				},
			]
		}
	],

};


jobs[10] = {
	notificationImage: "pizza",
	unloadingSound: "house-bell",
	vehicles: [1671177981],
	unloadsAutomatically: false,
	unloadsAtHorn: true,
	mustStopToUnload: true,
	distanceToUnload: 12,
	maxProductDamage: 400,
	freights: [
		{
			startPosition: new Vector3f(11626, 1139, 4564),
			endPoints: [
				{
					unloadingPositions: [
						new Vector3f(11799, 1138, 4692),
						new Vector3f(11764, 1138, 4824),
						new Vector3f(12330, 1140, 5112),
						new Vector3f(12336, 1130, 6340),
					],
					payment: 155,
					experience: 310
					// 2.5
				},
				{
					unloadingPositions: [
						new Vector3f(11437, 1134, 4464),
						new Vector3f(9633, 1029, 3818),
						new Vector3f(9818, 1030, 3747),
					],
					payment: 157,
					experience: 315
					// 2.5
				},
				{
					unloadingPositions: [
						new Vector3f(11523, 1139, 4632),
						new Vector3f(11681, 1139, 4543),
						new Vector3f(11774, 1139, 4545),
						new Vector3f(11827, 1138, 4631),
						new Vector3f(11726, 1151, 4558),
					],
					payment: 80,
					experience: 160
					// 1 minute
				},
				{
					unloadingPositions: [
						new Vector3f(11046, 1137, 3888),
						new Vector3f(10925, 1133, 4077),
						new Vector3f(10537, 1072, 4111),
					],
					payment: 130,
					experience: 260
					// 2 minutes
				},
			]
		},
	],

};


jobs[7] = {
	notificationImage: "police",
	unloadingSound: "police-walkaway",
	vehicles: [4044104901],
	unloadsAutomatically: true,
	unloadsAtHorn: false,
	mustStopToUnload: true,
	distanceToUnload: 150,
	maxProductDamage: false,
	freights: [
		{
			startPosition: new Vector3f(8319, 1075, 4778),
			endPoints: [
				{
					// 8.5 minutes
					unloadingPositions: [],
					idSites: [121, 120, 124, 125, 120, 122],
					payment: 475,
					experience: 950
				},
				{
					// 7 minutes
					unloadingPositions: [],
					idSites: [132, 134, 120, 122],
					payment: 375,
					experience: 750
				},
				{
					// 8 minutes
					unloadingPositions: [],
					idSites: [136, 139, 134, 122],
					payment: 425,
					experience: 950
				},
			]
		},
	],

};


jobs[11] = {
	notificationImage: "bus",
	unloadingSound: "bus-door",
	vehicles: [709014260],
	unloadsAutomatically: true,
	unloadsAtHorn: false,
	mustStopToUnload: true,
	distanceToUnload: 12,
	maxProductDamage: false,
	freights: [
		{
			startPosition: new Vector3f(8973, 1028, 6659),
			endPoints: [
				{
					unloadingPositions: [new Vector3f(8973, 1028, 6659)],
					idSites: [141, 142, 143, 144, 145, 146],
					payment: 760,
					experience: 1525
				},
				{
					unloadingPositions: [new Vector3f(8973, 1028, 6659)],
					idSites: [148, 153, 150, 151, 152, 153, 148],
					payment: 710,
					experience: 1420
				},
			]
		},
	],
};



jobs[19] = {
	notificationImage: "oil-drum",
	unloadingSound: "refill-gas",
	vehicles: [1124348706],
	unloadsAutomatically: false,
	unloadsAtHorn: false,
	mustStopToUnload: true,
	distanceToUnload: 10,
	maxProductDamage: false,
	freights: [
		{
			startPosition: new Vector3f(8621.5, 1028.5, 6452.7),
			endPoints: [
				{
					unloadingPositions: [],
                    idSites: [24, 4, 30, 8, 7],
					payment: 1050,
					experience: 2100
				},
				{
					unloadingPositions: [],
					idSites: [25, 28, 56, 20],
					payment: 1100,
					experience: 2200
				},
				{
					unloadingPositions: [],
					idSites: [29, 26, 27],
					payment: 1000,
					experience: 2000
				},
			]
		},
	],

};


jobs[17] = {
	notificationImage: "agricultural-plane",
	unloadingSound: "spray",
	vehicles: [596249749],
	unloadsAutomatically: true,
	unloadsAtHorn: false,
	mustStopToUnload: false,
	distanceToUnload: 50,
	maxProductDamage: false,
	freights: [
		{
			startPosition: new Vector3f(11110, 1200, 4376),
			endPoints: [
				{
					unloadingPositions: [
						new Vector3f(10715, 1150, 4102),
						new Vector3f(9341, 1180, 4491),
						new Vector3f(8835, 1162, 4485),
						new Vector3f(8280, 1154, 4845),
						new Vector3f(8503, 1185, 5668),
						new Vector3f(8647, 1166, 5807),
						new Vector3f(8768, 1113, 6207),
						new Vector3f(9250, 1193, 6098),
						new Vector3f(9686, 1230, 4773),
						new Vector3f(10333, 1231, 4653),
					],
					payment: 250,
					experience: 500
					// 2 mins
				},
				{
					unloadingPositions: [
						new Vector3f(10915, 1256, 4627),
						new Vector3f(11034, 1261, 4918),
						new Vector3f(11911, 1205, 4891),
						new Vector3f(12129, 1205, 5046),
						new Vector3f(12361, 1187, 5316),
						new Vector3f(12193, 1190, 6838),
						new Vector3f(12022, 1214, 7118),
						new Vector3f(11641, 1249, 8172),
						new Vector3f(10685, 1323, 8163),
					],
					payment: 250,
					experience: 500
					// 2 mins
				},
				{
					unloadingPositions: [
						new Vector3f(11817, 1200, 4817),
						new Vector3f(12087, 1207, 5072),
						new Vector3f(11662, 1250, 6813),
						new Vector3f(11469, 1290, 7189),
						new Vector3f(10249, 1243, 8307),
						new Vector3f(11328, 1227, 8590),
					],
					payment: 250,
					experience: 500
					// ?
				},
			]
		},
	],

};


jcmp.events.Add('SitesUpdated', function() {
	for (let idJob in jobs) {
		for (let freight = jobs[idJob].freights.length - 1; freight >= 0; freight--) {
			for (let endPoint = jobs[idJob].freights[freight].endPoints.length - 1; endPoint >= 0; endPoint--) {
				if (jobs[idJob].freights[freight].endPoints[endPoint].idSites) {
					for (let idSite = jobs[idJob].freights[freight].endPoints[endPoint].idSites.length - 1; idSite >= 0; idSite --) {
						jobs[idJob].freights[freight].endPoints[endPoint].unloadingPositions.unshift(jcmp.sites[jobs[idJob].freights[freight].endPoints[endPoint].idSites[idSite]].position);
					}
				}
			}
		}
	}
});


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "idJob") {
		quitTransportation();

		for (let idJob in jobs) {
			for (let freight = jobs[idJob].freights.length - 1; freight >= 0; freight--) {
				jcmp.events.Call("DeleteSite", "JOB_TRANSPORTER_STARTING_" + idJob + "_" + freight);
			}
		}

		for (let e = jobEvents.length - 1; e >= 0; e--) {
			jcmp.events.Remove(jobEvents[e]);
		}
		
		jobEvents = [];

		if (jobs[value]) {
			for (let freight = jobs[value].freights.length - 1; freight >= 0; freight--) {
				jcmp.events.Call("AddSite", "JOB_TRANSPORTER_STARTING_" + value + "_" + freight, jcmp.languages.get("TRANSPORTER_LOADING_SITE_" + value), jobs[value].freights[freight].startPosition, 8, 800, 25, "JOB_TRANSPORTER_STARTING", freight);
			}

			jobEvents = [
				jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
					if (key == 70) {
						if (isTransporting) {
							if (jcmp.localPlayerData.sites["JOB_TRANSPORTER_UNLOADING"])
								jcmp.ui.CallEvent("StartKeyHold", "KeyHoldEndTransporting", "Delivering", 70, 1500);
						} else {
							if (jcmp.localPlayerData.sites["JOB_TRANSPORTER_STARTING"])
								jcmp.ui.CallEvent("StartKeyHold", "KeyHoldStartTransporting", "Starting", 70, 1500);
						}
					}
				}),
				
				jcmp.events.Add('KeyHold', function(id) {
					if (id == "KeyHoldEndTransporting" && isTransporting && jcmp.localPlayerData.sites["JOB_TRANSPORTER_UNLOADING"])
						endTransportation();
				
					if (id == "KeyHoldStartTransporting" && jcmp.localPlayerData.sites["JOB_TRANSPORTER_STARTING"])
						startTransportation();
				}),				
				
				jcmp.events.Add('KeyUp', function(key, allowed, arrayMenus) {
					if (key == 88) {
						if (isTransporting && jcmp.localPlayerData.sites["JOB_TRANSPORTER_UNLOADING"] && jobs[jcmp.localPlayerData.idJob].unloadsAtHorn)
							endTransportation();
					}
				}),

				jcmp.events.Add('TickSecond', function() {
					let job = jobs[jcmp.localPlayerData.idJob];
					if (!job)
						return;
						
					if (isTransporting) {

						updateJobUI();

						if (!jcmp.localPlayerData.vehicle || job.vehicles.indexOf(jcmp.localPlayerData.vehicle.modelHash) == -1) {
							isTransporting.timeout = isTransporting.timeout - 1;

							jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: {
								label: jcmp.languages.get("HUD_ALERT"),
								text: jcmp.languages.get("HUD_BACK_VEHICLE"),
								time: isTransporting.timeout <= 30 ? "00:" + ("0" + isTransporting.timeout).slice(-2) : "",
							}}));
						} else {
							isTransporting.timeout = 60;
							jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));

							if (jcmp.localPlayerData.sites["JOB_TRANSPORTER_UNLOADING"] && job.unloadsAutomatically && job.mustStopToUnload && jcmp.localPlayerData.vehicle.linearVelocity.length < 1 && jcmp.localPlayerData.vehicle) {
								endTransportation();
								return;
							}
						}

						if (isTransporting.timeout <= 0) {
							jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_QUITTED"), "cancel", "cancel");
							quitTransportation();
							return;
						}

						if (isTransporting.productDamage) {
							if (isTransporting.productDamage - isTransporting.vehicle.health >= job.maxProductDamage) {
								jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_DAMAGED_PRODUCT"), "cancel", "cancel");
								quitTransportation();
								return;
							}
						}

					}
				}),

				jcmp.events.Add("LocalPlayerEnterSite", function(site) {
					if (site.idSiteType == "JOB_TRANSPORTER_STARTING" && !isTransporting) {
						jcmp.ui.CallEvent("PlaySound", "trigger");
						jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("TRANSPORTER_LOADING_SITE_" + jcmp.localPlayerData.idJob), "[F]", jcmp.languages.get("TRANSPORTER_BUTTON_START_" + jcmp.localPlayerData.idJob));
						return;
					}
				
					if (site.idSiteType == "JOB_TRANSPORTER_UNLOADING" && isTransporting) {
						jcmp.ui.CallEvent("PlaySound", "trigger");
				
						let job = jobs[jcmp.localPlayerData.idJob];
				
						if (job.unloadsAutomatically) {
							if (job.mustStopToUnload) {
								jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("TRANSPORTER_UNLOADING_SITE_" + jcmp.localPlayerData.idJob), "", jcmp.languages.get("TRANSPORTER_BUTTON_END_STOP"));
							 } else if (jcmp.localPlayerData.vehicle) {
								endTransportation();
								return;
							}
						} else if (job.unloadsAtHorn) {
							jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("TRANSPORTER_UNLOADING_SITE_" + jcmp.localPlayerData.idJob), "[X]", jcmp.languages.get("TRANSPORTER_BUTTON_END_HORN"));
				
						} else {
							jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("TRANSPORTER_UNLOADING_SITE_" + jcmp.localPlayerData.idJob), "[F]", jcmp.languages.get("TRANSPORTER_BUTTON_END"));
				
						}
						return;
					}
				}),				
				
				jcmp.events.Add("LocalPlayerExitSite", function(site) {
					if (site.idSiteType == "JOB_TRANSPORTER_STARTING" || site.idSiteType == "JOB_TRANSPORTER_UNLOADING") {
						jcmp.ui.CallEvent("UpdateActionUI", false);
						return;
					}
				}),
			];
		} else {
			quitTransportation();
		}
	}
});


function quitTransportation() {
	if (isTransporting) {
		isTransporting.poiVehicle.Destroy();
		jcmp.events.Call("DeleteSite", "JOB_TRANSPORTER_UNLOADING");

		isTransporting = false;
        jcmp.events.CallRemote("CreateAttribute", "working", false);

		jcmp.ui.CallEvent('UpdateJobUI', false);
		jcmp.ui.CallEvent("UpdateActionUI", false);
		jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));
			
		if (gameRenderEvent)
			jcmp.events.Remove(gameRenderEvent);
		gameRenderEvent = null;
	}
}


function startTransportation() {

	if (isTransporting) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_YET_WORKING"), "cancel", "cancel");
		return;
	}

	if (!jcmp.localPlayerData.sites["JOB_TRANSPORTER_STARTING"]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_NOT_IN_START", [jcmp.languages.get("TRANSPORTER_LOADING_SITE_" + jcmp.localPlayerData.idJob)]), "cancel", "cancel");
		return;
	}

	let job = jobs[jcmp.localPlayerData.idJob];
	if (!job) return;

	if (!jcmp.localPlayerData.vehicle || job.vehicles.indexOf(jcmp.localPlayerData.vehicle.modelHash) == -1) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_NOT_IN_UNLOADED_VEHICLE", [jcmp.languages.get("TRANSPORTER_VEHICLE_" + jcmp.localPlayerData.idJob)]), "cancel", "cancel");
		return;
	}

	let startingPoint = job.freights[jcmp.localPlayerData.sites["JOB_TRANSPORTER_STARTING"].value];

	let freight = null;
	let freightIndex = null;

	if (job.freightToMilitaryInstallation) {
		let lessBavarium = null;
		for (let f in startingPoint.endPoints) {

			let military = jcmp.militaryInstallations[startingPoint.endPoints[f].idSites[0]];

			if (military.domination == 1 && military.percentDomination == 100 && (lessBavarium == null || military.bavarium < lessBavarium)) {
				lessBavarium = military.bavarium;
				freight = startingPoint.endPoints[f];
				freightIndex = f;
			}
		}
	} else {
		freightIndex = Math.floor(((Date.now()).toString().charAt(7) / 10) * startingPoint.endPoints.length);
		freight = startingPoint.endPoints[freightIndex];
	}

	isTransporting = {
		poiVehicle: new POI(19, jcmp.localPlayerData.vehicle.position),
		freight: freight,
		vehicle: jcmp.localPlayerData.vehicle,
		timeout: 60,
		actualUnloading: 0,
		freightToMilitaryInstallation: job.freightToMilitaryInstallation,
		productDamage: job.maxProductDamage ? jcmp.localPlayerData.vehicle.health : false,
	};

	let site = jcmp.events.Call("AddSite", "JOB_TRANSPORTER_UNLOADING", jcmp.languages.get("TRANSPORTER_UNLOADING_SITE_" + jcmp.localPlayerData.idJob), freight.unloadingPositions[0], job.distanceToUnload, 30000, 25, "JOB_TRANSPORTER_UNLOADING", false)[0];

	site.poi.clampedToScreen = true;

	isTransporting.poiVehicle.text = jcmp.languages.get("TRANSPORTER_VEHICLE_" + jcmp.localPlayerData.idJob);
	isTransporting.poiVehicle.minDistance = 6;
	isTransporting.poiVehicle.maxDistance = 30000;
	isTransporting.poiVehicle.clampedToScreen = true;

	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_LOADED_" + jcmp.localPlayerData.idJob), job.notificationImage, "starting");

	jcmp.ui.CallEvent("UpdateActionUI", false);
	updateJobUI();

	jcmp.events.CallRemote("CreateAttribute", "working", jcmp.localPlayerData.sites["JOB_TRANSPORTER_STARTING"].value + "|" + freightIndex);
	
	if (gameRenderEvent)
		jcmp.events.Remove(gameRenderEvent);

	gameRenderEvent = jcmp.events.Add('GameRender', function(renderer) {
		if (!isTransporting || !isTransporting.vehicle || !isTransporting.vehicle.position)
			return;
		let pos = isTransporting.vehicle.position;
		pos.y += 1;
		isTransporting.poiVehicle.position = pos;
	});
}


function updateJobUI() {
	let job = jobs[jcmp.localPlayerData.idJob];

	let jobUI = {
		header: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
	};

	if (jcmp.localPlayerData.idJob != 2) {
		jobUI.progress1 = {
			text: jcmp.languages.get("JOB_TRANSPORTING_" + jcmp.localPlayerData.idJob),
			progressActual: isTransporting.actualUnloading,
			progressTotal: isTransporting.freight.unloadingPositions.length,
			active: jcmp.localPlayerData.vehicle,
		};
	}

	if (job.maxProductDamage) {
		jobUI.progress2 = {
			text: jcmp.languages.get("TRANSPORTER_PRODUCTDAMAGE"),
			progressActual: job.maxProductDamage - (isTransporting.productDamage - isTransporting.vehicle.health),
			progressTotal: job.maxProductDamage,
			active: true,
		};
	}

	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify(jobUI));
}


function endTransportation() {

	if (!isTransporting) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_NOT_WORKING"), "cancel", "cancel");
		return;
	}

	let job = jobs[jcmp.localPlayerData.idJob];
	if (!job)
		return;

	if (!jcmp.localPlayerData.sites["JOB_TRANSPORTER_UNLOADING"]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_NOT_IN_END", [jcmp.languages.get("TRANSPORTER_UNLOADING_SITE_" + jcmp.localPlayerData.idJob)]), job.notificationImage, "cancel");
		return;
	}

	if (!jcmp.localPlayerData.vehicle || !isTransporting.vehicle || jcmp.localPlayerData.vehicle.networkId !== isTransporting.vehicle.networkId) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_NOT_IN_LOADED_VEHICLE"), "cancel", "cancel");
		return;
	}

	isTransporting.actualUnloading = isTransporting.actualUnloading + 1;
	if (isTransporting.freight.unloadingPositions[isTransporting.actualUnloading]) {
		jcmp.sites["JOB_TRANSPORTER_UNLOADING"].position = isTransporting.freight.unloadingPositions[isTransporting.actualUnloading];
		jcmp.sites["JOB_TRANSPORTER_UNLOADING"].poi.position = jcmp.sites["JOB_TRANSPORTER_UNLOADING"].position;

		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_UNLOADED_GOTO_NEXT_" + jcmp.localPlayerData.idJob), job.notificationImage, job.unloadingSound);
        jcmp.events.Call("ForceLocalPlayerExitSite", "JOB_TRANSPORTER_UNLOADING");

	} else {
		if (isTransporting.freightToMilitaryInstallation) {

			jcmp.events.CallRemote("UnloadedBavarium", isTransporting.freight.idSites[0], 1000);
			jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_UNLOADED_BAVARIUM_" + jcmp.localPlayerData.idJob, [1000, isTransporting.freight.payment, isTransporting.freight.experience]), "money", job.unloadingSound);
		} else {
			jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("TRANSPORTER_UNLOADED_" + jcmp.localPlayerData.idJob, [isTransporting.freight.payment, isTransporting.freight.experience]), "money", job.unloadingSound);
		}
		jcmp.ui.CallEvent("PlaySound", "mission-complete");
		jcmp.events.CallRemote("JobDone", isTransporting.freight.payment, isTransporting.freight.experience);
		quitTransportation();
	}
}