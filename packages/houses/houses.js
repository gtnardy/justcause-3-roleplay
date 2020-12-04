'use strict';

const GARAGE_SLOT_LIMIT = 10;
const GARAGE_SLOT_PRICE_BASE = 15000;

jcmp.houses = {};

jcmp.events.AddRemoteCallable('BuyGarageSlot', function(player, houseId) {
	let house = jcmp.houses[houseId];
	if (!house) return;

	let value = house.garageSlots * GARAGE_SLOT_PRICE_BASE;
	let garageSlotLimit2 = GARAGE_SLOT_LIMIT;

	if (player.vip == 2)
		garageSlotLimit2 = 20;
		
	if (house.idOwner != player.client.steamId || player.money < value || house.garageSlots >= garageSlotLimit2)
		return;

	jcmp.events.Call("SetPlayerMoney", player, -value);

	SetHouseAttr(player, house, "garageSlots", house.garageSlots + 1);
});


jcmp.events.AddRemoteCallable('SetHouseAttr', function(player, houseId, attr, value) {
	let house = jcmp.houses[houseId];
	if (!house) return;

	if (house.idOwner != player.client.steamId)
		return;

	SetHouseAttr(player, house, attr, value);
});


function SetHouseAttr(player, house, attr, value) {
	house[attr] = value;
	jcmp.SQL.execute(
		"UPDATE House SET " + attr + " = ? WHERE idSite = ? AND idOwner = ?",
		[value, house.id, player.client.steamId]
	);

	SendToAllPlayers();
}


jcmp.events.AddRemoteCallable('SellHouse', function(player, houseId) {
	let house = jcmp.houses[houseId];
	if (!house) return;

	if (house.idOwner != player.client.steamId)
		return;

	jcmp.houses[houseId].idOwner = null;
	jcmp.houses[houseId].nameOwner = null;
	jcmp.houses[houseId].name = "House for Sale";

	jcmp.SQL.execute(
		"UPDATE House SET idOwner = NULL, name = ? WHERE idSite = ? AND idOwner = ?",
		[
			jcmp.houses[houseId].name, 
			houseId, 
			player.client.steamId
		]
	);

	SendToAllPlayers();

	player.createValue("house", null);
	player.setValue("spawnAtHouse", false);

	jcmp.events.Call("SetPlayerMoney", player, Math.floor(house.price * 0.75));
	jcmp.events.CallRemote("HouseSold", player);
});


jcmp.events.AddRemoteCallable('BuyHouse', function(player, houseId) {
	let house = jcmp.houses[houseId];
	if (!house) return;

	if (house.idOwner || player.money < house.price || player.house || (house.isVip && player.vip != 2))
		return;

	jcmp.houses[houseId].idOwner = player.client.steamId;
	jcmp.houses[houseId].nameOwner = player.nname;

	jcmp.SQL.execute(
		"UPDATE House SET idOwner = ?, name = ? WHERE idSite = ?",
		[
			player.client.steamId, 
			player.nname + "'s House",
			houseId
		]
	);

	SendToAllPlayers();

	player.createValue("house", houseId);
	jcmp.events.Call("SetPlayerMoney", player, -Math.floor(house.price));
	jcmp.events.CallRemote("HouseBought", player);
});


jcmp.events.AddRemoteCallable('SetHouse', function(player, price, idSite, isVip) {
	jcmp.SQL.query(
		"INSERT INTO House SET ?",
		{
			price: price,
			idSite: idSite,
			idHouseType: 1,
			isVip: isVip
		}, function(r) {
			LoadHouses(player);
        }
	);
});


function LoadHouses(player) {
	jcmp.SQL.query(
		`SELECT
			idOwner,
			Player.nname AS 'player_name',
			House.name AS 'house_name',
			idHouseType,
			idSite,
			price,
			isVip,
            color,
            garageSlots,
            garagePosition,
			garageRotation,
			DATE_ADD(Player.lastJoin, INTERVAL 30 DAY) AS 'expirationDate',
			DATE_ADD(lastJoin, INTERVAL 30 DAY) <= NOW() AS 'expired'
		FROM House
			LEFT JOIN Player ON House.idOwner = Player.id`,
		null,
		function (rows) {
			for (let r = rows.length - 1; r >= 0; r--) {
				let row = rows[r];

				if (row.expired) {

					jcmp.events.Call("Announce", "House for Sale!", `The ${row.player_name}'s House id ${row.idSite} was automatically sold for inactivity!`);

					row.house_name = "House for Sale";
					row.player_name = null;
					row.expirationDate = null;

					jcmp.SQL.execute(
						`UPDATE House SET ? WHERE idSite = ?`,
						[
							{
								idOwner: null,
								name: row.house_name,
							},
							row.idSite,
						]
					);

					jcmp.events.Call("SetPlayerOfflineMoneyBank", row.idOwner, row.price * 0.5, "House Auto-Sold");
					
					row.idOwner = null;
				}

				jcmp.houses[row.idSite] = {
					id: row.idSite,
					idHouseType: row.idHouseType,
					nameOwner: row.player_name,
					name: row.house_name,
					idOwner: row.idOwner,
					price: row.price,
					isVip: row.isVip,
					color: row.color,
                    garageSlots: row.garageSlots,
                    garagePosition: row.garagePosition,
                    garageRotation: row.garageRotation,
                    expirationDate: row.expirationDate,
				};
			}

			if (jcmp.utils.validatePlayer(player)) {
				jcmp.events.CallRemote('chat_message', player, "House setted!", 0, 255, 255);
				SendToAllPlayers();
			}
		}
	);
}


function SendToPlayer(player) {
	jcmp.events.CallRemote("UpdateHouses", player, JSON.stringify(jcmp.houses));
}


function SendToAllPlayers() {
	jcmp.events.CallRemote("UpdateHouses", null, JSON.stringify(jcmp.houses));
}


jcmp.events.AddRemoteCallable("GetUpdateHouses", function(player) {
	SendToPlayer(player);
});


jcmp.events.Add("ServerLoaded", function() {
    LoadHouses(false);
});