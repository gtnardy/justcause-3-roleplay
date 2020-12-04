'use strict';

var isCatching = false;
var inSite = false;
var jobEvents = [];

//
// preço peixes
// kilos mochila

// 1 minute to point
var jobs = [];
jobs[8] = {
	// vehicles: [3100982204],
	points: [
		{
			// 8 minutes
			catchingPoint: new Vector3f(8707, 1027, 8522),
			maxDistance: 150,
			rarityLimit: 20,
			illegal: false
			// poi
		},
		{
			catchingPoint: new Vector3f(8108, 1027, 8619),
			maxDistance: 150,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(7615, 1027, 8514),
			maxDistance: 100,
			rarityLimit: 0,
			illegal: true
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(10690, 1025, 2966),
			maxDistance: 150,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(9873, 1025, 2978),
			maxDistance: 150,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(8405, 1025, 3751),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(6700, 1025, 4831),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(7250, 1025, 6318),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(7700, 1025, 6900),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(8800, 1025, 9300),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(9315, 1025, 9830),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(10620, 1025, 10020),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(11450, 1025, 10230),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(12400, 1025, 9820),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(13000, 1025, 9140),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(13650, 1025, 7290),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(13600, 1025, 6350),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
		{
			// 9 minutes
			catchingPoint: new Vector3f(13650, 1025, 5470),
			maxDistance: 200,
			rarityLimit: 10,
			illegal: false
			// poi
		},
	],
	sellingPoint: 157,
	catchs: [
		{rarity: 60, count: 2}, // crayfish
		{rarity: 48, count: 3}, // sardine
		{rarity: 40, count: 3}, // herring
		{rarity: 32, count: 4}, // anchovies
		{rarity: 25, count: 4}, // trout
		{rarity: 21, count: 5}, // cod
		{rarity: 13, count: 8}, // slimy eel
		{rarity: 11, count: 9}, // salmon
		{rarity: 6, count: 12}, // tuna
		{rarity: 4, count: 14}, // lobster
		{rarity: 3, count: 16}, // swordfish
		{rarity: 2, count: 18}, // shark
	],
	valueKg: 3,
	maxWeight: 200,
	cooldown: 8,
	poiType: 9,
	allowedVehicles: [2],
	notificationImage: "fishing-pole",
};


jobs[9] = {
	points: [
		{
			catchingPoint: new Vector3f(8537, 1136, 5184),
			maxDistance: 25,
			rarityLimit: 21,
			illegal: false,
			traps: [
				new Vector3f(8538, 1138, 5163),
				new Vector3f(8519, 1137, 5168),
				new Vector3f(8514, 1138, 5180),
				new Vector3f(8529, 1135, 5188),
				new Vector3f(8547, 1133, 5180),
				new Vector3f(8541, 1136, 5168),
				new Vector3f(8521, 1137, 5189),
			 ],
			// poi
		},
		{
			catchingPoint: new Vector3f(8540, 1157, 5061),
			maxDistance: 20,
			rarityLimit: 9,
			illegal: false,
			traps: [
				new Vector3f(8537, 1160, 5046),
				new Vector3f(8530, 1151.8, 5063),
				new Vector3f(8544, 1151.5, 5076),
				new Vector3f(8555, 1156.8, 5066),
				new Vector3f(8551, 1160, 5053),
			]
			// poi
		},
		{
			catchingPoint: new Vector3f(8593, 1184, 4976),
			maxDistance: 30,
			rarityLimit: 0,
			illegal: false,
			traps: [
				new Vector3f(8584, 1187.8, 4962),
				new Vector3f(8578, 1185, 4972),
				new Vector3f(8583, 1181.5, 4989),
				new Vector3f(8603, 1183.4, 4983),
				new Vector3f(8608, 1187.4, 4969),
			],
			// poi
		},
		{
			catchingPoint: new Vector3f(8502, 1152, 5002),
			maxDistance: 20,
			rarityLimit: 20,
			illegal: false,
			traps: [
				new Vector3f(8514, 1152.8, 5006),
				new Vector3f(8505, 1151.7, 4992),
				new Vector3f(8490, 1147, 4996),
				new Vector3f(8491, 1147, 5011),
				new Vector3f(8508, 1151, 5012),
			],
			// poi
		},
	],
	sellingPoint: 156,
	catchs: [
		{rarity: 75, count: 2}, // dove-pomba
		{rarity: 59, count: 3}, // raccoon-guaxinin
		{rarity: 48, count: 3}, // squirrel-esquilo
		{rarity: 39, count: 5}, // beaver-castor
		{rarity: 28, count: 4}, // rabbit
		{rarity: 22, count: 8}, // turkey-peru
		{rarity: 13, count: 11}, // sheep
		{rarity: 7, count: 13}, // deer-viado
		{rarity: 4, count: 16}, // elk
		{rarity: 3, count: 18}, // lobo-wolf
		{rarity: 1, count: 25}, // bear
	],
	allowedVehicles: [],
	valueKg: 3,
	maxWeight: 100,
	cooldown: 14,
	poiType: 6,
	notificationImage: "hunting",

};


jcmp.events.Add("CustomMenuPressed_selling-point-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(15))
		return;

	if (args.itemId == "CATCHER_SELLING_POINT_SELL_CATCHES") {
		if (jcmp.localPlayerData.catchedCount <= 0) {
			jcmp.events.Call('UpdateCustomMenuItem', "CATCHER_SELLING_POINT_LIST", {notify: jcmp.languages.get("CATCHER_HAVE_NOTHING_TO_SELL"), error: true});
			return;
		}

		let catchesValue = Math.floor(jcmp.localPlayerData.catchedCount * jobs[jcmp.localPlayerData.idJob].valueKg);

		jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "catchedCount", 0);
		jcmp.events.CallRemote("JobDone", catchesValue, null);

		jcmp.events.Call('UpdateCustomMenuItem', "CATCHER_SELLING_POINT_LIST", {notify: jcmp.languages.get("CATCHER_SOLD", [jcmp.languages.get("CATCHER_PRODUCT_NAME_" + jcmp.localPlayerData.idJob)]), success: true});
		jcmp.events.Call('UpdateCustomMenuItem', "CATCHER_SELLING_POINT_MY_CATCHES", {subTxt: "0 KG"});
		jcmp.events.Call('UpdateCustomMenuItem', "CATCHER_SELLING_POINT_SELL_CATCHES", {subTxt: "$ 0"});

		jcmp.ui.CallEvent("PlaySound", "coins");
	}
});


jcmp.events.Add("OpenMenuSite", function(idSiteType) {
	if (idSiteType != 15) return;

	let job = jobs[jcmp.localPlayerData.idJob];
	let site = jcmp.localPlayerData.sites[15];

	if (!job || site.id != job.sellingPoint) {
		jcmp.notifications.add("", jcmp.languages.get("CATCHER_SELLING_POINT_ALLOWED_ONLY"), "cancel", "cancel");
		return;
	}

	let catchesValue = Math.floor(jcmp.localPlayerData.catchedCount * jobs[jcmp.localPlayerData.idJob].valueKg);

	let menu = {
		id: "selling-point-custom-menu",
		header: {img: "selling-point-" + jcmp.localPlayerData.idJob + ".jpg"},
		body: {
			id: "CATCHER_SELLING_POINT_LIST",
			subheader: {txt: site.name},
			items: [
				{
					id: "CATCHER_SELLING_POINT_MY_CATCHES",
					txt: jcmp.languages.get("CATCHER_SELLING_POINT_MY_CATCHES_" + jcmp.localPlayerData.idJob),
					subTxt: jcmp.localPlayerData.catchedCount + " KG"
				},
				{
					id: "CATCHER_SELLING_POINT_SELL_CATCHES",
					txt: jcmp.languages.get("CATCHER_SELLING_POINT_SELL_CATCHES_" + jcmp.localPlayerData.idJob),
					subTxt: "$ " + catchesValue,
					description: jcmp.languages.get("CATCHER_SELLING_POINT_SELL_CATCHES_" + jcmp.localPlayerData.idJob)
				},
			],
		}
	};

	let item_catchs = {
		id: "CATCHER_SELLING_POINT_ALL_CATCHES",
		txt: jcmp.languages.get("CATCHER_SELLING_POINT_ALL_CATCHES_" + jcmp.localPlayerData.idJob),
		description: jcmp.languages.get("CATCHER_SELLING_POINT_ALL_CATCHES_DESCRIPTION_" + jcmp.localPlayerData.idJob),
		body: {
			id: "CATCHER_SELLING_POINT_ALL_CATCHES_LIST",
			subheader: {txt: jcmp.languages.get("CATCHER_SELLING_POINT_ALL_CATCHES_" + jcmp.localPlayerData.idJob)},
			items: []
		}
	};

	for (let cat = job.catchs.length - 1; cat >= 0; cat--) {
		let rarity = getRarity(job.catchs[cat].rarity, false);
		let value = Math.floor(job.catchs[cat].count * job.valueKg);

		item_catchs.body.items.push({
			txt: jcmp.languages.get("CATCHER_CATCH_NAME_" + jcmp.localPlayerData.idJob + "_" + cat),
			subTxt: rarity + " - $ " + value,
		});
	}

	menu.body.items.push(item_catchs);

	jcmp.events.Call('OpenCustomMenu', menu, true);

});


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "idJob") {
		quitCatching();

		for (let idJob in jobs) {
			for (let point = jobs[idJob].points.length - 1; point >= 0; point--) {
				jcmp.events.Call("DeleteSite", "JOB_CATCHER_POINT_" + idJob + "_" + point);
			}
		}

		for (let e = jobEvents.length - 1; e >= 0; e--) {
			jcmp.events.Remove(jobEvents[e]);
		}
		
		jobEvents = [];

		if (jobs[value]) {
			for (let point = jobs[value].points.length - 1; point >= 0; point--) {
				jcmp.events.Call("AddSite", "JOB_CATCHER_POINT_" + value + "_" + point, jcmp.languages.get("CATCHER_CATCHING" + (jobs[value].points[point].illegal ? "_ILLEGAL_" : "_") + "SITE_" + value), jobs[value].points[point].catchingPoint, jobs[value].points[point].maxDistance, 800, jobs[value].poiType, "JOB_CATCHER_POINT", point);
			}
					
			jobEvents = [
				jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
					if (key == 70) {
						if (isCatching) {
							if (jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"] && isCatching.traps && isCatching.traps[jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"].value].triggered) {
								jcmp.ui.CallEvent("StartKeyHold", "KeyHoldStartCatchingTrap", "Checking Trap", 70, 1750, "messing",  true);
							}
						} else {
							if (jcmp.localPlayerData.sites["JOB_CATCHER_POINT"])
								jcmp.ui.CallEvent("StartKeyHold", "KeyHoldStartCatching", "Starting", 70, 1500);
						}
					}
				}),


				jcmp.events.Add('TickSecond', function() {
					if (!jobs[jcmp.localPlayerData.idJob]) return;
				
					if (isCatching) {
						isCatching.timeout--;
						UpdateHUD();
				
						if (isCatching.timeout <= 0) {
							endCatching();
							return;
						}
				
						newCatch();
					}
				}),

				jcmp.events.Add('KeyHold', function(id) {
					if (isCatching) {
						if (id == "KeyHoldStartCatchingTrap" && jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"]) {
							if (!randomizeCatch())
								jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_GOT_NOTHING"), "flee", "blop");
							
							if (jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"] && isCatching.traps && isCatching.traps[jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"].value].triggered) {
								let trap = isCatching.traps[jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"].value];
								trap.poi.type = 15;
								trap.poi.text = jcmp.languages.get("CATCHER_TRAP");
								trap.poi.clampedToScreen = false;
								trap.poi.flashing = false;
								trap.triggered = false;
								jcmp.ui.CallEvent("UpdateActionUI", false);
							}
						}
					} else {
						if (id == "KeyHoldStartCatching" && jcmp.localPlayerData.sites["JOB_CATCHER_POINT"])
							startCatching();
					}
				})
			];
		}
	}
});


jcmp.events.Add("LocalPlayerEnterSite", function(site) {
    if (isCatching) {
        if (site.idSiteType == "JOB_CATCHER_TRAP" && isCatching.traps && isCatching.traps[jcmp.localPlayerData.sites["JOB_CATCHER_TRAP"].value].triggered) {
            jcmp.ui.CallEvent("PlaySound", "trigger");
            jcmp.ui.CallEvent("UpdateActionUI", site.name, "[F]", jcmp.languages.get("CATCHER_TRAP_GET_CATCHING"));
            return;
        }
    } else {
        if (site.idSiteType == "JOB_CATCHER_POINT") {
            jcmp.ui.CallEvent("PlaySound", "trigger");
            jcmp.ui.CallEvent("UpdateActionUI", site.name, "[F]", jcmp.languages.get("CATCHER_BUTTON_START_" + jcmp.localPlayerData.idJob));
            return;
        }
	}
});


jcmp.events.Add("LocalPlayerExitSite", function(site) {
	if (site.idSiteType == "JOB_CATCHER_POINT") {
		jcmp.ui.CallEvent("UpdateActionUI", false);

		if (isCatching) {
			quitCatching();
			jcmp.notifications.add("", jcmp.languages.get("CATCHER_LEFT_CATCHING_POINT", [jcmp.languages.get("CATCHER_CATCHING_SITE_" + jcmp.localPlayerData.idJob)]), "cancel", "cancel");
		}
		return;
	}

	if (site.idSiteType == "JOB_CATCHER_TRAP") {
		jcmp.ui.CallEvent("UpdateActionUI", false);
	}
});


function UpdateHUD() {
	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify({
		header: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
		progress2: {
			text: jcmp.languages.get("COMMON_DURATION"),
			progressActual: isCatching.timeoutTotal - isCatching.timeout,
			progressTotal: isCatching.timeoutTotal,
			active: true,
		},
	}));
}


function toAnchor() {

	if (!jcmp.localPlayerData.vehicle || jcmp.localPlayerData.vehicle.type != 9) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_LIST", {notify: jcmp.languages.get("CATCHER_MUST_BE_IN_A_BOAT"), error: true});
		return;
	}

	if (jcmp.localPlayerData.vehicle.linearVelocity.length >= 2) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_LIST", {notify: jcmp.languages.get("CATCHER_MUST_BE_SLOW"), error: true});
		return;
	}

	jcmp.events.CallRemote("Anchor");
	jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_JOB_LIST", {notify: jcmp.languages.get("CATCHER_ANCHOR_THREW"), success: true});
	jcmp.ui.CallEvent("PlaySound", "fish");
	return;
}


function getRarity(rarity, color) {

	let colorBefore = "[#ecf0f1]";
	let txt = jcmp.languages.get("CATCHER_RARITY_COMMON");

	if (rarity <= 8) {

		colorBefore = "[#f1c40f]";
		txt = jcmp.languages.get("CATCHER_RARITY_VERYRARE");

	} else if (rarity <= 16) {

		colorBefore = "[#e67e22]";
		txt = jcmp.languages.get("CATCHER_RARITY_RARE");

	} else if (rarity <= 42) {

		colorBefore = "[#3498db]";
		txt = jcmp.languages.get("CATCHER_RARITY_UNUSUAL");
	}

	if (color)
		txt = colorBefore + txt + "[#FFFFFF]";

	return txt;
}


jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.itemId == "INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR") {
		toAnchor();
		return;
	}
});


jcmp.events.Add("GetJobInteractionMenu", function() {
	if (jcmp.localPlayerData.idJob == 8 || jcmp.localPlayerData.idJob == 9) {

		let items = [
			{
				id: "INTERACTION_MENU_JOB_CATCHER_MY_CATCHES",
				txt: jcmp.languages.get("INTERACTION_MENU_JOB_CATCHER_MY_CATCHES"),
				description: jcmp.languages.get("INTERACTION_MENU_JOB_CATCHER_MY_CATCHES_DESCRIPTION"),
				subTxt: jcmp.localPlayerData.catchedCount + "KG",
			},
		];

		if (jcmp.localPlayerData.idJob == 8) {
			items.push({
				id: "INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR",
				txt: jcmp.languages.get("INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR"),
				description: jcmp.languages.get("INTERACTION_MENU_JOB_CATCHER_THROW_ANCHOR_DESCRIPTION"),
				special: "disable",
			});
		}

		return items;
	}

	return false;
});

// 7 min = 36
function newCatch() {
	if (!isCatching)
		return;

	let cooldown = jobs[jcmp.localPlayerData.idJob].cooldown;

	if (jcmp.utils.getWeather() == 3 && jcmp.localPlayerData.idJob == 8)
		cooldown = Math.ceil(cooldown * 0.75);

	if (isCatching.timeout % cooldown != 0)
		return;

	if (jcmp.localPlayerData.idJob == 9) {
		triggerTrap();
	} else {
		randomizeCatch();
	}
}


function randomizeCatch() {
	if (!isCatching)
		return;

	let catching = 100 - (Math.floor(Math.random() * (100 - isCatching.catchPlace.rarityLimit)));

	let catchedId = null;
	let catched = null;
	let job = jobs[jcmp.localPlayerData.idJob];
	for (let cat = job.catchs.length - 1; cat >= 0; cat--) {
		if (catching <= job.catchs[cat].rarity) {
			catched = job.catchs[cat];
			catchedId = cat;
			break;
		}
	}

	if (!catched)
		return false;

	jcmp.localPlayerData.catchedCount += catched.count;
	jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "catchedCount", jcmp.localPlayerData.catchedCount);

	let txt = "CATCHER_CATCHED_";
	if (catched.rarity <= 30)
		txt += "SPECIAL_";

	let experience = catched.count * job.valueKg * 2;

	jcmp.events.CallRemote("JobDone", null, experience);

	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get(txt + jcmp.localPlayerData.idJob, [jcmp.languages.get("CATCHER_CATCH_NAME_" + jcmp.localPlayerData.idJob + "_" + catchedId), getRarity(catched.rarity, true), experience]), job.notificationImage, "bite");

	if (jcmp.localPlayerData.catchedCount >= jobs[jcmp.localPlayerData.idJob].maxWeight) {
		jcmp.notifications.add("", jcmp.languages.get("CATCHER_CATCHED_COUNT_LIMIT", [jcmp.localPlayerData.catchedCount]), "cancel", "cancel");
		quitCatching();
	}

	return true;
}


function triggerTrap() {
	let randomTrap = Math.floor(Math.random() * isCatching.catchPlace.traps.length);

	if (isCatching.traps[randomTrap].triggered)
		return;

	isCatching.traps[randomTrap].triggered = true;
	isCatching.traps[randomTrap].poi.flashing = true;
	isCatching.traps[randomTrap].poi.clampedToScreen = true;
	isCatching.traps[randomTrap].poi.type = 19;
	isCatching.traps[randomTrap].poi.text = jcmp.languages.get("CATCHER_TRAP_TRIGGERED");

	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_GOT_TRAP_TRIGGERED"), "trap", "trap");
}


function quitCatching() {
	if (isCatching) {
		jcmp.ui.CallEvent('UpdateJobUI', false);
		jcmp.events.CallRemote("CreateAttribute", "working", false);
		
		if (isCatching.catchPlace && isCatching.catchPlace.traps) {
			for (let t = isCatching.catchPlace.traps.length - 1; t >= 0; t--) {
				jcmp.events.Call("DeleteSite", "JOB_CATCHER_TRAP_" + t);
			}
		}

		isCatching = false;

		if (jcmp.localPlayerData.sites["JOB_CATCHER_POINT"]) {
			jcmp.ui.CallEvent("UpdateActionUI", jcmp.localPlayerData.sites["JOB_CATCHER_POINT"].name, "[F]", jcmp.languages.get("CATCHER_BUTTON_START_" + jcmp.localPlayerData.idJob));
		}
	}
}


function endCatching() {
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_STOPPED_" + jcmp.localPlayerData.idJob, [jcmp.localPlayerData.catchedCount]), "cancel", "cancel");
	quitCatching();
}


function startCatching() {

	if (isCatching) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_ALREADY_WORKING"), "cancel", "cancel");
		return;
	}

	if (!jcmp.localPlayerData.sites["JOB_CATCHER_POINT"]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_NOT_IN_CATCHING_SITE_" + jcmp.localPlayerData.idJob), "cancel", "cancel");
		return;
	}

	let job = jobs[jcmp.localPlayerData.idJob];
	if (!job) return;

	let catchPlace = job.points[jcmp.localPlayerData.sites["JOB_CATCHER_POINT"].value];

	if (job.allowedVehicles.length > 0 && jcmp.localPlayerData.vehicle && job.allowedVehicles.indexOf(jcmp.localPlayerData.vehicle.type) == -1) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_CANT_DRIVE_VEHICLE"), "cancel", "cancel");
		return;
	}

	if (jcmp.localPlayerData.catchedCount >= jobs[jcmp.localPlayerData.idJob].maxWeight) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_CATCHED_COUNT_LIMIT", [jcmp.localPlayerData.catchedCount]), "cancel", "cancel");
		return;
	}

	let t = Math.floor(Math.random() * 30 + 100);
	isCatching = {
		catchPlace: catchPlace,
		timeoutTotal: t,
		timeout: t,
	};

	if (catchPlace.illegal) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_START_ILLEGAL_" + jcmp.localPlayerData.idJob), "arrow");

		jcmp.events.Call("AddWantedStar", 6);
		jcmp.events.Call("FreeWantedStar", 6);
	} else
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_START_" + jcmp.localPlayerData.idJob), "arrow");

	if (jcmp.localPlayerData.idJob == 8) {
		jcmp.ui.CallEvent("PlaySound", "fish");
	} else if (jcmp.localPlayerData.idJob == 9) {

		isCatching.traps = [];
		for (let t = catchPlace.traps.length - 1; t >= 0; t--) {
			let site = jcmp.events.Call("AddSite", "JOB_CATCHER_TRAP_" + t, jcmp.languages.get("CATCHER_TRAP"), catchPlace.traps[t], 2, 800, 15, "JOB_CATCHER_TRAP", t)[0];
			isCatching.traps[t] = {
				poi: site.poi,
				triggered: false,
			};
		}
	}
    
    jcmp.events.CallRemote("CreateAttribute", "working", jcmp.localPlayerData.sites["JOB_CATCHER_POINT"].value);
	jcmp.ui.CallEvent("UpdateActionUI", false);
}


jcmp.events.Add("LocalPlayerVehicleEntered", function(vehicle, seatIndex) {
	if (!isCatching)
		return;

	let job = jobs[jcmp.localPlayerData.idJob];

	if (job.allowedVehicles.length > 0 && job.allowedVehicles.indexOf(jcmp.vehiclesData[vehicle.modelHash].type) == -1) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("CATCHER_CANT_DRIVE_VEHICLE"), "cancel", "cancel");
		quitCatching();
	}
});