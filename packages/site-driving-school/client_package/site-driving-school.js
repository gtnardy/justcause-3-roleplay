'use strict';

var testPaths = {
    "licenseCar": {
        startingPosition: new Vector3f(11527.5, 1266.5, 7528.4),
        startingRotation: new Vector3f(0, 1.2, 0),
        vehicleHash: 1866205445,
        checkpointRadius: 5,
        maxDamage: 10,
        limitTime: 300,
        checkpoints: [
            {position: new Vector3f(11560.1845703125, 1265.153564453125, 7516.40478515625), rotation: new Vector3f(-0.0037207002751529217, 1.2969201803207397, -0.00066894257906824)},
            {position: new Vector3f(11615.6337890625, 1262.8134765625, 7499.9365234375), rotation: new Vector3f(0.06906697899103165, 1.2971476316452026, 0.0026150585617870092)},
            {position: new Vector3f(11676.0673828125, 1256.44287109375, 7480.79638671875), rotation: new Vector3f(0.14354272186756134, 1.2446595430374146, 0.03323286771774292)},
            {position: new Vector3f(11721.634765625, 1251.50634765625, 7449.91455078125), rotation: new Vector3f(-0.04355631396174431, -0.17592307925224304, 0.06714732944965363)},
            {position: new Vector3f(11715.017578125, 1255.238037109375, 7395.36767578125), rotation: new Vector3f(0.00005106078606331721, 0.040550507605075836, -0.004240139387547)},
            {position: new Vector3f(11663.470703125, 1260.4149169921875, 7356.85107421875), rotation: new Vector3f(-0.11148231476545334, -1.6489943265914917, -0.002837532665580511)},
            {position: new Vector3f(11586.751953125, 1264.14794921875, 7360.4990234375), rotation: new Vector3f(0.0008927880553528666, -2.70503568649292, -0.002127251587808132)},
            {position: new Vector3f(11578.0634765625, 1264.4393310546875, 7401.66552734375), rotation: new Vector3f(0.0012079308507964015, -2.967860698699951, -0.000178070782567374)},
            {position: new Vector3f(11570.21484375, 1264.5279541015625, 7451.693359375), rotation: new Vector3f(-0.014141729101538658, 2.983842134475708, 0.0038450872525572777)},
            {position: new Vector3f(11594.7724609375, 1264.3038330078125, 7461.4189453125), rotation: new Vector3f(0.0041273231618106365, 1.287369966506958, -0.0002614328404888510)},
            {position: new Vector3f(11625.0576171875, 1264.4383544921875, 7443.8828125), rotation: new Vector3f(-0.0007845843792892992, 0.6515954732894897, 0.0350785106420517)},
            {position: new Vector3f(11627.4072265625, 1264.72412109375, 7412.8779296875), rotation: new Vector3f(-0.026284057646989822, -0.21565762162208557, 0.00145595241338014)},
            {position: new Vector3f(11595.72265625, 1264.6224365234375, 7387.16552734375), rotation: new Vector3f(0.009600583463907242, -1.4456647634506226, 0.0004610971955116838)},
            {position: new Vector3f(11560.5, 1264.435546875, 7401.06982421875), rotation: new Vector3f(0.0013140543596819043, -1.7333475351333618, -0.00213375524617731)},
            {position: new Vector3f(11520.1279296875, 1264.59521484375, 7416.412109375), rotation: new Vector3f(-0.007773888297379017, -2.0378637313842773, 0.009902973659336567)},
            {position: new Vector3f(11479.7431640625, 1264.6279296875, 7438.4853515625), rotation: new Vector3f(0.017963584512472153, -2.0954079627990723, -0.00390133960172534)},
            {position: new Vector3f(11450.9775390625, 1264.4749755859375, 7458.8544921875), rotation: new Vector3f(-0.0016119866631925106, -2.3863654136657715, -0.0117607917636632)},
            {position: new Vector3f(11441.7548828125, 1264.252197265625, 7508.9423828125), rotation: new Vector3f(0.0020767846144735813, 2.3045456409454346, -0.022469395771622658)},
            {position: new Vector3f(11471.64453125, 1265.0159912109375, 7503.66357421875), rotation: new Vector3f(-0.02624053694307804, 1.0506548881530762, -0.0006191338179633021)},
            {position: new Vector3f(11504.25390625, 1265.40869140625, 7487.07666015625), rotation: new Vector3f(-0.007723276969045401, 1.2550115585327148, -0.003039905568584799)},
            {position: new Vector3f(11527.1474609375, 1265.0821533203125, 7488.66455078125), rotation: new Vector3f(0.030762309208512306, 2.0658929347991943, -0.004942435305565596)},
            {position: new Vector3f(11541.18359375, 1264.989501953125, 7504.66650390625), rotation: new Vector3f(-0.02177928201854229, 2.732757329940796, 0.0001802406186470762)},
        ],
    },
    "licenseBike": {
        startingPosition: new Vector3f(11527.5, 1266.5, 7528.4),
        startingRotation: new Vector3f(0, 1.2, 0),
        vehicleHash: 2395818479,
        maxDamage: 10,
        checkpointRadius: 5,
        limitTime: 300,
        checkpoints: [
            {position: new Vector3f(11560.1845703125, 1265.153564453125, 7516.40478515625), rotation: new Vector3f(-0.0037207002751529217, 1.2969201803207397, -0.00066894257906824)},
            {position: new Vector3f(11615.6337890625, 1262.8134765625, 7499.9365234375), rotation: new Vector3f(0.06906697899103165, 1.2971476316452026, 0.0026150585617870092)},
            {position: new Vector3f(11676.0673828125, 1256.44287109375, 7480.79638671875), rotation: new Vector3f(0.14354272186756134, 1.2446595430374146, 0.03323286771774292)},
            {position: new Vector3f(11721.634765625, 1251.50634765625, 7449.91455078125), rotation: new Vector3f(-0.04355631396174431, -0.17592307925224304, 0.06714732944965363)},
            {position: new Vector3f(11715.017578125, 1255.238037109375, 7395.36767578125), rotation: new Vector3f(0.00005106078606331721, 0.040550507605075836, -0.004240139387547)},
            {position: new Vector3f(11663.470703125, 1260.4149169921875, 7356.85107421875), rotation: new Vector3f(-0.11148231476545334, -1.6489943265914917, -0.002837532665580511)},
            {position: new Vector3f(11586.751953125, 1264.14794921875, 7360.4990234375), rotation: new Vector3f(0.0008927880553528666, -2.70503568649292, -0.002127251587808132)},
            {position: new Vector3f(11578.0634765625, 1264.4393310546875, 7401.66552734375), rotation: new Vector3f(0.0012079308507964015, -2.967860698699951, -0.000178070782567374)},
            {position: new Vector3f(11570.21484375, 1264.5279541015625, 7451.693359375), rotation: new Vector3f(-0.014141729101538658, 2.983842134475708, 0.0038450872525572777)},
            {position: new Vector3f(11594.7724609375, 1264.3038330078125, 7461.4189453125), rotation: new Vector3f(0.0041273231618106365, 1.287369966506958, -0.0002614328404888510)},
            {position: new Vector3f(11625.0576171875, 1264.4383544921875, 7443.8828125), rotation: new Vector3f(-0.0007845843792892992, 0.6515954732894897, 0.0350785106420517)},
            {position: new Vector3f(11627.4072265625, 1264.72412109375, 7412.8779296875), rotation: new Vector3f(-0.026284057646989822, -0.21565762162208557, 0.00145595241338014)},
            {position: new Vector3f(11595.72265625, 1264.6224365234375, 7387.16552734375), rotation: new Vector3f(0.009600583463907242, -1.4456647634506226, 0.0004610971955116838)},
            {position: new Vector3f(11560.5, 1264.435546875, 7401.06982421875), rotation: new Vector3f(0.0013140543596819043, -1.7333475351333618, -0.00213375524617731)},
            {position: new Vector3f(11520.1279296875, 1264.59521484375, 7416.412109375), rotation: new Vector3f(-0.007773888297379017, -2.0378637313842773, 0.009902973659336567)},
            {position: new Vector3f(11479.7431640625, 1264.6279296875, 7438.4853515625), rotation: new Vector3f(0.017963584512472153, -2.0954079627990723, -0.00390133960172534)},
            {position: new Vector3f(11450.9775390625, 1264.4749755859375, 7458.8544921875), rotation: new Vector3f(-0.0016119866631925106, -2.3863654136657715, -0.0117607917636632)},
            {position: new Vector3f(11441.7548828125, 1264.252197265625, 7508.9423828125), rotation: new Vector3f(0.0020767846144735813, 2.3045456409454346, -0.022469395771622658)},
            {position: new Vector3f(11471.64453125, 1265.0159912109375, 7503.66357421875), rotation: new Vector3f(-0.02624053694307804, 1.0506548881530762, -0.0006191338179633021)},
            {position: new Vector3f(11504.25390625, 1265.40869140625, 7487.07666015625), rotation: new Vector3f(-0.007723276969045401, 1.2550115585327148, -0.003039905568584799)},
            {position: new Vector3f(11527.1474609375, 1265.0821533203125, 7488.66455078125), rotation: new Vector3f(0.030762309208512306, 2.0658929347991943, -0.004942435305565596)},
            {position: new Vector3f(11541.18359375, 1264.989501953125, 7504.66650390625), rotation: new Vector3f(-0.02177928201854229, 2.732757329940796, 0.0001802406186470762)},
        ],
    },
    "licenseHeli": {
        startingPosition: new Vector3f(10205.3369140625, 1421.849853515625, 7571.939453125),
        startingRotation: new Vector3f(0, -0.58, 0),
        vehicleHash: 1493705456,
        maxDamage: 10,
        checkpointRadius: 15,
        limitTime: 300,
        checkpoints: [
            {position: new Vector3f(10163.1455078125, 1443.3740234375, 7497.4716796875), rotation: new Vector3f(-0.0067719449289143085, -0.5549468994140625, 0.00356345553882420)},
            {position: new Vector3f(10108.8076171875, 1414.503173828125, 7413.08447265625), rotation: new Vector3f(0.22772860527038574, -0.587070643901825, -0.0003543031052686274)},
            {position: new Vector3f(10020.900390625, 1345.840576171875, 7279.99560546875), rotation: new Vector3f(0.4966863989830017, -0.5824013352394104, 0.000059254380175843835)},
            {position: new Vector3f(9916.416015625, 1252.4703369140625, 7121.43994140625), rotation: new Vector3f(0.4226432740688324, -0.5798839330673218, -0.0020196058321744204)},
            {position: new Vector3f(9768.693359375, 1149.052490234375, 6945.41259765625), rotation: new Vector3f(0.35703715682029724, -1.4566247463226318, -0.005672843661159277)},
            {position: new Vector3f(9598.365234375, 1152.747314453125, 6960.9150390625), rotation: new Vector3f(0.02779979258775711, -2.3721351623535156, 0.19544710218906403)},
            {position: new Vector3f(9532.3837890625, 1215.919189453125, 7111.25830078125), rotation: new Vector3f(-0.004555378574877977, 2.982573986053467, 0.0018301679519936442)},
            {position: new Vector3f(9512.916015625, 1261.4244384765625, 7328.67236328125), rotation: new Vector3f(-0.05904200300574303, -2.9016902446746826, 0.03942696750164032)},
            {position: new Vector3f(9478.5068359375, 1309.52587890625, 7493.75244140625), rotation: new Vector3f(0.14324870705604553, 3.088999032974243, 0.020007293671369553)},
            {position: new Vector3f(9541.470703125, 1364.6484375, 7656.2646484375), rotation: new Vector3f(-0.02287251688539982, 2.424611806869507, 0.01541871391236782)},
            {position: new Vector3f(9697.5966796875, 1428.267333984375, 7724.21484375), rotation: new Vector3f(0.0702454224228859, 1.2873421907424927, 0.003920002840459347)},
            {position: new Vector3f(9862.10546875, 1439.1876220703125, 7678.32275390625), rotation: new Vector3f(0.0017043881816789508, 1.19834303855896, -0.11463868618011475)},
            {position: new Vector3f(9963.4404296875, 1438.737060546875, 7611.3125), rotation: new Vector3f(0.19717441499233246, 0.9071975350379944, 0.010751216672360897)},
            {position: new Vector3f(10037.5556640625, 1438.305419921875, 7601.8046875), rotation: new Vector3f(0.23599202930927277, 2.092001438140869, -0.14634518325328827)},
            {position: new Vector3f(10164.326171875, 1428.7496337890625, 7680.244140625), rotation: new Vector3f(0.01359705813229084, 1.4371904134750366, 0.04150823503732681)},
            {position: new Vector3f(10253.4189453125, 1439.20166015625, 7618.2255859375), rotation: new Vector3f(-0.0041136969812214375, 0.449323445558548, 0.22730408608913422)},
            {position: new Vector3f(10230.041015625, 1442.28564453125, 7559.47705078125), rotation: new Vector3f(-0.0003056811401620507, -0.8070966005325317, 0.00556192919611930)},
        ],
    },
    "licensePlane": {
        startingPosition: new Vector3f(11110.59765625, 1199.145263671875, 4377.10205078125),
        startingRotation: new Vector3f(0, 1.5, 0),
        vehicleHash: 596249749,
        maxDamage: 10,
        checkpointRadius: 25,
        limitTime: 600,
        checkpoints: [
            {position: new Vector3f(11509.509765625, 1232.6444091796875, 4375.5439453125), rotation: new Vector3f(-0.3778851628303528, 1.5631576776504517, -0.004197312984615564)},
            {position: new Vector3f(11987.2421875, 1352.348388671875, 4387.10400390625), rotation: new Vector3f(-0.05758941173553467, 2.052513599395752, 0.15600956976413727)},
            {position: new Vector3f(12286.724609375, 1283.9722900390625, 4892.37939453125), rotation: new Vector3f(0.17197591066360474, 2.702350616455078, 0.01958766020834446)},
            {position: new Vector3f(12453.7109375, 1255.7901611328125, 5247.59033203125), rotation: new Vector3f(-0.11586330831050873, 2.698953866958618, -0.008216331712901592)},
            {position: new Vector3f(12549.6533203125, 1280.521484375, 5468.55859375), rotation: new Vector3f(-0.07998935133218765, 3.05676007270813, 0.0022337886039167643)},
            {position: new Vector3f(12483.3203125, 1292.69482421875, 5845.83935546875), rotation: new Vector3f(0.008106783963739872, -2.9170830249786377, -0.03762400522828102)},
            {position: new Vector3f(12375.525390625, 1274.0391845703125, 6365.6826171875), rotation: new Vector3f(0.05781557783484459, -2.7947866916656494, -0.07926273345947266)},
            {position: new Vector3f(12240.634765625, 1255.1986083984375, 6614.46337890625), rotation: new Vector3f(0.07619070261716843, -2.280726671218872, -0.052614886313676834)},
            {position: new Vector3f(11739.4833984375, 1245.389892578125, 6797.34375), rotation: new Vector3f(-0.34310010075569153, -2.0265953540802, -0.11550824344158173)},
            {position: new Vector3f(11516.126953125, 1311.0091552734375, 6891.24658203125), rotation: new Vector3f(-0.16313119232654572, -1.5246058702468872, 0.08765878528356552)},
            {position: new Vector3f(11201.3134765625, 1310.3587646484375, 6700.22021484375), rotation: new Vector3f(-0.08707843720912933, -0.8997741341590881, -0.04274085909128189)},
            {position: new Vector3f(10974.658203125, 1327.8870849609375, 6521.62109375), rotation: new Vector3f(-0.017802931368350983, -0.886264979839325, -0.04650556296110153)},
            {position: new Vector3f(10763.9462890625, 1346.2911376953125, 6356.06103515625), rotation: new Vector3f(-0.09545799344778061, -1.1096737384796143, -0.12138956040143967)},
            {position: new Vector3f(10425.447265625, 1349.6268310546875, 6297.064453125), rotation: new Vector3f(-0.019487900659441948, -1.5377377271652222, -0.03530389443039894)},
            {position: new Vector3f(10191.7314453125, 1353.2027587890625, 6288.69287109375), rotation: new Vector3f(-0.1053842157125473, -1.389520525932312, -0.040699269622564316)},
            {position: new Vector3f(10056.728515625, 1407.234130859375, 6222.60888671875), rotation: new Vector3f(-0.33414971828460693, -0.6988449692726135, 0.20587845146656036)},
            {position: new Vector3f(10001.751953125, 1443.3709716796875, 6097.38671875), rotation: new Vector3f(-0.19335812330245972, -0.1754487007856369, 0.10842816531658173)},
            {position: new Vector3f(9957.8056640625, 1497.117919921875, 5824.080078125), rotation: new Vector3f(-0.07156749069690704, -0.15265734493732452, 0.08499933034181595)},
            {position: new Vector3f(9908.021484375, 1476.8233642578125, 5524.07861328125), rotation: new Vector3f(0.027012569829821587, -0.1769838184118271, -0.05476371943950653)},
            {position: new Vector3f(9849.43359375, 1496.488525390625, 5228.08349609375), rotation: new Vector3f(-0.03958256170153618, -0.15813004970550537, -0.05934228375554085)},
            {position: new Vector3f(9825.005859375, 1488.1065673828125, 4960.484375), rotation: new Vector3f(0.03486158326268196, 0.3983966112136841, -0.07981052994728088)},
            {position: new Vector3f(9953.720703125, 1461.617431640625, 4833.13916015625), rotation: new Vector3f(0.3839174211025238, 1.256372094154358, -0.2239409238100052)},
            {position: new Vector3f(10098.0068359375, 1362.451904296875, 4787.955078125), rotation: new Vector3f(0.6497439742088318, 1.2625384330749512, -0.22282914817333221)},
            {position: new Vector3f(10214.5595703125, 1271.99169921875, 4748.08251953125), rotation: new Vector3f(0.47960397601127625, 1.1949901580810547, -0.1850748062133789)},
            {position: new Vector3f(10509.8525390625, 1211.1171875, 4602.88623046875), rotation: new Vector3f(0.022052794694900513, 1.0656683444976807, -0.1579078584909439)},
            {position: new Vector3f(10712.9482421875, 1233.7850341796875, 4502.30419921875), rotation: new Vector3f(-0.1479266881942749, 1.3653370141983032, -0.1258174180984497)},
            {position: new Vector3f(11004.708984375, 1230.2962646484375, 4436.0263671875), rotation: new Vector3f(-0.008515777997672558, 1.335640788078308, -0.04005388543009758)},
            {position: new Vector3f(11185.1435546875, 1230.5150146484375, 4392.58642578125), rotation: new Vector3f(-0.0028793683741241693, 1.454025387763977, -0.03625788912177086)},
        ],
    },
    "licenseSea": {
        startingPosition: new Vector3f(7485.564453125, 1023.999755859375, 9460.8359375),
        startingRotation: new Vector3f(0, 3, 0),
        vehicleHash: 1734594165,
        maxDamage: 10,
        checkpointRadius: 15,
        limitTime: 390,
        checkpoints: [
            {position: new Vector3f(7498.75048828125, 1024.0823974609375, 9542.6318359375), rotation: new Vector3f(-0.0017664628103375435, 2.9398324489593506, 0.022351305931806564)},
            {position: new Vector3f(7536.83984375, 1024.1490478515625, 9658.4765625), rotation: new Vector3f(0.010717501863837242, 2.5750620365142822, -0.09297279268503189)},
            {position: new Vector3f(7595.1474609375, 1024.8779296875, 9729.0341796875), rotation: new Vector3f(-0.025797858834266663, 2.161729574203491, -0.24170204997062683)},
            {position: new Vector3f(7686.56787109375, 1024.2835693359375, 9782.9365234375), rotation: new Vector3f(-0.03092522919178009, 1.9821213483810425, -0.10151305049657822)},
            {position: new Vector3f(7791.0751953125, 1024.698486328125, 9814.7841796875), rotation: new Vector3f(-0.07320472598075867, 1.4187332391738892, -0.30063530802726746)},
            {position: new Vector3f(7867.2939453125, 1024.204833984375, 9804.00390625), rotation: new Vector3f(-0.008342083543539047, 1.3581503629684448, 0.039750222116708755)},
            {position: new Vector3f(7928.306640625, 1024.318603515625, 9810.703125), rotation: new Vector3f(-0.08788295835256577, 2.2015743255615234, -0.09761661291122437)},
            {position: new Vector3f(7986.53125, 1024.290283203125, 9858.7958984375), rotation: new Vector3f(0.09315209090709686, 1.9630378484725952, -0.255939245223999)},
            {position: new Vector3f(8038.72314453125, 1025.261474609375, 9874.8046875), rotation: new Vector3f(-0.043625183403491974, 1.6185497045516968, -0.4048161804676056)},
            {position: new Vector3f(8089.84521484375, 1024.6400146484375, 9870.82421875), rotation: new Vector3f(-0.04051264747977257, 0.7624317407608032, -0.5942749381065369)},
            {position: new Vector3f(8113.10791015625, 1023.708984375, 9842.22265625), rotation: new Vector3f(-0.03472687304019928, 0.5757369995117188, 0.055254608392715454)},
            {position: new Vector3f(8132.95556640625, 1024.0771484375, 9803.26953125), rotation: new Vector3f(-0.0652376338839531, 0.04275545850396156, -0.33418282866477966)},
            {position: new Vector3f(8129.2744140625, 1024.0670166015625, 9716.0390625), rotation: new Vector3f(-0.011704462580382824, -0.3577624261379242, -0.2793939709663391)},
            {position: new Vector3f(8107.11962890625, 1024.0654296875, 9659.0703125), rotation: new Vector3f(-0.021199140697717667, -0.41857483983039856, -0.0554944425821304)},
            {position: new Vector3f(8073.3291015625, 1023.98974609375, 9584.470703125), rotation: new Vector3f(-0.024128085002303123, -0.389293372631073, 0.03762242570519447)},
            {position: new Vector3f(8048.98095703125, 1023.90966796875, 9522.28125), rotation: new Vector3f(0.0076691466383636, 0.08207079768180847, 0.48082607984542847)},
            {position: new Vector3f(8054.7802734375, 1023.9669799804688, 9473.8720703125), rotation: new Vector3f(-0.024486005306243896, 0.23585742712020874, 0.10842818021774292)},
            {position: new Vector3f(8066.00634765625, 1023.8552856445312, 9375.6103515625), rotation: new Vector3f(-0.023628002032637596, -0.11087208241224289, -0.0691775530576706)},
            {position: new Vector3f(8057.6943359375, 1024.0355224609375, 9314.5419921875), rotation: new Vector3f(-0.026343945413827896, -0.511394202709198, -0.1496412605047226)},
            {position: new Vector3f(8035.82470703125, 1024.5960693359375, 9280.1025390625), rotation: new Vector3f(-0.01724916510283947, -1.1506563425064087, -0.2711685001850128)},
            {position: new Vector3f(7995.251953125, 1024.3341064453125, 9262.8701171875), rotation: new Vector3f(-0.022638849914073944, -1.274458408355713, 0.003754751291126013)},
            {position: new Vector3f(7915.74609375, 1024.56591796875, 9239.90234375), rotation: new Vector3f(-0.053108181804418564, -1.258272647857666, 0.11730722337961197)},
            {position: new Vector3f(7829.63427734375, 1024.1873779296875, 9209.373046875), rotation: new Vector3f(0.015547175891697407, -1.206075668334961, 0.08202255517244339)},
            {position: new Vector3f(7756.56298828125, 1024.501953125, 9180.05078125), rotation: new Vector3f(-0.019543703645467758, -1.225191354751587, 0.03154492378234863)},
            {position: new Vector3f(7657.86865234375, 1024.3807373046875, 9157.72265625), rotation: new Vector3f(0.005241219885647297, -1.582680583000183, -0.03331470116972923)},
            {position: new Vector3f(7596.90234375, 1023.97021484375, 9161.763671875), rotation: new Vector3f(-0.2153131365776062, -2.0668463706970215, -0.31768351793289185)},
            {position: new Vector3f(7549.8544921875, 1023.2715454101562, 9191.486328125), rotation: new Vector3f(0.004262508824467659, -2.3082275390625, -0.05317218229174614)},
            {position: new Vector3f(7477.58544921875, 1024.245849609375, 9262.2578125), rotation: new Vector3f(-0.025044411420822144, -2.4113614559173584, -0.08698365092277527)},
            {position: new Vector3f(7440.5078125, 1024.205810546875, 9316.060546875), rotation: new Vector3f(-0.03569895029067993, -3.051785945892334, -0.5135177969932556)},
            {position: new Vector3f(7473.4814453125, 1024.218017578125, 9445.7890625), rotation: new Vector3f(0.012816771864891052, 2.9078712463378906, -0.015101560391485691)},
        ],
    },
};

var idHashes = [];
idHashes[1] = jcmp.licenses[4];
idHashes[2] = jcmp.licenses[6];
idHashes[3] = jcmp.licenses[8];
idHashes[4] = jcmp.licenses[9];
idHashes[5] = jcmp.licenses[16];

var testing = null;

jcmp.events.Add("CustomMenuPressed_drivingschool-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(7))
		return;
		
	if (args.bodyId == "DRIVINGSCHOOL_LIST")
		Buy(args.value, args.itemId);
});


function Buy(id, itemId) {
	
	let license = idHashes[id];
	
	if (jcmp.localPlayerData[license.id]) {
		jcmp.events.Call('UpdateCustomMenuItem', "DRIVINGSCHOOL_LIST", {notify: jcmp.languages.get("COMMON_ALREADY_OWN_IT"), error: true});
		return;
	}
	
	if (jcmp.localPlayerData.money < license.price) {
		jcmp.events.Call('UpdateCustomMenuItem', "DRIVINGSCHOOL_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

    jcmp.ui.CallEvent("CloseCustomMenu");
    jcmp.ui.CallEvent('PlaySound', "finished");

    testing = {
        testPath: testPaths[license.id],
        idLicense: license.id,
        currentCheckpoint: 0,
        timeSpent: testPaths[license.id].limitTime,
        lapsPassed: 0,
        maxVehicleHealth: 0,
        started: false,
        timeoutLeftVehicle: 20,
        toStart: false,
    };

	jcmp.ui.CallEvent("FlashBlackScreen", 3000);
    jcmp.events.Call("SetLocalPlayerValue", "testingDriving", 1);

    UpdateCheckpoints();
	jcmp.events.CallRemote('DrivingTestStart', license.price, jcmp.utils.vector3.stringify(testing.testPath.startingPosition), jcmp.utils.vector3.stringify(testing.testPath.startingRotation), testing.testPath.vehicleHash);
    jcmp.ui.CallEvent("SwitchRadioStation", 0);
    jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({hideMilitaryBases: true}));
}


jcmp.events.AddRemoteCallable("DrivingTestStarted", function(maxVehicleHealth, vehicleNetworkId) {
    testing.maxVehicleHealth = maxVehicleHealth;
    testing.vehicleNetworkId = vehicleNetworkId;

    jcmp.events.Call("SetAlertScreen", "ALERTSCREEN_DRIVING_TEST", jcmp.languages.get("DRIVINGSCHOOL_TEST_INSTRUCTOR"), jcmp.languages.get("DRIVINGSCHOOL_TEST_TEXT", [Math.floor(testing.testPath.limitTime / 60), 3]), 1);
});


jcmp.events.Add('AlertScreenSubmit', function(id, value) {
    if (id !== "ALERTSCREEN_DRIVING_TEST")
        return;
    
    testing.toStart = true;
});


function CompletedLap() {
    if (!jcmp.localPlayerData.vehicle) {
        Clear();
        return;
    }

    testing.currentCheckpoint = 0;

    let damage = testing.maxVehicleHealth - jcmp.localPlayerData.vehicle.health;
    testing.maxVehicleHealth = jcmp.localPlayerData.vehicle.health;

    if (damage > testPaths[testing.idLicense].maxDamage) {
        jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({countdown: "<span style='color: red;'>" + jcmp.languages.get("DRIVINGSCHOOL_TEST_INVALIDLAP") + "</span>", drivingTest: true}));
    } else {
        testing.lapsPassed++;
        jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({countdown: jcmp.languages.get("DRIVINGSCHOOL_TEST_VALIDLAP"), drivingTest: true}));
        if (testing.lapsPassed >= 3) {
            Completed();
        }
    }
}


function Completed() {
    jcmp.notifications.add(jcmp.languages.get("SITE_NAME_7"), jcmp.languages.get("DRIVINGSCHOOL_TEST_COMPLETED", [jcmp.languages.get("LICENSES_NAME_" + testing.idLicense)]), "license");
    jcmp.events.CallRemote("DrivingTestCompleted", testing.idLicense);
    jcmp.ui.CallEvent("PlaySound", "mission-complete");
    Clear();
}


function Clear() {
    jcmp.events.Call("SetLocalPlayerValue", "testingDriving", false);
	jcmp.ui.CallEvent('PlaySound', "close");
    jcmp.ui.CallEvent("UpdateRaceUI", null);
    jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null, hideMilitaryBases: false}));
    jcmp.ui.CallEvent("SwitchRadioStation", jcmp.localPlayerData.lastRadio);

	if (testing.checkpoint)
		testing.checkpoint.Destroy();

	if (testing.poi)
        testing.poi.Destroy();
    
    if (testing.nextPoi)
        testing.nextPoi.Destroy();

    testing = false;
}


function Timeout() {
    jcmp.notifications.add(jcmp.languages.get("SITE_NAME_7"), jcmp.languages.get("DRIVINGSCHOOL_TEST_DESCLASSIFIED"), "cancel", "cancel");
    jcmp.events.CallRemote("DrivingTestLeave");
    Clear();
}


jcmp.events.Add('CheckpointEnter', function(checkpoint) {
    if (!testing)
        return;
    
    if (checkpoint.id !== "CHECKPOINT_DRIVING_SCHOOL_TEST")
        return;
    
    testing.currentCheckpoint++;

    if (testing.currentCheckpoint >= testPaths[testing.idLicense].checkpoints.length) {
        CompletedLap();
    }

	jcmp.ui.CallEvent("PlaySound", "finished");
    UpdateCheckpoints();
});
  

function UpdateCheckpoints() {
	if (!testing)
		return;

	if (testing.checkpoint)
		testing.checkpoint.Destroy();

	if (testing.poi)
		testing.poi.Destroy();

	if (testing.nextPoi)
		testing.nextPoi.Destroy();

    let newCheckpoint = testing.testPath.checkpoints[testing.currentCheckpoint];
    let position = newCheckpoint.position;

	testing.checkpoint = new Checkpoint(1, 0x301477DB, position, newCheckpoint.rotation);
	testing.checkpoint.maxDistance = 16000;
	testing.checkpoint.radius = testing.testPath.checkpointRadius;
	testing.checkpoint.id = "CHECKPOINT_DRIVING_SCHOOL_TEST";

	testing.poi = new POI(25, position.add(new Vector3f(0, 2, 0)));
	testing.poi.minDistance = 2;
	testing.poi.maxDistance = 16000;
	testing.poi.text = "";
    testing.poi.clampedToScreen = true;
    
    if (testing.testPath.checkpoints[testing.currentCheckpoint + 1]) {
        testing.nextPoi = new POI(12, testing.testPath.checkpoints[testing.currentCheckpoint + 1].position.add(new Vector3f(0, 1, 0)));
        testing.nextPoi.minDistance = 2;
        testing.nextPoi.maxDistance = 16000;
        testing.nextPoi.text = "";
    }

    if (testing.started)
	    jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({checkpointLabel: testing.currentCheckpoint + " | " + testing.testPath.checkpoints.length, lapLabel: testing.lapsPassed + " | 3", drivingTest: true}));
}


jcmp.ui.AddEvent("TickSecond", function() {
    if (!testing)
        return;

    if (testing.toStart) {
        testing.toStart = false;
        testing.started = true;
        jcmp.events.Call("SetLocalPlayerValue", "testingDriving", 2);
        jcmp.ui.CallEvent('PlaySound', "beeplast");
        jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({countdown: "GO!", checkpointLabel: "0 | " + testing.testPath.checkpoints.length, lapLabel: "0 | 3", restartStopwatch: true, drivingTest: {minutes: Math.floor(testing.testPath.limitTime / 60), seconds: testing.testPath.limitTime % 60}}));
    }

    if (!testing.started)
        return;

    testing.timeSpent--;

    if (testing.timeSpent < 10) {
        jcmp.ui.CallEvent("UpdateRaceUI", JSON.stringify({drivingTest: {redTime: true}}));
        jcmp.ui.CallEvent("PlaySound", "beep");
        if (testing.timeSpent < 0) {
            Timeout();
            return;
        }
    }

    if (jcmp.localPlayerData.vehicle && jcmp.localPlayerData.vehicle.networkId === testing.vehicleNetworkId) {
        if (testing.timeoutLeftVehicle < 20)
            jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: null}));

        testing.timeoutLeftVehicle = 20;
    } else {

        testing.timeoutLeftVehicle--;

        jcmp.ui.CallEvent("UpdateHUD", JSON.stringify({alert: {
            label: jcmp.languages.get("HUD_ALERT"),
            text: jcmp.languages.get("HUD_BACK_VEHICLE"),
            time: testing.timeoutLeftVehicle <= 15 ? "00:" + ("0" + testing.timeoutLeftVehicle).slice(-2) : "",
        }}));

        if (testing.timeoutLeftVehicle <= 5) {

            jcmp.ui.CallEvent("PlaySound", "beep");
            if (testing.timeoutLeftVehicle <= 0) {
                Timeout();
                return;
            }
        }
    }

});


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 7) return;
	
	var menu = {
		id: "drivingschool-custom-menu",
		header: {title: jcmp.languages.get("SITE_NAME_7"), color: "#9b59b6"},
		body: {
			id: "DRIVINGSCHOOL_LIST",
			subheader: {txt: jcmp.languages.get("DRIVINGSCHOOL_MENU"), count: true},
			items: [],
		}
	};
	
	for (var id in idHashes) {
		
		let alreadyOwn = jcmp.localPlayerData[idHashes[id].id];

		let item = {
			id: "DRIVINGSCHOOL_BUY_" + id,
			txt: jcmp.languages.get("LICENSES_NAME_" + idHashes[id].id),
			subTxt: "$ " + idHashes[id].price,
			description: alreadyOwn ? jcmp.languages.get("COMMON_ALREADY_OWN_IT") : jcmp.languages.get("DRIVINGSCHOOL_DESCRIPTION_ITEM", [jcmp.languages.get("LICENSES_NAME_" + idHashes[id].id)]),
			disabled: alreadyOwn,
            value: id,
		};

		menu.body.items.push(item);
	}

	jcmp.events.Call('OpenCustomMenu', menu, true);
});