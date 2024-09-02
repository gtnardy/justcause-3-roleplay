'use strict';


jcmp.licenses = [];
jcmp.licenses[4] = {id: "licenseCar", price: 1000};
jcmp.licenses[6] = {id: "licenseBike", price: 1500};
jcmp.licenses[8] = {id: "licenseHeli", price: 2000};
jcmp.licenses[9] = {id: "licenseSea", price: 3000};
jcmp.licenses[16] = {id: "licensePlane", price: 4000};


jcmp.events.Add('LocalPlayerVehicleExited', function(vehicle, seatIndex) {
	if (seatIndex != 0) 
		return;
	
	jcmp.events.Call("FreeWantedStar", 3);
});