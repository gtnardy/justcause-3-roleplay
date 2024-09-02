'use strict';

// type: 1 Land, 2 Sea, 3 Air
// class:
// 1 Sports
// 2 Supercars
// 3 Sports Classic
// 4 Modern
// 5 Classics
// 6 Off-Road
// 7 F1
// 8 Motorcycle
// 9 ATV
// 10 Van
// 11 Monster Truck
// 12 Heavy
// 13 Tank
// 14 The Rocket
// 15 Sail Boat
// 16 Jetskis
// 17 Motorboats
// 18 Fishboats
// 19 Rubber Ducky

jcmp.vehiclesData = {
	"2913800493": {name: "Urga Ogar 7 V8 Military", faction: 1, type: 1, class: 6, model_name: "v0604_car_urga_buggy_military_01", price: 42000},
	"28454791": {name: "Urga Ogar 7 V8 Military Z80", faction: 1, type: 1, class: 6, z80: true, model_name: "v0604_car_urga_buggy_military_z80",},
	"4200435076": {name: "Autostraad Reinsender 7", type: 1, class: 12, model_name: "v0011_car_autostraad_articulatedtruck_commercial_01", price: 53000},
	"660992745": {name: "Cs Powerrun 77 Rebel", faction: -1, type: 2, model_name: "v1200_boat_capstone_heavypatrol_rebel_01",},
	"448735752": {name: "Carmen Albatross Rebel", faction: -1, type: 3, model_name: "v4800_plane_brothers_vintagefighter_rebel_01",},
	"1634346906": {name: "Custode 29 Rebel", faction: -1, type: 2, model_name: "v1704_boat_na_lightpatrol_rebel_01",},
	"1863812216": {name: "Autostraad Kletterer 300", type: 1, class: 9, model_name: "v0012_car_autostraad_atv_civilian_01", price: 55000},
	"510797552": {name: "Autostraad Kletterer 300 Z80", type: 1, class: 9, z80: true, model_name: "v0012_car_autostraad_atv_civilian_01_z80",},
	"3145488079": {name: "Stria Facocero Rebel", faction: -1, type: 1, class: 6, model_name: "v0504_car_solar_technicaljeep_rebel_01", price: 35000},
	"1683768425": {name: "Autostraad D700", type: 1, class: 4, model_name: "v0008_car_autostraad_modernsportssaloon_civilian_01", price: 35000},
	"3276262971": {name: "Urga Hroch Military", faction: 1, type: 2, model_name: "v1602_boat_urga_transport_military_01",},
	"1951838228": {name: "Cs7 Thunderhawk Military", faction: 1, type: 3, model_name: "v4202_plane_capstone_fighterjet_military_01",},
	"2627875542": {name: "Stria Obrero", type: 1, class: 12, model_name: "v0505_car_solar_oldtruck_commercial_01", price: 32000},
	"530733049": {name: "Brise 32", type: 2, class: 15, model_name: "v1302_boat_kensington_sailboat_civilian_01",},
	"1192327012": {name: "Mugello Vistosa", type: 1, class: 2, model_name: "v0401_car_mugello_racingsupercar_civilian_01", price: 320000},
	"2204830311": {name: "U41 Ptakojester Military", faction: 1, type: 3, model_name: "v4603_plane_urga_cargotransport_military_01",},
	"1671177981": {name: "'69 Stria Sussurro", type: 1, class: 8, model_name: "v3500_bike_solar_oldmoped_civilian_01", price: 8000},
	"2840535164": {name: "Cs Odjur Military", faction: 1, type: 1, class: 13, model_name: "v0201_car_capstone_mediumtank_military_01",},
	"943568602": {name: "Stria Rustico", type: 1, class: 12, model_name: "v0506_car_solar_oldtractor_civilian_01", price: 33000},
	"3100982204": {name: "Stria Rustico Z80", type: 1, class: 12, z80: true, model_name: "v0506_car_solar_oldtractor_civilian_01",},
	"4029907821": {name: "Cs Navajo Rebel", faction: -1, type: 3, model_name: "v2200_helicopter_capstone_assault_rebel_01",},
	"867451438": {name: "Stria Pw 220 R-gt", type: 2, class: 16, model_name: "v1500_boat_solar_jetski_civilian_01",},
	"2662510920": {name: "Stria Kavala", type: 1, class: 4, model_name: "v0503_car_solar_modernsuv_civilian_01", price: 55000},
	"3535039305": {name: "Kerner Serpente R", type: 1, class: 1, model_name: "v0300_car_kensington_sportsmuscle_civilian_01", price: 40000},
	"3619392854": {name: "News Chopper", type: 3, model_name: "v2102_helicopter_eubus_utility_commercial_news",},
	"4038562464": {name: "Urga Bkolos 2100 Rebel", faction: -1, type: 1, class: 13, model_name: "v0603_car_urga_smalltank_rebel_01",},
	"3478690106": {name: "Urga Postolka", type: 3, model_name: "v2602_helicopter_urga_lightassault_blackhand_01",},
	"1222118188": {name: "Windhund 4", type: 1, class: 1, model_name: "v0003_car_autostraad_racinghothatch_civilian_01", price: 39000},
	"3406930663": {name: "Windhund 4 Z80", type: 1, class: 1, z80: true, model_name: "v0003_car_autostraad_racinghothatch_civilian_z80",},
	"2455749603": {name: "Stria Gioco", type: 1, class: 4, model_name: "v0509_car_solar_modernmini_civilian_01", price: 30000},
	"506564449": {name: "Urga Postolka Rebel", faction: -1, type: 3, model_name: "v2602_helicopter_urga_lightassault_rebel_01",},
	"1182346887": {name: "Golden Urga Mstitel", type: 3, model_name: "v2604_helicopter_urga_advancedassault_signature_shielded",},
	"2491278791": {name: "U-7 Dravec Rebel", faction: -1, type: 3, model_name: "v4602_plane_urga_fighterbomber_rebel_01",},
	"1734594165": {name: "Pescespada Ss", type: 2, class: 17, model_name: "v1401_boat_mugello_racingboat_civilian_01",},
	"1629307753": {name: "Stria Carera G", type: 1, class: 5, model_name: "v0513_car_solar_oldfourdoorhatch_civilian_01", price: 15000},
	"2966292608": {name: "Custom Geschwind", type: 1, class: 8, model_name: "v3000_bike_autostraad_trials_signature_01", price: 11500},
	"669313043": {name: "Urga Ogar 7 V8 Rebel", faction: -1, type: 1, class: 6, model_name: "v0604_car_urga_buggy_rebel_01", price: 42000},
	"695483605": {name: "Stria Infimo S", type: 1, class: 5, model_name: "v0508_car_solar_oldcompact_civilian_01", price: 12000},
	"160481253": {name: "Stria Ghepardo 3s", type: 1, class: 1, model_name: "v0510_car_solar_modernroadster_civilian_01", price: 82000},
	"1207218883": {name: "Imperator Bavarium Tank Rebel", faction: -1, type: 1, class: 13, model_name: "v0202_car_capstone_bavariumtank_rebel_01",},
	"857303830": {name: "Stria Cucciola", type: 1, class: 5, model_name: "v0500_car_solar_oldmini_civilian_01", price: 20000},
	"1442821020": {name: "Squalo X7", type: 2, class: 17, model_name: "v1400_boat_mugello_spyspeedboat_civilian_01",},
	"2336539742": {name: "Mugello Farina Duo", type: 1, class: 7, model_name: "v0405_car_mugello_moderncircuitracer_civilian_01", price: 600000},
	"3998318206": {name: "Rubber Ducky", type: 2, class: 19, model_name: "v1717_boat_na_duck_civilian_01",},
	"2865733197": {name: "Mugello Furia Ms-316", type: 1, class: 8, model_name: "v3401_bike_mugello_modernsport_civilian_01", price: 20000},
	"911076462": {name: "'05 Charmant", type: 1, class: 4, model_name: "v0302_car_kensington_modernlimo_civilian_01", price: 90000},
	"788638133": {name: "Urga Racek Military", faction: 1, type: 3, model_name: "v2603_helicopter_urga_seascout_military_01",},
	"1955404280": {name: "Urga Hrom D Rebel", faction: -1, type: 3, model_name: "v2601_helicopter_urga_heavyassault_rebel_01",},
	"1412710783": {name: "Urga Hrom D Military", faction: 1, type: 3, model_name: "v2601_helicopter_urga_heavyassault_military_01",},
	"3300933530": {name: "Vintage Stria M7", type: 1, class: 8, model_name: "v3503_bike_solar_oldroad_civilian_01", price: 36000},
	"2758160814": {name: "Cs Odjur Rebel", faction: -1, type: 1, class: 13, model_name: "v0201_car_capstone_mediumtank_rebel_01",},
	"2887741045": {name: "Weimaraner Z80", type: 1, class: 6, z80: true, model_name: "v0000_car_autostraad_oldjeep_civilian_z80",},
	"3672040481": {name: "Custode 29 Military", faction: 1, type: 2, model_name: "v1704_boat_na_lightpatrol_military_01",},
	"3843099743": {name: "Autostraad D90", type: 1, class: 4, model_name: "v0009_car_autostraad_modernsaloon_civilian_01", price: 38000},
	"249846758": {name: "Cs Comet Rebel", faction: -1, type: 3, model_name: "v2201_helicopter_capstone_heavytroop_rebel_01",},
	"1181146141": {name: "U41 Ptakojester Rebel", faction: -1, type: 3, model_name: "v4603_plane_urga_cargotransport_rebel_01",},
	"121246434": {name: "Weimaraner Military Z80", faction: 1, type: 1, class: 6, z80: true, model_name: "v0000_car_autostraad_oldjeep_military_z80",},
	"2235620315": {name: "Pavouk U-15", type: 1, class: 8, model_name: "v3600_bike_urga_combatdirt_blackhand_01", price: 32000},
	"1684130889": {name: "Weimaraner W3", type: 1, class: 6, model_name: "v0000_car_autostraad_oldjeep_civilian_01", price: 38000},
	"4044104901": {name: "Stria Joia Old", type: 1, class: 4, model_name: "v0502_car_solar_modernsedan_civic_police_01",},
	"2160521137": {name: "Geschwind V3000", type: 1, class: 8, model_name: "v3000_bike_autostraad_trials_civilian_01", price: 11000},
	"936369891": {name: "Urga Postolka Military", faction: 1, type: 3, model_name: "v2602_helicopter_urga_lightassault_military_01",},
	"3386037743": {name: "U41 Ptakojester", type: 3, model_name: "v4603_plane_urga_cargotransport_blackhand_01",},
	"2631053328": {name: "Cs Baltdjur Military", faction: 1, type: 1, class: 13, model_name: "v0200_car_capstone_apc_military_01",},
	"1967374600": {name: "Whaleshark", type: 2, class: 18, model_name: "v1705_boat_na_mediumoldfishing_civilian_01",},
	"1632385059": {name: "Urga Racek Rebel", faction: -1, type: 3, model_name: "v2603_helicopter_urga_seascout_rebel_01",},
	"274180142": {name: "Weimaraner Rebel", faction: -1, type: 1, class: 6, model_name: "v0000_car_autostraad_oldjeep_rebel_01", price: 35000},
	"776016794": {name: "Nashorn 6100", type: 1, class: 12, model_name: "v0005_car_autostraad_minetruck_commercial_01",},
	"4286768685": {name: "Mugello Quipozza F", type: 1, class: 3, model_name: "v0402_car_mugello_vintagesuper_civilian_01", price: 83000},
	"7144193": {name: "Mugello Quipozza F Z80", type: 1, class: 3, z80: true, model_name: "v0402_car_mugello_vintagesuper_civilian_z80_01",},
	"1344393073": {name: "Stria Facocero", type: 1, class: 6, model_name: "v0504_car_solar_technicaljeep_militia_01", price: 32000},
	"1251142405": {name: "Urga Hroch", type: 2, model_name: "v1602_boat_urga_transport_blackhand_01",},
	"3874188721": {name: "Stria Obrero Military", faction: 1, type: 1, class: 12, model_name: "v0505_car_solar_oldtruck_military_01", price: 32000},
	"3947727649": {name: "Urga Mstitel Rebel", faction: -1, type: 3, model_name: "v2604_helicopter_urga_advancedassault_rebel_01",},
	"719430386": {name: "Citispeed Eco 75", type: 1, class: 12, model_name: "v0006_car_autostraad_modernbus_commercial_01",},
	"2474676614": {name: "Rebel Corvette Rebel", faction: -1, type: 2, model_name: "v1202_boat_capstone_corvette_rebel_01",},
	"3910701466": {name: "Stria Obrero Rebel", faction: -1, type: 1, class: 12, model_name: "v0505_car_solar_oldtruck_rebel_01", price: 32000},
	"1350246166": {name: "Cs7 Thunderhawk Rebel", faction: -1, type: 3, model_name: "v4202_plane_capstone_fighterjet_rebel_01",},
	"1567828325": {name: "'63 Autostraad Weltbus", type: 1, class: 5, model_name: "v0002_car_autostraad_oldcampervan_civilian_01", price: 14000},
	"1550496746": {name: "'63 Autostraad Weltbus Z80", type: 1, class: 5, z80: true, model_name: "v0002_car_autostraad_oldcampervan_civilian_z80",},
	"709014260": {name: "Stria Campania 115", type: 1, class: 12, model_name: "v0507_car_solar_oldbus_commercial_01",},
	"3760096448": {name: "Stria Campania 115 Z80", type: 1, class: 12, z80: true, model_name: "v0507_car_solar_oldbus_commercial_z80",},
	"3777100791": {name: "Urga Szturm 63a", type: 1, class: 13, model_name: "v0600_car_urga_armoredjeep_blackhand_01",},
	"970032925": {name: "Urga Bkolos 2100 Military", faction: 1, type: 1, class: 13, model_name: "v0603_car_urga_smalltank_military_01",},
	"2671062828": {name: "Cs Comet Military", faction: 1, type: 3, model_name: "v2201_helicopter_capstone_heavytroop_military_01",},
	"2395818479": {name: "Stria Risata", type: 1, class: 8, model_name: "v3501_bike_solar_modernmoped_civilian_01", price: 16000},
	"596249749": {name: "Urga U17 Akrobat", type: 3, model_name: "v4600_plane_urga_privatepropeller_civilian_01",},
	"1681634829": {name: "Custode 29", type: 2, class: 17, model_name: "v1704_boat_na_lightpatrol_blackhand_01",},
	"2781420465": {name: "Urga Fura 570 Military", faction: 1, type: 1, class: 12, model_name: "v0602_car_urga_armoredtransport_military_01", price: 48000},
	"2647868720": {name: "Stria Ghibli 3", type: 3, model_name: "v4500_plane_solar_smallfloatprop_civilian_01",},
	"3510706963": {name: "Mv402", type: 1, class: 8, model_name: "v3402_bike_mugello_modernsuper_civilian_01", price: 25000},
	"3203194893": {name: "Mugello Raffinati Vitesse", type: 1, class: 3, model_name: "v0400_car_mugello_vintagesports_civilian_01", price: 90000},
	"369388473": {name: "Mugello Raffinati Vitesse Z80", type: 1, class: 3, z80: true, model_name: "v0400_car_mugello_vintagesports_civilian_z80",},
	"3332358986": {name: "Dame De La Mer 99", type: 2, class: 17, model_name: "v1300_boat_kensington_motoryacht_civilian_01",},
	"2718282527": {name: "Pavouk U-15 Rebel", faction: -1, type: 1, class: 8, model_name: "v3600_bike_urga_combatdirt_rebel_01", price: 18000},
	"4145800282": {name: "Cs Navajo Military", faction: 1, type: 3, model_name: "v2200_helicopter_capstone_assault_military_01",},
	"2834809898": {name: "Urga Mstitel Military", faction: 1, type: 3, model_name: "v2604_helicopter_urga_advancedassault_military_01",},
	"3735240277": {name: "Imperator Bavarium Tank Military", faction: 1, type: 1, class: 13, model_name: "v0202_car_capstone_bavariumtank_military_01",},
	"3844689418": {name: "Stria Carera Standard", type: 1, class: 5, model_name: "v0512_car_solar_oldtwodoorhatch_civilian_01", price: 15000},
	"2079723022": {name: "Urga Fura 570 Rebel", faction: -1, type: 1, class: 12, model_name: "v0602_car_urga_armoredtransport_rebel_01", price: 48000},
	"2713830733": {name: "Urga Szturm 63a Military", faction: 1, type: 1, class: 13, model_name: "v0600_car_urga_armoredjeep_military_01",},
	"4216479759": {name: "Custom Kletterer 300", type: 1, class: 9, model_name: "v0012_car_autostraad_atv_signature_01", price: 57000},
	"1535405532": {name: "Weimaraner W3 Military", faction: 1, type: 1, class: 6, model_name: "v0000_car_autostraad_oldjeep_military_01", price: 35000},
	"3174928626": {name: "Propaganda Van", type: 1, class: 10, model_name: "v0501_car_solar_smallvan_propaganda_01",},
	"3887054075": {name: "Military Corvette", type: 2, model_name: "v1202_boat_capstone_corvette_mm120",},
	"1642334787": {name: "Stria Switzo", type: 1, class: 10, model_name: "v0501_car_solar_smallvan_commercial_01", price: 39000},
	"1493705456": {name: "Eubus Eagle", type: 3, model_name: "v2102_helicopter_eubus_utility_civilian_01",},
	"2020191645": {name: "Urga Szturm 63a Rebel", faction: -1, type: 1, class: 13, model_name: "v0600_car_urga_armoredjeep_rebel_01",},
	"1733269748": {name: "Stria Toro", type: 1, class: 4, model_name: "v0514_car_solar_modernpickup_civilian_01", price: 18000},
	"480691323": {name: "Stria Toro Z80", type: 1, class: 4, z80: true, model_name: "v0514_car_solar_modernpickup_civilian_z80",},
	"557972553": {name: "Urga Hroch Rebel", faction: -1, type: 2, model_name: "v1602_boat_urga_transport_rebel_01",},
	"954310635": {name: "Cs Powerrun 77 Military", faction: 1, type: 2, model_name: "v1200_boat_capstone_heavypatrol_military_01",},
	"4129388734": {name: "Incendiario Monster Truck", type: 1, class: 11, model_name: "v0803_car_na_monstertruck_civilian_01", price: 160000},
	"3678661493": {name: "Incendiario Monster Truck Z80", type: 1, class: 11, z80: true, model_name: "v0803_car_na_monstertruck_civilian_01_z80",},
	"1332328959": {name: "Cs Baltdjur Rebel", faction: -1, type: 1, class: 12, model_name: "v0200_car_capstone_apc_rebel_01",},
	"300281319": {name: "Pavouk U-15 Military", faction: 1, type: 1, class: 8, model_name: "v3600_bike_urga_combatdirt_military_01", price: 32000},
	"2580011165": {name: "Minnow Fishing Boat", type: 2, class: 18, model_name: "v1701_boat_na_smalloldfishing_civilian_01",},
	"1643964103": {name: "U-7 Dravec Military", faction: 1, type: 3, model_name: "v4602_plane_urga_fighterbomber_military_01",},
	"2030470101": {name: "Stria Switzo Ambulance", type: 1, class: 10, model_name: "v0501_car_solar_smallvan_civic_ambulance_01",},
	"3794198039": {name: "Military Corvette Military", faction: 1, type: 2, model_name: "v1202_boat_capstone_corvette_military_01",},
	"484034449": {name: "Stadt Tresor St 8530", type: 1, class: 10, model_name: "v0001_car_autostraad_armoredtruck_commercial_01",},
	"4225384683": {name: "Verdeleon 3", type: 1, class: 2, model_name: "v0403_car_mugello_modernecosuper_civilian_01", price: 350000},
	"717463248": {name: "Stria Giovanni", type: 1, class: 8, model_name: "v3502_bike_solar_modernroad_civilian_01", price: 26000},
	"3080666513": {name: "'13 Vigueur", type: 1, class: 1, model_name: "v0305_car_kensington_moderngrandtourer_civilian_01", price: 45000},
	"1866205445": {name: "Stria Joia", type: 1, class: 4, model_name: "v0502_car_solar_modernsedan_civic_police_01",},
	"1999738350": {name: "The Rocket", type: 1, class: 14, model_name: "v0866_car_na_ladbil_civilian_01"},
	"1124348706": {name: "Tanker Truck", type: 1, class: 12, model_name: "v0866_car_na_ladbil_civilian_01"},
};
	//"4270166538": {name: "Autocannon Mech Rebel", faction: -1, type: 1, class: "Misc"},
	//"634092196": {name: "Autocannon Mech", type: 1, class: "Misc"},


const respawnTime = [];
respawnTime[4] = 300000;
respawnTime[6] = 300000;
respawnTime[8] = 300000;
respawnTime[9] = 1800000;
respawnTime[16] = 300000;

const militaryVehicles = [];
militaryVehicles[1] = {'1': 2913800493, '-1': 669313043}; // URGA OGAR 7
militaryVehicles[2] = {'1': 1344393073, '-1': 3145488079}; // STRIA FACOCCERO
militaryVehicles[3] = {'1': 2781420465, '-1': 2079723022}; // URGA FURA 570
militaryVehicles[4] = {'1': 2713830733, '-1': 2020191645}; // URGA SZTURM 63A
militaryVehicles[5] = {'1': 3874188721, '-1': 3910701466}; // STRIA OBRERO
militaryVehicles[6] = {'1': 2631053328, '-1': 1332328959}; // CS BALTDJUR
militaryVehicles[7] = {'1': 1535405532, '-1': 274180142}; // WEIMARANER
militaryVehicles[8] = {'1': 300281319, '-1': 2718282527}; // PAVOUK U-15
militaryVehicles[9] = {'1': 788638133, '-1': 1632385059}; // URGA RACEK / HELI
militaryVehicles[10] = {'1': 3672040481, '-1': 1634346906}; // CUSTODE
militaryVehicles[11] = {'1': 954310635, '-1': 660992745}; // CS POWERRUN

const reservedVehiclesTypeJob = [];
reservedVehiclesTypeJob[2913800493] = 2;
reservedVehiclesTypeJob[1344393073] = 2;
reservedVehiclesTypeJob[2781420465] = 2;
reservedVehiclesTypeJob[2713830733] = 2;
reservedVehiclesTypeJob[2631053328] = 2;
reservedVehiclesTypeJob[1535405532] = 2;
reservedVehiclesTypeJob[300281319] = 2;
reservedVehiclesTypeJob[788638133] = 2;
reservedVehiclesTypeJob[4044104901] = 2;
reservedVehiclesTypeJob[3672040481] = 2;
reservedVehiclesTypeJob[954310635] = 2;

reservedVehiclesTypeJob[669313043] = 3;
reservedVehiclesTypeJob[3145488079] = 3;
reservedVehiclesTypeJob[2079723022] = 3;
reservedVehiclesTypeJob[2020191645] = 3;
reservedVehiclesTypeJob[1332328959] = 3;
reservedVehiclesTypeJob[274180142] = 3;
reservedVehiclesTypeJob[2718282527] = 3;
reservedVehiclesTypeJob[1632385059] = 3;
reservedVehiclesTypeJob[1634346906] = 3;
reservedVehiclesTypeJob[660992745] = 3;

var indexIterationVehicle = 0;

const dammVehicle = new Vehicle(1629307753, new Vector3f(-12550, 1800, -12200), new Vector3f(0, 0, 0));

// var vehiclesToDestroy = [];

jcmp.events.Add("EjectVehicle", function(player, seat) {
	EjectVehicle(player, seat);
});


jcmp.events.AddRemoteCallable("EjectVehicle", function(player, seat) {
	EjectVehicle(player, seat);
});


function EjectVehicle(player, seat) {

	if (typeof player.vehicle === 'undefined')
		return;

	if (seat) {
		player.vehicle.SetOccupant(seat, null);
	} else {
		player.vehicle.driver = null;
	}
}


function LoadVehicles() {
	jcmp.SQL.query(
		"SELECT * FROM Vehicle",
		null,
		function (vehicles) {
			for (let v = vehicles.length - 1; v >= 0; v--) {
				let vehicleData = vehicles[v];
				SpawnCommonVehicle(vehicleData.id, Number(vehicleData.modelHash), jcmp.utils.vector3.parse(vehicleData.position),  jcmp.utils.vector3.parse(vehicleData.rotation), vehicleData.color, vehicleData.idJob);
			}
		}
	);

	jcmp.SQL.query(
		"SELECT * FROM MilitaryInstallationVehicle",
		null,
		function (vehicles) {
			for (let v = vehicles.length - 1; v >= 0; v--) {
				let vehicleData = vehicles[v];
				SpawnMilitaryVehicle(vehicleData.id, vehicleData.idSite, vehicleData.idVehicle, jcmp.utils.vector3.parse(vehicleData.position), jcmp.utils.vector3.parse(vehicleData.rotation));
			}
		}
	);
}


jcmp.events.Add('UpdateVehiclesMilitaryInstallations', function(idSite) {
	let military = jcmp.militaryInstallations[idSite];
	
	if (!military) {
		jcmp.console.print("Vehicle Respawn Military - no site " + idSite);
		return;
	}

	for (let v = jcmp.roleplayVehicles.length - 1; v >= 0; v--) {
		if (typeof jcmp.roleplayVehicles[v] === 'undefined' || !jcmp.roleplayVehicles[v])
			continue;
	
		let vehicle = jcmp.roleplayVehicles[v];

		if (!vehicle.military || vehicle.military.idSite != idSite)
			continue;
		
		if (HasOccupants(vehicle))
			vehicle.toRespawn = -2;
		else
			RespawnVehicle(vehicle);
	}
});


jcmp.events.AddRemoteCallable('DelVehicle', function(player) {
	if (typeof player.vehicle === 'undefined') return;

	let vehicle = player.vehicle;

	if (vehicle.military) {
		jcmp.SQL.execute(
			"DELETE FROM MilitaryInstallationVehicle WHERE id = ?",
			vehicle.military.id
		);
		jcmp.console.print("deletado military veiculo id " + vehicle.id);
	} else if (vehicle.id) {
		jcmp.SQL.execute(
			"DELETE FROM Vehicle WHERE id = ?",
			vehicle.id
		);
		jcmp.console.print("deletado veiculo id " + vehicle.id);
	}
    
	DestroyVehicle(vehicle);
});


jcmp.events.AddRemoteCallable('SetVehicle', function(player, color, idJob) {

	if (typeof player.vehicle === 'undefined') return;
	let vehicle = player.vehicle;

	let data = {
		modelHash: vehicle.modelHash,
		position: jcmp.utils.vector3.stringify(vehicle.position),
		rotation: jcmp.utils.vector3.stringify(vehicle.rotation)
	};

	if (color != -1)
		data.color = color;

	if (idJob != -1)
		data.idJob = idJob;

	jcmp.SQL.execute(
		"INSERT INTO Vehicle SET ?",
		data
	);
});


jcmp.events.Add("VehicleExploded", function(vehicle) {
	if (vehicle.isRacing || vehicle.personal)
		return;

	vehicle.toRespawn = 4;
});


function SpawnCommonVehicle(id, modelHash, position, rotation, primaryColor, idJob) {
	let vehicle = SpawnVehicle(modelHash, position, rotation);

	vehicle.id = id;
	
	vehicle.primaryColor = primaryColor ? primaryColor : Math.floor(Math.random() * 80);
	vehicle.nitroEnabled = (Math.floor(Math.random() * 100)) >= 50;
	vehicle.turboJumpEnabled = (Math.floor(Math.random() * 100)) >= 50;

	if (idJob)
		vehicle.idJob = idJob;

	if (jcmp.vehiclesData[modelHash].type == 2)
		vehicle.toRespawn = -1;
}


function SpawnMilitaryVehicle(id, idSite, idMilitaryVehicle, position, rotation) {
	let military = jcmp.militaryInstallations[idSite];

	if (!military) {
		jcmp.console.print("Vehicle Military - no site " + idSite);
		return;
	}

	let modelHash = militaryVehicles[idMilitaryVehicle];

	if (!modelHash) {
		jcmp.console.print("Vehicle Military - no hash " + idMilitaryVehicle);
		return;
	}

	modelHash = military.domination != 0 ? modelHash[military.domination] : modelHash[1];

	if (!modelHash) {
		jcmp.console.print("Vehicle Military - no hash 2 " + idMilitaryVehicle);
		return;
	}

	let vehicle = SpawnVehicle(modelHash, position, rotation);;

	vehicle.military = {
		id: id,
		idSite: idSite,
		idMilitaryVehicle: idMilitaryVehicle,
	};
}


function SpawnVehicle(modelHash, position, rotation) {
	let vehicle = new Vehicle(modelHash, position, rotation);
	
	jcmp.roleplayVehicles[vehicle.networkId] = vehicle;

	vehicle.respawnPosition = position;
	vehicle.respawnRotation = rotation;

	return vehicle;
}


function RespawnVehicle(vehicle) {
	if (!vehicle.position) return;

	let oldVehicleData = {
		id: vehicle.id,
		military: vehicle.military,
		idJob: vehicle.idJob,
		modelHash: vehicle.modelHash,
		respawnPosition: vehicle.respawnPosition,
		respawnRotation: vehicle.respawnRotation,
		primaryColor: vehicle.primaryColor
	};

	DestroyVehicle(vehicle);

	if (oldVehicleData.id != null) {
		SpawnCommonVehicle(oldVehicleData.id, oldVehicleData.modelHash, oldVehicleData.respawnPosition, oldVehicleData.respawnRotation, oldVehicleData.primaryColor, oldVehicleData.idJob);
		return;
	};

	if (oldVehicleData.military != null) {
		SpawnMilitaryVehicle(oldVehicleData.military.id, oldVehicleData.military.idSite, oldVehicleData.military.idMilitaryVehicle, oldVehicleData.respawnPosition, oldVehicleData.respawnRotation);
		return;
	}
}


jcmp.events.Add("DestroyVehicle", function(vehicle) {
	DestroyVehicle(vehicle);
});


function DestroyVehicle(vehicle) {
	let networkId = vehicle.networkId;
	vehicle.Destroy();
	vehicle.position = new Vector3f(-12550, 1800, -12200);

	if (jcmp.roleplayVehicles[networkId])
		jcmp.roleplayVehicles[networkId] = false;
}


setInterval(function() {
	for (let v = jcmp.roleplayVehicles.length - 1; v >= 0; v--) {
		if (typeof jcmp.roleplayVehicles[v] === 'undefined' || !jcmp.roleplayVehicles[v])
			continue;
	
		let vehicle = jcmp.roleplayVehicles[v];
		if (vehicle.toRespawn) {
			if (HasOccupants(vehicle))
				continue;

			// to respawn or delete
			if (vehicle.toRespawn >= 4 || vehicle.toRespawn <= -1) {
				if (vehicle.toRespawn >= 4)
					vehicle.toRespawn = false;

				if (vehicle.toRespawn != -2 && (vehicle.id || vehicle.military)) {
					RespawnVehicle(vehicle);
				} else {
					DestroyVehicle(vehicle);
				}
				continue;
			}
			
			// to move to initial position in next tick
			if (vehicle.toRespawn > 0) {
				vehicle.toRespawn++;
				continue;
			}
		}
	}
}, 150000);


jcmp.events.Add('PlayerDestroyedAfter', function(player) {
	if (typeof player.vehicle === 'undefined') return;

	PlayerVehicleExited(player, player.vehicle, 0);
});


jcmp.events.Add("PlayerVehicleExited", function(player, vehicle, seatIndex) {
	PlayerVehicleExited(player, vehicle, seatIndex);
});


function PlayerVehicleExited(player, vehicle, seatIndex) {
	if (!vehicle.id) return;

	if (!HasOccupants(vehicle)) {
		if (vehicle.idJob && jcmp.vehiclesData[vehicle.modelHash].type != 2)
			vehicle.toRespawn = 3;
		else
			vehicle.toRespawn = 1;
	}
}


function HasOccupants(vehicle) {
	return (
		vehicle.GetOccupant(0) ||
		vehicle.GetOccupant(1) ||
		vehicle.GetOccupant(2) ||
		vehicle.GetOccupant(3) ||
		vehicle.GetOccupant(4) ||
		vehicle.GetOccupant(5) ||
		vehicle.GetOccupant(6) ||
		vehicle.GetOccupant(7)
	);
}


function checkLicensedVehicle(player, vehicle) {
	let type = vehicle.type;
	
	let license = jcmp.licenses[type];
	if (!license) return true;
	
	if (!player[license.id]) {
		
		if (type == 8 || type == 16 || type == 9) {
			jcmp.notifications.send(player, "", "LICENSES_NOT_HABILITED_CANT_DRIVE", [["LICENSES_NAME_" + license.id]], "license", "cancel");
			
            return false;
		} else {
			if (player.level < jcmp.minimumLevel)
                return true;
                
            jcmp.events.Call("AddWantedStar", 3);
            return true;
		}
    }

    return true;
}


function checkReservedVehicle(player, vehicle) {
	if (vehicle.idJob && player.idJob != vehicle.idJob && player.idJob != 3) {
		jcmp.events.CallRemote("VehicleReservedForJob", player, vehicle.idJob);
		return false;
	}

	if (reservedVehiclesTypeJob[vehicle.modelHash] && jcmp.jobs[player.idJob].idJobType != reservedVehiclesTypeJob[vehicle.modelHash]) {
		jcmp.events.CallRemote("VehicleReservedForTypeJob", player, reservedVehiclesTypeJob[vehicle.modelHash]);
		return false;
    }
    
    return true;
}


function checkPersonalVehicle(player, vehicle) {
    if (!vehicle.personal)
        return true;
    
    if (!vehicle.personal.locked) {
        if (vehicle.personal.owner.networkId == player.networkId) {
            jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_ENTERED_OWN_UNLOCKED", false, "car-key", "notification");
        } else {
            jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_ENTERED_UNLOCKED", [vehicle.personal.owner.nname], "car-key", "notification");
        }
        return true;
    }
    
    if (vehicle.personal.owner.networkId == player.networkId) {
        jcmp.notifications.send(player, "PERSONAL_VEHICLE", vehicle.personal.locked ? "PERSONAL_VEHICLE_ENTERED_OWN_LOCKED" : "PERSONAL_VEHICLE_ENTERED_OWN_UNLOCKED", false, "car-key", "notification");
        return true;
    } else {
        jcmp.notifications.send(player, "PERSONAL_VEHICLE", "PERSONAL_VEHICLE_ENTERED_LOCKED", [vehicle.personal.owner.nname], "car-key", "cancel");
        return false;
    }
}


jcmp.events.Add('PlayerVehicleExited', function(player, vehicle, seatIndex) {
	let networkId = vehicle.networkId;
	if (!networkId) {
		networkId = null;
		seatIndex = null;
	}

	jcmp.events.CallRemote("PlayerVehicleExited", player, networkId, seatIndex);
});


jcmp.events.Add('PlayerVehicleEntered', function(player, vehicle, seatIndex) {
    if (vehicle.id || vehicle.military)
        vehicle.toRespawn = false;
        
	if (!checkCanDrive(player, vehicle, seatIndex))
		return;

	jcmp.events.Call("PlayerVehicleEnteredAfter", player, vehicle, seatIndex);
	jcmp.events.CallRemote("PlayerVehicleEntered", player, vehicle.networkId, seatIndex);
});


jcmp.events.Add('PlayerVehicleSeatChange', function(player, vehicle, seatIndex, oldSeatIndex) {
	if (!checkCanDrive(player, vehicle, seatIndex))
		return;
	
	jcmp.events.Call("PlayerVehicleSeatChangeAfter", player, vehicle, seatIndex, oldSeatIndex);
	jcmp.events.CallRemote("PlayerVehicleSeatChange", player, vehicle.networkId, seatIndex, oldSeatIndex);
});


function checkCanDrive(player, vehicle, seatIndex) {
	if (seatIndex != 0)
		return true;

	if (player.testingDriving || player.racing)
		return true;

	if (checkLicensedVehicle(player, vehicle) && checkReservedVehicle(player, vehicle) && checkPersonalVehicle(player, vehicle))
		return true;

	vehicle.driver = null;
	player.rotation = jcmp.utils.vector3.rotateY(player.rotation, Math.PI);
	return false;
}


jcmp.events.Add('PlayerHijackVehicle', function(stealer, vehicle, player) {
	jcmp.events.CallRemote("PlayerHijackVehicle", player, vehicle.networkId, stealer.networkId);
});


jcmp.events.Add("SitesLoaded", function() {
	LoadVehicles();
});