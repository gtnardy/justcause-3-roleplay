// audiosprite -f "howler" -e "ogg" *.ogg

const stations = [
	{name: "Radio Off", url: null, duration: 0, enabled: true},
	// GTA-SA
	{name: "Playback FM", url: "playback-fm", duration: 2926, enabled: true},
	{name: "K-Rose", url: "k-rose", duration: 2631, enabled: true},
	{name: "K-DST", url: "k-dst", duration: 3747, enabled: true},
	{name: "Bounce FM", url: "bounce-fm", duration: 3900, enabled: true},
	{name: "SF-UR", url: "sf-ur", duration: 4216, enabled: true},
	{name: "Radio Los Santos", url: "radio-lossantos", duration: 3409, enabled: true},
	{name: "Radio X", url: "radio-x", duration: 3616, enabled: true},
	{name: "CSR 103.9", url: "csr", duration: 2833, enabled: true},
	{name: "K-Jah West", url: "kjah-west", duration: 3628, enabled: true},
	{name: "Master Sounds 98.3", url: "master-sounds", duration: 3550, enabled: true},
	{name: "WCTR", url: "wctr", duration: 7545, enabled: true},
	// Fallout New Vegas
	{name: "New Vegas", url: "newvegas", duration: 3925},
	{name: "Mojave", url: "mojave", duration: 2566},
];

const sprite = {
    "bounce-fm": [
      0,
      3900312.380952381
    ],
    "csr": [
      3902000,
      2832667.5736961453
    ],
    "k-dst": [
      6736000,
      3746700.770975058
    ],
    "k-rose": [
      10484000,
      2631054.5124716554
    ],
    "kjah-west": [
      13117000,
      3628284.8072562376
    ],
    "master-sounds": [
      16747000,
      3549940.68027211
    ],
    "mojave": [
      20298000,
      2566006.712018141
    ],
    "newvegas": [
      22866000,
      3924890.702947847
    ],
    "playback-fm": [
      26792000,
      2925945.034013606
    ],
    "radio-lossantos": [
      29719000,
      3408603.718820865
    ],
    "radio-x": [
      33129000,
      3615867.936507937
    ],
    "sf-ur": [
      36746000,
      4216420.136054425
    ],
    "wctr": [
      40964000,
      7545183.4920634935
    ]
};

const url = "http://justcauserp.com";

var howler = null;

var lastRadio = null;
var playingId = null;

var inVehicle = false;

var timeoutHtml = null;
var timeoutTurnOnRadio = null;
var timeoutSwitchStation = null;

jcmp.AddEvent("LocalPlayerLoaded", function() {

	if (howler)
		howler.unload();

	howler = new Howl({
		src: [`${url}/audios/radio.ogg`],
		sprite: sprite,
		html5: true,
		loop: true,
		preload: true,
		xhrWithCredentials: true,
		volume: 0.6
	});
	
	howler.on('fade', function() {
		howler.stop();
	});

    function switchRadioStation() {
		if (!howler)
			return;

		let stationData = stations[lastRadio];

		if (howler.playing())
			howler.stop();

		if (timeoutHtml)
			clearTimeout(timeoutHtml);

		if (timeoutSwitchStation)
			clearTimeout(timeoutSwitchStation);

		timeoutSwitchStation = null;
		
		if (!stationData) {
			howler.mute(true);
			return;
		}
		
		howler.mute(false);

		$('#radio-name').html(stationData.name);
		$('#radio').fadeIn(50);

		timeoutHtml = setTimeout(() => {
			$('#radio').fadeOut(50);
			timeoutHtml = null;
		}, 4000);

		jcmp.CallEvent("PlaySound", "radio-switch-tick");

		if (!stationData.url) {
			$('#radio-image').html("");
			return;
		}

		$('#radio-image').html(`<img src='images/${stationData.url}.png'/>`);
			
		timeoutSwitchStation = setTimeout(function(stDt) {
			jcmp.CallEvent("PlaySound", "radio-switch");

			playingId = howler.play(stDt.url);

			let globalDate = new Date();
			let seekPosition = (globalDate.getUTCHours() * 3600 + globalDate.getUTCMinutes() * 60 + globalDate.getUTCSeconds() + 1) % howler.duration(playingId);

			howler.seek(sprite[stDt.url][0] / 1000 + seekPosition, playingId);
			timeoutSwitchStation = null;
		}, 700, stationData);
	}
	
    jcmp.AddEvent("AddRadioStation", function(station) {
		stations[station].enabled = true;
	});
	
    jcmp.AddEvent("SwitchRadioStation", function(station) {
		lastRadio = station;
		if (howler.playing() || inVehicle)
			switchRadioStation();
	});

	jcmp.AddEvent("LocalPlayerVehicleEntered", function() {
		inVehicle = true;
		
		if (timeoutTurnOnRadio)
			clearTimeout(timeoutTurnOnRadio);
		timeoutTurnOnRadio = setTimeout(() => {
			timeoutTurnOnRadio = null;
			switchRadioStation();
		}, 1200);
	});


	jcmp.AddEvent("LocalPlayerVehicleExited", function() {
		inVehicle = false;
		if (timeoutTurnOnRadio)
			clearTimeout(timeoutTurnOnRadio);
		
		timeoutTurnOnRadio = null;

		if (howler.playing()) {
			if (playingId)
				howler.fade(howler.volume(), 0, 1000, playingId);
			else
				howler.stop();
		}
	});

	function prevStation(index) {
		if (index < 0)
			index = stations.length - 1;

		if (!stations[index].enabled) {
			prevStation(index - 1);
			return;
		}
		
		jcmp.CallEvent("RadioSwitched", index);
	}

	function nextStation(index) {
		if (index >= stations.length)
			index = 0;

		if (!stations[index].enabled) {
			nextStation(index + 1);
			return;
		}

		jcmp.CallEvent("RadioSwitched", index);
	}

	jcmp.AddEvent("KeyPress", function(key, allowed, arrayMenus) {
		if (!inVehicle || lastRadio === null)
			return;

		arrayMenus = JSON.parse(arrayMenus);
		if (arrayMenus.isChatOpened || arrayMenus.isInputTextOpened || arrayMenus.hasMenuOpened)
			return;

		if (key == 188) { // <
			prevStation(lastRadio - 1);
			return;
		}
			
		if (key == 190) { // >
			nextStation(lastRadio + 1);
			return;
		}
			
		if (key == 187 || key == 173) { // +
			howler.volume(howler.volume() + 0.1);
			return;
		}

		if (key == 189 || key == 61) { // -
			howler.volume(howler.volume() - 0.1);
			return;
		}
	});
	
	jcmp.AddEvent('UpdateHUD', function(args) {
		args = JSON.parse(args);
		if (typeof args.hideRadio !== 'undefined') {
			if (timeoutHtml)
				clearTimeout(timeoutHtml);
			timeoutHtml = null;

			$('#radio').hide();
		}
	});
});