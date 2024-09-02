'use strict';


jcmp.events.AddRemoteCallable("DrivingTestLeave", function(player) {
    DrivingTestLeave(player);
});


jcmp.events.AddRemoteCallable("DrivingTestStart", function(player, value, startPosition, startRotation, vehicleHash) {
	if (player.money < value)
        return;
        
    jcmp.events.Call("SetPlayerMoney", player, -value);
    player.respawnPosition = player.position;
    player.saveValue("position", player.position);

    let position = jcmp.utils.vector3.parse(startPosition);
    player.drivingTestVehicle = new Vehicle(Number(vehicleHash), position, jcmp.utils.vector3.parse(startRotation));

    player.dimension = player.networkId;

    player.testingDriving = true;
    player.position = position;
    player.invulnerable = true;

    player.timeoutDrivingSchool = setTimeout(function(p){
        p.drivingTestVehicle.dimension = p.networkId;
        p.drivingTestVehicle.SetOccupant(0, p);
        jcmp.events.CallRemote("DrivingTestStarted", player, player.drivingTestVehicle.health, player.drivingTestVehicle.networkId);
    }, 1500, player);
});


jcmp.events.AddRemoteCallable("DrivingTestCompleted", function(player, id) {
    player.setValue(id, true);
    DrivingTestLeave(player);
});


function DrivingTestLeave(player) {
    player.Respawn();
    player.invulnerable = false;
    player.dimension = 0;
    delete player.testingDriving;
    if (typeof player.drivingTestVehicle !== 'undefined') {
        jcmp.events.Call("DestroyVehicle", player.drivingTestVehicle);
        player.drivingTestVehicle = false;
    }
}


jcmp.events.Add('PlayerDestroyedAfter', function(player) {
    if (typeof player.drivingTestVehicle !== 'undefined')
        jcmp.events.Call("DestroyVehicle", player.drivingTestVehicle);
});