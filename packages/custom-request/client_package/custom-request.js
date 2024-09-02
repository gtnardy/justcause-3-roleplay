var request = null;


jcmp.events.Add("RequestRemote", function(id, playerId, textLabel, textParams) {
	jcmp.events.CallRemote("RequestRemote", id, playerId, textLabel, JSON.stringify(textParams));
});


function AddRequest(id, senderId, senderName, textLabel, textParams) {
	request = {
		id: id,
		sender: {networkId: senderId, name: senderName},
		text: jcmp.languages.get(textLabel, textParams),
		timeout: 60
	};

	jcmp.notifications.addPrompt(jcmp.languages.get("REQUEST_LABEL"), request.text + "<hr>" + jcmp.languages.get("REQUEST_DESCRIPTION"), "asking");
}


jcmp.events.AddRemoteCallable("AddRemoteRequest", function(id, senderId, senderName, textLabel, textParams) {
	textParams = JSON.parse(textParams);

	if (request || jcmp.localPlayerData.isDeath) {
		jcmp.events.CallRemote("RemoteRequestBusy", id, senderId);
		return;
	}

	AddRequest(id, senderId, senderName, textLabel, textParams);
});


jcmp.events.AddRemoteCallable("RemoteRequestBusy", function() {
	jcmp.notifications.add(jcmp.languages.get("REQUEST_LABEL"), jcmp.languages.get("REQUEST_PLAYER_BUSY"), "cancel", "cancel");
});


jcmp.events.AddRemoteCallable('LocalPlayerDeath', function(reason) {
	if (request)
		DeclineRequest(1);
});


jcmp.events.AddRemoteCallable("AcceptedRemoteRequest", function(id, playerId, playerName) {
	jcmp.events.Call("AcceptedRemoteRequest", id, playerId, playerName);
	request = null;
});


jcmp.events.AddRemoteCallable("DeclinedRemoteRequest", function(id, playerId, playerName, type) {
	if (type == 2 || type == 4)
		jcmp.notifications.add("", jcmp.languages.get("REQUEST_REMOTE_DECLINED_" + type, [playerName]), "cancel", "cancel");
	else
		jcmp.events.Call("DeclinedRemoteRequest", id, playerId, playerName, type);

	request = null;
});


jcmp.ui.AddEvent("TickSecond", function() {
	if (!request)
		return;

	request.timeout--;

	if (request.timeout <= 0) {
		DeclineRequest(3);
		return;
	}

    let sender = jcmp.playersData[request.sender.networkId];
    if (sender && sender.networkPlayer && jcmp.utils.vector3.distance(sender.networkPlayer.position, jcmp.localPlayer.position) > 15) {
        DeclineRequest(4);
    }

});

// types: 1: declined, 2: disconnected, 3: expired, 4: walked away
function DeclineRequest(type) {
	jcmp.events.Call("DeclinedRequest", request.id);

    jcmp.events.CallRemote("DeclinedRequest", request.id, request.sender.networkId, type);

    jcmp.notifications.updatePrompt(false, request.text + "<hr>" + jcmp.languages.get("REQUEST_DECLINED_" + type), true);
    jcmp.ui.CallEvent("PlaySound", "cancel");
    request = null;
}


function AcceptRequest() {
	let returned = true;
	let result = jcmp.events.Call("AcceptedRequest", request.id, request.sender.networkId);

	for (let r in result) {
		if (result[r] === false)
			returned = false;
	}

    jcmp.events.CallRemote(returned ? "AcceptedRequest" : "DeclinedRequest", request.id, request.sender.networkId);

    jcmp.notifications.updatePrompt(false, request.text + "<hr>" + jcmp.languages.get("REQUEST_ACCEPTED"), true);
    jcmp.ui.CallEvent("PlaySound", "accept");
}


function RemoveRequest() {
	jcmp.notifications.clearPrompt();
	request = null;
}


jcmp.events.AddRemoteCallable("PlayerDisconnected", function(networkId) {
	if (!request)
		return;

	if (networkId == request.sender.networkId)
		DeclineRequest(2);
});


jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
	if (!request)
		return;

	if (allowed) {
		if (key == 112)
			AcceptRequest();
		else if (key == 113)
			DeclineRequest(1);
	}
});
