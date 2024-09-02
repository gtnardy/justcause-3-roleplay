// audiosprite -f "howler" -e "ogg" *.ogg

const sprite = {
    "accept": [
      0,
      236.5532879818594
    ],
    "air-wrench": [
      2000,
      2047.7097505668933
    ],
    "beep": [
      6000,
      169.3197278911569
    ],
    "beeplast": [
      8000,
      2179.9999999999995
    ],
    "bite": [
      12000,
      512.2902494331072
    ],
    "blop": [
      14000,
      233.6507936507939
    ],
    "burping": [
      16000,
      309.11564625850474
    ],
    "bus-door": [
      18000,
      1634.1043083900217
    ],
    "camera-shutter": [
      21000,
      666.1224489795927
    ],
    "cancel": [
      23000,
      288.7981859410438
    ],
    "close-menu": [
      25000,
      175.60090702948017
    ],
    "close": [
      27000,
      465.351473922901
    ],
    "coins": [
      29000,
      1600.7256235827683
    ],
    "complete": [
      32000,
      4588.004535147391
    ],
    "death": [
      38000,
      7028.390022675737
    ],
    "defibrillator": [
      47000,
      1536.8707482993216
    ],
    "deny": [
      50000,
      222.04081632653327
    ],
    "digging": [
      52000,
      6140.226757369618
    ],
    "eating": [
      60000,
      5005.3514739229
    ],
    "end": [
      67000,
      465.3514739229081
    ],
    "finished": [
      69000,
      1132.0181405895653
    ],
    "fish": [
      72000,
      2988.117913832198
    ],
    "house-bell": [
      76000,
      3664.399092970527
    ],
    "liberated": [
      81000,
      755.9863945578229
    ],
    "little-beep": [
      83000,
      457.1428571428555
    ],
    "magic": [
      85000,
      2500.4988662131495
    ],
    "menulittle": [
      89000,
      358.68480725623897
    ],
    "menuswitch": [
      91000,
      289.31972789115434
    ],
    "metaldet1": [
      93000,
      210.4308390022709
    ],
    "metaldet2": [
      95000,
      187.2108843537461
    ],
    "metaldet3": [
      97000,
      222.04081632652617
    ],
    "metaldet4": [
      99000,
      187.2108843537461
    ],
    "metaldet5": [
      101000,
      303.31065759637
    ],
    "military-find-him": [
      103000,
      2645.623582766433
    ],
    "military-support-inbound": [
      107000,
      4799.27437641723
    ],
    "military-target-left": [
      113000,
      2988.117913832198
    ],
    "mission-complete": [
      117000,
      8256.145124716553
    ],
    "notification": [
      127000,
      737.3469387755165
    ],
    "open-menu": [
      129000,
      375.8730158730259
    ],
    "paper": [
      131000,
      616.7800453514758
    ],
    "police-blow": [
      133000,
      1243.7188208616874
    ],
    "police-radio": [
      136000,
      3345.1247165533005
    ],
    "police-walkaway": [
      141000,
      2438.0952380952294
    ],
    "radio-switch-tick": [
      145000,
      788.0272108843656
    ],
    "radio-switch": [
      147000,
      406.3492063492049
    ],
    "refill-gas": [
      149000,
      1783.5827664399062
    ],
    "ring": [
      152000,
      3049.0702947845703
    ],
    "run-up": [
      157000,
      6436.281179138319
    ],
    "spray": [
      165000,
      1458.503401360531
    ],
    "starting": [
      168000,
      4622.653061224497
    ],
    "switch": [
      174000,
      53.69614512471799
    ],
    "teleporting": [
      176000,
      944.7619047619185
    ],
    "town-liberated": [
      178000,
      6221.496598639447
    ],
    "trap": [
      186000,
      2009.9773242630476
    ],
    "trigger": [
      190000,
      187.2108843537319
    ],
    "trombonefail": [
      192000,
      5019.863945578237
    ],
    "vandoor": [
      199000,
      2004.172335600913
    ],
    "viva-medici-beg": [
      203000,
      5449.4331065759525
    ],
    "viva-medici-end": [
      210000,
      5519.092970521541
    ],
    "whip": [
      217000,
      570.3401360544262
    ]
};

var howler = null;

jcmp.AddEvent("LocalPlayerLoaded5", function() {
    function playSound(sound) {
        if (howler)
          	howler.play(sound);
    }
    
    function stopSound() {
        if (howler)
			howler.stop();
    }
    
    jcmp.AddEvent('PlaySound', function(sound) {
		playSound(sound);
    });
    
    jcmp.AddEvent('StopSound', function() {
		stopSound();
    });

    howler = new Howl({
        src: ['http://justcauserp.com/audios/custom-sounds.ogg'],
        sprite: sprite,
        html5: true,
        xhrWithCredentials: true,
	});
});