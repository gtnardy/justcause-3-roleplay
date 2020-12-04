// audiosprite -f "howler" -e "ogg" *.ogg
var sprite = {
    "action1": [
      0,
      198990.65759637186
    ],
    "action2": [
      200000,
      173393.560090703
    ],
    "action3": [
      375000,
      255989.84126984124
    ],
    "action4": [
      632000,
      251897.32426303852
    ],
    "action5": [
      885000,
      279775.7823129252
    ],
    "action6": [
      1166000,
      260976.32653061236
    ],
    "action7": [
      1428000,
      268592.4716553288
    ],
    "action8": [
      1698000,
      240104.48979591843
    ],
    "air1": [
      1940000,
      215569.7052154196
    ],
    "air2": [
      2157000,
      230685.89569160985
    ],
    "air3": [
      2389000,
      230685.89569160985
    ],
    "calm1": [
      2621000,
      211645.5328798188
    ],
    "calm2": [
      2834000,
      197771.60997732426
    ],
    "calm3": [
      3033000,
      204011.9727891156
    ],
    "challenge-crash-the-bomb": [
      3239000,
      191955.01133786867
    ],
    "challenge-non-combat-timed": [
      3432000,
      191110.38548752823
    ],
    "challenge-race": [
      3625000,
      179334.96598639476
    ],
    "challenge-race-air": [
      3806000,
      190434.10430839003
    ],
    "challenge-race-delivery": [
      3998000,
      143776.5079365081
    ],
    "challenge-shooting-gallery": [
      4143000,
      60210.793650793676
    ],
    "challenge-wingsuit": [
      4205000,
      189183.12925170086
    ],
    "com-link-theme": [
      4396000,
      200055.87301587276,
      true
    ],
    "medici-theme": [
      4598000,
      111968.07256235843,
      true
    ],
    "standing1": [
      4711000,
      99493.1519274378
    ],
    "standing10": [
      4812000,
      56861.31519274386
    ],
    "standing2": [
      4870000,
      102082.1768707483
    ],
    "standing3": [
      4974000,
      48208.979591836396
    ],
    "standing4": [
      5024000,
      82795.10204081635
    ],
    "standing5": [
      5108000,
      59000.45351473909
    ],
    "standing6": [
      5169000,
      90971.42857142899
    ],
    "standing7": [
      5261000,
      50876.37188208646
    ],
    "standing8": [
      5313000,
      101646.80272108853
    ],
    "standing9": [
      5416000,
      101646.80272108853
    ],
    "standing-interlude1": [
      5519000,
      20080.907029478112
    ],
    "standing-interlude10": [
      5541000,
      27194.92063492089
    ],
    "standing-interlude11": [
      5570000,
      30532.789115646665
    ],
    "standing-interlude12": [
      5602000,
      40833.74149659903
    ],
    "standing-interlude13": [
      5644000,
      36050.43083900182
    ],
    "standing-interlude14": [
      5682000,
      46339.773242630145
    ],
    "standing-interlude15": [
      5730000,
      34747.21088435399
    ],
    "standing-interlude16": [
      5766000,
      42134.058956916306
    ],
    "standing-interlude17": [
      5810000,
      11562.086167800771
    ],
    "standing-interlude2": [
      5823000,
      11991.655328798515
    ],
    "standing-interlude3": [
      5836000,
      12775.32879818591
    ],
    "standing-interlude4": [
      5850000,
      34755.91836734657
    ],
    "standing-interlude5": [
      5886000,
      20443.71882086125
    ],
    "standing-interlude6": [
      5908000,
      15236.643990930133
    ],
    "standing-interlude7": [
      5925000,
      28437.188208617044
    ],
    "standing-interlude8": [
      5955000,
      22864.399092970416
    ],
    "standing-interlude9": [
      5979000,
      30132.244897959026
    ],
    "tense1": [
      6011000,
      363724.6258503401
    ],
    "tense2": [
      6376000,
      66700.77097505692
    ],
    "tense3": [
      6444000,
      61119.2743764168
    ],
    "tense4": [
      6507000,
      366952.1995464857
    ]
};

var howler = null;

var currentPlaying = null; // current group playing
var currentIdPlaying = null;
var timeoutNextToPlay = null;

var mutted = false;
var volume = 0;

var groups = {
    "idle": {
        cooldown: 15000,
        sprites: ["standing1", "standing2", "standing3", "standing4", "standing5", "standing6", "standing7", "standing8", "standing9", "standing-interlude1", "standing-interlude2", "standing-interlude3", "standing-interlude4", "standing-interlude5", "standing-interlude6", "standing-interlude7", "standing-interlude8", "standing-interlude9", "standing-interlude10", "standing-interlude11", "standing-interlude12", "standing-interlude13", "standing-interlude14", "standing-interlude15", "standing-interlude16", "standing-interlude17" ]
    },  // whatever
    "calm": {
        cooldown: 12000,
        sprites: ["calm1", "calm2", "calm3"]
    }, // cities
    "tense": {
        cooldown: 15000,
        sprites: ["tense1", "tense2", "tense3", "tense4"] // military bases
    },
    "challenge": {
        cooldown: 1000,
        sprites: ["challenge-crash-the-bomb", "challenge-non-combat-timed", "challenge-race", "challenge-race-air", "challenge-race-delivery", "challenge-shooting-gallery", "challenge-wingsuit"],
    },
    "air": {
        cooldown: 15000,
        sprites: ["air1", "air2", "air3"],
    },
    "action": {
        cooldown: 0,
        sprites: ["action1", "action2", "action3", "action4", "action5", "action6", "action7", "action8"],
    },
    "common": {
        cooldown: 1000,
        sprites: ["medici-theme", "com-link-theme"],
    },
};


jcmp.AddEvent("LocalPlayerLoaded4", function() {
	console.log("loading soundtrack");
	function playSoundtrack(group, defSprite) {
		if (!howler)
			return;
		
		if (timeoutNextToPlay) {
			clearTimeout(timeoutNextToPlay);
			timeoutNextToPlay = null;
		}

		if (currentIdPlaying)
			howler.fade(howler.volume(false, currentIdPlaying), 0, 6000, currentIdPlaying);

		currentPlaying = group;

		let sprite = defSprite || getRandomSprite(group);
		currentIdPlaying = howler.play(sprite);
		if (!mutted)
			howler.fade(0, volume, 5000, currentIdPlaying);
	}


	function getRandomSprite(group) {
		return groups[group].sprites[Math.floor(Math.random() * groups[group].sprites.length)];
	}


	function sountrackOnStop(id) {
		if (id != currentIdPlaying)
			return;

		let cooldown = groups[currentPlaying].cooldown;
		let timeout = Math.floor(Math.random() * cooldown) + cooldown;
		timeoutNextToPlay = setTimeout(function() {

			timeoutNextToPlay = null;
			playSoundtrack(currentPlaying);
		}, timeout);
	}


	jcmp.AddEvent('MuteSoundtrack', function(mute) {
		if (!howler)
			return;

		mutted = mute;
		if (mute) {
			howler.fade(howler.volume(false, currentIdPlaying), 0, 1000, currentIdPlaying);
		} else { 
			howler.fade(howler.volume(false, currentIdPlaying), volume, 4000, currentIdPlaying);
		}
	});


	jcmp.AddEvent('VolumeSoundtrack', function(v) {
		if (!howler)
			return;

		volume = v / 10;
		if (!mutted)
			howler.volume(volume, currentIdPlaying);
	});


	jcmp.AddEvent('PlaySoundtrack', function(group, defSprite) {
        playSoundtrack(group, defSprite);
	});

    howler = new Howl({
        src: ['http://justcauserp.com/audios/soundtrack.ogg'],
        sprite: sprite,
        html5: true,
        volume: 0,
        onstop   : sountrackOnStop,
        xhrWithCredentials: true,
	});
	
	howler.mobileAutoEnable = false;
	
	console.log("loaded");
});