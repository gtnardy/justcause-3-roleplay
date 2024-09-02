const ui = new WebUIWindow('soundtrack-ui', `package://soundtrack/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));

var currentPlaying = null;
var tabPressed = false;


jcmp.events.Add("LocalPlayerFullLoaded", function() {
    if (currentPlaying === "calm" || currentPlaying === "tense" || currentPlaying === "action" || currentPlaying === "common")
        return;
        
    playActualState(true);
});


jcmp.events.Add("LocalPlayerEnterSite", function(site) {
    if ((currentPlaying !== "idle" && currentPlaying !== "air") || currentPlaying === "common")
        return;

    if (site.idSiteType == 10)
        playSoundtrack("calm");
    else if (site.idSiteType == 11) {
        if (jcmp.localPlayerData.sites[11] && jcmp.militaryInstallations[jcmp.localPlayerData.sites[11]]) {
            let percent = jcmp.militaryInstallations[jcmp.localPlayerData.sites[11].id].percentDomination;
            if (percent != 100 && (jcmp.localPlayerData.idJob === 13 || jcmp.localPlayerData.idJob === 14 || jcmp.localPlayerData.idJob === 7))
                playSoundtrack("action");
            else
                playSoundtrack("tense");
        }
    }
});


jcmp.events.Add("LocalPlayerExitSite", function(site) {
    if ((site.idSiteType == 10 || site.idSiteType == 11) && (currentPlaying === "calm" || currentPlaying === "tense" || currentPlaying === "action"))
        playSoundtrack("idle");
});


function playSoundtrack(group, defSprite) {
    ui.CallEvent("PlaySoundtrack", group, defSprite);
    currentPlaying = group;
}


jcmp.events.Add('LocalPlayerVehicleExited', function(vehicle, seatIndex) {
    muteSoundtrack(false);
});


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index === "soundtrackVolume") {
        volumeSoundtrack(value);
        return;
    }

	if (index === "racing") {
        if (value === 1)
            playSoundtrack("common", "medici-theme");
        else if (value === 2)
            playSoundtrack("challenge");
        else if (!value)
            playActualState(false);
        return;
    }

	if (index === "testingDriving") {
        if (value == 2)
            playSoundtrack("challenge");
        else if (!value)
            playActualState(false);
        return;
    }

	if (index === "creatingCharacter") {
        if (value == 2)
            playSoundtrack("common", "medici-theme");
        else if (!value)
            playActualState(true);
        return;
    }

	if (index === "working" && (jcmp.localPlayerData.idJob == 17 || jcmp.localPlayerData.idJob == 2)) {
        if (value != false)
            playSoundtrack("challenge");
        else
            playActualState(false);
        return;
    }

    if (index === "lastRadio" && jcmp.localPlayerData.vehicle) {
        muteSoundtrack(value != 0);
        return;
    }
});


function playActualState(first) {
    if (jcmp.localPlayerData.sites[10])
        playSoundtrack("calm");
    else if (jcmp.localPlayerData.sites[11]) {
        let percent = Math.abs(jcmp.militaryInstallations[jcmp.localPlayerData.sites[11].id].percentDomination);
        if (percent != 100 && (jcmp.localPlayerData.idJob === 13 || jcmp.localPlayerData.idJob === 14 || jcmp.localPlayerData.idJob === 7))
            playSoundtrack("action");
        else
            playSoundtrack("tense");
    } else
        playSoundtrack("idle", first ? "standing1" : false);
}


function muteSoundtrack(bool) {
    if (!bool && jcmp.localPlayerData.soundtrackVolume && (!jcmp.localPlayerData.vehicle || (jcmp.localPlayerData.vehicle && jcmp.localPlayerData.lastRadio == 0))) {
        ui.CallEvent("MuteSoundtrack", false);
    } 
    else {
        ui.CallEvent("MuteSoundtrack", true);
    }
}


function volumeSoundtrack(volume) {
    ui.CallEvent("VolumeSoundtrack", volume);
}


jcmp.ui.AddEvent('TickFiveSeconds', function() {
	if (currentPlaying === "idle") {
        if ([498269113, 2681816465, 2316017636, 837736014, 2105903187, 2226652698, 3113941220].indexOf(jcmp.localPlayer.baseState) != -1) {
            playSoundtrack("air");
        } else if (currentPlaying === "air") {
            playActualState(false);
        }
    }   
});


jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
    if (arrayMenus.isChatOpened || arrayMenus.isInputTextOpened)
        return;

    if (tabPressed && (key === 27 || key === 17 || key === 9)) {
        tabPressed = false;
        muteSoundtrack(tabPressed);
    } else if (key === 9) {
        tabPressed = true;  
        muteSoundtrack(tabPressed);
    }
});