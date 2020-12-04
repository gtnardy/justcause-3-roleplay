'use strict';

// server-side have the spawn position
const dealershipsData = {
    [20]: { // Legendary Motorsport
        image: "legendary-motosport.jpg",
        vehicles: [
            1222118188, // Windhund 4
            3535039305, // Kerner Serpente R
            3080666513, // '13 Vigueur
            3203194893, // Mugello Raffinati Vitesse
            1192327012, // Mugello Vistosa
            4286768685, // Mugello Quipozza F
            4225384683, // Verdeleon 3
            2336539742, // Mugello Farina Duo
            160481253, // Stria Ghepardo 3s
            4129388734, // Incendiario Monster Truck
        ],
    },
    [21]: { // Pedal and Metal Cycles
        image: "pandmcycles.jpg",
        vehicles: [
            2160521137, // Geschwind V3000
            2966292608, // Custom Geschwind
            2865733197, // Mugello Furia Ms-316
            3510706963, // Mv402
            1671177981, // '69 Stria Sussurro
            2395818479, // Stria Risata
            717463248, // Stria Giovanni
            3300933530, // Vintage Stria M7
            2235620315, // Pavouk U-15
            1863812216, // Autostraad Kletterer 300
            4216479759, // Custom Kletterer 300
            // 300281319, // Pavouk U-15 Military
            // 2718282527, // Pavouk U-15 Rebel
        ]
    },
    [22]: { // Southern Medici Super Autos
        image: "southernmedicisuperautos.jpg",
        vehicles: [
            1684130889, // Weimaraner W3
            1567828325, // '63 Autostraad Weltbus
            1683768425, // Autostraad D700
            3843099743, // Autostraad D90
            911076462, //'05 Charmant
            857303830, // Stria Cucciola
            1642334787, // Stria Switzo
            2662510920, // Stria Kavala
            2627875542, // Stria Obrero
            943568602, // Stria Rustico
            695483605, // Stria Infimo S
            2455749603, // Stria Gioco
            3844689418, // Stria Carera Standard
            1629307753, // Stria Carera G
            1733269748, // Stria Toro
            // 2913800493, // Urga Ogar 7 V8 Military
            // 669313043, // Urga Ogar 7 V8 Rebel
            // 2781420465, // Urga Fura 570 Military
            // 2079723022, // Urga Fura 570 Rebel
            // 1344393073, // Stria Facocero
            // 3145488079, // Stria Facocero Rebel
        ],
    }
};


jcmp.events.Add("CustomMenuPressed_dealership-custom-menu", function(args){
	if (!(jcmp.localPlayerData.sites[20] || jcmp.localPlayerData.sites[21] || jcmp.localPlayerData.sites[22]))
		return;
	
    Buy(args.value.modelHash, args.value.idSite);
});


function Buy(modelHash, idSite) {
	if (jcmp.localPlayerData.money < jcmp.vehiclesData[modelHash].price) {
		jcmp.events.Call('UpdateCustomMenuItem', "DEALERSHIP_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}
	
    jcmp.events.CallRemote('BuyDealership', modelHash, idSite);
    jcmp.events.Call("CloseCustomMenu");
}


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (!(idSite == 20 || idSite == 21 || idSite == 22)) return;

	let data = dealershipsData[idSite];
	
	let menu = {
		id: "dealership-custom-menu",
		freezes: true,
		header: {img: data.image},
		body: {
			id: "DEALERSHIP_LIST",
			subheader: {txt: jcmp.languages.get("DEALERSHIP_SUBHEADER"), count: true},
			items: [],
		}
    };
    
	for (let v = data.vehicles.length - 1; v >= 0; v--) {
        let vehicleModelhash = data.vehicles[v]
        let vehicleData = jcmp.vehiclesData[vehicleModelhash];
		let item = {
			id: "DEALERSHIP_BUY_" + v,
			txt: vehicleData.name,
			subTxt: "$ " + Number(vehicleData.price).toLocaleString("en"),
            descriptionList: [
                {txt: jcmp.languages.get("DEALERSHIP_BUY_IT"), subTxt: ""},
            ],
			description: `<img class="center" src="http://justcauserp.com/images/vehicles/${vehicleData.model_name}.png" />`,
            value: {modelHash: vehicleModelhash, idSite: idSite},
		};

		menu.body.items.push(item);
	}

	jcmp.events.Call('OpenCustomMenu', menu, true);
});