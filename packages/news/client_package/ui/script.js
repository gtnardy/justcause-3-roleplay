const api_url = "http://justcauserp.com:8081";

const weather = {
	"0": {label: "Sunny", min: 60, max: 95, description: "Sunny and pleasant. Morning low 60º and an afternoon high of 95º."},
	"1": {label: "Rainy", min: 57, max: 70, description: "Increasing clouds with showers arriving late in the day. Low 57º and high 70º."},
	"2": {label: "Overcast", min: 60, max: 75, description: "Partly sunny and warn. Morning low of 60º and afternoon high of 75º."},
	"3": {label: "Thunderstorm", min: 58, max: 73, description: "Strong storm with lighting strikes. Low 59º and high of 73º. The sea is spouting fish out! A great day to fish!"},
	"4": {label: "Fog", min: 50, max: 64, description: "Fog all day. Maximum view distance of 100 meters. Low 50º and high of 64º."},
	"5": {label: "Snow", min: 35, max: 50, description: "Snow and rain in the afternoon. Low 35º and high of 50º."},
};

jcmp.AddEvent("LocalPlayerLoaded3", function() {
	console.log("loading news");
	function getNewspaperData() {

		$.ajax({
			url: api_url + "/api/newspaper",
			method: "GET",
			dataType: "json",
		})
		.done(function(result) {
			loadNewspaperData(result);
		})
		.fail(function(result) {
		});
	}


	function loadNewspaperData(data) {
		// header
		$("#newspaper-total-players-value").html(data.totalPlayers);
		$("#newspaper-online-players-value").html(data.onlinePlayers);
		
		$("#newspaper-date").html((new Date()).toLocaleString('en-GB', {timeZone: 'UTC'}).substring(0, 17));
		$("#newspaper-version").html("Update " + data.version);

		// headlines
		$(".newspaper-headline").html(data.headline);
		$(".newspaper-subheadline").html(data.subheadline);

		// weather
		let weatherData = weather[data.weather];
		$("#weather-degrees-max").html(weatherData.max);
		$("#weather-degrees-min").html(weatherData.min);
		$("#weather-text").html(weatherData.label);
		$("#weather-text-description").html(weatherData.description);

		// government status
		$("#newspaper-gov-money-value").html("$ " + ((Number(data.government.finances.actual) / 1000000).toFixed(3)) + " mi");
		$("#newspaper-fuel-value").html("$ " + Number(data.government.fuel).toFixed(2) + "/L");
		$("#newspaper-bavarium-value").html("$ " + Number(data.government.bavarium).toFixed(2) + "/KG");

		// military bases
		$("#newspaper-rebels-bavarium-value").html((Number(data.militaryBases.rebels.bavarium) / 1000).toFixed(1) + " ton");
		$("#newspaper-gov-bavarium-value").html((Number(data.militaryBases.government.bavarium) / 1000).toFixed(1) + " ton");
		$("#newspaper-rebels-base-value").html(data.militaryBases.rebels.domination + "%");
		$("#newspaper-gov-base-value").html(data.militaryBases.government.domination + "%");

		// news
		$(".newspaper-breaking-news").html("");
		if (data.news.length > 0) {
			for (let n in data.news) {
				let dataNew = data.news[n];
				let breaking_new = $("<span class='newspaper-breaking-new'></span>");
				breaking_new.append("<span class='newspaper-breaking-new-text'>" + dataNew.text + "</span>");
				breaking_new.append("<span class='newspaper-breaking-new-footer'>" + dataNew.player + "<span class='newspaper-breaking-new-footer-right'>" + dataNew.date + "</span></span>");
				$(".newspaper-breaking-news").append(breaking_new);
				$(".newspaper-breaking-news").append("<hr>");
			}
		} else {
			$(".newspaper-breaking-news").html("There is no news to be displayed :(");
		}

		// changelogs
		$(".newspaper-changelogs").html('<img src="images/changelog.jpg" style="border: 1px solid black;width: 100%;filter: grayscale(40%);"/><h5 style="text-align: center;">Follow the development in our issue tracker: https://gitlab.com/justcauserp/brainstorm/</h5>');

		for (let c in data.changelogs) {
			let dataChangelog = data.changelogs[c];
			let newspaper_new_changelog = $("<span class='newspaper-new-changelog'></span>");

			newspaper_new_changelog.append("<span class='newspaper-title'>Release notes " + dataChangelog.version + "<span class='newspaper-title-right'>" + dataChangelog.submitDate + "</span></span>");
			newspaper_new_changelog.append("<hr class='hr-dotted'>");

			let newspaper_text = $("<span class='newspaper-text'><ul>" + dataChangelog.description + "</ul></span>");
			newspaper_new_changelog.append(newspaper_text);

			let newspaper_new = $("<div class='newspaper-new'></div>");
			newspaper_new.html(newspaper_new_changelog);
			$(".newspaper-changelogs").append(newspaper_new);
		}
		
		// tycoon
		$("#newspaper-tycoon-list").html("");
		
		for (let t = 0; t < data.tycoon.length; t++) {
			let dataTycoon = data.tycoon[t];
			$("#newspaper-tycoon-list").append((t + 1) + ". " + dataTycoon.name + "<span class='newspaper-value newspaper-tycoon-value'>" + dataTycoon.money.toLocaleString('en') + "</span><br>");
		}
	}


	jcmp.AddEvent("ToggleNewspaper", function(bool) {
		if (bool) {
			$(".newspaper").show();
			$(".container").animate({bottom: '0px'}, function() {
				jcmp.CallEvent("PlaySound", "paper");
			});
			getNewspaperData();
			jcmp.ShowCursor();
		} else {
			jcmp.CallEvent("PlaySound", "paper");
			$(".container").animate({bottom: '-2000px'}, function() {
				$(".newspaper").hide();
			});
			jcmp.HideCursor();
		}
	});
	console.log("loaded");
});