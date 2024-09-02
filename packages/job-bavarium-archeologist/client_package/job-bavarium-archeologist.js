'use strict';

var bavarium_cache = [];
var bavarium_cache_object = {};

const MAX_WEIGHT = 100;
const VALUE_KG = 17;

const BAVARIUM_SITES = [
	{position: "9031.3232421875, 1104.1669921875, 5806.53955078125"},
	{position: "8983.587890625, 1103.6815185546875, 5942.18505859375"},
	{position: "8661.80078125, 1100.9195556640625, 5959.86279296875"},
	{position: "8622.83203125, 1094.5013427734375, 5841.1435546875"},
	{position: "8551.7734375, 1095.8748779296875, 5761.0908203125"},
	{position: "8639.7978515625, 1096.9742431640625, 5603.9814453125"},
	{position: "9091.1396484375, 1137.3426513671875, 5587.98681640625"},
	{position: "9078.9580078125, 1134.04150390625, 5446.4091796875"},
	{position: "8942.1728515625, 1134.1405029296875, 5250.43701171875"},
	{position: "8849.6962890625, 1110.5380859375, 5179.984375"},
	{position: "8541.55859375, 1129.65576171875, 5217.6337890625"},
	{position: "8552.578125, 1134.3338623046875, 5386.07958984375"},
	{position: "8607.6220703125, 1124.7913818359375, 5498.630859375"},
	{position: "8644.9228515625, 1096.6689453125, 5602.09765625"},
	{position: "8585.986328125, 1096.8018798828125, 5820.466796875"},
	{position: "8519.2744140625, 1125.76318359375, 5921.45654296875"},
	{position: "8456.32421875, 1108.9228515625, 5897.03857421875"},
	{position: "8482.76953125, 1076.9755859375, 6020.458984375"},
	{position: "8497.1943359375, 1039.478271484375, 6213.98779296875"},
	{position: "8889.22265625, 1036.721923828125, 6384.57861328125"},
	{position: "8886.5390625, 1036.2554931640625, 6528.68359375"},
	{position: "9088.6162109375, 1033.7896728515625, 6599.125"},
	{position: "9213.7119140625, 1033.1630859375, 6847.8154296875"},
	{position: "9107.869140625, 1039.2386474609375, 7002.2529296875"},
	{position: "9009.7900390625, 1034.111328125, 7064.90673828125"},
	{position: "9201.419921875, 1080.8551025390625, 7176.318359375"},
	{position: "9219.7587890625, 1168.1102294921875, 7304.90185546875"},
	{position: "9403.6953125, 1245.9742431640625, 7442.2744140625"},
	{position: "9406.8994140625, 1261.3759765625, 7712.36376953125"},
	{position: "9269.640625, 1161.0789794921875, 7794.189453125"},
	{position: "9077.2138671875, 1056.630859375, 7953.9677734375"},
	{position: "9461.2333984375, 1101.22802734375, 8011.2119140625"},
	{position: "9623.8017578125, 1295.2501220703125, 7833.87841796875"},
	{position: "9820.0537109375, 1423.7835693359375, 7684.39501953125"},
	{position: "10241.869140625, 1421.813232421875, 7510.81396484375"},
	{position: "10360.29296875, 1375.2327880859375, 7442.400390625"},
	{position: "10373.421875, 1343.5635986328125, 7043.94140625"},
	{position: "10578.47265625, 1358.153076171875, 6980.13134765625"},
	{position: "10696.837890625, 1428.9786376953125, 6764.34130859375"},
	{position: "10782.248046875, 1403.246337890625, 6102.76171875"},
	{position: "10542.1591796875, 1364.5269775390625, 5918.8447265625"},
	{position: "10239.755859375, 1458.1690673828125, 5781.38671875"},
	{position: "10043.423828125, 1360.98681640625, 5656.19091796875"},
	{position: "9739.373046875, 1352.6180419921875, 5462.92578125"},
	{position: "9407.888671875, 1302.041015625, 5179.44189453125"},
	{position: "9270.7060546875, 1330.5152587890625, 4989.69287109375"},
	{position: "9128.1806640625, 1308.8203125, 4883.3955078125"},
	{position: "9069.455078125, 1090.620849609375, 4454.6708984375"},
	{position: "9083.3125, 1054.0906982421875, 4221.9208984375"},
	{position: "9085.55078125, 1025.6082763671875, 4083.237060546875"},
	{position: "9289.76953125, 1121.6478271484375, 3915.015869140625"},
	{position: "9424.470703125, 1088.12060546875, 3735.17138671875"},
	{position: "10153.95703125, 1108.7435302734375, 4386.85107421875"},
	{position: "10566.1591796875, 1146.73583984375, 4470.3173828125"},
	{position: "10481.404296875, 1058.8382568359375, 3948.056396484375"},
	{position: "10856.2197265625, 1044.473876953125, 3948.58154296875"},
	{position: "11025.6103515625, 1114.3526611328125, 3812.47998046875"},
	{position: "11286.4521484375, 1028.5054931640625, 3684.480224609375"},
	{position: "11506.130859375, 1206.94580078125, 3797.1513671875"},
	{position: "11652.91796875, 1025.65771484375, 4140.9716796875"},
	{position: "11466.1064453125, 1146.19140625, 4289.05712890625"},
	{position: "11538.8330078125, 1198.0621337890625, 4744.05810546875"},
	{position: "11991.9404296875, 1082.340576171875, 4697.134765625"},
	{position: "12341.3134765625, 1116.5301513671875, 4802.59228515625"},
	{position: "12503.1796875, 1145.5977783203125, 5104.0009765625"},
	{position: "12731.755859375, 1025.8280029296875, 5435.9208984375"},
	{position: "12771.57421875, 1026.4041748046875, 5793.0595703125"},
	{position: "12713.8447265625, 1026.04150390625, 6137.775390625"},
	{position: "12512.1953125, 1043.143798828125, 6267.541015625"},
	{position: "12330.7451171875, 1105.2232666015625, 6420.14013671875"},
	{position: "12311.5703125, 1173.99951171875, 6611.8330078125"},
	{position: "12668.138671875, 1091.442626953125, 6717.17529296875"},
	{position: "12930.3505859375, 1035.6209716796875, 6926.18310546875"},
	{position: "12634.13671875, 1125.1766357421875, 7325.36083984375"},
	{position: "12640.3857421875, 1291.1224365234375, 7859.412109375"},
	{position: "12362.26953125, 1120.8463134765625, 8410.029296875"},
	{position: "12324.6767578125, 1130.7017822265625, 8592.873046875"},
	{position: "12199.6640625, 1176.560546875, 8796.466796875"},
	{position: "12365.5234375, 1047.19091796875, 9151.0771484375"},
	{position: "11999.052734375, 1025.0147705078125, 9264.400390625"},
	{position: "11716.328125, 1072.767822265625, 9254.77734375"},
	{position: "11524.17578125, 1272.231689453125, 9320.908203125"},
	{position: "11219.2421875, 1074.9166259765625, 9514.869140625"},
	{position: "11098.7861328125, 1047.4412841796875, 9471.2216796875"},
	{position: "10773.939453125, 1169.78662109375, 9100.220703125"},
	{position: "10560.033203125, 1280.65234375, 8990.0400390625"},
	{position: "10326.6025390625, 1024.1842041015625, 9284.990234375"},
	{position: "10809.2216796875, 1188.2762451171875, 8524.0537109375"},
	{position: "10969.55078125, 1159.824462890625, 8041.62060546875"},
	{position: "11251.8505859375, 1208.2216796875, 7354.318359375"},
	{position: "11417.041015625, 1202.5250244140625, 7050.421875"},
	{position: "11068.44140625, 1238.0780029296875, 6787.44970703125"},
	{position: "10810.228515625, 1420.118896484375, 6671.0869140625"},
	{position: "10627.515625, 1328.1153564453125, 6043.78125"},
	{position: "10501.8955078125, 1397.898681640625, 5844.974609375"},
	{position: "10478.4443359375, 1483.8026123046875, 5652.9375"},
	{position: "10761.572265625, 1502.8331298828125, 5595.03515625"},
	{position: "10524.876953125, 1355.79248046875, 5171.30078125"},
];

const MAGNETIC_DETECTOR_POWER = [
	150, // handmade
	200, // wood
	250, // bronze
	300, // iron
	400, // diamond
	500 // bavarium
];

const MAGNETIC_DETECTOR_NAME = [
	"Handmade",
	"Wood",
	"Bronze",
	"Iron",
	"Diamond",
	"Bavarium"
];

const MAGNETIC_DETECTOR_PRICE = {
	1: 3000,
	2: 4000,
	3: 5000,
	4: 6000,
	5: 7000,
};

var searching;
var jobEvents = [];

jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.itemId == "BAVARIUMARCHEOLOGIST_START")
		StartSearching();

	if (args.itemId == "BAVARIUMARCHEOLOGIST_STOP")
		StopSeaching();
});

jcmp.events.Add("GetJobInteractionMenu", function() {
    if (jcmp.localPlayerData.idJob != 20)
        return false;
    
	let items = [];
    
	let item_toggle;

	if (searching) {
		item_toggle = {
			id: "BAVARIUMARCHEOLOGIST_STOP",
			txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_STOP"),
			description: jcmp.languages.get("BAVARIUMARCHEOLOGIST_STOP_DESCRIPTION"),
			special: "close"
		};
    } else {
		item_toggle = {
			id: "BAVARIUMARCHEOLOGIST_START",
			txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_START"),
			description: jcmp.languages.get("BAVARIUMARCHEOLOGIST_START_DESCRIPTION"),
			special: "close"
		};	
	}
    
    items.push(item_toggle);	

	items.push({
		id: "BAVARIUMARCHEOLOGIST_EQUIPAMENT",
		txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_EQUIPAMENT"),
		subTxt: MAGNETIC_DETECTOR_NAME[jcmp.localPlayerData.magneticDetectorLevel],
		description: jcmp.languages.get("BAVARIUMARCHEOLOGIST_EQUIPAMENT_DESCRIPTION", [`Magnetic Detector (${MAGNETIC_DETECTOR_NAME[jcmp.localPlayerData.magneticDetectorLevel]})`]),
	});	

    return items;
});

jcmp.events.AddRemoteCallable("UpdateBavariumCache", function(bv_cache) {
	bavarium_cache_object = JSON.parse(bv_cache);
	UpdateBavariumSites();
});

function UpdateBavariumSites() {
	for (let i = bavarium_cache.length - 1; i >= 0; i--) {
		jcmp.events.Call("DeleteSite", "JOB_BAVARIUMARCHEOLOGIST_SITE_" + bavarium_cache[i].idSite, "JOB_BAVARIUMARCHEOLOGIST_SITE");
	}

	bavarium_cache = [];

	for (let idSite in bavarium_cache_object) {
		if (!bavarium_cache_object[idSite])
			continue;

		let position = jcmp.utils.vector3.parse(BAVARIUM_SITES[idSite].position);
		bavarium_cache.push({idSite: idSite, position: position});

		if (jcmp.localPlayerData.idJob == 20)
			jcmp.events.Call("AddSite", "JOB_BAVARIUMARCHEOLOGIST_SITE_" + idSite, jcmp.languages.get("BAVARIUMARCHEOLOGIST_BAVARIUM"), position, 5, 0, 0, "JOB_BAVARIUMARCHEOLOGIST_SITE", idSite);
	}
}

function StartSearching() {
	if (jcmp.localPlayerData.vehicle) {
		jcmp.events.Call('UpdateCustomMenuItem', "INTERACTION_MENU_LIST", {notify: jcmp.languages.get("COMMON_CANT_BE_IN_VEHICLE"), error: true});
		return;
	}
	
	if (searching)
		StopSeaching();

	searching = {
		closestSite: {distance: 9999999, indexSite: 0},
	};

	searching.events = [
		jcmp.events.Add("Tick3Seconds", function() {
			if (!searching)
				return;

			let closestSite = {distance: 999999, indexSite: 0};

			for (let c = bavarium_cache.length - 1; c >= 0; c--) {
				let cache = bavarium_cache[c];
				let distance = Math.max(jcmp.utils.vector3.distance(jcmp.localPlayer.position, cache.position) - 5, 0);

				if (distance < closestSite.distance)
					closestSite = {distance: distance, indexSite: cache.idSite};
			}

			if (closestSite.distance <= MAGNETIC_DETECTOR_POWER[jcmp.localPlayerData.magneticDetectorLevel] && !jcmp.localPlayerData.sites["JOB_BAVARIUMARCHEOLOGIST_SITE"]) {
				if (closestSite.distance <= 15)
					jcmp.ui.CallEvent("PlaySound", "metaldet5");
				else if (closestSite.distance <= 25)
					jcmp.ui.CallEvent("PlaySound", "metaldet4");
				else if (closestSite.distance <= 50)
					jcmp.ui.CallEvent("PlaySound", "metaldet3");
				else if (closestSite.distance <= 75)
					jcmp.ui.CallEvent("PlaySound", "metaldet2");
				else
					jcmp.ui.CallEvent("PlaySound", "metaldet1");
			}

			if (typeof searching !== 'undefined')
				searching.closestSite = closestSite;

			UpdateHUD();
		}),

		jcmp.events.Add("LocalPlayerEnterSite", function(site) {
			if (site.idSiteType == "JOB_BAVARIUMARCHEOLOGIST_SITE") {
				jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("BAVARIUMARCHEOLOGIST_BAVARIUM_SITE"), "[F]", jcmp.languages.get("BAVARIUMARCHEOLOGIST_BUTTON_PRESS"));
				jcmp.ui.CallEvent("PlaySound", "trigger");
			}
		}),

		jcmp.events.Add('KeyHold', function(id) {
			if (id == "KEYHOLD_STARTDIGGING" && jcmp.localPlayerData.sites["JOB_BAVARIUMARCHEOLOGIST_SITE"] && searching)
				Dig();
		}),

		jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
			if (key != 70 || !jcmp.localPlayerData.sites["JOB_BAVARIUMARCHEOLOGIST_SITE"] || !searching)
				return;

			if (jcmp.localPlayerData.catchedCount >= MAX_WEIGHT) {
				jcmp.notifications.add("", jcmp.languages.get("CATCHER_CATCHED_COUNT_LIMIT", [jcmp.localPlayerData.catchedCount]), "cancel", "cancel");
				return;
			}
		
			jcmp.ui.CallEvent("StartKeyHold", "KEYHOLD_STARTDIGGING", jcmp.languages.get("BAVARIUMARCHEOLOGIST_DIGGING"), 70, 7000, "digging", true);
		}),
	];

    jcmp.events.CallRemote("CreateAttribute", "working", true);
	UpdateHUD();
}

function Dig() {
	if (!jcmp.localPlayerData.sites["JOB_BAVARIUMARCHEOLOGIST_SITE"]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("SITE_NOT_IN", jcmp.languages.get("BAVARIUMARCHEOLOGIST_BAVARIUM_SITE")), "cancel", "cancel");
		return;
	}

	if (jcmp.localPlayerData.catchedCount >= MAX_WEIGHT) {
		jcmp.notifications.add("", jcmp.languages.get("CATCHER_CATCHED_COUNT_LIMIT", [jcmp.localPlayerData.catchedCount]), "cancel", "cancel");
		return;
	}

	let indexSite = jcmp.localPlayerData.sites["JOB_BAVARIUMARCHEOLOGIST_SITE"].value;

	let randomModifier = 0.7 - Math.random() * 0.7;
	let weightToWin = 10 + Math.floor(randomModifier * 10);

	jcmp.localPlayerData.catchedCount += weightToWin;

	jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "catchedCount", jcmp.localPlayerData.catchedCount);
	jcmp.events.CallRemote("JobDone", null, weightToWin * VALUE_KG);
	
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("BAVARIUMARCHEOLOGIST_BAVARIUM_CATCHED", [weightToWin]), "asteroid");
	jcmp.ui.CallEvent("PlaySound", "mission-complete");

	jcmp.events.CallRemote("BavariumAcheologistDigged", indexSite);

	StopSeaching();

	delete bavarium_cache_object[indexSite];
	UpdateBavariumSites();
}

function StopSeaching() {
	if (!searching)
		return;

	let events = searching.events;

	for (let e = events.length - 1; e >= 0; e--) {
		jcmp.events.Remove(events[e]);
	}

    jcmp.events.CallRemote("CreateAttribute", "working", false);
	searching = false;
	UpdateHUD();
}

function UpdateHUD() {
	if (!searching) {
		jcmp.ui.CallEvent('UpdateJobUI', false);
		return;
	}

	let percent = "0.0";
	
	let maxDistance = MAGNETIC_DETECTOR_POWER[jcmp.localPlayerData.magneticDetectorLevel];
	
	if (searching.closestSite.distance <= maxDistance)
		percent = Math.floor(100 - (100 * searching.closestSite.distance / maxDistance)).toFixed(1);

	let jobUI = {
		header: jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob),
		progress1: {
			text: jcmp.languages.get("BAVARIUMARCHEOLOGIST_PERCENT_CLOSE", [percent]),
			progressActual: percent,
			progressTotal: 100,
			active: true,
		},
	};

	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify(jobUI));
}

jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "idJob") {
		StopSeaching();
		UpdateBavariumSites();
	}
});

jcmp.events.Add("CustomMenuPressed_selling-point-bavarium-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(23))
		return;

	if (args.itemId == "BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE") {
		if (jcmp.localPlayerData.magneticDetectorLevel >= 5)
			return;
		
		let price = MAGNETIC_DETECTOR_PRICE[jcmp.localPlayerData.magneticDetectorLevel + 1];

		if (jcmp.localPlayerData.money < price) {
			jcmp.events.Call('UpdateCustomMenuItem', "BAVARIUMARCHEOLOGIST_SELLING_POINT_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
			return;
		}

		jcmp.events.CallRemote("BuyMagneticDetectorUpgrade");
		jcmp.ui.CallEvent("PlaySound", "coins");
		jcmp.events.Call("CloseCustomMenu");
		
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_20"), jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADED", [MAGNETIC_DETECTOR_NAME[jcmp.localPlayerData.magneticDetectorLevel + 1]]), "magnifier");
		return;
	}

	if (args.itemId == "BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES") {
		if (jcmp.localPlayerData.catchedCount <= 0) {
			jcmp.events.Call('UpdateCustomMenuItem', "BAVARIUMARCHEOLOGIST_SELLING_POINT_LIST", {notify: jcmp.languages.get("CATCHER_HAVE_NOTHING_TO_SELL"), error: true});
			return;
		}

		let catchesValue = Math.floor(jcmp.localPlayerData.catchedCount * VALUE_KG);

		jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "catchedCount", 0);
		jcmp.events.CallRemote("JobDone", catchesValue, null);

		jcmp.events.Call('UpdateCustomMenuItem', "BAVARIUMARCHEOLOGIST_SELLING_POINT_LIST", {notify: jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_SOLD_ALL_CATCHES"), success: true});
		jcmp.events.Call('UpdateCustomMenuItem', "BAVARIUMARCHEOLOGIST_SELLING_POINT_MY_CATCHES", {subTxt: "0 KG"});
		jcmp.events.Call('UpdateCustomMenuItem', "BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES", {subTxt: "$ 0"});
		
		jcmp.ui.CallEvent("PlaySound", "coins");
		return;
	}
});

jcmp.events.Add("OpenMenuSite", function(idSiteType) {
	if (idSiteType != 23) return;

	if (jcmp.localPlayerData.idJob != 20) {
		jcmp.notifications.add("", jcmp.languages.get("CATCHER_SELLING_POINT_ALLOWED_ONLY"), "cancel",  "cancel");
		return;
	}

	let catchesValue = Math.floor(jcmp.localPlayerData.catchedCount * VALUE_KG);

	let canUpgrade = jcmp.localPlayerData.magneticDetectorLevel != 5;

	let menu = {
		id: "selling-point-bavarium-custom-menu",
		header: {img: "bavarium-shop.jpg"},
		body: {
			id: "BAVARIUMARCHEOLOGIST_SELLING_POINT_LIST",
			subheader: {txt: "MENU"},
			items: [
				{
					id: "BAVARIUMARCHEOLOGIST_SELLING_POINT_MY_CATCHES",
					txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_MY_CATCHES"),
					subTxt: jcmp.localPlayerData.catchedCount + " KG"
				},
				{
					id: "BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES",
					txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES"),
					subTxt: "$ " + catchesValue,
					description: jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_SELL_CATCHES")
				},
				{
					id: "BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE",
					txt: jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE"),
					subTxt: canUpgrade ? "$ " + MAGNETIC_DETECTOR_PRICE[jcmp.localPlayerData.magneticDetectorLevel + 1] : "MAX",
					disabled: jcmp.localPlayerData.magneticDetectorLevel == 5,
					description: canUpgrade ? jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_UPGRADE_DESCRIPTION", [MAGNETIC_DETECTOR_NAME[jcmp.localPlayerData.magneticDetectorLevel + 1]]) : jcmp.languages.get("BAVARIUMARCHEOLOGIST_SELLING_POINT_CANT_UPGRADE_DESCRIPTION"),
				},
			],
		}
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
});