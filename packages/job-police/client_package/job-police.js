'use strict';

const ui = new WebUIWindow("police_radio_ui", `package://job-police/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var callsPOI = [];

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "police_radio_ui")
		ui.BringToFront();
});

jcmp.events.Call("AddCommand",
	{
		command: "cuff", 
		permissions: 1,
		idJobs: [7],
		cooldown: 60,
		parameters: [
			{
				parameter: "player", type: "ccplayer"
			}
		],
		callback: function(args) {
			return Cuff(args.player);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "arrest", 
		permissions: 1,
		idJobs: [7],
		cooldown: 60,
		parameters: [
			{
				parameter: "player", type: "ccplayer"
			}
		],
		callback: function(args) {
			return Arrest(args.player);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "halt", 
		permissions: 1,
		idJobs: [7],
		cooldown: 60,
		parameters: [
			{
				parameter: "player", type: "splayer"
			}
		],
		callback: function(args) {
			return Halt(args.player);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "uncuff", 
		permissions: 1,
		idJobs: [7],
		parameters: [
			{
				parameter: "player", type: "ccplayer"
			}
		],
		callback: function(args) {
			Uncuff(args.player);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "inspect", 
		permissions: 1,
		idJobs: [7],
		cooldown: 30,
		parameters: [
			{
				parameter: "player", type: "player"
			}
		],
		callback: function(args) {
			return Inspect(args.player);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "suspect", 
		permissions: 1,
		idJobs: [7],
		cooldown: 30,
		parameters: [
			{parameter: "player", type: "cplayer"},
			{parameter: "type", type: "string"},
		],
		callback: function(args) {
			return Suspect(args.player, args.type);
		}
	}
);


jcmp.events.Add("GetJobContextMenu", function(playerData) {
	if (jcmp.localPlayerData.idJob != 7)
		return false;

	let items = [
		{
			id: "CONTEXT_MENU_JOB_POLICE_INSPECT",
			txt: jcmp.languages.get("CONTEXT_MENU_JOB_POLICE_INSPECT"),
		},
		{
			id: "CONTEXT_MENU_JOB_POLICE_CUFF",
			txt: jcmp.languages.get("CONTEXT_MENU_JOB_POLICE_CUFF"),
		},
		{
			id: "CONTEXT_MENU_JOB_POLICE_CUFFCAR",
			txt: jcmp.languages.get("CONTEXT_MENU_JOB_POLICE_CUFFCAR"),
		},
		{
			id: "CONTEXT_MENU_JOB_POLICE_UNCUFF",
			txt: jcmp.languages.get("CONTEXT_MENU_JOB_POLICE_UNCUFF"),
			disabled: !playerData.handcuffed
		},
	];

	return items;
});


jcmp.events.Add("ContextMenuPressed", function(args, playerData) {
	if (args.itemId == "CONTEXT_MENU_JOB_POLICE_INSPECT") {
		Inspect(playerData);
		jcmp.events.Call("CloseCustomMenu");
		return;
	}

	if (args.itemId == "CONTEXT_MENU_JOB_POLICE_CUFF") {
		Cuff(playerData);
		jcmp.events.Call("CloseCustomMenu");
		return;
	}

	if (args.itemId == "CONTEXT_MENU_JOB_POLICE_CUFFCAR") {
		CuffCar(playerData);
		jcmp.events.Call("CloseCustomMenu");
		return;
	}

	if (args.itemId == "CONTEXT_MENU_JOB_POLICE_UNCUFF") {
		Uncuff(playerData);
		jcmp.events.Call("CloseCustomMenu");
		return;
	}
});


jcmp.events.AddRemoteCallable("Call911", function(wantedPlayerName, idWantedStarType, isSuspect, locationName, suspectPosition) {

    locationName = locationName ? jcmp.languages.get("POLICEDEPARTMENT_NEAR", [locationName]) : jcmp.languages.get("POLICEDEPARTMENT_LOCATION_UNKNOWN");

	if (isSuspect)
		jcmp.notifications.add("911", jcmp.languages.get("POLICEDEPARTMENT_PLAYER_IS_SUSPECT_FOR", [wantedPlayerName, jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType), locationName]), "police-radio", "police-radio");
	else
        jcmp.notifications.add("911", jcmp.languages.get("POLICEDEPARTMENT_PLAYER_IS_WANTED_FOR", [wantedPlayerName, jcmp.languages.get("WANTEDSTAR_NAME_" + idWantedStarType), jcmp.wantedStarsData[idWantedStarType].stars, locationName]), "police-radio", "police-radio");
    
    let poi = new POI(15, jcmp.utils.vector3.parse(suspectPosition));
    poi.text = wantedPlayerName;
    poi.maxDistance = 5000;
    poi.minDistance = 3;
    poi.clampedToScreen = true;

    callsPOI.push({poi: poi, timeout: 120});
});


jcmp.ui.AddEvent("TickThirtySeconds", function() {
	for (let key = callsPOI.length - 1; key >= 0; key--) {
        callsPOI[key].timeout -= 30;
        if (callsPOI[key].timeout <= 0) {
            callsPOI[key].poi.Destroy();
            callsPOI.splice(key, 1);
        }
    }
});


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
    if (index == "idJob" && value != 7) {
        
        for (let key = callsPOI.length - 1; key >= 0; key--) {
            if (callsPOI[key].poi)
                callsPOI[key].poi.Destroy();
        }
        callsPOI = [];
    }
});


function Suspect(player, type) {
	if (type != "terrorism" && type != "attemptedmurder") {
		jcmp.notifications.add("911", jcmp.languages.get("POLICE_INVALID_SUSPECT", ["terrorism / attemptedmurder"]), "cancel", "cancel");
		return false;
	}
	jcmp.events.CallRemote("Suspect", player.networkId, type);
	return true;
}


function Inspect(player) {
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_7"), jcmp.languages.get("POLICE_INSPECT_REQUESTED", [player.name]), "police");
	jcmp.request.requestRemote("POLICE_INSPECT_REQUEST", player.networkId, "POLICE_REQUEST_INSPECT", [jcmp.localPlayerData.nname]);
	return true;
}


function Halt(player) {
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_7"), jcmp.languages.get("POLICE_HALT_SENT", [player.name]), "police", "police-blow");
	jcmp.events.CallRemote("Halt", player.networkId);
	jcmp.events.Call("AddAvailable911", "Resistance911", player.networkId, player.name);
	return true;
}


jcmp.events.Add("AcceptedRequest", function(id, playerId, playerName) {
	if (id != "POLICE_INSPECT_REQUEST")
		return;

	jcmp.notifications.add(jcmp.languages.get("POLICE_INSPECTION"), jcmp.languages.get("POLICE_YOU_ARE_BEING_INSPECTED_BY", [playerName]), "police");
});


jcmp.events.Add("AcceptedRemoteRequest", function(id, playerId, playerName) {
	if (id != "POLICE_INSPECT_REQUEST")
		return;
	
	jcmp.events.CallRemote("Inspect", playerId);
});


jcmp.events.Add("DeclinedRemoteRequest", function(id, playerId, playerName, type) {
	if (id != "POLICE_INSPECT_REQUEST")
		return;

	jcmp.notifications.add(jcmp.languages.get("POLICE_INSPECTION"), jcmp.languages.get("POLICE_INSPECT_DECLINED", [playerName]), "cancel", "cancel");

	jcmp.events.Call("AddAvailable911", "Resistance911", playerId, playerName);
});


function CuffCar(player) {
    
    let vehicle = null;
    for (let v = jcmp.vehicles.length - 1; v >= 0; v--) {
        if (typeof jcmp.vehicles[v] === 'undefined')
            continue;

        if (jcmp.utils.vector3.distance(jcmp.vehicles[v].position, jcmp.localPlayer.position) < 5 && jcmp.vehicles[v].modelHash == 4044104901) {
            vehicle = jcmp.vehicles[v];
            break;
        }
    }

    if (!vehicle) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("POLICE_NOT_CLOSE_TO_VEHICLE"), "cancel", "cancel");
        return;
    }
	
	jcmp.events.CallRemote("CuffCar", player.networkId, vehicle.networkId);
}


function Arrest(player) {
	if (!jcmp.localPlayerData.sites[6]) {
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("POLICEDEPARTMENT_NOT_IN"), "cancel", "cancel");
		return false;
	}
	
	jcmp.events.CallRemote("Arrest", player.networkId);
	return true;
}


function Cuff(player) {
	jcmp.events.CallRemote("Cuff", player.networkId);
	return true;
}


function Uncuff(player) {
	// é usado tambem em police.js
	jcmp.events.CallRemote("Uncuff", player.networkId);
}


jcmp.events.AddRemoteCallable('InspectedPlayer', function(playerData) {

    playerData = JSON.parse(playerData);
    
    jcmp.ui.CallEvent("ActiveNationalID", JSON.stringify({
        id: playerData.steamId,
        name: playerData.name,
        job: jcmp.languages.get("JOB_NAME_" + playerData.idJob),
        land: jcmp.languages.get("COMMON_YESNO_" + playerData.licenseCar),
        landBike: jcmp.languages.get("COMMON_YESNO_" + playerData.licenseBike),
        sea: jcmp.languages.get("COMMON_YESNO_" + playerData.licenseSea),
        air: jcmp.languages.get("COMMON_YESNO_" + playerData.licensePlane),
        airHelis: jcmp.languages.get("COMMON_YESNO_" + playerData.licenseHeli),
        health: jcmp.languages.get("COMMON_YESNO_" + playerData.healthInsurance),
        life: jcmp.languages.get("COMMON_YESNO_" + playerData.lifeInsurance),
        country: playerData.country,
    }));
});


jcmp.events.Add("LocalPlayerVehicleEntered", function(vehicle, seatIndex) {
    if (jcmp.localPlayerData.idJob != 7)
        return;

	if (vehicle.modelHash != 4044104901)
        return;
    
    jcmp.ui.CallEvent("ActivePoliceRadio", true);
});


jcmp.events.Add("LocalPlayerVehicleExited", function(vehicle, seatIndex) {
    if (jcmp.localPlayerData.idJob != 7)
		return;
		
	if (vehicle.modelHash != 4044104901)
        return;

    jcmp.ui.CallEvent("ActivePoliceRadio", false);
});