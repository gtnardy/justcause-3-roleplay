

jcmp.events.AddRemoteCallable("RequestRemote", function(player, id, requestedId, textLabel, textParams) {
	let requested = jcmp.utils.player.getById(requestedId);

	if (!requested)
		return;
	
	jcmp.events.CallRemote("AddRemoteRequest", requested, id, player.networkId, player.nname, textLabel, textParams);
});


jcmp.events.AddRemoteCallable("DeclinedRequest", function(player, id, senderId, type) {
	
	let sender = jcmp.utils.player.getById(senderId);

	if (!sender)
		return;
	
	jcmp.events.CallRemote("DeclinedRemoteRequest", sender, id, player.networkId, player.nname, type || 3);
});


jcmp.events.AddRemoteCallable("AcceptedRequest", function(player, id, senderId) {
	let sender = jcmp.utils.player.getById(senderId);

    jcmp.console.print("AcceptedRequest: " + player.nname + " " + id + " " + senderId);
	if (!sender)
		return;
    
    jcmp.console.print("sender: " + sender.nname);

	jcmp.events.CallRemote("AcceptedRemoteRequest", sender, id, player.networkId, player.nname);
});


jcmp.events.AddRemoteCallable("RemoteRequestBusy", function(player, id, senderId) {
	
	let sender = jcmp.utils.player.getById(senderId);

	if (!sender)
		return;
	
	jcmp.events.CallRemote("RemoteRequestBusy", sender);
});