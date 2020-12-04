'use strict';

const colors = [];
colors[0] = {color: "#1abc9c", name: "Turquoise"};
colors[1] = {color: "#2ecc71", name: "Emerald"};
colors[2] = {color: "#3498db", name: "Peter River"};
colors[3] = {color: "#9b59b6", name: "Amethyst"};
colors[4] = {color: "#34495e", name: "Wet Asphalt"};
colors[5] = {color: "#f1c40f", name: "Sun Flower"};
colors[6] = {color: "#e67e22", name: "Carrot"};
colors[7] = {color: "#e74c3c", name: "Alizarin"};
colors[8] = {color: "#ecf0f1", name: "Clouds"};
colors[9] = {color: "#95a5a6", name: "Concrete"};

const priceVehicleInsurance = 150;
const garageSlotLimit = 10;
const garageSlotPriceBase = 15000;

jcmp.houses = {};


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 9) return;

	Menu();
});


jcmp.events.AddRemoteCallable('HouseBought', function() {
	jcmp.notifications.add(jcmp.languages.get("SITE_NAME_9"), jcmp.languages.get("HOUSE_BOUGHT"), "money");
});


jcmp.events.AddRemoteCallable('HouseSold', function() {
	jcmp.notifications.add(jcmp.languages.get("SITE_NAME_9"), jcmp.languages.get("HOUSE_SOLD"), "money");
});


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id != "HOUSE_NAME")
		return;

	let house = checkInHouse();

	if (house) {
		house.name = value;

		let site = jcmp.sites[house.id];
		if (site) {
			site.text = value;
		}
		jcmp.events.CallRemote("SetHouseAttr", house.id, "name", value);
	}

	Menu();
});


jcmp.events.Add("CustomMenuSelected_house-custom-menu", function(args) {
	if (args.itemId == "HOUSE_COLOR") {
		jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_LIST", {color: colors[args.value].color});
	}
});


jcmp.events.Add("CustomMenuPressed_house-custom-menu", function(args) {

	if (args.bodyId == "HOUSE_WEAPON_RACK_LIST") {
		jcmp.events.CallRemote("EquipWeapon", args.value);

		for (let w in jcmp.localPlayerData.weaponsData) {
			if (jcmp.localPlayerData.weaponsData[w].equipped && (args.value == -1 || jcmp.weapons[w].slot == jcmp.weapons[args.value].slot)) {
				jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_WEAPON_" + w, {description: jcmp.languages.get("GUNSTORE_EQUIP_WEAPON"), subTxt: " "});
			}
		}

		if (args.value != -1)
			jcmp.events.Call('UpdateCustomMenuItem', args.itemId, {description: jcmp.languages.get("GUNSTORE_WEAPON_EQUIPPED"), subTxt: "EQUIPPED", success: true});
		else
			jcmp.events.Call('UpdateCustomMenuItem', args.itemId, {description: jcmp.languages.get("GUNSTORE_REMOVED_WEAPONS"), success: true});
        return;
	}

	if (args.itemId == "HOUSE_NAME") {
        jcmp.events.Call("SetInputText", "HOUSE_NAME", jcmp.languages.get("HOUSE_NEW_NAME"), args.value, 20);
        return;
	}

	if (args.itemId == "HOUSE_COLOR") {
		let house = checkInHouse();

		if (!house)
			return;

		house.color = args.value;
		jcmp.events.CallRemote("SetHouseAttr", house.id, "color", args.value);
		jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_LIST", {notify: jcmp.languages.get("HOUSE_COLOR_CHANGED"), success: true});
        return;
	}

	if (args.bodyId == "HOUSE_SPAWN_AT_HOUSE") {
		jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "spawnAtHouse", args.value);
        jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_SPAWN", {subTxt: args.value ? jcmp.languages.get("COMMON_YES") : jcmp.languages.get("COMMON_NO")})
        return;
	}

	if (args.bodyId == "HOUSE_SELL_CONFIRMATION") {

		let house = checkInHouse();
		if (!house || house.idOwner != jcmp.localPlayerData.steamId)
			return;

        jcmp.events.CallRemote("SellHouse", house.id);
        return;
	}

	if (args.bodyId == "HOUSE_BUY_CONFIRMATION") {
		let house = checkInHouse();

		if (!house || house.idOwner)
			return;

		if (jcmp.localPlayerData.house) {
			jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_BUY_CONFIRMATION", {notify: jcmp.languages.get("HOUSE_ALREADY_HAVE_HOUSE"), error: true});
			return;
		}

		if (house.isVip && jcmp.localPlayerData.vip != 2) {
			jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_BUY_CONFIRMATION", {notify: jcmp.languages.get("HOUSE_VIP_ONLY"), error: true});
			return;
		}

		if (jcmp.localPlayerData.money < house.price) {
			jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_BUY_CONFIRMATION", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
			return;
		}

		jcmp.events.CallRemote("BuyHouse", house.id);
        jcmp.ui.CallEvent("CloseCustomMenu", "house-custom-menu");
        return;
    }
    
	if (args.bodyId == "HOUSE_GARAGE_LIST") {
		let house = checkInHouse();

		if (!house || house.idOwner != jcmp.localPlayerData.steamId)
			return;
		
		if (args.itemId == "HOUSE_GARAGE_BUY") {
			let garageSlotLimit2 = garageSlotLimit;

			if (jcmp.localPlayerData.vip == 2)
				garageSlotLimit2 = 20;
				
			if (house.garageSlots >= garageSlotLimit2) {
                jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE_LIST", {notify: jcmp.languages.get("HOUSE_GARAGE_LIMIT_REACHED"), error: true});
				return;
			}

            if (jcmp.localPlayerData.money < args.value) {
                jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
                return;
			}

			jcmp.notifications.add(jcmp.languages.get("SITE_NAME_9"), jcmp.languages.get("HOUSE_GARAGE_BOUGHT"), "money", "coins");

			jcmp.ui.CallEvent("CloseCustomMenu", "house-custom-menu");
            jcmp.events.CallRemote("BuyGarageSlot", house.id);
			return;
		}

		if (!args.value)
			return;

        if (args.value.insurance) { 
            if (jcmp.localPlayerData.money < priceVehicleInsurance) {
                jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
                return;
            }
    
            jcmp.events.CallRemote("TriggerVehicleInsurance", args.value.id, true);
        } else
            jcmp.events.CallRemote("SwitchPersonalVehicle", args.value.id);

        return;
    }

});

// genericar
function checkInHouse() {
	if (!jcmp.localPlayerData.sites[9] || !jcmp.houses[jcmp.localPlayerData.sites[9].id])
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_9"), jcmp.languages.get("HOUSE_NOT_IN"), "cancel", "cancel");

	return jcmp.houses[jcmp.localPlayerData.sites[9].id];
}


jcmp.events.Call("AddCommand",
	{
		command: "sethouse",
		parameters: [
			{parameter: "price", type: "integer"},
			{parameter: "isVip", type: "integer"},
		],
		permissions: 4,
		callback: function(args) {
			if (!jcmp.localPlayerData.sites[9])
				return;

			jcmp.ui.CallEvent('chat_message', "Setting house: '" + args.price + "' " + jcmp.localPlayerData.sites[9].id + "...", 0, 255, 255);
			jcmp.events.CallRemote("SetHouse", args.price, jcmp.localPlayerData.sites[9].id, args.isVip);
		}
	}
);

function Menu() {

	// house name,
	let house = checkInHouse();
	if (!house)
		return;

	let hasOwner = house.idOwner;
	let isOwner = hasOwner && house.idOwner == jcmp.localPlayerData.steamId;

	var menu = {
		id: "house-custom-menu",
		header: {title: house.name, color: colors[house.color].color, font: "'Norican', cursive"},
		body: {
			id: "HOUSE_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_9")},
			items: []

		}
	};

	if (isOwner) {
        jcmp.events.CallRemote("LoadGarage");

		menu.body.items.push({
			id: "HOUSE_SPAWN",
			txt: jcmp.languages.get("HOUSE_SPAWN_AT_HOUSE"),
			subTxt: jcmp.localPlayerData.spawnAtHouse ? jcmp.languages.get("COMMON_YES") : jcmp.languages.get("COMMON_NO"),
			body: {
				id: "HOUSE_SPAWN_AT_HOUSE",
				subheader: {txt: jcmp.languages.get("HOUSE_SPAWN_AT_HOUSE")},
				items: [
					{
						txt: jcmp.languages.get("COMMON_YES"),
						description: jcmp.languages.get("HOUSE_DESCRIPTION_SPAWN_YES"),
						special: "confirm",
						value: true,
					},
					{
						txt: jcmp.languages.get("COMMON_NO"),
						description: jcmp.languages.get("HOUSE_DESCRIPTION_SPAWN_NO"),
						special: "confirm",
						value: false,
					},
				],

			}

		});

		menu.body.items.push({
			id: "HOUSE_NAME",
			txt: jcmp.languages.get("HOUSE_NAME"),
			subTxt: house.name,
			description: jcmp.languages.get("HOUSE_NAME_DESCRIPTION"),
			value: house.name,
			special: "close",

		});

		let innerValuesColors = [];
		for (let c in colors) {
			let data = {txt: colors[c].name, value: c};
			if (house.color == c)
				data.default = true;

			innerValuesColors.push(data);
		}

		menu.body.items.push({
			id: "HOUSE_COLOR",
			txt: jcmp.languages.get("HOUSE_COLOR"),
			description: jcmp.languages.get("HOUSE_COLOR_DESCRIPTION"),
			innerValues: innerValuesColors,

		});

		let weapon_rack = {
			id: "HOUSE_WEAPON_RACK",
			txt: jcmp.languages.get("HOUSE_WEAPON_RACK"),
			description: jcmp.languages.get("HOUSE_WEAPON_RACK_DESCRIPTION"),
			body: {
				id: "HOUSE_WEAPON_RACK_LIST",
				subheader: {txt: jcmp.languages.get("HOUSE_WEAPON_RACK")},
				items: [],
			}
		};

		let item_clean_inventory = {
			id: "GUNSTORE_REMOVE_WEAPONS",
			txt: jcmp.languages.get("GUNSTORE_REMOVE_WEAPONS"),
			description: jcmp.languages.get("GUNSTORE_REMOVE_WEAPONS_DESCRIPTION"),
			value: -1,
		};

		weapon_rack.body.items.push(item_clean_inventory);

		for (let idWeapon in jcmp.localPlayerData.weaponsData) {

			let hasWeapon = jcmp.localPlayerData.weaponsData[idWeapon];
			let weapon = jcmp.weapons[idWeapon];

			let item_weapon = {
				id: "HOUSE_WEAPON_" + idWeapon,
				txt: weapon.name,
				subTxt: hasWeapon.equipped ? "EQUIPPED" : " ",
				description: hasWeapon.equipped ? jcmp.languages.get("GUNSTORE_WEAPON_EQUIPPED") : jcmp.languages.get("GUNSTORE_EQUIP_WEAPON"),
				value: idWeapon,
				disabled: weapon.vip && jcmp.localPlayerData.vip != 2,
			};

			if (weapon.vip)
				item_weapon.description += "<br>[VIP Only]";

			weapon_rack.body.items.push(item_weapon);
		}

		menu.body.items.push(weapon_rack);

		menu.body.items.push({
			id: "HOUSE_GARAGE",
			txt: jcmp.languages.get("HOUSE_GARAGE"),
			description: house.garageSlots ? jcmp.languages.get("HOUSE_GARAGE_DESCRIPTION") : jcmp.languages.get("HOUSE_GARAGE_DESCRIPTION_NO_SLOTS"),
			disabled: true,
			body: {
				id: "HOUSE_GARAGE_LIST",
				subheader: {txt: jcmp.languages.get("HOUSE_GARAGE"), count: true},
				items: [],
			}
		});

		menu.body.items.push({
			id: "HOUSE_RESIDENTS",
			txt: jcmp.languages.get("HOUSE_RESIDENTS"),
			disabled: true,
			description: "Coming soon..."
		});

		menu.body.items.push({
			id: "HOUSE_SELL",
			txt: jcmp.languages.get("HOUSE_SELL"),
			body: {
				id: "HOUSE_SELL_CONFIRMATION",
				subheader: {txt: jcmp.languages.get("HOUSE_SELL_CONFIRMATION", [(Math.floor(house.price * 0.75)).toLocaleString('en')])},
				items: [
					{
						txt: jcmp.languages.get("COMMON_YES"),
						description: jcmp.languages.get("HOUSE_DESCRIPTION_SELL_YES", [(Math.floor(house.price * 0.75)).toLocaleString('en')]),
						special: "close",
						value: true,
					},
					{
						txt: jcmp.languages.get("COMMON_NO"),
						special: "back",
						value: false,
					},
				],

			}

		});
	} else {
		if (hasOwner) {
			menu.body.items.push({
				id: "HOUSE_OWNER_NAME",
				txt: jcmp.languages.get("HOUSE_OWNER"),
				subTxt: house.nameOwner,

			});
		} else {
			menu.body.items.push({
				id: "HOUSE_BUY",
				txt: jcmp.languages.get("HOUSE_BUY"),
				subTxt: "$ " + house.price,
				description: jcmp.languages.get("HOUSE_BUY_DESCRIPTION"),
				body: {
					id: "HOUSE_BUY_CONFIRMATION",
					subheader: {txt: jcmp.languages.get("HOUSE_BUY_CONFIRMATION", [house.price.toLocaleString('en')])},
					items: [
						{
							txt: jcmp.languages.get("COMMON_YES"),
							description: jcmp.languages.get("HOUSE_DESCRIPTION_BUY_YES", [house.price.toLocaleString('en')]),
							value: true,
						},
						{
							txt: jcmp.languages.get("COMMON_NO"),
							special: "back",
							value: false,
						},
					],

				}
			});
		}
	}

	menu.body.items.push({
		id: "HOUSE_INFORMATIONS",
		txt: jcmp.languages.get("HOUSE_INFORMATIONS"),
		descriptionList: [
			{txt: jcmp.languages.get("HOUSE_VALUE"), subTxt: "$ " + house.price},
			{txt: jcmp.languages.get("HOUSE_VALUE_SELL"), subTxt: "$ " + Math.floor(house.price * 0.75)},
			jcmp.localPlayerData.sites[10] ? {txt: jcmp.languages.get("HOUSE_LOCATION"), subTxt: jcmp.localPlayerData.sites[10].name} : null,
            {txt: jcmp.languages.get("HOUSE_GARAGE_SLOTS"), subTxt: house.garageSlots},
            house.isVip ? {txt: jcmp.languages.get("HOUSE_VIP"), subTxt: jcmp.languages.get("COMMON_YES")} : null,
		],
	});

	jcmp.events.Call('OpenCustomMenu', menu, true);
	jcmp.ui.CallEvent("PlaySound", "house-bell");
}


jcmp.events.AddRemoteCallable("LoadGarage", function(vehicles) {
	let house = checkInHouse();
	if (!house)
		return;

    vehicles = JSON.parse(vehicles);

    jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE", {disabled: false});
    jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE_LIST", {cleanItems: true});

    let items = [];
    for (let v = vehicles.length -1; v >= 0; v--) {
        let vehicle = vehicles[v];

        items.push({
            id: "HOUSE_GARAGE_VEHICLE_" + vehicle.id,
            txt: jcmp.vehiclesData[vehicle.modelHash].name,
            subTxt:  vehicle.health == 0 ? "<span style='color: #e74c3c;'>" + jcmp.languages.get("HOUSE_VEHICLE_DESTROYED") + "</span>" : (vehicle.id == jcmp.localPlayerData.personalVehicleActive ? jcmp.languages.get("HOUSE_VEHICLE_ACTIVE") : ""),
            descriptionList: [
                {txt: jcmp.languages.get("PAYNSPRAY_PLATE"), subTxt: vehicle.plate},
                {txt: jcmp.languages.get("PAYNSPRAY_NITRO"), subTxt: jcmp.languages.get("COMMON_YESNO_" +  vehicle.nitroEnabled)},
                {txt: jcmp.languages.get("PAYNSPRAY_TURBOJUMP"), subTxt: jcmp.languages.get("COMMON_YESNO_" +  vehicle.turboJumpEnabled)},
                {txt: jcmp.languages.get("HOUSE_VEHICLE_LOCKED"), subTxt: jcmp.languages.get("COMMON_YESNO_" +  vehicle.locked)},
            ],
            description: `<img class="center" src="http://justcauserp.com/images/vehicles/${jcmp.vehiclesData[vehicle.modelHash].model_name}.png" /><br>` + (vehicle.health > 0 ? jcmp.languages.get("HOUSE_VEHICLE_RESPAWN") : jcmp.languages.get("HOUSE_VEHICLE_INSURANCE", [priceVehicleInsurance])),
            value: vehicle.health > 0 ? {id: vehicle.id} : {insurance: true, id: vehicle.id},
            special: "close",
        });
	}

	for (let g = vehicles.length; g < house.garageSlots; g++) {
		items.push({
            id: "HOUSE_GARAGE_EMPTY_SLOT_" + g,
			txt: jcmp.languages.get("HOUSE_GARAGE_EMPTY_SLOT"),
			disabled: true,
		});
	}
	
    if (items.length == 0) {
        items.push({
            id: "HOUSE_GARAGE_VEHICLE_DONTHAVE",
            txt: jcmp.languages.get("HOUSE_VEHICLE_DONTHAVE"),
		});
	} else if (items.length < 10) {
		let price = house.garageSlots * garageSlotPriceBase;
        items.push({
            id: "HOUSE_GARAGE_BUY",
			txt: jcmp.languages.get("HOUSE_GARAGE_BUY"),
			subTxt: "$ " + price,
			value: price,
			description: jcmp.languages.get("HOUSE_GARAGE_BUY_DESCRIPTION"),
			color: "rgba(24, 66, 117, 0.8)",
		});
	}
        
    jcmp.events.Call('UpdateCustomMenuItem', "HOUSE_GARAGE_LIST", {addItems: items});
});


jcmp.events.AddRemoteCallable('UpdateHouses', function(houses) {
	jcmp.houses = JSON.parse(houses);
	jcmp.events.CallRemote("UpdatedHouses");
});


jcmp.events.Add("LocalPlayerFullLoaded", function() {
	jcmp.events.CallRemote("GetUpdateHouses");
});