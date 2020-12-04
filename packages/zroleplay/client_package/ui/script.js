"use strict";

var $window = $(window),
is_scoreboard_key_down = false,
is_stats_key_down = false;
var lastPressed = null;

var canPress = true;
var timeoutDelay = null;

function keyPressedDelay() {
	if (timeoutDelay)
		clearTimeout(timeoutDelay);

	timeoutDelay = setTimeout(function() {
		canPress = true;
		timeoutDelay = null;
	}, 130);

	canPress = false;
}

jcmp.AddEvent("LocalPlayerLoaded", function() {

	$window.keydown(function(event) {
		if (event.which != lastPressed) {
			jcmp.CallEvent("ToKey", "Press", event.which);
			lastPressed = event.which;
		}

		if (!canPress)
			return;

		keyPressedDelay();
		jcmp.CallEvent("ToKey", "Down", event.which);
	});

	$window.keyup(function(event) {
		jcmp.CallEvent("ToKey", "Up", event.which);

		if (event.which == lastPressed)
			lastPressed = null;

		keyHoldingWait = false;
		if (keyHolding && event.which == keyHolding.key) {
			clearTimeout(keyHolding.timeout);

			if (keyHolding.sound)
				jcmp.CallEvent("StopSound", keyHolding.sound);
			
			if (keyHolding.disableControls)
				jcmp.CallEvent("SetControlsEnabled", true);

			keyHolding = null;

			$("#keyhold-progress-inner").stop();
			$("#keyhold-progress-inner").css("width", "0");
			$("#keyhold").hide();
		}
	});


	var keyHolding = null;
	var keyHoldingWait = false;


	jcmp.AddEvent("StartKeyHold", function(id, text, key, time, sound, disableControls) {
		if (keyHolding || keyHoldingWait)
			return;

		if (disableControls)
			jcmp.CallEvent("SetControlsEnabled", false);

		if (sound)
			jcmp.CallEvent("PlaySound", sound);

		$("#keyhold-text").html(text);
		$("#keyhold").show();

		$("#keyhold-progress-inner").animate({width: "116px"}, {
			duration: time,
			easing: "linear"
		});

		keyHolding = {
			timeout: setTimeout(function() {
				if (keyHolding.disableControls)
					jcmp.CallEvent("SetControlsEnabled", true);

				jcmp.CallEvent("KeyHold", id);

				keyHolding = null;
				keyHoldingWait = true;

				$("#keyhold-progress-inner").stop();
				$("#keyhold-progress-inner").css("width", "0");
				$("#keyhold").hide();
			}, time),
			key: key,
			sound: sound,
			disableControls: disableControls,
		};
	});


	var timeoutStats = null;

	jcmp.AddEvent("KeyDown", function(key, allowed, arrayMenus) {
		if (key == 80 && allowed && !is_scoreboard_key_down) {
			$('#scoreboard').fadeIn(100);
			is_scoreboard_key_down = true;
			jcmp.CallEvent("GetScoreboardPlayers");
			$('#scoreboard .players').html("");
			jcmp.ShowCursor();
			jcmp.CallEvent("PlaySound", "open-menu");
		}

		if (key == 72 && allowed && !is_stats_key_down) {
			if (timeoutStats)
				clearTimeout(timeoutStats);
				
			timeoutStats = null;
			is_stats_key_down = true;

			$(".hideable-press").fadeIn(100);
			jcmp.CallEvent("PlaySound", "open-menu");

		}
	});


	jcmp.AddEvent("KeyUp", function(key, allowed, arrayMenus) {
		if (key == 80 && is_scoreboard_key_down) {
			$('#scoreboard').fadeOut(100);
			jcmp.HideCursor();
			is_scoreboard_key_down = false;
			jcmp.CallEvent("PlaySound", "close-menu");
		}

		if (key == 72 && is_stats_key_down) {

			if (timeoutStats)
				clearTimeout(timeoutStats);

			timeoutStats = setTimeout(function() {
				is_stats_key_down = false;
				$(".hideable-press").fadeOut(100);
				timeoutStats = null;
				jcmp.CallEvent("PlaySound", "close-menu");
			}, 5000);
		}
	});


	timeoutStats = setTimeout(function() {
		$(".hideable-press").fadeOut(100);
		timeoutStats = null;
	}, 10000);


	function addPlayer(player) {
		let tags = "";
		if (player.tags) {
			for (let tag in player.tags) {
				tags += "<span class='tag' style='background-color:" + player.tags[tag].color + "'>" + player.tags[tag].name + "</span>"; 
			}
		}

		let badges = "";
		if (player.badges) {
			for (let badge in player.badges) {
				badges += "<img class='badge' src='images/blank.gif' style='background-image: url(images/badges/" + badge +".png)'/>";
			}
		}

		let avatar = "";
		if (player.avatar) {
			avatar = `<img class='image' src='images/blank.gif' style='background-image: url("${player.avatar}")' />`;
		}

		let el = $(
		'<div class="row"> \
			<div class="column id">' + player.networkId + '</div> \
			<div class="column level">' + player.level + '</div> \
			<div class="column permissions">' + tags + '</div> \
			<div class="column avatar">' + avatar + '</div> \
			<div class="column name" style="color:' + player.color + '">' + player.name + '</div> \
			<div class="column job" style="color:' + player.color + '">' + player.jobName + '</div> \
			<div class="column badges">' + badges + '</div> \
			<div class="column ping">' + player.ping + '</div> \
			<div class="column country"><img src="images/blank.gif" class="flag flag-' + player.country + '" /></div> \
		</div>');

		el.appendTo($('#scoreboard .players'));
	}


	jcmp.AddEvent('SetScoreboardPlayers', function(players) {
		players = JSON.parse(players);
		
		for (let p in players) {
			if (players[p].name)
				addPlayer(players[p]);
		}
	});


	const tick2Ms = setInterval(() => {
		jcmp.CallEvent('Tick2Ms');
	}, 200);

	// const tickMs = setInterval(() => {
	// 	jcmp.CallEvent('TickMs');
	// }, 100);

	const tick = setInterval(() => {
		jcmp.CallEvent('Tick');
	}, 500);

	const interval = setInterval(() => {
		jcmp.CallEvent('TickSecond');
	}, 1000);

	// const tickTwo = setInterval(() => {
	// 	jcmp.CallEvent('TickTwoSeconds');
	// }, 2000);

	const tickFiveSeconds = setInterval(() => {
		jcmp.CallEvent('TickFiveSeconds');
	}, 5000);

	const Tick3Seconds = setInterval(() => {
		jcmp.CallEvent('Tick3Seconds');
	}, 3000);

	const Tick18Seconds = setInterval(() => {
		jcmp.CallEvent('Tick18Seconds');
	}, 18000);

	const TickThirtySeconds = setInterval(() => {
		jcmp.CallEvent('TickThirtySeconds');
	}, 30000);

	const tickMinute = setInterval(() => {
		jcmp.CallEvent('TickMinute');
	}, 60000);

	const tickFiveMinutes = setInterval(() => {
		jcmp.CallEvent('TickFiveMinutes');
	}, 150000);



	jcmp.AddEvent('SetUIHideable', function(bool) {
		if (bool)
			$(".hideable").addClass("hidden");
		else
			$(".hideable").removeClass("hidden");
	});


	jcmp.AddEvent('UpdateAFKUI', function(HUD_AFK) {
		if (HUD_AFK) {
			$("#afk-ui h2").html(HUD_AFK);
			$("#afk-ui").show();
		} else {
			$("#afk-ui").hide();
		}
	});

	$("#action-hud").hide();
	jcmp.AddEvent('UpdateActionUI', function(HUD_TEXT, HUD_BUTTON, HUD_ACTION_TEXT) {
		if (HUD_BUTTON) {
			$("#action-hud").stop(true, true);
			$(".action-hud-text").html(HUD_TEXT);
			$(".action-hud-button").html(HUD_BUTTON);
			$(".action-hud-action-text").html(HUD_ACTION_TEXT);
			$("#action-hud").fadeIn(100);
			$(".action-hud-text").animate({ height: 'show'}, 150);
		} else {
			$(".action-hud-text").animate({ height: 'hide'}, 150);
			$("#action-hud").fadeOut(100);
		}
	});


	jcmp.AddEvent('UpdateArrestedUI', function(HUD_ARRESTED, HUD_ARRESTED_TIME) {
		if (HUD_ARRESTED) {
			$("#arrested-ui h1").html(HUD_ARRESTED);
			$("#arrested-ui h2").html(HUD_ARRESTED_TIME);
			$("#arrested-ui").show();
		} else {
			$("#arrested-ui").hide();
		}
	});


	jcmp.AddEvent('UpdateHandcuffedUI', function(HUD_HANDCUFFED, HUD_HANDCUFFED_TIME) {
		if (HUD_HANDCUFFED) {
			$("#handcuff-ui h1").html(HUD_HANDCUFFED);
			$("#handcuff-ui h2").html(HUD_HANDCUFFED_TIME);
			$("#handcuff-ui").show();
		} else {
			$("#handcuff-ui").hide();
		}
	});

	var timeoutDeath = null;

	jcmp.AddEvent('UpdateDeathUI', function(hasLifeInsurance, hasHealthInsurance, HUD_HOSPITAL_WAIT, HUD_HOSPITAL_CAN_PAY, HUD_LIFEINSURANCE, HUD_HEALTHINSURANCE, HUD_YES, HUD_NO) {
		if (HUD_HOSPITAL_WAIT) {
			
			HUD_YES = "<span class='yes'>" + HUD_YES + "</span>";
			HUD_NO = "<span class='no'>" + HUD_NO + "</span>";

			$("#death-ui h1").html(HUD_HOSPITAL_WAIT);
			$("#death-ui h2").html(HUD_HOSPITAL_CAN_PAY);
			$("#death-ui h3").html(HUD_LIFEINSURANCE + ": " + (hasLifeInsurance ? HUD_YES : HUD_NO) + ". " + HUD_HEALTHINSURANCE + ": " + (hasHealthInsurance ? HUD_YES : HUD_NO) + ".");

			$("#death-ui").show();

			if (!timeoutDeath) {
				$("#death-ui").children().hide();

				timeoutDeath = setTimeout(function() {
					$("#death-ui").children().show();

				}, 2500);
			}

		} else {
			timeoutDeath = null;
			$("#death-ui").hide();
		}
	});


	jcmp.AddEvent('UpdateJobUI', function(args) {
		let data = JSON.parse(args);
		if (data) {

			$('.job-ui-header').html(data.header);

			if (data.text) {
				$('.job-ui-text.text0').show();
				$('.job-ui-text.text0').html(data.text);
			} else
				$('.job-ui-text.text0').hide();

			if (data.progress1) {
				$('.job-ui-text.text1').show();
				$('.job-ui-text.text1').html(data.progress1.text);
				$('.job-ui-text.text1').css("color", data.progress1.active ? "black" : "red");

				$('#job-ui-progress-bar.progress1').show();
				$('#job-ui-progress-bar.progress1').attr("value", data.progress1.progressActual);
				$('#job-ui-progress-bar.progress1').attr("max", data.progress1.progressTotal);
			} else {
				$('.job-ui-text.text1').hide();
				$('#job-ui-progress-bar.progress1').hide();
			}

			if (data.progress2) {
				$('.job-ui-text.text2').show();
				$('.job-ui-text.text2').html(data.progress2.text);
				$('.job-ui-text.text2').css("color", data.progress2.active ? "black" : "red");

				$('#job-ui-progress-bar.progress2').show();
				$('#job-ui-progress-bar.progress2').attr("value", data.progress2.progressActual);
				$('#job-ui-progress-bar.progress2').attr("max", data.progress2.progressTotal);
			} else {
				$('.job-ui-text.text2').hide();
				$('#job-ui-progress-bar.progress2').hide();
			}

			$(".job-ui").show();
		} else {
			$(".job-ui").hide();
		}
	});

	jcmp.AddEvent('UpdateTaximeterUI', function(fare, HUD_FARE, HUD_TAXIMETER) {
		if (fare) {

			$('.taximeter-ui-fare').html(fare.toLocaleString('en'));
			$('.taximeter-ui-text-fare').html(HUD_FARE);
			$('.taximeter-ui-text-taximeter').html(HUD_TAXIMETER);

			$(".taximeter-ui").show();
		} else {
			$(".taximeter-ui").hide();
		}
	});


	jcmp.AddEvent('UpdateMilitaryBasesUI', function(args) {
		let militaryBases = JSON.parse(args);

		$(".military-bases").html("");
		if (!args)
			return;

		for (let m in militaryBases) {
			let names = militaryBases[m].name.split(' ');
			let initials = "";

			for (let n in names) {
				if (names[n].length <= 2)
					initials += names[n];
				else
					initials += names[n].substring(0, 1).toUpperCase();
			}

			$(".military-bases").append("<div class='military-base base-domination-" + militaryBases[m].domination + "'>" + initials + "</div>");
		}

	});


	var timeoutFuel = null;
	var timeoutHeat = null;
	//$(".hideable").addClass("hidden");

	var money = 0;
	var hungry = 0;
	var thirsty = 0;
	var fuel = 0;
	var experience = 0;
	var jobExperience = 0;
	var jobLevel = 0;
	var bag = 0;

	jcmp.AddEvent('UpdateHUD', function(args) {
		let data = JSON.parse(args);

		if (data.labels) {
			for (let l in data.labels) {
				$("." + l).html(data.labels[l]);
			}
		}

		if (data.money !== undefined) {
			$('#money-data').html((data.money).toLocaleString('en'));

			if (money != data.money) {
				if (money > data.money) {
					$("#money-data-append").html((money - data.money).toLocaleString('en') + " $-");
					$("#money-data-append").addClass("no");
				} else {
					$("#money-data-append").html((data.money - money).toLocaleString('en') + " $+");
					$("#money-data-append").removeClass("no");
				}

				$('#money-data-append').show();
				setTimeout(function() {
					$('#money-data-append').fadeOut();
				}, 7000);
			}

			money = data.money;
		}

		if (data.level)
			$('#level-data').html(data.level);

		if (data.maxExperience) {
			$('#max-experience-data').html(data.maxExperience.toLocaleString('en'));
			$('#experience-progress-bar').attr("max", data.maxExperience);
		}

		if (data.experience !== undefined) {
			if (data.experience < experience)
				experience = 0;
				
			$("#experience-data-append").html("+ " + (data.experience - experience).toLocaleString('en') + " XP");
			$('#experience-data-append').show();
			setTimeout(function(){
				$('#experience-data-append').fadeOut();
			}, 7000);

			$('#experience-data').html(data.experience.toLocaleString('en'));
			$('#experience-progress-bar').attr("value", data.experience);

			experience = data.experience;
		}

		if (data.fuel !== undefined) {
			if (data.fuel !== false) {
				checkBlink($('.fuel.bar-level'), data.fuel, data.fuel - fuel);
				fuel = data.fuel;
				$('.fuel.bar').show();
				if (timeoutFuel) clearTimeout(timeoutFuel);
				timeoutFuel = setTimeout(function() { $(".fuel.bar").fadeOut(150); }, 5100);
			} else {
				if (timeoutFuel) clearTimeout(timeoutFuel);
				$(".fuel.bar").fadeOut(150);
			}
		}

		if (data.hungry) {
			checkBlink($('.hungry.bar-level'), data.hungry, data.hungry - hungry);
			hungry = data.hungry;
		}

		if (data.thirsty) {
			checkBlink($('.thirsty.bar-level'), data.thirsty, data.thirsty - thirsty);
			thirsty = data.thirsty;
		}


		if (data.currentSite !== undefined) {
			if (data.currentSite) {
				$("#current-site .current-site-img").hide();
				$('#current-site').fadeIn();
				$("#current-site .current-site-name-value").html(data.currentSite.cityName);
				$("#current-site .current-site-province-name-value").html(data.currentSite.provinceName);

				if (data.currentSite.currentMilitaryBavarium !== undefined) {
					$("#current-site .current-site-bavarium-value").html("Bavarium: " + (data.currentSite.currentMilitaryBavarium / 1000).toFixed(1).toLocaleString('en') + " ton");
					$("#current-site .current-site-bavarium-value").fadeIn();
				} else {
					$("#current-site .current-site-bavarium-value").fadeOut();
				}

				if (data.currentSite.currentMilitaryProtection !== undefined) {
					$("#current-site .current-site-protection-value").html("Protection: " + (data.currentSite.currentMilitaryProtection / 60).toFixed(1).toLocaleString('en') + " hours left");
					$("#current-site .current-site-protection").fadeIn();
				} else {
					$("#current-site .current-site-protection").fadeOut();
				}

				if (data.currentSite.domination !== undefined) {

					$('.heat').fadeIn(100);
					$('.heat-header').addClass("combat");
					$('.heat-bottom').addClass("combat-zone");

					$("#current-site .current-site-img").hide();

					switch (data.currentSite.domination) {
						case 1:
							$("#current-site .current-site-img.military-flag").show();
							break;

						case -1:
							$("#current-site .current-site-img.rebels-flag").show();
							break;

						case 0:
							$("#current-site .current-site-img.white-flag").show();
							break;
					}

					if (data.currentSite.percentDomination !== undefined) {
						$('.current-site-base-percent').fadeIn();
						$('.current-site-base-percent').html(Math.abs(data.currentSite.percentDomination));
					} else {
						$('.current-site-base-percent').fadeOut();
					}
				} else {
					$('.current-site-base-percent').fadeOut();
				}
			} else {
				$('.heat-header').removeClass("combat");
				$('.heat-bottom').removeClass("combat-zone");

				$('#current-site').fadeOut();
				$('.military-conquest').fadeOut();
			}
		}

		if (data.wantedStarsCount !== undefined) {

			$('.heat-bottom').removeClass("stars-1");
			$('.heat-bottom').removeClass("stars-2");
			$('.heat-bottom').removeClass("stars-3");
			$('.heat-bottom').removeClass("stars-4");
			$('.heat-bottom').removeClass("stars-5");

			if (data.wantedStarsCount > 0) {

				$('.heat').fadeIn(100);

				$('.heat-bottom').addClass("stars-" + Math.min(data.wantedStarsCount, 5));

				$('.heat-header').html(data.wantedStarsCount);
				$('.heat-header').addClass("level");

				if (timeoutHeat)
					clearTimeout(timeoutHeat);

				timeoutHeat = setTimeout(function(){
					$('.heat-header').html("");
					$('.heat-header').removeClass("level");
					timeoutHeat = null;
				}, 10000);

			} else {
				$('.heat-header').html("");
				$('.heat-header').removeClass("level");

				if (timeoutHeat)
					clearTimeout(timeoutHeat);
			}
		}

		if (data.experienceBonuses !== undefined) {
			$(".experience-hud-bonuses").html("");
			for (let b in data.experienceBonuses) {
				$(".experience-hud-bonuses").append('<div class="experience-hud-bonus">' + data.experienceBonuses[b] + '</div>');
			}
		}

		if (data.hideHelpmessage !== undefined) {
			if (data.hideHelpmessage)
				$("#helpmessage").hide();
			else
				$("#helpmessage").show();
		}

		if (data.hideMilitaryBases !== undefined) {
			if (data.hideMilitaryBases)
				$(".military-bases").hide();
			else
				$(".military-bases").show();
		}

		if (data.hideStats !== undefined) {
			if (timeoutStats) {
				clearTimeout(timeoutStats);
				timeoutStats = null;
			}

			is_stats_key_down = false;
			$(".hideable-press").fadeOut(100);
		}

		if (data.statsStealth !== undefined) {
			updateStats("stealth", data.statsStealth);
		}

		if (data.statsStamina !== undefined) {
			updateStats("stamina", data.statsStamina);
		}

		if (data.statsDriving !== undefined) {
			updateStats("driving", data.statsDriving);
		}

		if (data.statsFlying !== undefined) {
			updateStats("flying", data.statsFlying);
		}

		if (data.statsLungCapacity !== undefined) {
			updateStats("lungcapacity", data.statsLungCapacity);
		}

		if (data.statsStrength !== undefined) {
			updateStats("strength", data.statsStrength);
		}

		if (data.color !== undefined) {
			$("progress#job-experience-progress-bar::-webkit-progress-value").css("background", data.color);
			$("progress#bag-progress-bar::-webkit-progress-value").css("background", data.color);
			$(".bag-hud-name").css("color", data.color);
			$(".level.data-hud.job-hud").css("background", data.color);
			$(".job-experience-hud-name ").css("color", data.color);
			$("#job-max-experience-data::before").css("color", data.color);
			$("#job-experience-data").css("color", data.color);
			$(".job-experience-hud-name").css("color", data.color);
		}

		if (data.jobData !== undefined) {
			if (data.jobData) {

				if (jobLevel != data.jobData.level)
					jobExperience = 0;

				$('#job-level-data').html(data.jobData.level);
				jobLevel = data.jobData.level;

				$('#job-max-experience-data').html(data.jobData.maxExperience.toLocaleString('en'));
				$('#job-experience-progress-bar').attr("max", data.jobData.maxExperience);

				$("#job-experience-data-append").html("+ " + (data.jobData.experience - jobExperience).toLocaleString('en') + " XP");
				$('#job-experience-data-append').show();
				setTimeout(function(){
					$('#job-experience-data-append').fadeOut();
				}, 7000);

				$('#job-experience-data').html(data.jobData.experience.toLocaleString('en'));
				$('#job-experience-progress-bar').attr("value", data.jobData.experience);

				jobExperience = data.jobData.experience;

				$(".job-hud").show();
			} else {
				$(".job-hud").hide();
			}
		}

		if (data.jobName !== undefined) {
			$('.job-experience-hud-name').html(data.jobName + " level");
		}

		if (data.catchedCount !== undefined) {
			if (data.catchedCount) {
				$('#bag-data').html(data.catchedCount.actual);

				if (bag != data.catchedCount.actual) {
					if (bag > data.catchedCount.actual) {
						$("#bag-data-append").html("-" + (bag - data.catchedCount.actual).toLocaleString('en'));
						$("#bag-data-append").addClass("no");
					} else {
						$("#bag-data-append").html("+" + (data.catchedCount.actual - bag).toLocaleString('en'));
						$("#bag-data-append").removeClass("no");
					}

					$('#bag-progress-bar').attr("value", data.catchedCount.actual);
					$('#bag-progress-bar').attr("max", data.catchedCount.max);
		
					$('#bag-data-append').show();

					setTimeout(function() {
						$('#bag-data-append').fadeOut();
					}, 7000);
				}
				
				$(".bag-hud-name").html(data.catchedCount.name + " KG");
				bag = data.catchedCount.actual;

				$(".bag-hud").show();
			} else {
				$(".bag-hud").hide();
			}
		}
	});


	function updateStats(stats, value) {

		let oldValue = $(".player-stats-" + stats + " progress").attr("value");

		$(".player-stats-" + stats).fadeIn(100);

		$(".player-stats-" + stats + " progress").attr("value", value);
		$(".player-stats-" + stats + " progress").addClass(oldValue > value ? "decrease" : (oldValue < value ? "increase" : ""));

		setTimeout(function() {
			if (!is_stats_key_down) {
				$(".player-stats-" + stats).fadeOut(100);
				if (timeoutStats)
					clearTimeout(timeoutStats);
			}
			$(".player-stats-" + stats + " progress").removeClass("decrease");
			$(".player-stats-" + stats + " progress").removeClass("increase");
		}, 15000);
	}


	function checkBlink(elements, value, diff) {
		if (value <= 10) {
			elements.eq(9).addClass("blink");
			elements.eq(8).removeClass("blink");
		} else if (value <= 20) {
			elements.eq(9).addClass("blink");
			elements.eq(8).addClass("blink");
		} else {
			elements.removeClass("blink");
		}

		if (value <= 0)
			elements.removeClass("blink");

		let oldElements = elements.filter(".bar-active");

		elements.removeClass("bar-active");
		elements.slice(Math.floor(11 - value / 10) - 1, 10).addClass("bar-active");

		if (diff >= 5) {
			elements.clearQueue();
			elements.removeClass("bar-changed-up");
			elements.removeClass("bar-changed-down");
			elements.filter(".bar-active").not(oldElements).addClass("bar-changed-up").delay(5000).queue(function(next) {
				$(this).removeClass("bar-changed-up");
				next();
			});
		} else if (diff <= -5) {
			elements.clearQueue();
			elements.removeClass("bar-changed-up");
			elements.removeClass("bar-changed-down");
			oldElements.not(elements.filter(".bar-active")).addClass("bar-changed-down").delay(5000).queue(function(next) {
				$(this).removeClass("bar-changed-down");
				next();
			});
		}
	}
});

setTimeout(function() {
	console.log("Loaded1");
	jcmp.CallEvent("LocalPlayerLoaded1");
}, 7000);

setTimeout(function() {
	console.log("Loaded2");
	jcmp.CallEvent("LocalPlayerLoaded2");
}, 8000);

setTimeout(function() {
	console.log("Loaded3");
	jcmp.CallEvent("LocalPlayerLoaded3");
}, 9000);

setTimeout(function() {
	console.log("Loaded4");
	jcmp.CallEvent("LocalPlayerLoaded4");
}, 10000);

setTimeout(function() {
	console.log("Loaded5");
	jcmp.CallEvent("LocalPlayerLoaded5");
}, 11000);

setTimeout(function() {
	console.log("Loaded6");
	jcmp.CallEvent("LocalPlayerLoaded");
}, 13000);