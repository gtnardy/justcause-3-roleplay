'use strict';

var image_downloader = require('image-downloader');
var request = require('ajax-request');
var rp = require('request-promise');
var express = require('express');
var cors = require('cors');
var showdown  = require('showdown');
var converter = new showdown.Converter();
var app = express();
app.use(cors());


jcmp.events.Add("UploadRaceImage", function(imageUrl, imageName) {
	image_downloader.image({
		url: imageUrl,
		dest: "../../var/www/public_html/images/races/" + imageName,
	}).catch((err) => {
		jcmp.console.print(err);
	});
});


jcmp.events.Add("CURL", function(uri, method, headers, body, json, qs) {
	
	if (headers)
		headers["User-Agent"] = "Request-Promise";
	else
		headers = {"User-Agent": "Request-Promise"};

	rp({uri: uri, method: method, body: body, headers: headers, qs: qs, json: json})
	.catch(function (err) {
		jcmp.console.print(`
			CURL error:\n
			URI: ${uri}\n
			Method: ${method}\n
			Body: ${body}\n
			Headers: ${headers}\n
			QS: ${qs}\n
			Error: ${err}
		 `);
	});;
});


jcmp.events.Add("UpdatePlayerFlag", function(player, firstTime) {
	request({
		url: `http://api.ipstack.com/${player.client.ipAddress}?access_key=CENSORED`,
		method: 'GET',
	}, function(err, res, body) {
		if (!player)
			return;
		
		if (err) {
			jcmp.console.print("Erro ao obter dados de país " + err);
			return;
		}
		
		let data = JSON.parse(body);
		if (data.country_code && data.country_code != "") {
			player.setValue("country", (data.country_code).toLowerCase());

			if (firstTime && player.language != "pt" && (data.country_code == "BR" || data.country_code == "PT")) {
				player.setValue("language", "pt");
			}
		} else {
			player.createValue("country", "zz");
		}

	});
});


app.get('/api/races/upload-image', function (req, res) {
	if (!req.query.imageUrl || !req.query.raceId) {
		res.json({error: 'Invalid Parameters!'});
		return;
	}
	
	jcmp.events.Call("UploadRaceImage", req.query.imageUrl, req.query.raceId + ".jpg");
});


app.get('/api/newspaper', function (req, res) {
	let data = {
		totalPlayers: jcmp.totalPlayers,
		onlinePlayers: jcmp.loggedPlayers.length,
		version: jcmp.changelogs[0].version,
		weather: jcmp.utils.getWeather(),
		government: {
			finances: {
				old: jcmp.oldMoney,
				actual: jcmp.money
			},
			fuel: jcmp.fuelValue,
			bavarium: jcmp.bavariumValue,
		},
		militaryBases: {
			government: {
				bavarium: jcmp.govBavarium,
				domination: jcmp.govDomination,
			},
			rebels: {
				bavarium: jcmp.rebelsBavarium,
				domination: jcmp.rebelsDomination,
			},
		},
		changelogs: jcmp.changelogs,
		news: jcmp.news,
		headline: jcmp.newspaper.headline,
        subheadline: jcmp.newspaper.subheadline,
        tycoon: jcmp.tycoon,
	};
	
	res.json(data);
});


app.get('/admin/changelog/submit', function (req, res) {

	if (!req.query.description || !req.query.version) {
		res.json({error: 'Invalid Parameters!'});
		return;
	}
	
	jcmp.SQL.query(
		"INSERT INTO Changelog SET ?",
		{
			description: req.query.description,
			version: req.query.version,
            submitDate: jcmp.utils.getDate("fullwtime"),
            
		},
		function () {
            jcmp.events.Call("LoadChangelog");
			res.json({success: 'true'});
		}
	);
});


app.get('/console/print', function (req, res) {
	if (!req.query.message) {
		res.json({error: 'Invalid Parameters!'});
		return;
	}

	jcmp.events.Call("SendDiscordMessage", req.query.message);
	res.end();
});


function LoadChangelog() {
	jcmp.changelogs = [{version: 0, description: "", submitDate: ""}];

	rp({
		uri: 'http://gitlab.com/api/v4/projects/5039442/repository/tags', 
		qs: {private_token: "CENSORED"}, 
		headers: {
			"User-Agent": "Request-Promise",
			"Content-Type": "application/json",
		}, 
		json: true
	})
    .then(function (data) {
		let len = data.length > 5 ? 5 : data.length;

		jcmp.changelogs = [];

		for (let c = 0; c < len; c++) {
			let description = data[c].release ? data[c].release.description : "";

			jcmp.changelogs.push({
				version: data[c].name,
				description: converter.makeHtml(description),
				submitDate: jcmp.utils.getDate("fullwseconds")
			});
		}
    })
    .catch(function (err) {
		jcmp.console.print("Error getting changelog, trying again: " + err);
		LoadChangelog();
		return;
	});
}


jcmp.events.Add('LoadChangelog', function () {
    LoadChangelog();
});


app.get('/api/charts/geo', function (req, res) {
	jcmp.SQL.query(
		"SELECT COUNT(1) AS 'count', UPPER(country) AS 'country' FROM Player WHERE country != 'NULL' GROUP BY country ORDER BY count DESC;",
		false,
		function (ret) {
			let data = [];

			for (let c = ret.length - 1; c >= 0; c--) {
				data.push([ret[c].country, ret[c].count]);
			}

			res.json(data);
		}
	);
});


app.get('/api/charts/playerSession', function (req, res) {
	jcmp.SQL.query(
		"CALL COUNTRIES_HOUR(?);",
		req.query.filterData,
		function (ret) {
			res.json(ret);
		}
	);
});

const jobs = {
	1: {en: "Unemployed", pt: "Desempregado", de: "Arbeitslos"},
	2: {en: "Truck D.", pt: "Caminhoneiro", de: "Truckfahrer"},
	3: {en: "Mechanic", pt: "Mecânico", de: "Mechaniker"},
	4: {en: "Paramedic", pt: "Paramédico", de: "Sanitäter"},
	5: {en: "News R.", pt: "Jornalista", de: "Reporter"},
	6: {en: "Farmer", pt: "Agricultor", de: "Farmer"},
	7: {en: "Police", pt: "Policial", de: "Polizist"},
	8: {en: "Fisherman", pt: "Pescador", de: "Fischer"},
	9: {en: "Hunter", pt: "Caçador", de: "Jäger"},
	10: {en: "Pizza D.", pt: "Entregador de Pizza", de: "Pizza-Lieferant"},
	11: {en: "Bus D.", pt: "Motorista de Ônibus", de: "Busfahrer"},
	12: {en: "Taxi D.", pt: "Taxista", de: "Taxifarher"},
	13: {en: "Military S.", pt: "Soldado Militar", de: "Soldat"},
	14: {en: "Rebel M.", pt: "Mercenário Rebelde", de: "Rebell"},
	15: {en: "Lawyer", pt: "Advogado", de: "Anwalt"},
	16: {en: "Heli Taxi D.", pt: "Taxista Aéreo", de: "Heli-Taxifahrer"},
	17: {en: "Agricultural P.", pt: "Piloto Agrícola", de: "Landwirtschaftlicher Pilot"},
	18: {en: "Race R.", pt: "Designer de Corridas", de: "Renn-Designer"},
	19: {en: "Tank Truck D.", pt: "Motorista de Caminhão Pipa", de: "Benzin-Truckfahrer"},
};

app.get('/api/charts/playersJobGiveup', function (req, res) {
	jcmp.SQL.query(
		"CALL PLAYERS_JOB_GIVEUP();",
		false,
		function (ret) {
			ret = ret[0];
			let data = [];

			for (let c = ret.length - 1; c >= 0; c--) {
				data.push([jobs[ret[c].idJob].en, ret[c].inactives, ret[c].actives]);
			}

			res.json(data);
		}
	);
});

app.get('/api/charts/playersJob', function (req, res) {
	jcmp.SQL.query(
		"CALL PLAYERS_JOB();",
		false,
		function (ret) {
			ret = ret[0];
			let data = [];

			for (let c = ret.length - 1; c >= 0; c--) {
				data.push([jobs[ret[c].idJob].en, ret[c].min, Math.round((ret[c].average + ret[c].min) / 2), Math.round((ret[c].average + ret[c].max) / 2), ret[c].max]);
			}

			res.json(data);
		}
	);
});


app.listen(8081);

// quantos players
// lista nome players