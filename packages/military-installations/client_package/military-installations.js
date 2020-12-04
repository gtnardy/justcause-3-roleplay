'use strict';

jcmp.militaryInstallations = {};

var seconds = 0;
var firstTime = false;

const jobs = [];
jobs[13] = 1;
jobs[14] = -1;

jcmp.events.Call("AddCommand",
	{
		command: "setmvehicle",
		permissions: 3,
		parameters: [
			{parameter: "idVehicle", type: "number"}
		],
		callback: function(args) {
			if (!jcmp.localPlayerData.vehicle) {
				jcmp.ui.CallEvent('chat_message', "You must be in a vehicle.", 255, 0, 0);
				return;
			}

			if (!jcmp.localPlayerData.sites[11] || !jcmp.militaryInstallations[jcmp.localPlayerData.sites[11].id]) {
				jcmp.ui.CallEvent('chat_message', "You must be in a military installation.", 255, 0, 0);
				return;
			}

			jcmp.events.CallRemote("SetMilitaryVehicle", args.idVehicle, jcmp.localPlayerData.sites[11].id);
			jcmp.ui.CallEvent('chat_message', "Setting actual military vehicle in your actual position...", 0, 255, 255);
		}
	}
);


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 16) return;

	let military = checkInMilitary();
	if (!military)
		return;

	let menu = {
		id: "militarypost-custom-menu",
		header: {img: "military-installation-" + military.domination + ".jpg"},
		body: {
			id: "MILITARYPOST_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_16")},
			items: [
				{
					id: "MILITARYPOST_INFORMATION",
					txt: jcmp.languages.get("MILITARYPOST_INFORMATION"),
					descriptionList: [
						{txt: jcmp.languages.get("MILITARYPOST_INFORMATION_LABEL_DOMINATION"), subTxt: jcmp.languages.get("FACTION_NAME_" + military.domination)},
						{txt: jcmp.languages.get("MILITARYPOST_INFORMATION_LABEL_BAVARIUM"), subTxt: military.bavarium},
						{txt: jcmp.languages.get("MILITARYPOST_INFORMATION_LABEL_PROTECTION"), subTxt: military.protection},
					],
				}
			],
		}
	};

	if (military.domination == -1) {
		let item_fuel = {
			id: "MILITARYPOST_FUEL",
			txt: jcmp.languages.get("GASSTATION_BUY_FUEL"),
			subTxt: "Complete >",
			description: "Cooming soon...",
			disabled: true,
		};

		menu.body.items.push(item_fuel);
	} else if (military.domination == 1) {

	}

	let item_weapons = {
		id: "MILITARYPOST_WEAPONS",
		txt: "Weapons",
		description: "Cooming soon...",
		disabled: true,
	};

	menu.body.items.push(item_weapons);

	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function checkInMilitary() {

	if (!jcmp.localPlayerData.sites[11])
		return false;

	let military = jcmp.militaryInstallations[jcmp.localPlayerData.sites[11].id];
	if (!military)
		return false;

	return military;
}

jcmp.events.AddRemoteCallable('MilitaryInstallationNewDomination', function(idSite, domination) {
	let site = jcmp.sites[idSite];
	if (!site)
		return;

	jcmp.notifications.add(jcmp.languages.get("SITE_NAME_11"), jcmp.languages.get("MILITARYINSTALLATIONS_NEW_DOMINATION", [site.name, jcmp.languages.get("FACTION_CNAME_" + domination)]), "flag");
});


jcmp.events.AddRemoteCallable('MilitaryInstallationBeingDominated', function(idSite) {
	let site = jcmp.sites[idSite];
	if (!site)
		return;

	jcmp.notifications.add(jcmp.languages.get("SITE_NAME_11"), jcmp.languages.get("MILITARYINSTALLATIONS_BEING_DOMINATED", [site.name]), "flag");

});


jcmp.events.AddRemoteCallable('MilitaryInstallationNewCleaned', function(idSite) {
	let site = jcmp.sites[idSite];
	if (!site)
		return;

	jcmp.notifications.add(jcmp.languages.get("SITE_NAME_11"), jcmp.languages.get("MILITARYINSTALLATIONS_LOST_CONTROL", [site.name]), "flag");
});


jcmp.events.AddRemoteCallable('UpdateMilitaryInstallations', function(militaryInstallations) {
	jcmp.militaryInstallations = JSON.parse(militaryInstallations);
	jcmp.events.Call("MilitaryInstallationsUpdated");

	UpdateHUD();
});


jcmp.events.Add('SitesUpdated', function() {
	jcmp.events.CallRemote("GetMilitaryInstallations");
});


function UpdateHUD() {
	if ([13, 14].indexOf(jcmp.localPlayerData.idJob) != -1) {
		let basesStringify = [];
		for (let b in jcmp.militaryInstallations) {
			if (jcmp.militaryInstallations[b].type != 2)
				basesStringify.push({domination: jcmp.militaryInstallations[b].domination, name: jcmp.sites[jcmp.militaryInstallations[b].idSite].name});
		}

		jcmp.ui.CallEvent("UpdateMilitaryBasesUI", JSON.stringify(basesStringify));
	} else
		jcmp.ui.CallEvent("UpdateMilitaryBasesUI", false);
}


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index == "idJob")
		UpdateHUD();
});


jcmp.ui.AddEvent('TickMinute', function() {
	for (let k in jcmp.militaryInstallations) {
		if (jcmp.militaryInstallations[k].protection > 0) {
			jcmp.militaryInstallations[k].protection = Math.max(0, jcmp.militaryInstallations[k].protection - 1);
		}
	}
});


jcmp.ui.AddEvent('TickSecond', function() {

	let military = checkInMilitary();
	if (!military) {
		firstTime = true;
		return;
	}

	seconds++;
	if (seconds < 5)
		return;

	seconds = 0;

	if (jobs[jcmp.localPlayerData.idJob] != null && military.protection == 0) {
		jcmp.events.CallRemote("DominatingMilitaryInstallation", military.idSite, jobs[jcmp.localPlayerData.idJob], firstTime);
		firstTime = false;
	}
});
