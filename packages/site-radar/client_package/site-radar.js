'use strict';


jcmp.events.Add('LocalPlayerEnterSite', function(site) {
    
    if (site.idSiteType != 18 && site.idSiteType != 19)
        return;
    
    if (!jcmp.localPlayerData.vehicle)
        return;

    if (jcmp.localPlayerData.racing)
        return;

    if (jcmp.localPlayerData.seat != 0)
        return;

    if (jcmp.vehiclesData[jcmp.localPlayerData.vehicle.modelHash].type != 1)
        return;

    let limitVelocity = 80;
    
    if (site.idSiteType == 19)
        limitVelocity = 140;

    let playerVelocity = Math.floor(jcmp.localPlayerData.vehicle.linearVelocity.length * 3.6);

    if (playerVelocity > limitVelocity) {
        if (jcmp.localPlayerData.level >= 5) {
            if (jcmp.localPlayerData.vehicle.modelHash != 2030470101 && jcmp.localPlayerData.vehicle.modelHash != 4044104901)
                jcmp.events.Call("AddWantedStar", 4);
        } else {
            jcmp.notifications.add(jcmp.languages.get("SPEED_RADAR_LABEL"), jcmp.languages.get("SPEED_RADAR_EXCEEDED_LOWLEVEL"), "speed-radar");
        }
            
        jcmp.ui.CallEvent("PlaySound", "camera-shutter");

        playerVelocity = "[#e74c3c]" + playerVelocity;
    } else if (playerVelocity > limitVelocity - limitVelocity * 0.2) {
        playerVelocity = "[#f1c40f]" + playerVelocity;
    } else {
        playerVelocity = "[#2ecc71]" + playerVelocity;
    }

    jcmp.notifications.add(jcmp.languages.get("SPEED_RADAR_LABEL"), jcmp.languages.get("SPEED_RADAR_REPORT", [limitVelocity, playerVelocity]), "speed-radar");
});