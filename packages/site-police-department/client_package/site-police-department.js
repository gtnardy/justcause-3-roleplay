'use strict';

const carryWeaponPrice = 4500;


jcmp.events.Add("CustomMenuPressed_policedepartment-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(6))
		return;
	
	switch(args.itemId) {
		case "POLICEDEPARTMENT_BUY_WEAPONCARRY":
			BuyWeaponCarry();
			break;
		
		case "POLICEDEPARTMENT_PAY_WANTEDSTARS":
			PayWantedStars();
			break;
	}
});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 6) return;
	
	let menu = {
		id: "policedepartment-custom-menu",
		header: {img: "policia.jpg"},
		body: {
			id: "POLICEDEPARTMENT_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_6")},
			items: [],
		}
	};
	
	let hasMoneyWeaponCarry = jcmp.localPlayerData.money >= carryWeaponPrice;
	
	let buy_weaponcarry = {
		id: "POLICEDEPARTMENT_BUY_WEAPONCARRY",
		txt: jcmp.languages.get("POLICEDEPARTMENT_BUY_WEAPONCARRY"),
		subTxt: "$ " + carryWeaponPrice,
		description: (jcmp.localPlayerData.weaponCarryPermit ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : (jcmp.languages.get("POLICEDEPARTMENT_BUY_WEAPONCARRY_DESCRIPTION"))),
		disabled: jcmp.localPlayerData.weaponCarryPermit,
	};
	
	menu.body.items.push(buy_weaponcarry);
			
	let wanted_stars = {
		id: "POLICEDEPARTMENT_WANTEDSTARS",
		txt: jcmp.languages.get("POLICEDEPARTMENT_WANTEDSTARS_LIST"),
		description: jcmp.languages.get("POLICEDEPARTMENT_WANTEDSTARS_LIST_DESCRIPTION"),
		body: {
			id: "POLICEDEPARTMENT_WANTEDSTARS_LIST",
			subheader: {txt: jcmp.languages.get("POLICEDEPARTMENT_WANTEDSTARS_LIST")},
			items: [],
		},
	};
	
	let wantedStars = jcmp.localPlayerData.wantedStars;
	let totalCost = 0;
	
	for (var id in wantedStars) {
		if (!wantedStars[id].isSuspect) {
			let wantedStarData = jcmp.wantedStarsData[wantedStars[id].idWantedStarType];
			totalCost += wantedStarData.cost;
			
			let wanted_star = {
				txt: jcmp.languages.get("WANTEDSTAR_NAME_" + wantedStars[id].idWantedStarType) + " (" + wantedStarData.stars + "★)",
				subTxt: "$ " + wantedStarData.cost,
			};
			
			wanted_stars.body.items.push(wanted_star);
		}
	}
	
	totalCost = Math.floor(totalCost * 0.75);
	
	if (totalCost == 0)
		wanted_stars.disabled = true;

	menu.body.items.push(wanted_stars);

	let pay_wanted_stars = {
		id: "POLICEDEPARTMENT_PAY_WANTEDSTARS",
		txt: jcmp.languages.get("POLICEDEPARTMENT_PAY_WANTEDSTAR_DESCRIPTION"),
		subTxt: "$ " + totalCost,
		description: jcmp.languages.get("POLICEDEPARTMENT_PAY_WANTEDSTAR_DESCRIPTION"),
		//descriptionDisabled: (totalCost ? (hasMoneyWantedStar ? jcmp.languages.get("POLICEDEPARTMENT_WANTEDSTAR_PAID") : jcmp.languages.get("POLICEDEPARTMENT_NOT_ENOUGH_MONEY")) : jcmp.languages.get("POLICEDEPARTMENT_NO_WANTEDSTARS_DESCRIPTION")),
		disabled: totalCost == 0,
	};
	
	menu.body.items.push(pay_wanted_stars);
	
	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function PayWantedStars() {
	let totalCost = 0;
	for (var id in jcmp.localPlayerData.wantedStars) {
		let wantedStarData = jcmp.wantedStarsData[jcmp.localPlayerData.wantedStars[id].idWantedStarType];
		totalCost += wantedStarData.cost;
	}
	
	totalCost = Math.floor(totalCost * 0.75);
	
	if (totalCost == 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_LIST", {notify: jcmp.languages.get("POLICEDEPARTMENT_NO_STARS_TO_PAY"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < totalCost) {
		jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_WANTEDSTARS", {disabled: true});
	jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_PAY_WANTEDSTARS", {
		description: jcmp.languages.get("POLICEDEPARTMENT_PAID_WANTED"),
		success: true,
		disabled: true
	});
	jcmp.events.CallRemote("PayWantedStars");
}


function BuyWeaponCarry() {
	
	if (jcmp.localPlayerData.money < carryWeaponPrice) {
		jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_BUY_WEAPONCARRY", {disabled: true});
	
	jcmp.events.Call('UpdateCustomMenuItem', "POLICEDEPARTMENT_BUY_WEAPONCARRY", {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,
		disabled: true
	});
	
	jcmp.events.CallRemote('BuyWeaponCarry');

}

// deixar dinamico