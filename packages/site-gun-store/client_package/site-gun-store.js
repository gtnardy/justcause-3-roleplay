'use strict';


jcmp.events.Add("CustomMenuPressed_gunstore-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(14))
		return;
	
	if (args.bodyId == "GUNSTORE_LIST") {
		jcmp.events.CallRemote("EquipWeapon", -1);
		for (let w in jcmp.localPlayerData.weaponsData) {
			jcmp.events.Call('UpdateCustomMenuItem', "GUNSTORE_WEAPON_" + w, {description: jcmp.languages.get("GUNSTORE_EQUIP_WEAPON"), subTxt: " "});
		}
		jcmp.events.Call('UpdateCustomMenuItem', args.itemId, {description: jcmp.languages.get("GUNSTORE_REMOVED_WEAPONS"), success: true});
		return;
	}
		
	let hasWeapon = jcmp.localPlayerData.weaponsData[args.value] ? true : false;
	
	if (hasWeapon) {
		
		jcmp.events.CallRemote("EquipWeapon", args.value);
		
		for (let w in jcmp.localPlayerData.weaponsData) {
			if (jcmp.localPlayerData.weaponsData[w].equipped && jcmp.weapons[w].slot == jcmp.weapons[args.value].slot) {
				jcmp.events.Call('UpdateCustomMenuItem', "GUNSTORE_WEAPON_" + w, {description: jcmp.languages.get("GUNSTORE_EQUIP_WEAPON"), subTxt: " "});		
			}
		}
		jcmp.events.Call('UpdateCustomMenuItem', args.itemId, {description: jcmp.languages.get("GUNSTORE_WEAPON_EQUIPPED"), subTxt: "EQUIPPED", success: true});
		
	} else {
		
		if (!jcmp.localPlayerData.weaponCarryPermit) {
			jcmp.events.Call('UpdateCustomMenuItem', args.bodyId, {notify: jcmp.languages.get("GUNSTORE_DONT_HAVE_WEAPONCARRY"), error: true});
			return;
		}
		
		let weaponData = jcmp.weapons[args.value];
		
		if (jcmp.localPlayerData.money < weaponData.price) {
			jcmp.events.Call('UpdateCustomMenuItem', args.bodyId, {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
			return;
		}
		
		//jcmp.events.Call('UpdateCustomMenuItem', args.bodyId, {notify: jcmp.languages.get("GUNSTORE_WEAPON_EQUIPPED"), success: true});
		
		jcmp.events.Call('UpdateCustomMenuItem', args.itemId, {description: jcmp.languages.get("GUNSTORE_WEAPON_BOUGHT"), subTxt: "EQUIPPED", success: true});

		for (let w in jcmp.localPlayerData.weaponsData) {
			if (jcmp.localPlayerData.weaponsData[w].equipped && jcmp.weapons[w].slot == jcmp.weapons[args.value].slot) {
				jcmp.events.Call('UpdateCustomMenuItem', "GUNSTORE_WEAPON_" + w, {description: jcmp.languages.get("GUNSTORE_EQUIP_WEAPON"), subTxt: " "});
			}
		}
		
		jcmp.events.CallRemote("BuyWeapon", args.value);	
	}
});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 14) return;
	
	var menu = {
		id: "gunstore-custom-menu",
		header: {img: "gun-store.jpg"},
		body: {
			id: "GUNSTORE_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_14"), count: true},
			items: [],
		}
	};
	
	let item_pistols = {
		txt: jcmp.languages.get("GUNSTORE_PISTOLS"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_PISTOLS_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_PISTOLS"), count: true},
			items: [],
		}
	};
	
	let item_shotguns = {
		txt: jcmp.languages.get("GUNSTORE_SHOTGUNS"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_SHOTGUNS_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_SHOTGUNS"), count: true},
			items: [],
		}
	};
	
	let item_snipers = {
		txt: jcmp.languages.get("GUNSTORE_SNIPERS"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_SNIPERS_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_SNIPERS"), count: true},
			items: [],
		}
	};
	
	let item_assaults = {
		txt: jcmp.languages.get("GUNSTORE_ASSAULTS"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_ASSAULTS_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_ASSAULTS"), count: true},
			items: [],
		}
	};
	
	let item_rockets = {
		txt: jcmp.languages.get("GUNSTORE_ROCKETS"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_ROCKETS_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_ROCKETS"), count: true},
			items: [],
		}
	};
	
	let item_heavies = {
		txt: jcmp.languages.get("GUNSTORE_HEAVIES"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_HEAVIES_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_HEAVIES"), count: true},
			items: [],
		}
	};
	
	let item_submachines = {
		txt: jcmp.languages.get("GUNSTORE_SUBMACHINES"),
		description: jcmp.languages.get("GUNSTORE_CATEGORY_DESCRIPTION"),
		body: {
			id: "GUNSTORE_SUBMACHINES_LIST",
			subheader: {txt: jcmp.languages.get("GUNSTORE_SUBMACHINES"), count: true},
			items: [],
		}
	};
	
	for (let idWeapon in jcmp.weapons) {
		
		let weapon = jcmp.weapons[idWeapon];
		
		let hasWeapon = jcmp.localPlayerData.weaponsData[idWeapon];
		
		let item_weapon = {
			id: "GUNSTORE_WEAPON_" + idWeapon,
			txt: weapon.name,
			subTxt: hasWeapon ? (hasWeapon.equipped ? "EQUIPPED" : " ") : "$ " + weapon.price,
			description: hasWeapon ? (hasWeapon.equipped ? jcmp.languages.get("GUNSTORE_WEAPON_EQUIPPED") : jcmp.languages.get("GUNSTORE_EQUIP_WEAPON")) : jcmp.languages.get("GUNSTORE_BUY_WEAPON", [weapon.minimumLevel]),
			value: idWeapon,
			disabled: (!hasWeapon && (jcmp.localPlayerData.level < weapon.minimumLevel)) || (weapon.vip && jcmp.localPlayerData.vip != 2),
		};
		
		if (weapon.vip)
			item_weapon.description += "<br>[VIP Only]";
		
		switch (weapon.type) {
			case 1:
				item_pistols.body.items.push(item_weapon);
				break;
				
			case 2:
				item_assaults.body.items.push(item_weapon);
				break;
				
			case 3:
				item_shotguns.body.items.push(item_weapon);
				break;
				
			case 4:
				item_snipers.body.items.push(item_weapon);
				break;
				
			case 5:
				item_rockets.body.items.push(item_weapon);
				break;
				
			case 6:
				item_heavies.body.items.push(item_weapon);
				break;
				
			case 7:
				item_submachines.body.items.push(item_weapon);
				break;
		}
	}
	
	let item_clean_inventory = {
		id: "GUNSTORE_REMOVE_WEAPONS",
		txt: jcmp.languages.get("GUNSTORE_REMOVE_WEAPONS"),
		description: jcmp.languages.get("GUNSTORE_REMOVE_WEAPONS_DESCRIPTION"),
		value: -1,
	};
	
	menu.body.items.push(item_clean_inventory);
	menu.body.items.push(item_pistols);
	menu.body.items.push(item_shotguns);
	menu.body.items.push(item_assaults);
	menu.body.items.push(item_snipers);
	menu.body.items.push(item_rockets);
	menu.body.items.push(item_heavies);
	menu.body.items.push(item_submachines);
	
	jcmp.events.Call('OpenCustomMenu', menu, true);
});