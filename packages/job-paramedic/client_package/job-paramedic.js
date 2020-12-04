'use strict';

const PARAMEDIC_HEAL_PRICE = 40;

jcmp.events.Add("GetJobInteractionMenu", function() {
    if (jcmp.localPlayerData.idJob != 4)
        return false;
    
	let items = [];

	let returnsServices = jcmp.events.Call("GetServicesCalls");

	for (let e = returnsServices.length - 1; e >= 0; e--) {
		if (returnsServices[e])
			items.push(returnsServices[e]);
	}

    return items;
});

jcmp.events.Add("GetJobContextMenu", function(playerData) {
	if (jcmp.localPlayerData.idJob != 4)
		return false;
	
	let items = [];

	items.push({
		id: "CONTEXT_MENU_JOB_PARAMEDIC_REVIVE",
		txt: jcmp.languages.get("CONTEXT_MENU_JOB_PARAMEDIC_REVIVE"),
		disabled: !playerData.networkPlayer || playerData.networkPlayer.health > 0,
	});

	items.push({
		id: "CONTEXT_MENU_JOB_PARAMEDIC_HEAL",
		txt: jcmp.languages.get("CONTEXT_MENU_JOB_PARAMEDIC_HEAL"),
		disabled: !playerData.networkPlayer || playerData.health <= 0,
	});

	return items;
});

jcmp.events.Add("ContextMenuPressed", function(args, playerData) {
	if (args.itemId == "CONTEXT_MENU_JOB_PARAMEDIC_REVIVE") {
		jcmp.events.Call("CloseCustomMenu");
		jcmp.events.CallRemote("RevivePlayer", playerData.networkId);
		return;
	}

	if (args.itemId == "CONTEXT_MENU_JOB_PARAMEDIC_HEAL") {
		jcmp.events.Call("CloseCustomMenu");
		jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_REQUEST_OFFERED_HEAL", [playerData.name, PARAMEDIC_HEAL_PRICE]), "medicine");
		jcmp.request.requestRemote("PARAMEDIC_REQUEST", playerData.networkId, "PARAMEDIC_REQUEST_HEAL", [jcmp.localPlayerData.nname, PARAMEDIC_HEAL_PRICE]);
		return;
	}
});

jcmp.events.Add("AcceptedRequest", function(id, playerId, playerName) {
	if (id != "PARAMEDIC_REQUEST")
		return;

	if (jcmp.localPlayerData.money < PARAMEDIC_HEAL_PRICE) {
		jcmp.notifications.add("", jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY_DESC", [PARAMEDIC_HEAL_PRICE]), "cancel", "cancel");
		return false;
	}
	
	jcmp.events.CallRemote("HealAccepted");
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_HEALED", [PARAMEDIC_HEAL_PRICE]), "health");
});

jcmp.events.Add("AcceptedRemoteRequest", function(id, playerId, playerName) {
	if (id != "PARAMEDIC_REQUEST")
		return;
	
	jcmp.events.CallRemote("JobDone", 30, 60);
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_HEAL_HEALED", [playerName, 30, 60]), "medicine");
});

jcmp.events.Add("DeclinedRemoteRequest", function(id, playerId, playerName) {
	if (id != "PARAMEDIC_REQUEST")
		return;
	
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_HEAL_DECLINED", [playerName]), "cancel", "cancel");
});

jcmp.events.AddRemoteCallable("RevivedSuccessfully", function(patientName) {
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_REVIVE_REVIVED", [patientName, 150, 300]), "medicine", "defibrillator");
});

jcmp.events.AddRemoteCallable("Revived", function(paramedicName) {	
	jcmp.ui.CallEvent("PlaySound", "defibrillator");
});

jcmp.events.AddRemoteCallable("ParamedicNotDeath", function() {	
	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_4"), jcmp.languages.get("PARAMEDIC_NOT_DEATH"), "cancel", "cancel");
});