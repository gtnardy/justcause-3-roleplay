'use strict';

const ITEMS = [
	{price: 3, hunger: 0, thirst: 50}, // water
	{price: 8, hunger: 70, thirst: -15}, // hamburger
	{price: 4, hunger: 20, thirst: 25}, // soda
	{price: 5, hunger: 45, thirst: -5}, // chocolate bar
	{price: 8, hunger: 60, thirst: -15}, // fried chicken
	{price: 1, hunger: 5, thirst: 10}, // coffee
	{price: 5, hunger: 40, thirst: -10}, // meatstick
	{price: 7, hunger: 55, thirst: -5}, // kebab
	{price: 6, hunger: 35, thirst: 35}, // natural juice
	{price: 6, hunger: 40, thirst: -5}, // croissant
	{price: 8, hunger: 50, thirst: -5}, // stuffed cake
	{price: 7, hunger: 35, thirst: -5}, // lemon pie
	{price: 5, hunger: 30, thirst: -5}, // sandwich
	{price: 7, hunger: 40, thirst: -15}, // french fries
	{price: 6, hunger: 35, thirst: -15}, // potato chips
];

// 1 kools 2 mecellaria 3 caffe francesco 4 genuin 5 magic
const SNACKBAR_TYPES = {
	44: 1,
	45: 2,
	47: 2,
	49: 3,
	50: 4,
	53: 3,
	54: 3,
	55: 5,
	57: 3,
	59: 5,
	62: 5,
};

const SNACKBAR_TYPE_ITEMS = {
	1: {header: "kool-kebabs.jpg", items: [0, 2, 6, 7]},
	2: {header: "mecelleria.jpg", items: [0, 1, 2, 4, 8, 12]},
	3: {header: "cafe-francesco.jpg", items: [0, 2, 5, 8, 9, 10, 11]},
	4: {header: "alimentos-genuin.jpg", items: [0, 1, 2, 3, 8, 12]},
	5: {header: "cafe-magic.jpg", items: [0, 2, 5, 8, 9, 10, 11]},
};

jcmp.events.Add("CustomMenuPressed_snackbar-custom-menu", function(args){
	if (!jcmp.utils.checkInSite(5))
		return;
	
	if (args.bodyId == "SNACKBAR_LIST")
		Buy("SNACKBAR_LIST", args.value, 1);
});

jcmp.events.Add("SnackbarBuy", function(bodyId, idItem, multiplier) {
	Buy(bodyId, idItem, multiplier);
});

function Buy(bodyId, idItem, multiplier) {
	if (jcmp.localPlayerData.money < ITEMS[idItem].price * multiplier) {
		jcmp.events.Call('UpdateCustomMenuItem', bodyId, {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.Call('UpdateCustomMenuItem', bodyId, {notify: jcmp.languages.get("COMMON_PURCHASED_IT"), success: true});
	
    jcmp.events.CallRemote('BuySnackBarItem', jcmp.localPlayerData.hungry, jcmp.localPlayerData.thirsty, ITEMS[idItem].price * multiplier, ITEMS[idItem].hunger, ITEMS[idItem].thirst);
    
    if (ITEMS[idItem].hunger > ITEMS[idItem].thirst)   
        jcmp.ui.CallEvent("PlaySound", "eating");
    else
        jcmp.ui.CallEvent("PlaySound", "burping");

    jcmp.ui.CallEvent("PlaySound", "coins");
}

jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 5) return;

	let snackbar = jcmp.localPlayerData.sites[5];

	let type = SNACKBAR_TYPES[snackbar.id];
	let data = SNACKBAR_TYPE_ITEMS[type];
	
	var menu = {
		id: "snackbar-custom-menu",
		freezes: true,
		header: {img: data.header},
		body: {
			id: "SNACKBAR_LIST",
			subheader: {txt: jcmp.languages.get("SNACKBAR_MENU"), count: true},
			items: [],
		}
	};
	
	for (var id in data.items) {

		let item = {
			id: "SNACKBAR_BUY_" + data.items[id],
			txt: jcmp.languages.get("SNACKBAR_ITEM_" + data.items[id]),
			subTxt: "$ " + ITEMS[data.items[id]].price,
			description: jcmp.languages.get("SNACKBAR_DESCRIPTION_ITEM", [jcmp.languages.get("SNACKBAR_ITEM_" + data.items[id])]),
			value: data.items[id],
		};

		menu.body.items.push(item);
	}

	jcmp.events.Call('OpenCustomMenu', menu, true);
});