'use strict';

const repairPrice = 200;
const colorPrice = 150;
const nitroPrice = 500;
const turboJumpPrice = 700;
const platePrice = 1000;


jcmp.events.Add("CustomMenuClosed_paynspray-custom-menu", function() {
	jcmp.events.CallRemote("ExitedPaynSpray");
});


jcmp.events.Add("CustomMenuPressed_paynspray-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(12))
		return;
	
	if (args.bodyId == "PAYNSPRAY_COLORS_LIST")
		BuyColor(args.value);
	
	if (args.itemId == "PAYNSPRAY_NITRO")
		BuyNitro();
	
	if (args.itemId == "PAYNSPRAY_TURBOJUMP")
		BuyTurboJump();
	
	if (args.itemId == "PAYNSPRAY_REPAIR")
		BuyRepair();
	
	if (args.itemId == "PAYNSPRAY_PLATE")
		ChangePlate();
	
	if (args.itemId == "PAYNSPRAY_SELL")
		SellVehicle();
});


jcmp.events.Add("CustomMenuSelected_paynspray-custom-menu", function(args) {
	if (args.bodyId == "PAYNSPRAY_COLORS_LIST")
		jcmp.events.CallRemote('ChangeColor', args.value);
});


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id != "PAYNSPRAY_CHANGEPLATE")
        return;
        
    jcmp.events.CallRemote('ChangePlate', value);
});


function ChangePlate() {
	if (jcmp.localPlayerData.money < platePrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}	
    
    jcmp.events.Call("SetInputText", "PAYNSPRAY_CHANGEPLATE", jcmp.languages.get("PAYNSPRAY_CHANGEPLATE"), jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.plate, 25);
    
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function SellVehicle() {
	jcmp.events.CallRemote("SellVehicle");
}


function BuyRepair() {
	if (jcmp.localPlayerData.money < repairPrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}	
	
	jcmp.events.CallRemote('BuyRepair');
	
	jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_REPAIR", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
    });
    
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function BuyNitro() {
	
	if (jcmp.localPlayerData.vip != 2 && jcmp.localPlayerData.money < nitroPrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}	
	
	jcmp.events.CallRemote('BuyNitro');
	
	jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_NITRO", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
    });	
    
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function BuyTurboJump() {
	
	if (jcmp.localPlayerData.money < turboJumpPrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}	
	
	jcmp.events.CallRemote('BuyTurboJump');
	
	jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_TURBOJUMP", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
    });	
    
    jcmp.ui.CallEvent("PlaySound", "air-wrench");
}


function BuyColor(id) {
	
	if (jcmp.localPlayerData.money < colorPrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_COLORS_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}	
	
	jcmp.events.CallRemote('BuyColor', id);
	
	jcmp.events.Call('UpdateCustomMenuItem', "PAYNSPRAY_COLOR_BUY_" + id, {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
    });	

    jcmp.ui.CallEvent("PlaySound", "spray");
}


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 12) return;
	
	if (!jcmp.localPlayerData.vehicle || jcmp.localPlayerData.seat != 0) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_12"), jcmp.languages.get("COMMON_NOT_IN_VEHICLE"), "cancel", "cancel");
		return;
	}

	jcmp.events.CallRemote("EnteredPaynSpray");
	
	var menu = {
		key: 70,
		id: "paynspray-custom-menu",
		header: {img: "paynspray.jpg"},
		body: {
			id: "PAYNSPRAY_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_12"), count: true},
			items: [],
		}
	};
	
	let item_repair = {
		id: "PAYNSPRAY_REPAIR",
		txt: jcmp.languages.get("PAYNSPRAY_REPAIR"),
		subTxt: "$ " + repairPrice,
		description: jcmp.languages.get("PAYNSPRAY_REPAIR_DESCRIPTION"),
	};
	
	menu.body.items.push(item_repair);
	
	let item_colors = {
		id: "PAYNSPRAY_COLORS",
		txt: jcmp.languages.get("PAYNSPRAY_COLORS"),
		description: jcmp.languages.get("PAYNSPRAY_COLORS_DESCRIPTION"),
		body: {
			id: "PAYNSPRAY_COLORS_LIST",
			subheader: {txt: jcmp.languages.get("PAYNSPRAY_COLORS"), count: true},
			items: [],
		}
	};

	for (let id = 0; id < 100; id++) {
		item_colors.body.items.push({
			id: "PAYNSPRAY_COLOR_BUY_" + id,
			txt: jcmp.languages.get("PAYNSPRAY_COLOR") + " " + id,
			subTxt: "$ " + colorPrice,
			description: jcmp.languages.get("PAYNSPRAY_COLOR_BUY_DESCRIPTION"),
			value: id
		});
	}

	menu.body.items.push(item_colors);

	let item_nitro = {
		id: "PAYNSPRAY_NITRO",
		txt: jcmp.languages.get("PAYNSPRAY_NITRO"),
		subTxt: jcmp.localPlayerData.vip == 2 ? "FREE" : "$ " + nitroPrice,
		description: jcmp.languages.get("PAYNSPRAY_NITRO_DESCRIPTION"),
		disabled: jcmp.localPlayerData.vehicle.nitroEnabled
	};
	
	menu.body.items.push(item_nitro);
	
	let item_turboJump = {
		id: "PAYNSPRAY_TURBOJUMP",
		txt: jcmp.languages.get("PAYNSPRAY_TURBOJUMP"),
		subTxt: "$ " + turboJumpPrice,
		description: jcmp.languages.get("PAYNSPRAY_TURBOJUMP_DESCRIPTION"),
		disabled: jcmp.localPlayerData.vehicle.turboJumpEnabled
	};
	
	menu.body.items.push(item_turboJump);	
	
	if (jcmp.playerVehicles[jcmp.localPlayer.networkId] && jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.networkVehicle && jcmp.playerVehicles[jcmp.localPlayer.networkId].vehicle.networkVehicle.networkId == jcmp.localPlayerData.vehicle.networkId) {

		let item_plate = {
			id: "PAYNSPRAY_PLATE",
			txt: jcmp.languages.get("PAYNSPRAY_PLATE"),
			subTxt: "$ " + platePrice,
			description: jcmp.languages.get("PAYNSPRAY_PLATE_DESCRIPTION"),
		};
		
		menu.body.items.push(item_plate);
		
		let item_sell = {
			id: "PAYNSPRAY_SELL",
			txt: jcmp.languages.get("PAYNSPRAY_SELL"),
			subTxt: "$ " + Math.floor(jcmp.vehiclesData[jcmp.localPlayerData.vehicle.modelHash].price * 0.75),
			description: jcmp.languages.get("PAYNSPRAY_SELL_DESCRIPTION"),
			special: "close",
		};
		
		menu.body.items.push(item_sell);
	}
	
	let item_engine = {
		id: "PAYNSPRAY_ENGINE",
		txt: jcmp.languages.get("PAYNSPRAY_ENGINE"),
		disabled: true,
		description: "Coming soon..."
	};
	
	menu.body.items.push(item_engine);

	jcmp.events.Call('OpenCustomMenu', menu, true);
});