'use strict';

const PRICE_RADIOS = {
	hasRadioFalloutNewVegas: 9000
};
const PRICE_PARACHUTE = 5000;
const PRICE_WINGSUIT = 7000;
const PRICE_WINGSUIT_LEVEL = {
	1: 3000,
	2: 6000,
	3: 9000
};


jcmp.events.Add("CustomMenuPressed_conveniencestore-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(8))
		return;
	
	switch(args.itemId) {
		case "CONVENIENCESTORE_BUY_PARACHUTE":
			BuyParachute();
			break;
			
		case "CONVENIENCESTORE_BUY_WINGSUIT":
			BuyWingsuit();
			break;
			
		case "CONVENIENCESTORE_BUY_WINGSUITLEVEL_1":
			BuyWingsuitLevel(1);
			break;
			
		case "CONVENIENCESTORE_BUY_WINGSUITLEVEL_2":
			BuyWingsuitLevel(2);
			break;
			
		case "CONVENIENCESTORE_BUY_WINGSUITLEVEL_3":
			BuyWingsuitLevel(3);
			break;
	}

	if (args.bodyId == "CONVENIENCESTORE_RADIOS_LIST") {
		BuyRadio(args.value, args.itemId);
		return;
	}

});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 8) return;
	
	let hasParachute = jcmp.localPlayerData.hasParachute;
	
	var menu = {
		id: "conveniencestore-custom-menu",
		header: {title: jcmp.languages.get("SITE_NAME_8"), color: "#9b59b6"},
		body: {
			id: "CONVENIENCESTORE_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_8")},
			items: [
				{
					id: "CONVENIENCESTORE_BUY_PARACHUTE",
					txt: jcmp.languages.get("CONVENIENCESTORE_BUY_PARACHUTE"),
					subTxt: "$ " + PRICE_PARACHUTE,
					description: hasParachute ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_BUY_PARACHUTE_DESCRIPTION"),
					disabled: hasParachute
				},
				{
					id: "CONVENIENCESTORE_RADIOS",
					txt: "[VIP] " + jcmp.languages.get("CONVENIENCESTORE_RADIOS"),
					description: jcmp.languages.get("CONVENIENCESTORE_RADIOS_DESCRIPTION"),
					disabled: !jcmp.localPlayerData.vip,
					body: {
						id: "CONVENIENCESTORE_RADIOS_LIST",
						subheader: {txt: jcmp.languages.get("CONVENIENCESTORE_RADIOS")},
						items: [
							{
								id: "CONVENIENCESTORE_BUY_RADIO_COMMON",
								txt: jcmp.languages.get("CONVENIENCESTORE_BUY_RADIO_COMMON"),
								description: jcmp.languages.get("COMMON_ALREADY_OWN_IT"),
								disabled: true,
							},
							{
								id: "CONVENIENCESTORE_BUY_RADIO_FALLOUTNEWVEGAS",
								txt: "Fallout New Vegas Radio",
								subTxt: "$ " + PRICE_RADIOS.hasRadioFalloutNewVegas,
								description: jcmp.localPlayerData.hasRadioFalloutNewVegas ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_BUY_RADIO_FALLOUTNEWVEGAS_DESCRIPTION"),
								disabled: jcmp.localPlayerData.hasRadioFalloutNewVegas || !jcmp.localPlayerData.vip,
								value: "hasRadioFalloutNewVegas",
							},
						]
					}
				},
				{
					id: "CONVENIENCESTORE_WINGSUIT",
					txt: "[VIP] " + jcmp.languages.get("CONVENIENCESTORE_WINGSUIT"),
					description: jcmp.languages.get("CONVENIENCESTORE_WINGSUIT_DESCRIPTION"),
					disabled: jcmp.localPlayerData.vip != 2,
					body: {
						id: "CONVENIENCESTORE_WINGSUIT_LIST",
						subheader: {txt: jcmp.languages.get("CONVENIENCESTORE_WINGSUIT")},
						items: [
							{
								id: "CONVENIENCESTORE_BUY_WINGSUIT",
								txt: jcmp.languages.get("CONVENIENCESTORE_BUY_WINGSUIT"),
								subTxt: "$ " + PRICE_WINGSUIT,
								description: jcmp.localPlayerData.hasWingsuit ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_BUY_WINGSUIT_DESCRIPTION"),
								disabled: jcmp.localPlayerData.hasWingsuit || jcmp.localPlayerData.vip != 2
							},
							{
								id: "CONVENIENCESTORE_BUY_WINGSUITLEVEL_1",
								txt: jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL", ["1"]),
								subTxt: "$ " + PRICE_WINGSUIT_LEVEL[1],
								description: jcmp.localPlayerData.wingsuitLevel >= 1 ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL_DESCRIPTION"),
								disabled: !jcmp.localPlayerData.hasWingsuit || jcmp.localPlayerData.wingsuitLevel != 0 || jcmp.localPlayerData.vip != 2
							},
							{
								id: "CONVENIENCESTORE_BUY_WINGSUITLEVEL_2",
								txt: jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL", ["2"]),
								subTxt: "$ " + PRICE_WINGSUIT_LEVEL[2],
								description: jcmp.localPlayerData.wingsuitLevel >= 2 ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL_DESCRIPTION"),
								disabled: !jcmp.localPlayerData.hasWingsuit || jcmp.localPlayerData.wingsuitLevel != 1 || jcmp.localPlayerData.vip != 2
							},
							{
								id: "CONVENIENCESTORE_BUY_WINGSUITLEVEL_3",
								txt: jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL", ["3"]),
								subTxt: "$ " + PRICE_WINGSUIT_LEVEL[3],
								description: jcmp.localPlayerData.wingsuitLevel >= 3 ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("CONVENIENCESTORE_WINGSUITLEVEL_DESCRIPTION"),
								disabled: !jcmp.localPlayerData.hasWingsuit || jcmp.localPlayerData.wingsuitLevel != 2 || jcmp.localPlayerData.vip != 2
							},
						],						
					},
				},		
			],
		}
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function BuyParachute() {

	if (jcmp.localPlayerData.hasParachute) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < PRICE_PARACHUTE) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.CallRemote('BuyParachute');

	jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_BUY_PARACHUTE", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
	});

    jcmp.ui.CallEvent("PlaySound", "coins");
}


function BuyWingsuit() {
	if (jcmp.localPlayerData.hasWingsuit) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < PRICE_WINGSUIT) {
		
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	if (!jcmp.localPlayerData.vip || jcmp.localPlayerData.vip != 2) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_VIP_ONLY"), error: true});
		return;
	}

	jcmp.events.CallRemote('BuyWingsuit');

	jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_BUY_WINGSUITLEVEL_1", {
		disabled: false,
	});
	
	jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_BUY_WINGSUIT", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
	});

    jcmp.ui.CallEvent("PlaySound", "coins");
}


function BuyRadio(radio, itemId) {
	if (jcmp.localPlayerData[radio]) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_RADIOS_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < PRICE_RADIOS[radio]) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_RADIOS_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	if (!jcmp.localPlayerData.vip) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_RADIOS_LIST", {notify: jcmp.languages.get("COMMON_VIP_ONLY"), error: true});
		return;
	}

	jcmp.events.CallRemote('BuyRadio', radio);
	
	jcmp.events.Call('UpdateCustomMenuItem', itemId, {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
	});
	
    jcmp.ui.CallEvent("PlaySound", "coins");
}


function BuyWingsuitLevel(level) {
	if (jcmp.localPlayerData.wingsuitLevel >= level) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < PRICE_WINGSUIT_LEVEL[jcmp.localPlayerData.wingsuitLevel + 1]) {
		
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	if (!jcmp.localPlayerData.vip || jcmp.localPlayerData.vip != 2) {
		jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_WINGSUIT_LIST", {notify: jcmp.languages.get("COMMON_VIP_ONLY"), error: true});
		return;
	}

	jcmp.events.CallRemote('BuyWingsuitLevel', level);

	let lvl = level + 1;
	jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_BUY_WINGSUITLEVEL_" + lvl, {
		disabled: false,
	});
	
	jcmp.events.Call('UpdateCustomMenuItem', "CONVENIENCESTORE_BUY_WINGSUITLEVEL_" + level, {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
	});
	
    jcmp.ui.CallEvent("PlaySound", "coins");
}