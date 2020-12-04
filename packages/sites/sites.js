'use strict';

jcmp.sites = {};
jcmp.sitesType = {};

const provinces = [];
provinces[1] = "Aspera";
provinces[2] = "Baia";
provinces[3] = "Feno";
provinces[4] = "Lacos";
provinces[5] = "Lavanda";
provinces[6] = "Plagia";
provinces[7] = "Sirocco Nord";
provinces[8] = "Sirocco Sud";
provinces[9] = "Soros";

jcmp.events.AddRemoteCallable('SetSite', function(player, nam, idS, minD, prov) {
	let position = player.position;
	position.y += 1;
	position = jcmp.utils.vector3.stringify(position);

	jcmp.SQL.query(
		"INSERT INTO Site SET ?",
		{
			name: nam ? nam : "NULL",
			idSiteType: idS,
			position: position,
			minDistance: minD ? minD : "NULL",
			province: prov
		},
		function(r) {
			LoadSites(player, false);
		}
	);

});


function LoadSites(player, firstTime) {

	jcmp.SQL.query(
		`SELECT
			Site.id,
			name,
			idSiteType,
			position,
			poiType,
			maxDistance,
			province,
			Site.minDistance AS 'minDistance_site',
			SiteType.minDistance AS 'minDistance_sitetype'
		FROM Site
			LEFT JOIN SiteType ON Site.idSiteType = SiteType.id`,
		null,
		function (rows) {

			rows.forEach(function(row) {
				jcmp.sites[row.id] = {
					id: row.id,
					name: row.name,
					idSiteType: row.idSiteType,
					position: row.position,
					poiType: row.poiType,
					maxDistance: row.maxDistance,
					minDistance: row.minDistance_site ? row.minDistance_site : row.minDistance_sitetype,
					provinceName: row.province ? provinces[row.province] : null,
				};
			});

			jcmp.SQL.query(
				`SELECT
					id
				FROM SiteType`,
				null,
				function (rows) {
					rows.forEach(function(row) {
						jcmp.sitesType[row.id] = {
							id: row.id
						};
					});

					if (player) {
						jcmp.events.CallRemote('chat_message', player, "Site created!", 0, 255, 255);
						SendToAllPlayers();
					}

                    if (firstTime)
					    jcmp.events.Call("SitesLoaded");
				}
			);
		}
	);
}


function SendToPlayer(player) {
	jcmp.events.CallRemote("UpdateSites", player, JSON.stringify(jcmp.sites), JSON.stringify(jcmp.sitesType));
}


function SendToAllPlayers() {
    for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
        if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
            continue;
            
        SendToPlayer(jcmp.loggedPlayers[p]);
    }
}


jcmp.events.AddRemoteCallable("PlayerEnterSite", function(player, idSiteType, idSite) {
	player.sites[idSiteType] = idSite;
});


jcmp.events.AddRemoteCallable("PlayerExitSite", function(player, idSiteType) {
	player.sites[idSiteType] = false;
});


jcmp.events.AddRemoteCallable("UpdatedHouses", function(player) {
	SendToPlayer(player);
});


jcmp.events.Add("ServerLoaded", function() {
    LoadSites(false, true);
});