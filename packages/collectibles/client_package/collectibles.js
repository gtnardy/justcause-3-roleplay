'use strict';

var cooldown = 0;

const collectiblesData = {
    "SHRINE": {
        count: 49, 
        image: "shrine",
    },
    "AUDIOTAPE": {
        count: 71, 
        image: "audio-tape",
    },
    "TREASURE": {
        count: 54, 
        image: "vintage-part",
    },
    "TOMB": {
        count: 23, 
        image: "ancient-tomb",
    },
};

const collectibles = [
    // Insula Fonte
    {type: "SHRINE", position: new Vector3f(7530, 1054, 4283)},
    {type: "SHRINE", position: new Vector3f(9705, 1186, 4335)},
    {type: "SHRINE", position: new Vector3f(8592, 1120, 5917)},
    {type: "SHRINE", position: new Vector3f(9601, 1234, 6186)},
    {type: "SHRINE", position: new Vector3f(8742, 1105, 5172)},
    {type: "SHRINE", position: new Vector3f(11107, 1138, 3901)},
    {type: "SHRINE", position: new Vector3f(11148, 1247, 4561)},
    {type: "SHRINE", position: new Vector3f(12322, 1125, 5451)},
    {type: "SHRINE", position: new Vector3f(12116, 1127, 6784)},
    {type: "SHRINE", position: new Vector3f(9071, 1095, 7865)},
    {type: "SHRINE", position: new Vector3f(10138, 1199, 8084)},
    {type: "SHRINE", position: new Vector3f(9891, 1127, 9147)},
    {type: "SHRINE", position: new Vector3f(10556, 1324, 8714)},
    {type: "SHRINE", position: new Vector3f(11331, 1291, 8835)},
    {type: "SHRINE", position: new Vector3f(11098, 1204, 7291)},
    {type: "SHRINE", position: new Vector3f(7148, 1105, 11984)},
    {type: "SHRINE", position: new Vector3f(6195, 1119, 13943)},
    {type: "SHRINE", position: new Vector3f(4860, 1146, 14826)},

    {type: "AUDIOTAPE", position: new Vector3f(12225, 1137, 6253)},
    {type: "AUDIOTAPE", position: new Vector3f(10945, 1198, 4967)},
    {type: "AUDIOTAPE", position: new Vector3f(11791, 1138, 4759)},
    {type: "AUDIOTAPE", position: new Vector3f(11536, 1123, 4543)},
    {type: "AUDIOTAPE", position: new Vector3f(11178, 1266, 4471)},
    {type: "AUDIOTAPE", position: new Vector3f(10245, 1063, 4034)},
    {type: "AUDIOTAPE", position: new Vector3f(9825, 1046, 3754)},
    {type: "AUDIOTAPE", position: new Vector3f(9627, 1177, 4740)},
    {type: "AUDIOTAPE", position: new Vector3f(8881, 1086, 5752)},
    {type: "AUDIOTAPE", position: new Vector3f(8430, 1092, 4634)},
    {type: "AUDIOTAPE", position: new Vector3f(7801, 1216, 5551)},
    {type: "AUDIOTAPE", position: new Vector3f(9481, 1098, 8985)},
    {type: "AUDIOTAPE", position: new Vector3f(10573, 1253, 7980)},
    {type: "AUDIOTAPE", position: new Vector3f(10846, 1051, 9178)},
    {type: "AUDIOTAPE", position: new Vector3f(11509, 1265, 7464)},
    {type: "AUDIOTAPE", position: new Vector3f(12970, 1149, 7849)},
    {type: "AUDIOTAPE", position: new Vector3f(9633, 1072, 10679)},
    {type: "AUDIOTAPE", position: new Vector3f(9336, 1031, 11336)},
    {type: "AUDIOTAPE", position: new Vector3f(9327, 1027, 11914)},
    {type: "AUDIOTAPE", position: new Vector3f(8914, 1028, 12405)},

    {type: "TREASURE", position: new Vector3f(7403, 1030, 5254)},
    {type: "TREASURE", position: new Vector3f(7609, 1098, 5520)},
    {type: "TREASURE", position: new Vector3f(9027, 1074, 4356)},
    {type: "TREASURE", position: new Vector3f(9238, 1222, 5748)},
    {type: "TREASURE", position: new Vector3f(9742, 1076, 6892)},
    {type: "TREASURE", position: new Vector3f(10102, 1293, 4930)},
    {type: "TREASURE", position: new Vector3f(10814, 1028, 3801)},
    {type: "TREASURE", position: new Vector3f(11230, 1195, 5108)},
    {type: "TREASURE", position: new Vector3f(11363, 1580, 5935)},
    {type: "TREASURE", position: new Vector3f(8633, 1024, 7860)},
    {type: "TREASURE", position: new Vector3f(11232, 1093, 8062)},
    {type: "TREASURE", position: new Vector3f(4066, 1026, 14858)},
    {type: "TREASURE", position: new Vector3f(4809, 1026, 15043)},
    {type: "TREASURE", position: new Vector3f(5636, 1037, 14417)},
    {type: "TREASURE", position: new Vector3f(7513, 1026, 13086)},
    {type: "TREASURE", position: new Vector3f(9327, 1097, 12159)},
    {type: "TREASURE", position: new Vector3f(8616, 1027, 10450)},
    {type: "TREASURE", position: new Vector3f(10391, 1028, 10770)},

    // Insula Dracon
    {type: "SHRINE", position: new Vector3f(-2321, 1170, 2049)},
    {type: "SHRINE", position: new Vector3f(-1803, 1026, 2989)},
    {type: "SHRINE", position: new Vector3f(-624, 1123, 3944)},
    {type: "SHRINE", position: new Vector3f(-229, 1050, 2322)},
    {type: "SHRINE", position: new Vector3f(854, 1068, 3792)},
    {type: "SHRINE", position: new Vector3f(1842, 1099, 4136)},
    {type: "SHRINE", position: new Vector3f(-394, 1031, 5524)},
    {type: "SHRINE", position: new Vector3f(-1105, 1071, 7474)},
    {type: "SHRINE", position: new Vector3f(571, 1060, 6378)},
    {type: "SHRINE", position: new Vector3f(1304, 1330, 5783)},

    {type: "AUDIOTAPE", position: new Vector3f(-1542, 1086, 4105)},
    {type: "AUDIOTAPE", position: new Vector3f(-1379, 1177, 3649)},
    {type: "AUDIOTAPE", position: new Vector3f(-937, 1039, 1111)},
    {type: "AUDIOTAPE", position: new Vector3f(-435, 1134, 2363)},
    {type: "AUDIOTAPE", position: new Vector3f(944, 1031, 1336)},
    {type: "AUDIOTAPE", position: new Vector3f(1298, 1090, 2765)},
    {type: "AUDIOTAPE", position: new Vector3f(-1600, 1129, 5582)},
    {type: "AUDIOTAPE", position: new Vector3f(-1438, 1026, 5898)},
    {type: "AUDIOTAPE", position: new Vector3f(-501, 1046, 5701)},
    {type: "AUDIOTAPE", position: new Vector3f(470, 1257, 5832)},
    {type: "AUDIOTAPE", position: new Vector3f(1191, 1332, 5758)},
    {type: "AUDIOTAPE", position: new Vector3f(2081, 1043, 5074)},

    {type: "TREASURE", position: new Vector3f(-1030, 1024, 1103)},
    {type: "TREASURE", position: new Vector3f(-1404, 1510, 1308)},
    {type: "TREASURE", position: new Vector3f(-2606, 1159, 2744)},
    {type: "TREASURE", position: new Vector3f(985, 1025, 1127)},
    {type: "TREASURE", position: new Vector3f(968, 1097, 3430)},
    {type: "TREASURE", position: new Vector3f(-1883, 1069, 4734)},
    {type: "TREASURE", position: new Vector3f(-1192, 1030, 4766)},
    {type: "TREASURE", position: new Vector3f(-762, 1029, 5068)},
    {type: "TREASURE", position: new Vector3f(-2304, 1066, 8253)},
    {type: "TREASURE", position: new Vector3f(-1691, 1266, 7190)},
    {type: "TREASURE", position: new Vector3f(289, 1085, 8051)},
    {type: "TREASURE", position: new Vector3f(560, 1151, 7420)},
    {type: "TREASURE", position: new Vector3f(1323, 1026, 5620)},
    {type: "TREASURE", position: new Vector3f(1947, 1133, 4623)},

    // {type: "GUNCAMPFIRE", position: new Vector3f(-1601, 1026, 6955)},

    // Insula Striate
    {type: "TOMB", position: new Vector3f(-4366, 1448, -8197)},
    {type: "TOMB", position: new Vector3f(-2681, 1180, -8976)},
    {type: "TOMB", position: new Vector3f(-1004, 1397, -7642)},
    {type: "TOMB", position: new Vector3f(-2262, 1227, -7709)},
    {type: "TOMB", position: new Vector3f(-142, 1713, -7148)},
    {type: "TOMB", position: new Vector3f(-1511, 1264, -5590)},
    {type: "TOMB", position: new Vector3f(-4853, 1162, -2075)},
    {type: "TOMB", position: new Vector3f(-3532, 1963, -2229)},
    {type: "TOMB", position: new Vector3f(1075, 1351, -4554)},
    {type: "TOMB", position: new Vector3f(1154, 1317, -2987)},
    {type: "TOMB", position: new Vector3f(2742, 1560, -4460)},
    {type: "TOMB", position: new Vector3f(3720, 1864, -1773)},
    {type: "TOMB", position: new Vector3f(4119, 1260, -4575)},
    {type: "TOMB", position: new Vector3f(5574, 1328, 422)},
    {type: "TOMB", position: new Vector3f(6639, 1268, -3805)},
    {type: "TOMB", position: new Vector3f(7231, 1576, -4406)},
    {type: "TOMB", position: new Vector3f(13662, 1801, -4031)},
    {type: "TOMB", position: new Vector3f(15106, 1602, -3148)},
    {type: "TOMB", position: new Vector3f(12125, 1046, -12948)},
    {type: "TOMB", position: new Vector3f(12847, 1779, -10887)},
    {type: "TOMB", position: new Vector3f(8087, 1611, -11299)},
    {type: "TOMB", position: new Vector3f(8166, 1932, -9883)},
    {type: "TOMB", position: new Vector3f(9725, 1965, -9322)},

    {type: "SHRINE", position: new Vector3f(-4258, 1403, -8294)},
    {type: "SHRINE", position: new Vector3f(-4232, 1345, -5748)},
    {type: "SHRINE", position: new Vector3f(-770, 1132, -8037)},
    {type: "SHRINE", position: new Vector3f(-1770, 1506, -3795)},
    {type: "SHRINE", position: new Vector3f(2550, 1289, -1882)},
    {type: "SHRINE", position: new Vector3f(5134, 1145, 538)},
    {type: "SHRINE", position: new Vector3f(4620, 1562, -3214)},
    {type: "SHRINE", position: new Vector3f(4858, 1056, -5038)},
    {type: "SHRINE", position: new Vector3f(13476, 1676, -10377)},
    {type: "SHRINE", position: new Vector3f(9240, 2607, -8359)},
    {type: "SHRINE", position: new Vector3f(12710, 2515, -8297)},
    {type: "SHRINE", position: new Vector3f(8582, 1429, -2257)},
    {type: "SHRINE", position: new Vector3f(9422, 1413, 701)},
    {type: "SHRINE", position: new Vector3f(12216, 1161, 2677)},
    {type: "SHRINE", position: new Vector3f(11724, 1123, 2175)},
    {type: "SHRINE", position: new Vector3f(10639, 1357, 659)},
    {type: "SHRINE", position: new Vector3f(14127, 1169, 1101)},
    {type: "SHRINE", position: new Vector3f(12297, 2086, -3237)},
    {type: "SHRINE", position: new Vector3f(12421, 2091, -3319)},
    {type: "SHRINE", position: new Vector3f(11491, 2266, -2125)},
    {type: "SHRINE", position: new Vector3f(13772, 1533, -2136)},

    {type: "AUDIOTAPE", position: new Vector3f(-4686, 1049, -6707)},
    {type: "AUDIOTAPE", position: new Vector3f(-1878, 1244, -7230)},
    {type: "AUDIOTAPE", position: new Vector3f(-1152, 1255, -6550)},
    {type: "AUDIOTAPE", position: new Vector3f(-133, 1432, -4973)},
    {type: "AUDIOTAPE", position: new Vector3f(-1028, 1926, -1942)},
    {type: "AUDIOTAPE", position: new Vector3f(-3942, 1037, -699)},
    {type: "AUDIOTAPE", position: new Vector3f(-1292, 1089, -298)},
    {type: "AUDIOTAPE", position: new Vector3f(-1116, 1038, -107)},
    {type: "AUDIOTAPE", position: new Vector3f(2341, 1238, -5250)},
    {type: "AUDIOTAPE", position: new Vector3f(3091, 1541, -4185)},
    {type: "AUDIOTAPE", position: new Vector3f(7269, 1521, -11765)},
    {type: "AUDIOTAPE", position: new Vector3f(5676, 1739, -9944)},
    {type: "AUDIOTAPE", position: new Vector3f(6599, 1971, -7146)},
    {type: "AUDIOTAPE", position: new Vector3f(5428, 1031, -5177)},
    {type: "AUDIOTAPE", position: new Vector3f(12657, 1725, -10591)},
    {type: "AUDIOTAPE", position: new Vector3f(14472, 1320, -8551)},
    {type: "AUDIOTAPE", position: new Vector3f(10340, 4012, -6281)},
    {type: "AUDIOTAPE", position: new Vector3f(4326, 1574, -2610)},
    {type: "AUDIOTAPE", position: new Vector3f(8628, 1433, -2225)},
    {type: "AUDIOTAPE", position: new Vector3f(14419, 1209, -782)},
    {type: "AUDIOTAPE", position: new Vector3f(13535, 1042, 1095)},
    {type: "AUDIOTAPE", position: new Vector3f(13199, 1061, 1297)},
    {type: "AUDIOTAPE", position: new Vector3f(11509, 1355, 551)},
    {type: "AUDIOTAPE", position: new Vector3f(10536, 1069, 2031)},
    {type: "AUDIOTAPE", position: new Vector3f(10363, 1062, 1935)},
    {type: "AUDIOTAPE", position: new Vector3f(8705, 1489, -162)},
    {type: "AUDIOTAPE", position: new Vector3f(7881, 1068, 1755)},
    {type: "AUDIOTAPE", position: new Vector3f(7819, 1081, 2059)},
    {type: "AUDIOTAPE", position: new Vector3f(1447, 1067, -1726)},
    {type: "AUDIOTAPE", position: new Vector3f(4196, 1540, -1067)},
    {type: "AUDIOTAPE", position: new Vector3f(2471, 1238, -817)},
    {type: "AUDIOTAPE", position: new Vector3f(3307, 1067, 904)},
    {type: "AUDIOTAPE", position: new Vector3f(4518, 1062, 1190)},
    {type: "AUDIOTAPE", position: new Vector3f(5497, 1119, 1708)},
    {type: "AUDIOTAPE", position: new Vector3f(6476, 1165, 1703)},
    {type: "AUDIOTAPE", position: new Vector3f(5738, 1189, 2151)},
    {type: "AUDIOTAPE", position: new Vector3f(3638, 1147, 1157)},
    {type: "AUDIOTAPE", position: new Vector3f(2899, 1098, 1455)},
    {type: "AUDIOTAPE", position: new Vector3f(2400, 1081, 792)},

    {type: "TREASURE", position: new Vector3f(-4870, 1329, -7105)},
    {type: "TREASURE", position: new Vector3f(-3372, 1626, -2995)},
    {type: "TREASURE", position: new Vector3f(227, 1814, -7184)},
    {type: "TREASURE", position: new Vector3f(-762, 1491, -3533)},
    {type: "TREASURE", position: new Vector3f(479, 1068, -686)},
    {type: "TREASURE", position: new Vector3f(3613, 1104, -11378)},
    {type: "TREASURE", position: new Vector3f(7445, 1504, -11544)},
    {type: "TREASURE", position: new Vector3f(9969, 1029, -12712)},
    {type: "TREASURE", position: new Vector3f(11753, 1947, 10639)},
    {type: "TREASURE", position: new Vector3f(5139, 1401, -7324)},
    {type: "TREASURE", position: new Vector3f(6490, 2179, -8400)},
    {type: "TREASURE", position: new Vector3f(10163, 3628, -6754)},
    {type: "TREASURE", position: new Vector3f(10717, 3048, -6655)},
    {type: "TREASURE", position: new Vector3f(15095, 1055, -7507)},
    {type: "TREASURE", position: new Vector3f(15075, 1105, -6033)},
    {type: "TREASURE", position: new Vector3f(8365, 1788, -4829)},
    {type: "TREASURE", position: new Vector3f(8754, 1378, -3278)},
    {type: "TREASURE", position: new Vector3f(12301, 1854, -4085)},
    {type: "TREASURE", position: new Vector3f(10673, 1764, -1275)},
    {type: "TREASURE", position: new Vector3f(13956, 1027, -1580)},
    {type: "TREASURE", position: new Vector3f(8543, 1388, 1533)},
    {type: "TREASURE", position: new Vector3f(12661, 1104, 2301)},


];


jcmp.ui.AddEvent("TickSecond", function() {
    if (jcmp.localPlayer.baseState == "4008081798" || jcmp.localPlayer.baseState == "2929123160" || jcmp.localPlayer.baseState == "4207695588" || jcmp.localPlayer.baseState == "3050711091") {
        useCollectible();
    }
    
    if (cooldown > 0)
        cooldown--;
});


function useCollectible() {
    if (cooldown > 0)
        return;

    cooldown = 5;
    
    let collectibleIndex = false;

    for (let c = 0; c < collectibles.length; c++) {
        if (jcmp.utils.vector3.distance(jcmp.localPlayer.position, collectibles[c].position) < 5) {
            collectibleIndex = c;
            break;
        }
    }

    if (collectibleIndex === false)
        return;
    
    if (getPlayerCollectible(collectibleIndex)) {
		jcmp.notifications.add("", jcmp.languages.get("COLLECTIBLES_ALREADY_GOT"), collectiblesData[collectibles[collectibleIndex].type].image, false);
        return;
    }
    
    setPlayerCollectible(collectibleIndex);
}


function getPlayerCollectible(index) {
    return jcmp.localPlayerData.collectibles.charAt(index) != "0";
}


function setPlayerCollectible(index) {
    let collectibleCount = 1;
    let collectibleType = collectibles[index].type;
    let playerCollectibles = jcmp.localPlayerData.collectibles;

    for (let c = 0; c < playerCollectibles.length; c++) {
        if (playerCollectibles[c] == "1" && collectibles[c].type == collectibleType)
        collectibleCount++;
    }

    jcmp.notifications.add("", jcmp.languages.get("COLLECTIBLES_" + collectibleType + "_GET", [collectibleCount, collectiblesData[collectibleType].count]), collectiblesData[collectibleType].image, false);

    jcmp.events.CallRemote("SetAttribute", jcmp.localPlayer.networkId, "collectibles", jcmp.localPlayerData.collectibles.substr(0, index) + 1 + jcmp.localPlayerData.collectibles.substr(index + 1));

    jcmp.events.CallRemote("FoundCollectible", collectibles[index].type);
}