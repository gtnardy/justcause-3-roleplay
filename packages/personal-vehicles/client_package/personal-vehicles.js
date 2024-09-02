'use strict';

jcmp.playerVehicles = {};
var streamableVehicles = [];


jcmp.events.AddRemoteCallable("PlayerVehicleUpdated", function(playerNetworkId, attribute, value) {
    if (!jcmp.playerVehicles[playerNetworkId])
        return;
    
    jcmp.playerVehicles[playerNetworkId].vehicle[attribute] = value;
    if (attribute == "plate") {
        jcmp.playerVehicles[playerNetworkId].nametag = null;
    }
});


jcmp.events.AddRemoteCallable("LoadPlayerVehicles", function(playerVehicles) {
    playerVehicles = JSON.parse(playerVehicles);
    for (let p = playerVehicles.length - 1; p >=0; p--) {

        jcmp.playerVehicles[playerVehicles[p].owner.id] = playerVehicles[p];
    }
});


jcmp.events.AddRemoteCallable("PlayerVehicleCreated", function(data) {
    data = JSON.parse(data);

    jcmp.playerVehicles[data.owner.id] = data;
});


jcmp.events.AddRemoteCallable("PlayerVehicleDestroyed", function(playerNetworkId) {
    if (!jcmp.playerVehicles[playerNetworkId])
        return;
    
    jcmp.playerVehicles[playerNetworkId].destroyed = true;

    delete jcmp.playerVehicles[playerNetworkId];
});


jcmp.ui.AddEvent("TickFiveSeconds", function() {
    let playerCameraPosition = jcmp.localPlayer.camera.position;

    streamableVehicles = [];
    for (let pv in jcmp.playerVehicles) {
        let playerVehicle = jcmp.playerVehicles[pv];

        if (!playerVehicle.vehicle.networkVehicle) {
            let found = false;
            for (let v = jcmp.vehicles.length - 1; v >= 0; v--) {
                if (jcmp.vehicles[v].networkId == playerVehicle.vehicle.networkId) {
                    playerVehicle.vehicle.networkVehicle = jcmp.vehicles[v];
                    found = true;
                    break;
                }
            }
            
            if (!found)
                continue;
        }

        let distance = jcmp.utils.vector3.distance(playerCameraPosition, playerVehicle.vehicle.networkVehicle.position);

        if (distance <= 70)
            streamableVehicles.push(playerVehicle);
    }
});


const headPosition = new Vector3f(0, 0.5, 0);
const white = new RGBA(255, 255, 255);
const shadow = new Vector3f(0.7, 0.7, 0);
const black = new RGBA(0, 0, 0, 255);

jcmp.events.Add('LocalPlayerFullLoaded', function() {
    jcmp.events.Add('Render', (scriptingRenderer) => {

        for (let p = streamableVehicles.length - 1; p >= 0; p--) {
            let vehicleData = streamableVehicles[p];

            if (!vehicleData || !vehicleData.vehicle || vehicleData.destroyed || !vehicleData.vehicle.networkVehicle)
                continue;
                    
            if (Object.keys(vehicleData.vehicle.networkVehicle).length == 0 || !vehicleData.vehicle.networkVehicle.position) {
                delete vehicleData.vehicle.networkVehicle;
                streamableVehicles.splice(p, 1);
                continue;
            }

            let matrix = vehicleData.vehicle.networkVehicle.GetRenderTransform(scriptingRenderer.dtf);

            // ver se posicao do veiculo existe quando estou longe dele
            if (!vehicleData.nametag) {
                vehicleData.nametag = {
                    textSize: scriptingRenderer.MeasureText(vehicleData.vehicle.plate, 16, "Arial")
                };
            }

            let vector2df = scriptingRenderer.WorldToScreen(matrix.position.add(headPosition));
            
            if (vector2df.x <= 1 || vector2df.y <= 1)
                continue;

            let v3 = new Vector3f(vector2df.x - vehicleData.nametag.textSize.x / 2, vector2df.y, 0.5);

            scriptingRenderer.DrawText(vehicleData.vehicle.plate, v3.add(shadow), vehicleData.nametag.textSize, black, 16, "Arial");
            scriptingRenderer.DrawText(vehicleData.vehicle.plate, v3, vehicleData.nametag.textSize, white, 16, "Arial");
        }
    });
});