'use strict';

const rolloverPrice = 10;
const repairPrice = 20;
const paintPrice = 30;
const nitroPrice = 100;
const turboJumpPrice = 200;

jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.bodyId == "MECHANIC_COLORS_LIST")
		paint(args.value);
	
	if (args.itemId == "MECHANIC_NITRO")
		nitro();
	
	if (args.itemId == "MECHANIC_TURBOJUMP")
		turboJump();
	
	if (args.itemId == "MECHANIC_REPAIR")
		repair();
	
	if (args.itemId == "MECHANIC_ROLLOVER")
		rollover();
	
	if (args.itemId == "MECHANIC_GETIN")
		getIn();
});


jcmp.events.Add("GetJobInteractionMenu", function() {
    if (jcmp.localPlayerData.idJob != 3)
        return false;
    
	let items = [];
	
	let returnsServices = jcmp.events.Call("GetServicesCalls");

	for (let e = returnsServices.length - 1; e >= 0; e--) {
		if (returnsServices[e])
			items.push(returnsServices[e]);
	}

    let item_repair = {
        id: "MECHANIC_REPAIR",
        txt: jcmp.languages.get("PAYNSPRAY_REPAIR"),
        subTxt: "$ " + repairPrice,
        description: jcmp.languages.get("PAYNSPRAY_REPAIR_DESCRIPTION"),
    };
    
    items.push(item_repair);
    
    let item_colors = {
        id: "MECHANIC_COLORS",
        txt: jcmp.languages.get("PAYNSPRAY_COLORS"),
        description: jcmp.languages.get("PAYNSPRAY_COLORS_DESCRIPTION"),
        body: {
            id: "MECHANIC_COLORS_LIST",
            subheader: {txt: jcmp.languages.get("PAYNSPRAY_COLORS"), count: true},
            items: [],
        }
    };

    for (let id = 0; id < 100; id++) {
        item_colors.body.items.push({
            id: "MECHANIC_COLOR_BUY_" + id,
            txt: jcmp.languages.get("PAYNSPRAY_COLOR") + " " + id,
            subTxt: "$ " + paintPrice,
            description: jcmp.languages.get("PAYNSPRAY_COLOR_BUY_DESCRIPTION"),
            value: id
        });
    }

    items.push(item_colors);

    let item_nitro = {
        id: "MECHANIC_NITRO",
        txt: jcmp.languages.get("PAYNSPRAY_NITRO"),
        subTxt: nitroPrice,
        description: jcmp.languages.get("PAYNSPRAY_NITRO_DESCRIPTION"),
        disabled: !jcmp.localPlayerData.vehicle || jcmp.localPlayerData.vehicle.nitroEnabled
    };
    
    items.push(item_nitro);
    
    let item_turboJump = {
        id: "MECHANIC_TURBOJUMP",
        txt: jcmp.languages.get("PAYNSPRAY_TURBOJUMP"),
        subTxt: "$ " + turboJumpPrice,
        description: jcmp.languages.get("PAYNSPRAY_TURBOJUMP_DESCRIPTION"),
        disabled: !jcmp.localPlayerData.vehicle || jcmp.localPlayerData.vehicle.turboJumpEnabled
    };
    
    items.push(item_turboJump);	
    
    let item_rollover = {
        id: "MECHANIC_ROLLOVER",
        txt: jcmp.languages.get("MECHANIC_ROLLOVER"),
        subTxt: "$ " + rolloverPrice,
        description: jcmp.languages.get("MECHANIC_ROLLOVER_DESCRIPTION"),
    };
    
    items.push(item_rollover);
    

    let item_engine = {
        id: "MECHANIC_ENGINE",
        txt: jcmp.languages.get("PAYNSPRAY_ENGINE"),
        disabled: true,
        description: "Coming soon..."
    };
    
    items.push(item_engine);

    if (!jcmp.localPlayerData.vehicle) {
        for (let i = 1; i < items.length; i++) {
            items[i].disabled = true;
        }
    }

    let item_getin = {
        id: "MECHANIC_GETIN",
        txt: jcmp.languages.get("MECHANIC_GETIN"),
        description: jcmp.languages.get("MECHANIC_GETIN_DESCRIPTION"),
        disabled: jcmp.localPlayerData.vehicle,
    };
    
    items.push(item_getin);

    return items;
});


function getInVehicle(bodyId) {
	if (!jcmp.localPlayerData.vehicle) {
		jcmp.events.Call('UpdateCustomMenuItem', bodyId, {notify: jcmp.languages.get("COMMON_NOT_IN_VEHICLE"), error: true});
		return false;
    }
    
    return true;
}


function getIn() {
	if (jcmp.localPlayerData.vehicle) {
        jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_GETIN", {notify: jcmp.languages.get("COMMON_ALREADY_IN_VEHICLE"), error: true});
		return;
    }
    
    let vehicle = null;
    for (let v = jcmp.vehicles.length - 1; v >= 0; v--) {
        if (typeof jcmp.vehicles[v] === 'undefined')
            continue;

        if (jcmp.utils.vector3.distance(jcmp.vehicles[v].position, jcmp.localPlayer.position) < 3) {
            vehicle = jcmp.vehicles[v];
            break;
        }
    }

    if (!vehicle) {
		jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_GETIN", {notify: jcmp.languages.get("MECHANIC_NOT_CLOSE_TO_VEHICLE"), error: true});
        return;
    }

    jcmp.events.CallRemote("MECHANIC_GETIN", vehicle.networkId);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_GETIN", {notify: jcmp.languages.get("MECHANIC_GOT_IN_VEHICLE"), success: true, disabled: true});
}

function hasMoney(value, bodyId) {
	if (jcmp.localPlayerData.money < value) {
		jcmp.events.Call('UpdateCustomMenuItem', bodyId, {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return false;
    }
    
    return true;
}


function paint(color) {
    if (!getInVehicle("MECHANIC_PAINT"))
        return;
    
    if (!hasMoney(paintPrice, "MECHANIC_PAINT"))
        return;
    
	jcmp.events.CallRemote("MECHANIC_PAINT", color, paintPrice);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_PAINT", {notify: jcmp.languages.get("MECHANIC_PAINTED"), success: true});
    jcmp.ui.CallEvent("PlaySound", "spray");
}


function repair() {
    if (!getInVehicle("MECHANIC_REPAIR"))
        return;
    
    if (!hasMoney(repairPrice, "MECHANIC_REPAIR"))
        return;
    
	jcmp.events.CallRemote("MECHANIC_REPAIR", repairPrice);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_REPAIR", {notify: jcmp.languages.get("MECHANIC_REPAIRED"), success: true, disabled: true});
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function rollover() {
    if (!getInVehicle("MECHANIC_ROLLOVER"))
        return;
    
    if (!hasMoney(rolloverPrice, "MECHANIC_ROLLOVER"))
        return;

	jcmp.events.CallRemote("MECHANIC_ROLLOVER", rolloverPrice);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_ROLLOVER", {notify: jcmp.languages.get("MECHANIC_UNROLLED"), success: true});
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function nitro() {
    if (!getInVehicle("MECHANIC_NITRO"))
        return;
    
    if (!hasMoney(nitroPrice, "MECHANIC_NITRO"))
        return;

	jcmp.events.CallRemote("MECHANIC_NITRO", nitroPrice);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_NITRO", {notify: jcmp.languages.get("MECHANIC_NITRO_ADDED"), success: true, disabled: true});
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function turboJump() {
    if (!getInVehicle("MECHANIC_TURBOJUMP"))
        return;
    
    if (!hasMoney(turboJumpPrice, "MECHANIC_TURBOJUMP"))
        return;

	jcmp.events.CallRemote("MECHANIC_TURBOJUMP", turboJumpPrice);
    jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_TURBOJUMP", {notify: jcmp.languages.get("MECHANIC_TURBOJUMP_ADDED"), success: true, disabled: true});
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


jcmp.events.Add("LocalPlayerVehicleEntered", function(vehicle, seat) {
    if (jcmp.localPlayerData.idJob != 3)
        return;

	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_REPAIR", {disabled: false});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_COLORS", {disabled: false});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_NITRO", {disabled: jcmp.localPlayerData.vehicle.nitroEnabled});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_TURBOJUMP", {disabled: jcmp.localPlayerData.vehicle.turboJumpEnabled});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_ROLLOVER", {disabled: false});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_GETIN", {disabled: true});
});


jcmp.events.Add("LocalPlayerVehicleExited", function(vehicle, seat) {
    if (jcmp.localPlayerData.idJob != 3)
        return;

	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_REPAIR", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_COLORS", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_NITRO", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_TURBOJUMP", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_ROLLOVER", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "MECHANIC_GETIN", {disabled: false});
});