;(function($, document, window, undefined) {
    $(function() {

        // testing compact / extended mode
        $('#toggle-compact').click(function() {
            $('#vehicle-menu').toggleClass('compact').toggleClass('extended');
            return false;
        });

        let vehicles = [
            {
                "name": "URGA OGAR 7 V8 MILITARY",
                "model_name": "v0604_car_urga_buggy_military_01",
                "hash": 2913800493,
                "type": "car",
                "class": "offroad",
                "dlc": null
            },
            {
                "name": "URGA OGAR 7 V8 MILITARY Z80",
                "model_name": "v0604_car_urga_buggy_military_z80",
                "hash": 28454791,
                "type": "car",
                "class": "offroad",
                "dlc": null
            },
            {
                "name": "AUTOSTRAAD REISENDER 7",
                "model_name": "v0011_car_autostraad_articulatedtruck_commercial_01",
                "hash": 4200435076,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "CS POWERRUN 77 REBEL",
                "model_name": "v1200_boat_capstone_heavypatrol_rebel_01",
                "hash": 660992745,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "CARMEN ALBATROSS REBEL",
                "model_name": "v4800_plane_brothers_vintagefighter_rebel_01",
                "hash": 448735752,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "CUSTODE 29 REBEL",
                "model_name": "v1704_boat_na_lightpatrol_rebel_01",
                "hash": 1634346906,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "AUTOSTRAAD KLETTERER 300",
                "model_name": "v0012_car_autostraad_atv_civilian_01",
                "hash": 1863812216,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "AUTOSTRAAD KLETTERER 300 Z80",
                "model_name": "v0012_car_autostraad_atv_civilian_01_z80",
                "hash": 510797552,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA FACOCERO REBEL",
                "model_name": "v0504_car_solar_technicaljeep_rebel_01",
                "hash": 3145488079,
                "type": "car",
                "class": "offroad",
                "dlc": null
            },
            {
                "name": "AUTOSTRAAD D700",
                "model_name": "v0008_car_autostraad_modernsportssaloon_civilian_01",
                "hash": 1683768425,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "URGA HROCH MILITARY",
                "model_name": "v1602_boat_urga_transport_military_01",
                "hash": 3276262971,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "CS7 THUNDERHAWK MILITARY",
                "model_name": "v4202_plane_capstone_fighterjet_military_01",
                "hash": 1951838228,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA OBRERO",
                "model_name": "v0505_car_solar_oldtruck_commercial_01",
                "hash": 2627875542,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "BRISE 32",
                "model_name": "v1302_boat_kensington_sailboat_civilian_01",
                "hash": 530733049,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "MUGELLO VISTOSA",
                "model_name": "v0401_car_mugello_racingsupercar_civilian_01",
                "hash": 1192327012,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "U41 PTAKOJESTER MILITARY",
                "model_name": "v4603_plane_urga_cargotransport_military_01",
                "hash": 2204830311,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "'69 STRIA SUSSURRO",
                "model_name": "v3500_bike_solar_oldmoped_civilian_01",
                "hash": 1671177981,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "CS ODJUR MILITARY",
                "model_name": "v0201_car_capstone_mediumtank_military_01",
                "hash": 2840535164,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "STRIA RUSTICO",
                "model_name": "v0506_car_solar_oldtractor_civilian_01",
                "hash": 943568602,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "STRIA RUSTICO Z80",
                "model_name": "v0506_car_solar_oldtractor_civilian_z80",
                "hash": 3100982204,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "CS NAVAJO REBEL",
                "model_name": "v2200_helicopter_capstone_assault_rebel_01",
                "hash": 4029907821,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA PW 220 R-GT",
                "model_name": "v1500_boat_solar_jetski_civilian_01",
                "hash": 867451438,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA KAVALA",
                "model_name": "v0503_car_solar_modernsuv_civilian_01",
                "hash": 2662510920,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "KERNER SERPENTE R",
                "model_name": "v0300_car_kensington_sportsmuscle_civilian_01",
                "hash": 3535039305,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "NEWS CHOPPER",
                "model_name": "v2102_helicopter_eubus_utility_commercial_news",
                "hash": 3619392854,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA BKOLOS 2100 REBEL",
                "model_name": "v0603_car_urga_smalltank_rebel_01",
                "hash": 4038562464,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "URGA POSTOLKA",
                "model_name": "v2602_helicopter_urga_lightassault_blackhand_01",
                "hash": 3478690106,
                "type": "helicopter",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "WINDHUND 4",
                "model_name": "v0003_car_autostraad_racinghothatch_civilian_01",
                "hash": 1222118188,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "WINDHUND 4 Z80",
                "model_name": "v0003_car_autostraad_racinghothatch_civilian_z80",
                "hash": 3406930663,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "STRIA GIOCO",
                "model_name": "v0509_car_solar_modernmini_civilian_01",
                "hash": 2455749603,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "URGA POSTOLKA REBEL",
                "model_name": "v2602_helicopter_urga_lightassault_rebel_01",
                "hash": 506564449,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "GOLDEN URGA MSTITEL",
                "model_name": "v2604_helicopter_urga_advancedassault_signature_shielded",
                "hash": 1182346887,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "U-7 DRAVEC REBEL",
                "model_name": "v4602_plane_urga_fighterbomber_rebel_01",
                "hash": 2491278791,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "PESCESPADA SS",
                "model_name": "v1401_boat_mugello_racingboat_civilian_01",
                "hash": 1734594165,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA CARERA G",
                "model_name": "v0513_car_solar_oldfourdoorhatch_civilian_01",
                "hash": 1629307753,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "CUSTOM GESCHWIND",
                "model_name": "v3000_bike_autostraad_trials_signature_01",
                "hash": 2966292608,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA OGAR 7 V8 REBEL",
                "model_name": "v0604_car_urga_buggy_rebel_01",
                "hash": 669313043,
                "type": "car",
                "class": "offroad",
                "dlc": null
            },
            {
                "name": "STRIA INFIMO S",
                "model_name": "v0508_car_solar_oldcompact_civilian_01",
                "hash": 695483605,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "STRIA GHEPARDO 3S",
                "model_name": "v0510_car_solar_modernroadster_civilian_01",
                "hash": 160481253,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "IMPERATOR BAVARIUM TANK REBEL",
                "model_name": "v0202_car_capstone_bavariumtank_rebel_01",
                "hash": 1207218883,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "STRIA CUCCIOLA",
                "model_name": "v0500_car_solar_oldmini_civilian_01",
                "hash": 857303830,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "SQUALO X7",
                "model_name": "v1400_boat_mugello_spyspeedboat_civilian_01",
                "hash": 1442821020,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "MUGELLO FARINA DUO",
                "model_name": "v0405_car_mugello_moderncircuitracer_civilian_01",
                "hash": 2336539742,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "RUBBER DUCKY",
                "model_name": "v1717_boat_na_duck_civilian_01",
                "hash": 3998318206,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "MUGELLO FURIA MS-316",
                "model_name": "v3401_bike_mugello_modernsport_civilian_01",
                "hash": 2865733197,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "'05 CHARMANT",
                "model_name": "v0302_car_kensington_modernlimo_civilian_01",
                "hash": 911076462,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "URGA RACEK MILITARY",
                "model_name": "v2603_helicopter_urga_seascout_military_01",
                "hash": 788638133,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA HROM D REBEL",
                "model_name": "v2601_helicopter_urga_heavyassault_rebel_01",
                "hash": 1955404280,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA HROM D MILITARY",
                "model_name": "v2601_helicopter_urga_heavyassault_military_01",
                "hash": 1412710783,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "VINTAGE STRIA M7",
                "model_name": "v3503_bike_solar_oldroad_civilian_01",
                "hash": 3300933530,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "CS ODJUR REBEL",
                "model_name": "v0201_car_capstone_mediumtank_rebel_01",
                "hash": 2758160814,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "WEIMARANER Z80",
                "model_name": "v0000_car_autostraad_oldjeep_civilian_z80",
                "hash": 2887741045,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "CUSTODE 29 MILITARY",
                "model_name": "v1704_boat_na_lightpatrol_military_01",
                "hash": 3672040481,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "AUTOSTRAAD D90",
                "model_name": "v0009_car_autostraad_modernsaloon_civilian_01",
                "hash": 3843099743,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "CS COMET REBEL",
                "model_name": "v2201_helicopter_capstone_heavytroop_rebel_01",
                "hash": 249846758,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "U41 PTAKOJESTER REBEL",
                "model_name": "v4603_plane_urga_cargotransport_rebel_01",
                "hash": 1181146141,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "WEIMARANER Z80 MILITARY",
                "model_name": "v0000_car_autostraad_oldjeep_military_z80",
                "hash": 121246434,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "PAVOUK U-15",
                "model_name": "v3600_bike_urga_combatdirt_blackhand_01",
                "hash": 2235620315,
                "type": "motorbike",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "TANKER TRUCK",
                "model_name": "v0866_car_na_ladbil_civilian_01",
                "hash": 1124348706,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "THE ROCKET",
                "model_name": "v0866_car_na_ladbil_civilian_01",
                "hash": 1999738350,
                "type": "car",
                "class": "misc",
                "dlc": null
            },
            {
                "name": "AUTOCANNON MECH REBEL",
                "model_name": "v0805_car_na_mech_rebel_cannon",
                "hash": 4270166538,
                "type": "car",
                "class": "misc",
                "dlc": 400490
            },
            {
                "name": "WEIMARANER W3",
                "model_name": "v0000_car_autostraad_oldjeep_civilian_01",
                "hash": 1684130889,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "STRIA JOIA",
                "model_name": "v0502_car_solar_modernsedan_civic_police_01",
                "hash": 4044104901,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "GESCHWIND V3000",
                "model_name": "v3000_bike_autostraad_trials_civilian_01",
                "hash": 2160521137,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA POSTOLKA MILITARY",
                "model_name": "v2602_helicopter_urga_lightassault_military_01",
                "hash": 936369891,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "U41 PTAKOJESTER",
                "model_name": "v4603_plane_urga_cargotransport_blackhand_01",
                "hash": 3386037743,
                "type": "plane",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "CS BALTDJUR MILITARY",
                "model_name": "v0200_car_capstone_apc_military_01",
                "hash": 2631053328,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "WHALESHARK",
                "model_name": "v1705_boat_na_mediumoldfishing_civilian_01",
                "hash": 1967374600,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA RACEK REBEL",
                "model_name": "v2603_helicopter_urga_seascout_rebel_01",
                "hash": 1632385059,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "WEIMARANER REBEL",
                "model_name": "v0000_car_autostraad_oldjeep_rebel_01",
                "hash": 274180142,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "NASHORN 6100",
                "model_name": "v0005_car_autostraad_minetruck_commercial_01",
                "hash": 776016794,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "MUGELLO QUIPOZZA F",
                "model_name": "v0402_car_mugello_vintagesuper_civilian_01",
                "hash": 4286768685,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "MUGELLO QUIPOZZA F Z80",
                "model_name": "v0402_car_mugello_vintagesuper_civilian_z80_01",
                "hash": 7144193,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "STRIA FACOCERO",
                "model_name": "v0504_car_solar_technicaljeep_militia_01",
                "hash": 1344393073,
                "type": "car",
                "class": "offroad",
                "dlc": null
            },
            {
                "name": "URGA HROCH",
                "model_name": "v1602_boat_urga_transport_blackhand_01",
                "hash": 1251142405,
                "type": "boat",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "STRIA OBRERO MILITARY",
                "model_name": "v0505_car_solar_oldtruck_military_01",
                "hash": 3874188721,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "URGA MSTITEL REBEL",
                "model_name": "v2604_helicopter_urga_advancedassault_rebel_01",
                "hash": 3947727649,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "AUTOCANNON MECH",
                "model_name": "v0805_car_na_mech_cannon",
                "hash": 634092196,
                "type": "car",
                "class": "misc",
                "dlc": 400490
            },
            {
                "name": "CITISPEED ECO 75",
                "model_name": "v0006_car_autostraad_modernbus_commercial_01",
                "hash": 719430386,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "REBEL CORVETTE REBEL",
                "model_name": "v1202_boat_capstone_corvette_rebel_01",
                "hash": 2474676614,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA OBRERO REBEL",
                "model_name": "v0505_car_solar_oldtruck_rebel_01",
                "hash": 3910701466,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "CS7 THUNDERHAWK REBEL",
                "model_name": "v4202_plane_capstone_fighterjet_rebel_01",
                "hash": 1350246166,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "'63 AUTOSTRAAD WELTBUS",
                "model_name": "v0002_car_autostraad_oldcampervan_civilian_01",
                "hash": 1567828325,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "'63 AUTOSTRAAD WELTBUS Z80",
                "model_name": "v0002_car_autostraad_oldcampervan_civilian_z80",
                "hash": 1550496746,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "STRIA CAMPANIA 115",
                "model_name": "v0507_car_solar_oldbus_commercial_01",
                "hash": 709014260,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "STRIA CAMPANIA 115 Z80",
                "model_name": "v0507_car_solar_oldbus_commercial_z80",
                "hash": 3760096448,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "URGA SZTURM 63A",
                "model_name": "v0600_car_urga_armoredjeep_blackhand_01",
                "hash": 3777100791,
                "type": "car",
                "class": "heavy",
                "dlc": 400490
            },
            {
                "name": "URGA BKOLOS 2100 MILITARY",
                "model_name": "v0603_car_urga_smalltank_military_01",
                "hash": 970032925,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "CS COMET MILITARY",
                "model_name": "v2201_helicopter_capstone_heavytroop_military_01",
                "hash": 2671062828,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA RISATA",
                "model_name": "v3501_bike_solar_modernmoped_civilian_01",
                "hash": 2395818479,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA U17 AKROBAT",
                "model_name": "v4600_plane_urga_privatepropeller_civilian_01",
                "hash": 596249749,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "CUSTODE 29",
                "model_name": "v1704_boat_na_lightpatrol_blackhand_01",
                "hash": 1681634829,
                "type": "boat",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "URGA FURA 570 MILITARY",
                "model_name": "v0602_car_urga_armoredtransport_military_01",
                "hash": 2781420465,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "STRIA GHIBLI 3",
                "model_name": "v4500_plane_solar_smallfloatprop_civilian_01",
                "hash": 2647868720,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "MV402",
                "model_name": "v3402_bike_mugello_modernsuper_civilian_01",
                "hash": 3510706963,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "MUGELLO RAFFINATI VITESSE",
                "model_name": "v0400_car_mugello_vintagesports_civilian_01",
                "hash": 3203194893,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "MUGELLO RAFFINATI VITESSE Z80",
                "model_name": "v0400_car_mugello_vintagesports_civilian_z80",
                "hash": 369388473,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "DAME DE LA MER 99",
                "model_name": "v1300_boat_kensington_motoryacht_civilian_01",
                "hash": 3332358986,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "PAVOUK U-15 REBEL",
                "model_name": "v3600_bike_urga_combatdirt_rebel_01",
                "hash": 2718282527,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "CS NAVAJO MILITARY",
                "model_name": "v2200_helicopter_capstone_assault_military_01",
                "hash": 4145800282,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA MSTITEL MILITARY",
                "model_name": "v2604_helicopter_urga_advancedassault_military_01",
                "hash": 2834809898,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "IMPERATOR BAVARIUM TANK MILITARY",
                "model_name": "v0202_car_capstone_bavariumtank_military_01",
                "hash": 3735240277,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "STRIA CARERA STANDARD",
                "model_name": "v0512_car_solar_oldtwodoorhatch_civilian_01",
                "hash": 3844689418,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "URGA FURA 570 REBEL",
                "model_name": "v0602_car_urga_armoredtransport_rebel_01",
                "hash": 2079723022,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "URGA SZTURM 63A MILITARY",
                "model_name": "v0600_car_urga_armoredjeep_military_01",
                "hash": 2713830733,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "CUSTOM KLETTERER 300",
                "model_name": "v0012_car_autostraad_atv_signature_01",
                "hash": 4216479759,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "WEIMARANER W3 MILITARY",
                "model_name": "v0000_car_autostraad_oldjeep_military_01",
                "hash": 1535405532,
                "type": "car",
                "class": "old",
                "dlc": null
            },
            {
                "name": "PROPAGANDA VAN",
                "model_name": "v0501_car_solar_smallvan_propaganda_01",
                "hash": 3174928626,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "MILITARY CORVETTE",
                "model_name": "v1202_boat_capstone_corvette_mm120",
                "hash": 3887054075,
                "type": "boat",
                "class": null,
                "dlc": 400490
            },
            {
                "name": "STRIA SWITZO",
                "model_name": "v0501_car_solar_smallvan_commercial_01",
                "hash": 1642334787,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "EUBUS EAGLE",
                "model_name": "v2102_helicopter_eubus_utility_civilian_01",
                "hash": 1493705456,
                "type": "helicopter",
                "class": null,
                "dlc": null
            },
            {
                "name": "URGA SZTURM 63A REBEL",
                "model_name": "v0600_car_urga_armoredjeep_rebel_01",
                "hash": 2020191645,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "STRIA TORO",
                "model_name": "v0514_car_solar_modernpickup_civilian_01",
                "hash": 1733269748,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "STRIA TORO Z80",
                "model_name": "v0514_car_solar_modernpickup_civilian_z80",
                "hash": 480691323,
                "type": "car",
                "class": "modern",
                "dlc": null
            },
            {
                "name": "URGA HROCH REBEL",
                "model_name": "v1602_boat_urga_transport_rebel_01",
                "hash": 557972553,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "CS POWERRUN 77 MILITARY",
                "model_name": "v1200_boat_capstone_heavypatrol_military_01",
                "hash": 954310635,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "INCENDIARIO MONSTER TRUCK",
                "model_name": "v0803_car_na_monstertruck_civilian_01",
                "hash": 4129388734,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "INCENDIARIO MONSTER TRUCK Z80",
                "model_name": "v0803_car_na_monstertruck_civilian_01_z80",
                "hash": 3678661493,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "CS BALTDJUR REBEL",
                "model_name": "v0200_car_capstone_apc_rebel_01",
                "hash": 1332328959,
                "type": "car",
                "class": "tank",
                "dlc": null
            },
            {
                "name": "PAVOUK U-15 MILITARY",
                "model_name": "v3600_bike_urga_combatdirt_military_01",
                "hash": 300281319,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "MINNOW FISHING BOAT",
                "model_name": "v1701_boat_na_smalloldfishing_civilian_01",
                "hash": 2580011165,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "U-7 DRAVEC MILITARY",
                "model_name": "v4602_plane_urga_fighterbomber_military_01",
                "hash": 1643964103,
                "type": "plane",
                "class": null,
                "dlc": null
            },
            {
                "name": "STRIA SWITZO AMBULANCE",
                "model_name": "v0501_car_solar_smallvan_civic_ambulance_01",
                "hash": 2030470101,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "MILITARY CORVETTE MILITARY",
                "model_name": "v1202_boat_capstone_corvette_military_01",
                "hash": 3794198039,
                "type": "boat",
                "class": null,
                "dlc": null
            },
            {
                "name": "STADT TRESOR ST 8530",
                "model_name": "v0001_car_autostraad_armoredtruck_commercial_01",
                "hash": 484034449,
                "type": "car",
                "class": "heavy",
                "dlc": null
            },
            {
                "name": "VERDELEON 3",
                "model_name": "v0403_car_mugello_modernecosuper_civilian_01",
                "hash": 4225384683,
                "type": "car",
                "class": "sports",
                "dlc": null
            },
            {
                "name": "STRIA GIOVANNI",
                "model_name": "v3502_bike_solar_modernroad_civilian_01",
                "hash": 717463248,
                "type": "motorbike",
                "class": null,
                "dlc": null
            },
            {
                "name": "'13 VIGUEUR",
                "model_name": "v0305_car_kensington_moderngrandtourer_civilian_01",
                "hash": 3080666513,
                "type": "car",
                "class": "modern",
                "dlc": null
            }
        ];

        var weapons = [
            {
            	"name": "CS27 Misfortune",
            	"model_name": "w117_assault_rifle_csv",
            	"hash": 0x5320785c,
            	"class": "assault_rifles",
            	"dlc": null
            },
            {
            	"name": "CS Predator",
            	"model_name": "w112_assault_rifle_cs_predator",
            	"hash": 0x9c3bb243,
            	"class": "assault_rifles",
            	"dlc": null
            },
            {
            	"name": "U-39 Plechovka",
            	"model_name": "w111_assault_rifle_up_39",
            	"hash": 0x898c930f,
            	"class": "assault_rifles",
            	"dlc": null
            },
            {
            	"name": "UPM61",
            	"model_name": "w118_assault_rifle_up_61",
            	"hash": 0xdb6ddf82,
            	"class": "assault_rifles",
            	"dlc": null
            },
            {
            	"name": "CS110 Archangel",
            	"model_name": "w162_sniper_rifle_cs111_archangel",
            	"hash": 0x2352ea5,
            	"class": "sniper_rifles",
            	"dlc": null
            },
            {
            	"name": "USV 45 Sokol",
            	"model_name": "w161_sniper_rifle_u_sv_45",
            	"hash": 0xe9e19ed4,
            	"class": "sniper_rifles",
            	"dlc": null
            },
            {
            	"name": "Prizrak U4",
            	"model_name": "w031_smg_prizrak_u4",
            	"hash": 0x65ddc79a,
            	"class": "submachine_guns",
            	"dlc": null
            },
            {
            	"name": "CS Wraith 225R",
            	"model_name": "w032_smg_cs_wraith_2000",
            	"hash": 0x5544c1a,
            	"class": "submachine_guns",
            	"dlc": null
            },
            {
            	"name": "CS9 PDW-K",
            	"model_name": "w033_smg_cs_9",
            	"hash": 0x9346a13a,
            	"class": "submachine_guns",
            	"dlc": null
            },
            {
            	"name": "Automat U12",
            	"model_name": "w153_shotgun_automat_12",
            	"hash": 0x5c5622b7,
            	"class": "shotguns",
            	"dlc": null
            },
            {
            	"name": "U-24 Zabijak",
            	"model_name": "w155_shotgun_u_rys_12",
            	"hash": 0x8448d1d8,
            	"class": "shotguns",
            	"dlc": null
            },
            {
                "name": "CS44 Peacebringer",
            	"model_name": "w021_handgun_peacekeeper",
            	"hash": 2144721124,
            	"class": "pistols",
            	"dlc": null
            },
            {
            	"name": "CS Spectre Mark V",
            	"model_name": "w012_pistol_cs_spectre_mark_v",
            	"hash": 0xeb1944c9,
            	"class": "pistols",
            	"dlc": null
            },
            {
            	"name": "DK Pistol",
            	"model_name": "w013_pistol_balloon_head",
            	"hash": 0xc4bd763f,
            	"class": "pistols",
            	"dlc": null
            },
            {
            	"name": "The Little General",
            	"model_name": "w014_handgun_little_general",
            	"hash": 0xc50781e6,
            	"class": "pistols",
            	"dlc": null
            },
            {
            	"name": "U-55S Pozhar",
            	"model_name": "w011_pistol_u_pozhar_98",
            	"hash": 0xf0d3387a,
            	"class": "pistols",
            	"dlc": null
            },
            {
            	"name": "Urga Vdova 89",
            	"model_name": "w131_machine_gun_urga_vdova_89",
            	"hash": 0xcb75ff26,
            	"class": "heavy_weapons",
            	"dlc": null
            },
            {
            	"name": "Capstone Hydra",
            	"model_name": "w144_rpg_capstone_hydra",
            	"hash": 0xb7090d07,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "CS Negotiator",
            	"model_name": "w121_grenade_launcher_cs_bildt_negotiator",
            	"hash": 0x79bcea20,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "Fire Leach",
            	"model_name": "w143_rpg_fire_leach",
            	"hash": 0x4100a5d,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "Urga Stupka-210",
            	"model_name": "w176_stupka_210",
            	"hash": 0x55dc0e15,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "UVK-13",
            	"model_name": "w141_rpg_uvk_13",
            	"hash": 0xe9499532,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "UVK-13 (MM110)",
            	"model_name": "w141_rpg_uvk_13_mm110",
            	"hash": 0xa24bd342,
            	"class": "rocket_launchers",
            	"dlc": null
            },
            {
            	"name": "Guitar Case",
            	"model_name": "w147_rpg_guitar_case",
            	"hash": 0xbe34dffc,
            	"class": "rocket_launchers",
            	"dlc": null
            }
        ];

		let hasPermission = false;

        let vehicle_menu = $('#vehicle-menu'),
            weapon_menu = $('#weapon-menu'),
            chat_input_state = false,
            current_visible_menu = null;

        vehicle_menu.spawnMenu({
            tabs: ['Cars', 'Motorbikes', 'Helicopters', 'Planes', 'Boats'],
            iconBasePath: 'http://justcauserp.com/images/vehicles',
            dataCallback: function() {
                // for now we'll just disable DLC vehicle heres because I didn't have time to finish
                // the server side for it. :sadface:
                return vehicles.filter(vehicle => {
                    return vehicle.dlc === null;
                });
            },
            itemClickCallback: function(el) {
                jcmp.CallEvent('spawnmenu/ui/spawnVehicle', el.data('hash'));
            }
        });

        weapon_menu.spawnMenu({
            title: 'Weapons',
            //iconBasePath: 'icons/weapons',
            dataCallback: function() {
                return weapons;
            },
            itemClickCallback: function(el) {
                jcmp.CallEvent('spawnmenu/ui/spawnWeapon', el.data('hash'));
            }
        });

        // so we can actually test in a browser..
        if (typeof jcmp !== 'undefined') {
            /* TODO: move into the actual menu things */
            $('.checkboxes input[type=checkbox]').change(function() {
    			var that = $(this),
    				name = that.attr('name'),
    				checked = that.is(':checked');

    			jcmp.CallEvent('spawnmenu/ui/toggleAttr', name, checked);
    		});

            // load the settings
            jcmp.AddEvent('spawnmenu/settings', function(nitrousEnabled, turboJumpEnabled, vehicleMenuCompactMode) {
                if (nitrousEnabled)
                    $('#toggleNitrous').attr('checked', 'checked');

                if (turboJumpEnabled)
                    $('#toggleTurboJump').attr('checked', 'checked');
            });

            // wait for load first
            jcmp.CallEvent('spawnmenu/ready');

            // chat input state
            jcmp.AddEvent('chat_input_state', function(state) {
                chat_input_state = state;
            });

            jcmp.AddEvent('UpdateLocalPlayerPermissions', function(perm) {
				hasPermission = (perm >= 4);
            });

            function toggleMenu(m) {
				if (!hasPermission)
					return;

                if (typeof m === 'undefined')
                    return;

                const menu = m.data('plugin_spawnmenu');

                if (current_visible_menu) {
                    const current_menu = current_visible_menu.data('plugin_spawnmenu');

                    if (current_menu.isVisible()) {
                        current_menu.setVisible(false);
                        jcmp.HideCursor();
                    }

                    if (current_visible_menu.is(m)) {
                        current_visible_menu = null;
                        jcmp.CallEvent('spawnmenu/ui/toggleMenu', false);
                        return;
                    }
                }

                menu.setVisible(!menu.isVisible());
                menu.isVisible() ? jcmp.ShowCursor() : jcmp.HideCursor();

                jcmp.CallEvent('spawnmenu/ui/toggleMenu', menu.isVisible());
                current_visible_menu = m;
            }

            $(window).keyup(function(event) {
                if (chat_input_state)
                    return false;

                const key = event.which;
                if (key === 117) {
                    toggleMenu(weapon_menu);
                } else if (key === 118) {
                    toggleMenu(vehicle_menu);
                }
            });
        }

    });
})(jQuery, document, window);
