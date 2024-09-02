'use strict';

var isRunning = false;
const priceExtra = 5;


jcmp.events.Add("GetJobInteractionMenu", function() {
    if (jcmp.localPlayerData.idJob != 12 && jcmp.localPlayerData.idJob != 16)
        return false;
    
    let items = [];

	let returnsServices = jcmp.events.Call("GetServicesCalls");

	for (let e = returnsServices.length - 1; e >= 0; e--) {
		if (returnsServices[e])
			items.push(returnsServices[e]);
	}
		
    let item_taximeter = {
        id: "TAXI_TURNON_TAXIMETER",
        txt: jcmp.languages.get("TAXI_TURNON_TAXIMETER"),
        innerValues: [],
        description: jcmp.languages.get("TAXI_TURNON_TAXIMETER_DESCRIPTION"),
        disabled: isRunning,
    };

    items.push(item_taximeter);

    for (let v = 1; v <= 20; v++) {
        item_taximeter.innerValues.push({
            txt: "$" + v + " /KM",
            value: v
        });
    }

    item_taximeter.innerValues[10].default = true;

    return items;
});


jcmp.events.Add("CustomMenuPressed_interaction-menu-custom-menu", function(args) {	
	if (args.itemId == "TAXI_TURNON_TAXIMETER")
        startRun(args.value);
});


jcmp.ui.AddEvent('TickSecond', function() {
	if (isRunning)
		updateTaximeter();
});


jcmp.ui.AddEvent('TickFiveSeconds', function() {
	if (!isRunning)
		return;
	
	savePayment();
});


function quitRun() {
	if (isRunning.isPassenger) {
		jcmp.events.CallRemote("TaxiEndRun", isRunning.driver);
	} else {
		jcmp.events.CallRemote("TaxiEndRun", isRunning.passenger);
	}	
	
	endRun();
}


function endRun() {
	if (!isRunning)
		return;
	savePayment();
	
	if (isRunning.isPassenger) 
        jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_ENDED_PASSENGER", [Math.floor(isRunning.taximeter)]), "taxi");
	else {
        jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_ENDED", [Math.floor(isRunning.taximeter / 2), Math.floor(isRunning.taximeter * 3)]), "taxi");
        jcmp.events.CallRemote("CreateAttribute", "working", false);
	}
	
	isRunning = false;
	jcmp.ui.CallEvent("UpdateJobUI", false);
}


function updateTaximeter() {
	if (!jcmp.localPlayerData.vehicle) {
		quitRun();
		return;
	}
	
	let vehicle = jcmp.localPlayerData.vehicle;

	let taximeterAdd = vehicle.linearVelocity.length * (isRunning.priceKilometer / 1000);

	if (isRunning.isPassenger && jcmp.localPlayerData.money < (isRunning.partialPayment + taximeterAdd)) {
        jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_PASSENGER_HAS_NO_MONEY"), "cancel", "cancel");        
		quitRun();
		return;
	}
		
	isRunning.taximeter += taximeterAdd;
	isRunning.partialPayment += taximeterAdd;
	
	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify({
		header: jcmp.languages.get("HUD_TAXIMETER"),
		text: jcmp.languages.get("HUD_FARE", [Math.floor(isRunning.taximeter)])
	}));	
}


function savePayment() {
	
	let partialPayment = Math.floor(isRunning.partialPayment);
	
	if (isRunning.isPassenger) {
		jcmp.events.CallRemote("TaxiPay", partialPayment);
	} else {
		let payment = Math.floor(partialPayment / 1.5);
		jcmp.events.CallRemote("TaxiReceive", payment);
	}
	
	isRunning.partialPayment = isRunning.partialPayment - partialPayment;
}


function startRun(priceKilometer) {

	if (isRunning) {
		jcmp.events.Call('UpdateCustomMenuItem', "TAXI_TURNON_TAXIMETER", {notify: jcmp.languages.get("TAXI_YET_RUNNING"), error: true});
		return;
	}
	
	if (!jcmp.localPlayerData.vehicle || (jcmp.localPlayerData.idJob == 12 && jcmp.localPlayerData.vehicle.type != 4) || (jcmp.localPlayerData.idJob == 16 && jcmp.localPlayerData.vehicle.type != 8) || jcmp.localPlayerData.seat != 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "TAXI_TURNON_TAXIMETER", {notify: jcmp.languages.get("TAXI_NOT_IN_TAXI_" + jcmp.localPlayerData.idJob), error: true});
		return;		
	}

    jcmp.events.Call("CloseCustomMenu");
	jcmp.events.CallRemote("TaxiStartRun", priceExtra, priceKilometer);
}


jcmp.events.AddRemoteCallable("TaxiEndedRun", function() {
	endRun();
});


jcmp.events.AddRemoteCallable("PlayerDisconnected", function(networkId) {
	if (!isRunning)
		return;
	
	if ((isRunning.passenger && isRunning.passenger == networkId) || (isRunning.driver && isRunning.driver == networkId))
		endRun();
});


jcmp.events.AddRemoteCallable("TaxiPassengerNoMoney", function() {
    jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_NO_PASSENGER_MONEY"), "cancel", "cancel");
	
});

jcmp.events.AddRemoteCallable("TaxiNoPassenger", function() {
    jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_NO_PASSENGER"), "cancel", "cancel");
});


jcmp.events.AddRemoteCallable("TaxiStartedRun", function(passengerNetworkId, priceKilometer) {
	isRunning = {
		passenger: passengerNetworkId,
		taximeter: priceExtra,
        partialPayment: priceExtra,
        priceKilometer: priceKilometer,
	};
	
    jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_STARTED", [priceExtra]), "taxi");
	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify({
		header: jcmp.languages.get("HUD_TAXIMETER"),
		text: jcmp.languages.get("HUD_FARE", [priceExtra])
	}));		
	
    jcmp.events.CallRemote("CreateAttribute", "working", true);
});


jcmp.events.AddRemoteCallable("TaxiStartedRunPassenger", function(driverNetworkId, priceKilometer) {
	isRunning = {
		isPassenger: true,
		driver: driverNetworkId,
		taximeter: priceExtra,
        partialPayment: priceExtra,
        priceKilometer: priceKilometer,
	};
	
    jcmp.notifications.add("TAXIMETER", jcmp.languages.get("TAXI_STARTED", [priceExtra]), "taxi");
	jcmp.ui.CallEvent('UpdateJobUI', JSON.stringify({
		header: jcmp.languages.get("HUD_TAXIMETER"),
		text: jcmp.languages.get("HUD_FARE", [priceExtra])
	}));
});