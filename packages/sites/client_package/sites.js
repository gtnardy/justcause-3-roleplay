'use strict';

const POIS = {};
try {
	POIS["yellow-dot"] = new Texture(`package://sites/images/yellow-dot.png`);
	POIS["white-dot"] = new Texture(`package://sites/images/white-dot.png`);
	// POIS["town-hall-dot"] = new Texture(`package://sites/images/town-hall-dot.png`);
		// "bank-dot": new Texture(`package://sites/images/bank-dot.png`),
		// "gas-station-dot": new Texture(`package://sites/images/gas-station-dot.png`),
		// "snackbar-dot": new Texture(`package://sites/images/snackbar-dot.png`),
		// "hospital-dot": new Texture(`package://sites/images/hospital-dot.png`),
		// "weapon-store-dot-dot": new Texture(`package://sites/images/weapon-store-dot.png`),
		// "dealership-dot": new Texture(`package://sites/images/dealership-dot.png`),
		// "house-dot": new Texture(`package://sites/images/house-dot.png`),
		// "police-department-dot": new Texture(`package://sites/images/police-department-dot.png`),
		// "driving-school-dot": new Texture(`package://sites/images/driving-school-dot.png`),
		// "convenience-store-dot": new Texture(`package://sites/images/convenience-store-dot.png`),
		// "payn-spray-dot": new Texture(`package://sites/images/payn-spray-dot.png`),
		// "bus-stop-dot": new Texture(`package://sites/images/bus-stop-dot.png`),
		// "selling-point-dot": new Texture(`package://sites/images/selling-point-dot.png`),
		// "racing-dot": new Texture(`package://sites/images/racing-dot.png`),
	// };
} catch (error) {
	jcmp.events.Call('ScriptError', "sites.js", 0, error, "");
}

jcmp.sites = {};
jcmp.sitesType = {};
jcmp.localPlayerData.sites = {};


// 1 any, 2 vehicle, 3 special
const triggerSites = [];
triggerSites[1] = 2;
triggerSites[2] = 1;
triggerSites[3] = 1;
triggerSites[4] = 1;
triggerSites[5] = 1;
triggerSites[6] = 1;
triggerSites[7] = 1;
triggerSites[8] = 1;
triggerSites[9] = 1;
triggerSites[12] = 2;
triggerSites[14] = 1;
triggerSites[15] = 1;
triggerSites[16] = 1;
triggerSites[17] = 1;
triggerSites[20] = 1;
triggerSites[21] = 1;
triggerSites[22] = 1;
triggerSites[23] = 1;
triggerSites["JOB_BAVARIUMARCHEOLOGIST_SITE"] = 3;

var streamedSites = [];

// jcmp.ui.AddEvent("LocalPlayerLoaded1", function() {
// 	POIS["gas-station-dot"] = new Texture(`package://sites/images/gas-station-dot.png`);
// 	POIS["snackbar-dot"] = new Texture(`package://sites/images/snackbar-dot.png`);
// 	POIS["hospital-dot"] = new Texture(`package://sites/images/hospital-dot.png`);
// });


// jcmp.ui.AddEvent("LocalPlayerLoaded2", function() {
// 	POIS["weapon-store-dot-dot"] = new Texture(`package://sites/images/weapon-store-dot.png`);
// 	POIS["dealership-dot"] = new Texture(`package://sites/images/dealership-dot.png`);
// 	POIS["house-dot"] = new Texture(`package://sites/images/house-dot.png`);
// });


// jcmp.ui.AddEvent("LocalPlayerLoaded4", function() {
// 	POIS["police-department-dot"] = new Texture(`package://sites/images/police-department-dot.png`);
// 	POIS["driving-school-dot"] = new Texture(`package://sites/images/driving-school-dot.png`);
// 	POIS["convenience-store-dot"] = new Texture(`package://sites/images/convenience-store-dot.png`);
// });


// jcmp.ui.AddEvent("LocalPlayerLoaded5", function() {
// 	POIS["payn-spray-dot"] = new Texture(`package://sites/images/payn-spray-dot.png`);
// 	POIS["bus-stop-dot"] = new Texture(`package://sites/images/bus-stop-dot.png`);
// 	POIS["selling-point-dot"] = new Texture(`package://sites/images/selling-point-dot.png`);
// });


// jcmp.ui.AddEvent("LocalPlayerLoaded", function() {
// 	POIS["racing-dot"] = new Texture(`package://sites/images/racing-dot.png`);
// 	POIS["bank-dot"] = new Texture(`package://sites/images/bank-dot.png`);
// });


jcmp.events.Call("AddCommand",
	{
		command: "setsite",
		parameters: [
			{parameter: "idSiteType", type: "number"},
			{parameter: "minDistance", type: "string"},
			{parameter: "province", type: "number"},
			{parameter: "name", type: "string"},
		],
		permissions: 4,
		callback: function(args) {
			jcmp.ui.CallEvent('chat_message', "Creating: '" + args.name + "' " + args.idSiteType + "...", 0, 255, 255);
			jcmp.events.CallRemote("SetSite", args.name, args.idSiteType, args.minDistance, args.province);
		}
	}
);


jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
	if (key != 70 || !allowed || jcmp.localPlayerData.lookingAt) return;

	for (let ts in triggerSites) {
		if (jcmp.localPlayerData.sites[ts] && ((triggerSites[ts] == 1 && !jcmp.localPlayerData.vehicle) || triggerSites[ts] == 2)) {
			jcmp.events.Call("OpenMenuSite", ts);
		}
	}
});


jcmp.ui.AddEvent('TickFiveSeconds', function() {
	UpdateStreamedSites();
});


function UpdateStreamedSites() {
	streamedSites = [];
	for (let key in jcmp.sites) {
		if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, jcmp.sites[key].position) <= (jcmp.sites[key].maxDistance || 600))
			streamedSites.push(jcmp.sites[key]);
    }
}


jcmp.ui.AddEvent('Tick', function() {
	for (let key in jcmp.localPlayerData.sites) {
		if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, jcmp.localPlayerData.sites[key].position) > jcmp.localPlayerData.sites[key].minDistance)
			LocalPlayerExitSite(key);
	}
});


jcmp.events.Add('Tick2Ms', function() {
	for (let key = streamedSites.length - 1; key >= 0; key--) {
		if (streamedSites[key] && !jcmp.localPlayerData.sites[streamedSites[key].idSiteType] && jcmp.utils.vector3.distance(jcmp.localPlayer.position, streamedSites[key].position) <= streamedSites[key].minDistance)
			LocalPlayerEnterSite(streamedSites[key]);
	}
});


jcmp.events.Add("ForceLocalPlayerExitSite", function(id) {
    if (!jcmp.localPlayerData.sites[id])
        return;
        
    LocalPlayerExitSite(id);
});


function LocalPlayerExitSite(key) {
	jcmp.events.Call('LocalPlayerExitSite', jcmp.localPlayerData.sites[key]);
	jcmp.events.CallRemote("PlayerExitSite", key);

	if (triggerSites[jcmp.localPlayerData.sites[key].idSiteType])
		jcmp.ui.CallEvent("UpdateActionUI", false);
        
	delete jcmp.localPlayerData.sites[key];
}


function LocalPlayerEnterSite(site) {
	if (jcmp.localPlayerData.level <= 5) {
		switch(site.idSiteType) {
			case 1:
				jcmp.events.Call("StartTutorial", "GASSTATION");
				break;

			case 3:
				jcmp.events.Call("StartTutorial", "BANK");
				break;

			case 4:
				jcmp.events.Call("StartTutorial", "TOWNHALL");
				break;

			case 5:
				jcmp.events.Call("StartTutorial", "SNACKBAR");
				break;
		}
	}

	jcmp.localPlayerData.sites[site.idSiteType] = site;
    jcmp.events.Call('LocalPlayerEnterSite', site);
    
    if (site.idSiteType != 11 && site.idSiteType != 10)
        jcmp.ui.CallEvent("HidePoliceRadio", true);

	if (triggerSites[site.idSiteType] && triggerSites[site.idSiteType] != 3) {
		jcmp.ui.CallEvent("UpdateActionUI", jcmp.languages.get("SITE_NAME_" + site.idSiteType), "[F]", jcmp.languages.get("SITES_ENTERED_MENU"));
        jcmp.ui.CallEvent("PlaySound", "trigger");
	}

	jcmp.events.CallRemote("PlayerEnterSite", site.idSiteType, site.id);
}


jcmp.events.AddRemoteCallable('UpdateSites', function(sites, sitesType) {

	for (let key in jcmp.sites) {
        if (jcmp.sites[key].fixed) {
            jcmp.sites[key].poi.Destroy();
            delete jcmp.sites[key];
        }
    }
    
	jcmp.sitesType = JSON.parse(sitesType);
	sites = JSON.parse(sites);

	for (let key in sites) {

		if (!sites[key])
			continue;

		let site = addSite(key, sites[key].name, jcmp.utils.vector3.parse(sites[key].position), sites[key].minDistance, sites[key].maxDistance, sites[key].poiType, sites[key].idSiteType, false, false);

		site.provinceName = sites[key].provinceName;
		site.text = jcmp.languages.get("SITE_NAME_" + sites[key].idSiteType);

		if (site.idSiteType == 9 && jcmp.houses) {
			let house = jcmp.houses[key];
			if (house)
				site.text = house.name;
		}

    }

    jcmp.events.Call("SitesUpdated");
	UpdateStreamedSites();
});


function addSite(id, name, position, minDistance, maxDistance, poiType, idSiteType, value, fixed) {

	let site = {
		id: id,
        name: name,
        text: name,
        poiType: poiType,
		position: position,
		idSiteType: idSiteType,
		minDistance: minDistance,
		maxDistance: maxDistance,
        value: value,
        fixed: fixed,
	};

    if (fixed) {
        let poi = new POI(poiType, position);
        poi.minDistance = 0;
        poi.maxDistance = maxDistance;
        poi.clampedToScreen = false;
        poi.text = name;
    
        site.poi = poi;
    }
    
	jcmp.sites[id] = site;
	return site;
}


jcmp.events.Add("AddSite", function(id, name, position, minDistance, maxDistance, poiType, idSiteType, value) {
	return addSite(id, name, position, minDistance, maxDistance, poiType, idSiteType, value, true);
});


jcmp.events.Add("DeleteSite", function(id, idSiteType) {
	if (!jcmp.sites[id])
		return;

	jcmp.sites[id].poi.Destroy();

	delete jcmp.sites[id];
	UpdateStreamedSites();

	if (idSiteType && jcmp.localPlayerData.sites[idSiteType])
		LocalPlayerExitSite(idSiteType);
});


const white = new RGBA(255, 255, 255);
const black = new RGBA(0, 0, 0, 255);
const div2 = new Vector2f(2, 2);
const sizeDot = new Vector2f(30, 30);
const sizeText = new Vector2f(300, 100);
const dotDivision = sizeDot.div(div2);
var screenCenter = jcmp.viewportSize.div(div2);
const shadow = new Vector3f(0.7, 0.7, 0);

jcmp.events.Add('LocalPlayerFullLoaded', function() {
	jcmp.events.Add('Render', (scriptingRenderer) => {
		let playerCameraPosition = jcmp.localPlayer.camera.position;

		for (let p = streamedSites.length - 1; p >= 0; p--) {
			let site = streamedSites[p];

			if (site.fixed)
				continue;

			let distance = jcmp.utils.vector3.distance(playerCameraPosition, site.position);
		
			if (distance > site.maxDistance)
				continue;

			let vector2df = (scriptingRenderer.WorldToScreen(site.position)).sub(dotDivision);
			
			if (vector2df.x <= 1 || vector2df.y <= 1)
				continue;

			if (jcmp.utils.vector3.distance(vector2df, screenCenter) < 100) {
				let v3 = new Vector3f(vector2df.x + 40, vector2df.y + 4, 0.5);
				scriptingRenderer.DrawText(site.text, v3.add(shadow), sizeText, black, 18, "Arial");
				scriptingRenderer.DrawText(site.text, v3, sizeText, white, 18, "Arial");
			}
		
			let texture = POIS[site.poiType] || POIS["white-dot"];
			if (texture)
				scriptingRenderer.DrawTexture(texture, vector2df, sizeDot);
		}
	});
});