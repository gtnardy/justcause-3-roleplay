'use strict';

const DEFAULT_MESSAGES = {
	"TAXI": "Can someone pick me up?",
	"MECHANIC": "My car is broken",
	"PARAMEDIC": "Medic here fast!",
	"LAWYER": "Please get me out of here",
};

const JOBS_HASH = {
	12: "TAXI",
	16: "TAXI",
	4: "PARAMEDIC",
	7: "POLICE",
	15: "LAWYER",
	3: "MECHANIC",
}

const LAWYER_PRICE = 1000;

jcmp.myServicesCalls = {};
jcmp.servicesCalls = {};

var servicesCalling;

jcmp.events.Add("GetServicesCalls", function() {
	let hasCalls = false;
	let items = [];

	for (let callerNetworkId in jcmp.servicesCalls) {
		hasCalls = true;
		items.push({
			id: "SERVICES_ACCEPT_" + callerNetworkId,
			txt: jcmp.servicesCalls[callerNetworkId].callerName,
			subTxt: jcmp.servicesCalls[callerNetworkId].timeout + "s",
			special: "close",
			value: callerNetworkId,
		});
	}

	let jobHash = JOBS_HASH[jcmp.localPlayerData.idJob];

	let item_services = {
		id: "SERVICES_CALL",
		txt: jcmp.languages.get("SERVICES_CALL_" + jobHash),
		subTxt: !hasCalls ? jcmp.languages.get("SERVICES_NOSERVICES") : "",
		disabled: !hasCalls,
		body: {
			id: "SERVICES_CALL_LIST",
			subheader: {txt: jcmp.languages.get("SERVICES_CALL_" + jobHash)},
			items: items
		},
        description: jcmp.languages.get("SERVICES_CALL_DESCRIPTION"),
	};

	return item_services;
});

jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {
	if (args.bodyId != "SERVICES_CALL_LIST")
		return;
	
	jcmp.events.CallRemote("ServicesCallAccepted", args.value);
});

jcmp.events.AddRemoteCallable("ServicesCallAcceptedYours", function(hashId, name) {
	jcmp.notifications.add(jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + hashId), jcmp.languages.get("SERVICES_ACCEPTED_YOUR_CALL", [name]), "police-radio");

	delete jcmp.myServicesCalls[hashId];
});

jcmp.events.AddRemoteCallable("ServicesCallAccepted", function(name, position) {
	position = jcmp.utils.vector3.parse(position);
	jcmp.events.Call("SetGPS", position, name);

	jcmp.notifications.add(jcmp.languages.get("JOB_NAME_" + jcmp.localPlayerData.idJob), jcmp.languages.get("SERVICES_ACCEPTED", [name]), "police-radio");
});

jcmp.events.Add("Tick18Seconds", function() {
	for (let callerNetworkId in jcmp.servicesCalls) {
		jcmp.servicesCalls[callerNetworkId].timeout -= 18;

		if (jcmp.servicesCalls[callerNetworkId].timeout <= 0) {
			jcmp.servicesCalls[callerNetworkId].poi.Destroy();
			delete jcmp.servicesCalls[callerNetworkId];
		}
	}
	
	for (let hashId in jcmp.myServicesCalls) {
		jcmp.myServicesCalls[hashId] -= 18;
		if (jcmp.myServicesCalls[hashId] <= 0) {
			
			jcmp.notifications.add(hashId, jcmp.languages.get("SERVICES_EXPIRED"), "cancel", "cancel");
			delete jcmp.myServicesCalls[hashId];
		}
    }
});

jcmp.events.Add("PlayerDisconnected", function(playerData) {
    if (jcmp.servicesCalls[playerData.networkId]) {
        jcmp.servicesCalls[playerData.networkId].poi.Destroy();
		delete jcmp.servicesCalls[playerData.networkId];
	}
});

jcmp.events.AddRemoteCallable("ServicesDeleteMyCall", function(jobHash) {
    if (jcmp.myServicesCalls[jobHash])
		delete jcmp.myServicesCalls[jobHash];
});

jcmp.events.AddRemoteCallable("ServicesDeleteCall", function(networkId) {
    if (jcmp.servicesCalls[networkId]) {
        jcmp.servicesCalls[networkId].poi.Destroy();
		delete jcmp.servicesCalls[networkId];
    }
});

jcmp.events.AddRemoteCallable("ServicesNewCall", function(jobHash, callerNetworkId, callerName, callerPosition, timeout, message) {
    jcmp.notifications.add(jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + jobHash), jcmp.languages.get("SERVICES_NEW", [callerName, jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + jobHash), message]), "police-radio");
    
	let poi = new POI(15, jcmp.utils.vector3.parse(callerPosition));
	poi.text = callerName;
	poi.maxDistance = 6000;
    poi.minDistance = 0;
	
	jcmp.servicesCalls[callerNetworkId] = {
		poi: poi,
		timeout: timeout,
		callerName: callerName,
	};
});

jcmp.events.Add("ServicesMakeCall", function(hashId, timeout) {
	if (hashId == "LAWYER") {
		if (!jcmp.localPlayerData.arrested) {
			jcmp.notifications.add("", jcmp.languages.get("LAWYER_YOU_ARE_NOT_ARRESTED"), "cancel", "cancel");
			return;
		}
		
		if (jcmp.localPlayerData.arrested >= 900) {
			jcmp.notifications.add(jcmp.languages.get("JOB_NAME_15"), jcmp.languages.get("LAWYER_HAVE_TO_WAIT"), "cancel", "cancel");
			return;
		}
		
		if (jcmp.localPlayerData.moneyBank < LAWYER_PRICE) {
			jcmp.notifications.add("", jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY_IN_BANK"), "cancel", "cancel");
			return;
		}
	}

	servicesCalling = {hashId: hashId, timeout: timeout};

	jcmp.events.Call("SetInputText", "SERVICES_CALL_MESSAGE", jcmp.languages.get("SERVICES_CALL_MESSAGE_" + hashId), DEFAULT_MESSAGES[hashId], 40);
});

jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id != "SERVICES_CALL_MESSAGE")
		return;

	jcmp.events.CallRemote("ServicesNewCall", servicesCalling.hashId, servicesCalling.timeout, value);

	servicesCalling = null;
});

jcmp.events.AddRemoteCallable("ServicesNewCallSuccess", function(hashId, timeout) {
	jcmp.notifications.add(jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + hashId), jcmp.languages.get("SERVICES_CALLED", [jcmp.languages.get("INTERACTION_MENU_SERVICES_SERVICE_" + hashId)]), "police-radio");

	jcmp.myServicesCalls[hashId] = timeout;
});

jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index != "idJob")
		return;
	
	for (let callerNetworkId in jcmp.servicesCalls) {
		if (jcmp.servicesCalls[callerNetworkId].poi)
			jcmp.servicesCalls[callerNetworkId].poi.Destroy();
	}
	
	jcmp.servicesCalls = {};
});