'use strict';

const priceChangeName = 5000;

jcmp.events.Add("CustomMenuPressed_townhall-custom-menu", function(args){
	if (!jcmp.utils.checkInSite(4))
		return;

	if (args.itemId == "TOWNHALL_CHANGE_NAME")
		ChangeName();

	if (args.bodyId == "JOB_CHOOSE_TP")
		Choose(args.value.id, args.value.tp);
});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 4) return;

	let menu = {
		id: "townhall-custom-menu",
		header: {img: "town-hall.jpg"},
		body: {
			id: "TOWNHALL_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_4")},
			items: [],
		}
	};

	let item_jobs = {
		id: "TOWNHALL_JOBTYPE_ITEM",
		txt: jcmp.languages.get("TOWNHALL_JOBS"),
		description: jcmp.languages.get("TOWNHALL_JOBS_DESCRIPTION"),
		body: {
			id: "TOWNHALL_JOBTYPE_LIST",
			subheader: {txt: jcmp.languages.get("TOWNHALL_JOBTYPES")},
			items: [],

		}
	};

	// é o tipo
	for (let idJobType = 1; idJobType <= 3; idJobType++) {

		let itemJobType = {
			id: "TOWNHALL_JOBTYPE_" + idJobType,
			txt: jcmp.languages.get("JOBTYPE_NAME_" + idJobType),
			description: jcmp.languages.get("TOWNHALL_JOBTYPE_DESCRIPTION"),
			disabled: (jcmp.jobTypes[idJobType].length === 0),
			body: {
				id: "TOWNHALL_JOB_LIST",
				subheader: {txt: jcmp.languages.get("TOWNHALL_JOBS"), count: true},
				items: [],

			}
		};

		for (let key in jcmp.jobTypes[idJobType]) {

			let job = jcmp.jobTypes[idJobType][key];

			let item = {
				txt: jcmp.languages.get("JOB_NAME_" + job.id),
				subTxt: "$" + job.salary,
				descriptionList: [
					{txt: jcmp.languages.get("TOWNHALL_LABEL_SALARY"), subTxt: "$" + job.salary},
					{txt: jcmp.languages.get("TOWNHALL_LABEL_MINIMUMLEVEL"), subTxt: job.level, alert: jcmp.localPlayerData.level < job.level},
					{txt: jcmp.languages.get("TOWNHALL_LABEL_DIFFICULTY"), subTxt: job.difficulty},
					(jcmp.localPlayerData.cooldownJobChange > 0 ? {txt: jcmp.languages.get("TOWNHALL_LABEL_COOLDOWN", [jcmp.localPlayerData.cooldownJobChange]), subTxt: jcmp.localPlayerData.cooldownJobChange + " mins", alert: true} : null),
				],
				disabled: jcmp.localPlayerData.cooldownJobChange > 0 || jcmp.localPlayerData.level < job.level,
				description: jcmp.languages.get("JOB_DESCRIPTION_" + job.id),
				body: {
					id: "JOB_CHOOSE_CONFIRMATION",
					subheader: {txt: jcmp.languages.get("TOWNHALL_CONFIRM")},
					items: [
						{
							txt: jcmp.languages.get("TOWNHALL_NO"),
							description: jcmp.languages.get("TOWNHALL_DECLINE_JOB"),
							special: "back",
						},
						{
							txt: jcmp.languages.get("TOWNHALL_YES"),
							description: job.cooldown ? jcmp.languages.get("TOWNHALL_ACCEPT_JOB_COOLDOWN", [job.cooldown]) : jcmp.languages.get("TOWNHALL_ACCEPT_JOB"),
							body: {
								id: "JOB_CHOOSE_TP",
								subheader: {txt: jcmp.languages.get("TOWNHALL_TP")},
								items: [
									{
										txt: jcmp.languages.get("TOWNHALL_YES"),
										description: jcmp.languages.get("TOWNHALL_ACCEPT_JOB_TP"),
										special: "close",
										value: {id: job.id, tp: true},
									},
									{
										txt: jcmp.languages.get("TOWNHALL_NO"),
										description: jcmp.languages.get("TOWNHALL_DECLINE_JOB_TP"),
										special: "close",
										value: {id: job.id, tp: false},
									},
								]
							}
						},
					],
				}
			};
			itemJobType.body.items.push(item);
		}

		item_jobs.body.items.push(itemJobType);

	}


	let item_changename = {
		id: "TOWNHALL_CHANGE_NAME",
		txt: jcmp.languages.get("TOWNHALL_CHANGE_NAME"),
		subTxt: "$ " + priceChangeName,
		description: jcmp.languages.get("TOWNHALL_CHANGE_NAME_DESCRIPTION"),
		disabled: !jcmp.localPlayerData.vip,
	};


	let item_crew = {
		id: "TOWNHALL_CREWS",
		txt: jcmp.languages.get("TOWNHALL_CREWS"),
		description: "Cooming soon",
		disabled: true,
	};


	menu.body.items.push(item_jobs);
	menu.body.items.push(item_changename);
	menu.body.items.push(item_crew);

	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function Choose(idJob, tp) {

	let job = jcmp.jobs[idJob];

	if (!job || !idJob) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_4"), jcmp.languages.get("TOWNHALL_NOT_FOUND"), "cancel", "cancel");
		return;
	}

	if (job.level > jcmp.localPlayerData.level) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_4"), jcmp.languages.get("TOWNHALL_LEVEL_MINIMUM", [job.level]), "cancel", "cancel");
		return;
	}

	if (jcmp.localPlayerData.cooldownJobChange > 0) {
		jcmp.notifications.add(jcmp.languages.get("SITE_NAME_4"), jcmp.languages.get("TOWNHALL_CANT_CHANGE_YET", [jcmp.localPlayerData.cooldownJobChange]), "cancel", "cancel");
		return;
	}

	jcmp.events.CallRemote("ChooseJob", job.id, tp);
}


jcmp.events.AddRemoteCallable("JobChoosen", function(idJob) {
    jcmp.events.Call("SetAlertScreen", "ALERTSCREEN_NEW_JOB", jcmp.languages.get("TOWNHALL_NEW_JOB"), jcmp.languages.get("TOWNHALL_NEW_JOB_TEXT", [jcmp.languages.get("JOB_TUTORIAL_" + idJob)]), 1);
});


function ChangeName() {
	if (jcmp.localPlayerData.money < priceChangeName) {
		jcmp.events.Call('UpdateCustomMenuItem', "TOWNHALL_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.Call("SetInputText", "TOWNHALL_NAME", jcmp.languages.get("CHARACTERCREATOR_NEW_NAME"), jcmp.localPlayerData.nname, 20);
	jcmp.events.Call("CloseCustomMenu", "townhall-custom-menu");
}


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id != "TOWNHALL_NAME")
		return;

	jcmp.events.CallRemote("ChangeName", value);
});
