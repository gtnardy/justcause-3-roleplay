'use strict';

jcmp.localPlayer.healthEffects.regenRate = 1;
jcmp.localPlayerData.isDeath = false;

const insurances = {};
insurances.lifeInsurance = {price: 5000};
insurances.healthInsurance = {price: 4000};

var deathCooldown = 0;
var keyPressEvent = null;

const priceHeal = 70;


jcmp.events.Add("CustomMenuPressed_hospital-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(2))
		return;
	
	switch(args.itemId) {
		case "HOSPITAL_BUY_HEAL":
			Heal();
			break;
			
		case "HOSPITAL_BUY_LIFEINSURANCE":
			BuyInsurance("lifeInsurance");
			break;
			
		case "HOSPITAL_BUY_HEALTHINSURANCE":
			BuyInsurance("healthInsurance");
			break;
	}

});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 2) return;

	let hasLifeInsurance = jcmp.localPlayerData.lifeInsurance;
	let hasHealthInsurance = jcmp.localPlayerData.healthInsurance;
	
	
	var menu = {
		id: "hospital-custom-menu",
		header: {img: "hospital.jpg"},
		body: {
			id: "HOSPITAL_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_2")},
			items: [
				{
					id: "HOSPITAL_BUY_HEAL",
					txt: jcmp.languages.get("HOSPITAL_BUY_HEAL"),
					subTxt: "$ " + priceHeal,
					description: jcmp.languages.get("HOSPITAL_BUY_HEAL_DESCRIPTION"),
				},
				{
					id: "HOSPITAL_BUY_LIFEINSURANCE",
					txt: jcmp.languages.get("HOSPITAL_BUY_LIFEINSURANCE"),
					subTxt: "$ " + insurances.lifeInsurance.price,
					description: (hasLifeInsurance ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("HOSPITAL_BUY_LIFEINSURANCE_DESCRIPTION")),
					disabled: hasLifeInsurance,
				},
				{
					id: "HOSPITAL_BUY_HEALTHINSURANCE",
					txt: jcmp.languages.get("HOSPITAL_BUY_HEALTHINSURANCE"),
					subTxt: "$ " + insurances.healthInsurance.price,
					description: (hasHealthInsurance ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("HOSPITAL_BUY_HEALTHINSURANCE_DESCRIPTION")),
					disabled: hasHealthInsurance,
				}
			],
		}
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function BuyInsurance(id) {
	if (jcmp.localPlayerData[id]) {
		jcmp.events.Call('UpdateCustomMenuItem', "HOSPITAL_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < insurances[id].price) {
		jcmp.events.Call('UpdateCustomMenuItem', "HOSPITAL_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.CallRemote('BuyInsurance', id, insurances[id].price);

	jcmp.events.Call('UpdateCustomMenuItem', "HOSPITAL_BUY_" + id.toUpperCase(), {
		description: jcmp.languages.get("COMMON_PURCHASED_IT"),
		success: true,		
		disabled: true,
	});
}


function Resurrect() {
	if (!jcmp.localPlayerData.isDeath) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_2"), jcmp.languages.get("HOSPITAL_NOT_DEATH"), "cancel", "deny");
		return;
	}
	
	if (deathCooldown > 0) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_2"), jcmp.languages.get("COMMON_CANT_DO_THAT_YET"), "cancel", "deny");
		return;
	}
	
	jcmp.events.CallRemote("Resurrect");
}


function Heal() {
	if (jcmp.localPlayerData.money < priceHeal) {
		jcmp.events.Call('UpdateCustomMenuItem', "HOSPITAL_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
	jcmp.events.CallRemote("Heal", priceHeal);

	jcmp.events.Call('UpdateCustomMenuItem', "HOSPITAL_BUY_HEAL", {
		description: jcmp.languages.get("HOSPITAL_HEALED"),
		disabled: true,
		success: true,		
	});
}


jcmp.ui.AddEvent("TickSecond", function() {
	if (!jcmp.localPlayerData.isDeath)
		return;
	
	if (deathCooldown <= 0) 
		return;
	
	deathCooldown--;
	let txt = deathCooldown <= 0 ? jcmp.languages.get("HUD_HOSPITAL_CAN_PAY", [""]) : "<span style='opacity: 0.5'>" + jcmp.languages.get("HUD_HOSPITAL_CAN_PAY", [" (" + deathCooldown + ")"]) + "</span>";
	
	jcmp.ui.CallEvent("UpdateDeathUI",
		jcmp.localPlayerData.lifeInsurance, 
		jcmp.localPlayerData.healthInsurance,
		jcmp.languages.get("HUD_HOSPITAL_WAIT"),
		txt,
		jcmp.languages.get("INSURANCE_NAME_LIFEINSURANCE"),
		jcmp.languages.get("INSURANCE_NAME_HEALTHINSURANCE"),
		jcmp.languages.get("COMMON_YES"),
		jcmp.languages.get("COMMON_NO")
	);	
});


jcmp.events.AddRemoteCallable('LocalPlayerResurrected', function(wasParamedic) {
	if (!jcmp.localPlayerData.isDeath)
		return;
		
	jcmp.localPlayerData.disableNextTeleportAnimation = true;
	
    let text = "";
        
	if (jcmp.localPlayerData.level > 5) {
		if (jcmp.localPlayerData.healthInsurance)
            text += jcmp.languages.get("HOSPITAL_HEALTHINSURANCE");
		else
            text += jcmp.languages.get("HOSPITAL_NOT_HEALTHINSURANCE");
        
        text += "<br>";
        
		if (jcmp.localPlayerData.lifeInsurance)
            text += jcmp.languages.get("HOSPITAL_LIFEINSURANCE");
		else
            text += jcmp.languages.get("HOSPITAL_NOT_LIFEINSURANCE");

        text += "<br>";
	} else {
		text += jcmp.languages.get("HOSPITAL_NEWB_DEATH");
	}
	
    jcmp.events.Call("SetAlertScreen",
        "ALERTSCREEN_NEW_JOB", 
        jcmp.languages.get(wasParamedic ? "HOSPITAL_DEATH_PARAMEDIC" : "HOSPITAL_DEATH"), 
        text,
        1
    );

	jcmp.ui.CallEvent("UpdateDeathUI", null);
	jcmp.localPlayerData.isDeath = false;
	
	if (keyPressEvent) {
		jcmp.events.Remove(keyPressEvent);
		keyPressEvent = null;
	}
});


jcmp.events.AddRemoteCallable('LocalPlayerDeath', function(reason) {
	jcmp.ui.CallEvent("PlaySound", "death");

	deathCooldown = 15;
	jcmp.localPlayerData.isDeath = true;
	
	jcmp.ui.CallEvent("UpdateDeathUI",
		jcmp.localPlayerData.lifeInsurance, 
		jcmp.localPlayerData.healthInsurance,
		jcmp.languages.get("HUD_HOSPITAL_WAIT"),
		"<span style='opacity: 0.5'>" + jcmp.languages.get("HUD_HOSPITAL_CAN_PAY", [" (15)"]) + "</span>",
		jcmp.languages.get("INSURANCE_NAME_LIFEINSURANCE"),
		jcmp.languages.get("INSURANCE_NAME_HEALTHINSURANCE"),
		jcmp.languages.get("COMMON_YES"),
		jcmp.languages.get("COMMON_NO")
	);

	keyPressEvent = jcmp.events.Add("KeyPress", function(key, allowed, arrayMenus) {
		if (!allowed)
			return;

		if (key != 13)
			return;
		
		Resurrect();
	});
});