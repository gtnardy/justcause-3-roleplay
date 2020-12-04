'use strict';

jcmp.events.Add("GetJobInteractionMenu", function() {
    if (jcmp.localPlayerData.idJob != 15)
        return false;
    
	let items = [];
	
	let returnsServices = jcmp.events.Call("GetServicesCalls");

	for (let e = returnsServices.length - 1; e >= 0; e--) {
		if (returnsServices[e])
			items.push(returnsServices[e]);
	}

    return items;
});