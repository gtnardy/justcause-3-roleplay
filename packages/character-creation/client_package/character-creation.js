
jcmp.events.Add("CustomMenuPressed_character-creation-custom-menu", function(args) {
	if (args.itemId == "CHARACTERCREATOR_SAVE") {
		jcmp.events.Call("SetInputText", "CHARACTERCREATOR_NAME", jcmp.languages.get("CHARACTERCREATOR_NEW_NAME"), "", 20, true, true);
	}
});


jcmp.events.Add("PreLoadingScreenComplete", function() {
    if (!jcmp.localPlayerData.creatingCharacter)
        return;
    
    jcmp.events.Call("SetLocalPlayerValue", "creatingCharacter", 2);

    jcmp.localPlayer.rotation = new Vector3f(0, 0, 0);

    let rotation = jcmp.utils.vector3.rotateY(jcmp.localPlayer.rotation, Math.PI);
    jcmp.localPlayerData.loadingCompleteCameraRotation = rotation;
    
    rotation = jcmp.utils.vector3.rotateY(rotation, -0.3);
    
    let cameraPosition = jcmp.utils.vector3.moveAngle(jcmp.localPlayer.position, rotation.y, 2);
    cameraPosition.y += 1.6;

    jcmp.localPlayerData.loadingCompleteCameraPosition = cameraPosition;
});


jcmp.events.Add("InputTextSubmit", function(id, value) {
	if (id != "CHARACTERCREATOR_NAME")
		return;
	
	jcmp.events.CallRemote("SaveAttribute", "nname", value);
	jcmp.events.CallRemote("NewPlayer");
	jcmp.localPlayerData.nname = value;
	jcmp.events.Call("SetControlsEnabled", true);
	jcmp.events.Call("SetLocalPlayerValue", "creatingCharacter", false);
	jcmp.events.Call("HideHUD", false, false, false, false);
    jcmp.ui.CallEvent("ActiveHelpPanel", true);
    jcmp.localPlayer.camera.attachedToPlayer = true;
});


jcmp.events.AddRemoteCallable("LocalPlayerLoadedData", function(firstTime, hasName) {
	if (!hasName)
		return;

	jcmp.events.Call("SetLocalPlayerValue", "creatingCharacter", 1);
	jcmp.localPlayerData.firstTimeTutorial = true;

	let menu = {
		key: -1,
		id: "character-creation-custom-menu",
		header: {title: "Character Creator", color: "#3498db", font: "'Norican', cursive"},
		body: {
			id: "CHARACTER_LIST",
			subheader: {txt: jcmp.languages.get("CHARACTERCREATOR_NEW_CHARACTER")},
			items: [
				{
					txt: jcmp.languages.get("CHARACTERCREATOR_SEX"),
					description: jcmp.languages.get("CHARACTERCREATOR_SEX_DESCRIPTION"),
					innerValues: [
						{txt: jcmp.languages.get("CHARACTERCREATOR_MALE"), value: 1},
						{txt: jcmp.languages.get("CHARACTERCREATOR_FEMALE"), value: 2},
					]
				},
				{
					txt: jcmp.languages.get("CHARACTERCREATOR_APPEARANCE"),
					description: "Cooming soon...",
					disabled: true,
				},
				{
					txt: jcmp.languages.get("CHARACTERCREATOR_STATS"),
					description: "Cooming soon...",
					disabled: true,
				},
				{
					id: "CHARACTERCREATOR_SAVE",
					txt: jcmp.languages.get("CHARACTERCREATOR_SAVE"),
					description: jcmp.languages.get("CHARACTERCREATOR_SAVE_DESCRIPTION"),
					color: "rgba(24, 66, 117, 0.8)",
					special: "close",
				},
			],
		}
	};

	jcmp.events.Call("HideHUD", true, true, true, true);
	jcmp.events.Call('OpenCustomMenu', menu, true);
});
