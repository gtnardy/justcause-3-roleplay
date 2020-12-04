'use strict';

const screenCenter = jcmp.viewportSize.div(new Vector2f(2, 2));
var keyUpEvent = null;
var contextMenuActive = false;

function LookedAt(playerData) {
	jcmp.localPlayerData.lookingAt = playerData;
	jcmp.ui.CallEvent("PlaySound", "trigger");
	jcmp.ui.CallEvent("UpdateActionUI", `<span style='color: ${playerData.color}'>${playerData.name}</span>`, "[F]", jcmp.languages.get("ROLELAY_INTERACT"));

	if (keyUpEvent)
		jcmp.events.Remove(keyUpEvent);
	
	keyUpEvent = jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
		if (key != 70 || !allowed || !jcmp.localPlayerData.lookingAt)
			return;
		
		OpenContextMenu(jcmp.localPlayerData.lookingAt);
	});
}

function UnlookedAt() {
	jcmp.ui.CallEvent("UpdateActionUI", false);
	jcmp.localPlayerData.lookingAt = null;

	if (keyUpEvent) {
		jcmp.events.Remove(keyUpEvent);
		keyUpEvent = null;
	}
}

function OpenContextMenu(playerData) {
	contextMenuActive = {
		playerData: playerData,
	};

	let returns = jcmp.events.Call("GetJobContextMenu", playerData);
	let items = [];

	for (let r = returns.length - 1; r >= 0; r--) {
		if (returns[r]) {
			items = returns[r];
			break;
		}
	}

	items.unshift({
		id: "CONTEXT_MENU_PAY",
		txt: jcmp.languages.get("CONTEXT_MENU_PAY"),
		innerValues: [
			{txt: "$ 5", value: 5},
			{txt: "$ 10", value: 10},
			{txt: "$ 50", value: 50},
			{txt: "$ 100", value: 100},
			{txt: "$ 500", value: 500},
			{txt: "$ 1000", value: 1000},
			{txt: "$ 5000", value: 5000},
			{txt: "$ 10000", value: 10000},
		],
	});

	let menu = {
		key: 70,
		id: "context-menu-custom-menu",
		offsetX: "250px",
		offsetY: "25%",
		body: {
			id: "CONTEXT_MENU_LIST",
			subheader: {txt: playerData.name},
			items: items,
		},
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
	UnlookedAt();
}

function CloseContextMenu() {
	contextMenuActive = false;
}

jcmp.events.Add("CustomMenuClosed_context-menu-custom-menu", function() {
	CloseContextMenu();
});

jcmp.events.Add("PlayerDisconnected", function(playerData) {
	if (jcmp.localPlayerData.lookingAt && jcmp.localPlayerData.lookingAt.networkId == playerData.networkId)
		UnlookedAt();

	if (contextMenuActive && contextMenuActive.playerData.networkId == playerData.networkId)
		jcmp.events.Call("CloseCustomMenu");
});

jcmp.events.Add('LocalPlayerFullLoaded', function() {
	jcmp.events.Add('TickSecond', () => {
		let playerCameraPosition = jcmp.localPlayer.camera.position;

		if (contextMenuActive) {
			if (!contextMenuActive.playerData.networkPlayer || jcmp.utils.vector3.distance(playerCameraPosition, contextMenuActive.playerData.networkPlayer.position) > 8)
				jcmp.events.Call("CloseCustomMenu");

			return;
		}

		if (jcmp.localPlayerData.vehicle)
			return;

		let lookingAt = null;
		let scriptingRenderer = new Renderer();
		
		for (let p = jcmp.players.length - 1; p >= 0; p--) {
			let player = jcmp.players[p];
			
			if (!jcmp.playersData[player.networkId])
				continue;

			let playerData = jcmp.playersData[player.networkId];

			if (playerData.networkId == jcmp.localPlayer.networkId)
				continue;

			if (jcmp.utils.vector3.distance(playerCameraPosition, player.position) > 8)
				continue;

			let distanceScreen = jcmp.utils.vector3.distance(scriptingRenderer.WorldToScreen(player.GetBoneTransform(0xE28C84B, scriptingRenderer.dtf).position), screenCenter);

			if (distanceScreen < 150) {
				if (lookingAt && lookingAt.distanceScreen >= distanceScreen)
					continue;

				lookingAt = {
					playerData: playerData, 
					distanceScreen: distanceScreen
				};
			}
		}

		if (lookingAt) {
			if (!jcmp.localPlayerData.lookingAt) 
				LookedAt(lookingAt.playerData);
		
		} else if (jcmp.localPlayerData.lookingAt) {
			UnlookedAt();
		}
	});
});

jcmp.events.Add("CustomMenuPressed_context-menu-custom-menu", function(args) {
	if (!contextMenuActive || !contextMenuActive.playerData.networkPlayer) {
		jcmp.notifications.add("", jcmp.languages.get("COMMON_PLAYER_NOT_FOUND"), "cancel", "cancel");
		jcmp.events.Call("CloseCustomMenu");
		return;
	}

	if (args.itemId == "CONTEXT_MENU_PAY") {
		let totalValue = Math.ceil(args.value + args.value * 0.1);
		if (jcmp.localPlayerData.money < totalValue) {
			jcmp.notifications.add("", jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY_DESC", [totalValue]), "cancel", "cancel");
			return;
		}

		jcmp.notifications.add("", jcmp.languages.get("ROLEPLAY_PAY_PAID", [args.value, Math.ceil(args.value * 0.1), contextMenuActive.playerData.name]), "salary");

		jcmp.events.CallRemote("Pay", contextMenuActive.playerData.networkId, args.value);
		return;
	}

	if (args.itemId == "") {

	}

	jcmp.events.Call("ContextMenuPressed", args, contextMenuActive.playerData);
});