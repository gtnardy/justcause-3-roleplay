'use strict';

const TANK = 100;

jcmp.events.Add("CustomMenuPressed_gasstation-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(1))
		return;

	if (args.itemId == "GASSTATION_BUY_FUEL") {
		Fuel(args.value);
		return;
	}

	jcmp.events.Call("SnackbarBuy", "GASSTATION_LIST", args.value, 2);
});

jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 1) return;

	var menu = {
		key: 70,
		id: "gasstation-custom-menu",
		header: {img: "gas-station.jpg"},
		body: {
			id: "GASSTATION_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_1")},
			items: [
				{
					id: "GASSTATION_BUY_FUEL",
					txt: jcmp.languages.get("GASSTATION_BUY_FUEL"),
					innerValues: [{txt: jcmp.languages.get("GASSTATION_COMPLETE"), value: TANK}, {txt: "1 L", value: 1}, {txt: "5 L", value: 5}, {txt: "10 L", value: 10}, {txt: "25 L", value: 25}, {txt: "50 L", value: 50}],
					description: jcmp.languages.get("GASSTATION_BUY_FUEL_DESCRIPTION"),
					descriptionList: [
						{txt: jcmp.languages.get("GASSTATION_FUEL_PRICE"), subTxt: "$ " + jcmp.roleplayData.fuelValue},
					],
				},
				{
					id: "SNACKBAR_BUY_2",
					txt: jcmp.languages.get("SNACKBAR_ITEM_2"),
					subTxt: "$ 8",
					description: jcmp.languages.get("SNACKBAR_DESCRIPTION_ITEM", [jcmp.languages.get("SNACKBAR_ITEM_2")]),
					value: 2,
				},
				{
					id: "SNACKBAR_BUY_14",
					txt: jcmp.languages.get("SNACKBAR_ITEM_14"),
					subTxt: "$ 12",
					description: jcmp.languages.get("SNACKBAR_DESCRIPTION_ITEM", [jcmp.languages.get("SNACKBAR_ITEM_14")]),
					value: 14,
				}
			],
		},
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
});

function Fuel(quantity) {
	quantity = Math.floor(Math.min(jcmp.localPlayerData.fuel + quantity, TANK) - jcmp.localPlayerData.fuel);

	if (quantity <= 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "GASSTATION_LIST", {notify: jcmp.languages.get("GASSTATION_TANK_FULL"), error: true});
		return;
	}

	const price = Math.floor(quantity * jcmp.roleplayData.fuelValue);

	if (jcmp.localPlayerData.money < price) {
		jcmp.events.Call('UpdateCustomMenuItem', "GASSTATION_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.CallRemote('Fuel', jcmp.localPlayerData.fuel, quantity);
	jcmp.events.Call('UpdateCustomMenuItem', "GASSTATION_LIST", {notify: jcmp.languages.get("GASSTATION_FUELLED", [quantity]), success: true});
    jcmp.ui.CallEvent("PlaySound", "coins");
}