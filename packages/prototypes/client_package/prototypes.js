'use strict';


jcmp.chat = {
	formatSystemMessage: function(msg, r = 255, g = 255, b = 255) {
		msg = `<span class="message-body" style="color:rgb(${r},${g},${b});" id="m_">${msg}</span>`;
		
		let i = 0;
		let pos = msg.indexOf('[#');
		while (pos !== -1) {
			const start = pos;
			const end = pos + 8;

			if (msg.charAt(end) !== ']') {
				pos = msg.indexOf('[#', pos+1);
				continue;
			}

			const color = msg.substring(start + 1, end);
			let buf = msg.substr(0, start);
			if (i == 0)
				buf += `<font style="color: ${color}">`;
			else
				buf += `</font><font style="color: ${color}">`;
			
			buf += msg.substr(end + 1, msg.length);

			msg = buf;
			pos = msg.indexOf('[#', end);
			i++;
		}
		
		msg = msg + "</font>";
		
		return JSON.stringify({html: msg});
	},
	print: function(message, r = null, g = null, b = null) {
		jcmp.ui.CallEvent("chat_message", jcmp.chat.formatSystemMessage(message, r, g, b), r, g, b);
	},
	log: function(message) {
		jcmp.ui.CallEvent("chat_log", JSON.stringify(message));
	},
};


jcmp.events.AddRemoteCallable('chat_system_message', (message, r, g, b) => {
	jcmp.chat.print(message, r, g, b);
});


jcmp.notifications = {
	add: function(header, txt, type, sound) {
		jcmp.ui.CallEvent("AddNotification", header, txt, type, sound);
    },
    updatePrompt: function(header, txt, fadeOut) {
		jcmp.ui.CallEvent("UpdatePromptNotification", header, txt, fadeOut);
    },
    addPrompt: function(header, txt, type) {
		jcmp.ui.CallEvent("AddPromptNotification", header, txt, type);
    },
    clearPrompt: function() {
		jcmp.ui.CallEvent("ClearPromptNotification");
    }
};


jcmp.request = {
	requestRemote: function(id, playerId, textLabel, textParams) {
		jcmp.events.Call("RequestRemote", id, playerId, textLabel, textParams);
	}
};


jcmp.utils = {

	maskTime(miliseconds) {
		return miliseconds ? ("0" + Math.floor(miliseconds / 60000)).slice(-2) + ":" + ("0" + Math.floor(miliseconds / 1000) % 60).slice(-2) + "." + (miliseconds % 1000) : "--:--.--";
	},

	getRaceEvaluation(up, down) {
		return (up + down) > 0 ? (Math.floor(100 * up / (up + down))) + "%" : jcmp.languages.get("RACELOBBY_MENU_NEW");
	},

	checkIsVip(level) {
		if (!jcmp.localPlayerData.vip || level > jcmp.localPlayerData.vip) {
			jcmp.notifications.add(jcmp.languages.get("VIP"), jcmp.languages.get("COMMANDS_COMMAND_VIP_ONLY"), "cancel", "cancel");
			return false;
		}

		return true;
	},

	checkPermissions(level) {
		if (jcmp.localPlayerData.permissions < level) {
			jcmp.notifications.add(jcmp.languages.get("PERMISSION"), jcmp.languages.get("COMMANDS_COMMAND_NOT_PERMISSION"), "cancel", "cancel");
			return false;
		}

		return true;
    },

	checkInSite: function(idSite) {
		if (!jcmp.localPlayerData.sites[idSite])
			jcmp.notifications.add(jcmp.languages.get("SITE_NAME_" + idSite), jcmp.languages.get("SITE_NOT_IN", [jcmp.languages.get("SITE_NAME_" + idSite)]), "cancel", "cancel");

		return jcmp.localPlayerData.sites[idSite];
	},

	dailyWeather: [0, 0, 0, 0, 2, 1, 0, 0, 2, 3, 0, 0, 0, 4, 4, 0, 0, 0, 1, 2, 0, 0, 0, 5, 5, 0, 0, 0, 4, 2, 1, 0],

	getWeather: function() {
		let globalDate = new Date();
		return jcmp.utils.dailyWeather[globalDate.getUTCDate()];
	},
	
    getDate: function(str) {
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        if (str === "fullwseconds")
            return date.substring(0, 16); // "0000-00-00 00:00"

        if (str === "fullwtime")
            return date.substring(0, 10); // "0000-00-00"

        if (str === "time")
            return date.substring(11); // "00:00:00"

        if (str === "timewseconds")
            return date.substring(11, 16); // "00:00"
        
        return date; // "0000-00-00 00:00:00"
    },
	
	hex2rgba: function (colour) {
		colour = colour.replace('#', '');

		const r = parseInt(colour.substring(0, 2), 16);
		const g = parseInt(colour.substring(2, 4), 16);
		const b = parseInt(colour.substring(4, 6), 16);

		return new RGBA(r, g, b, 255);
	},

	vector3: {
        zero: new Vector3f(0, 0, 0),

		rotateY: function(vector, value) {
			let nVector3 = new Vector3f(vector.x, vector.y, vector.z);

			nVector3.y += value;

			if (nVector3.y < -Math.PI)
				nVector3.y = Math.PI + nVector3.y % Math.PI;
			else if (nVector3.y > Math.PI)
				nVector3.y = -(Math.PI - nVector3.y % Math.PI);

			return nVector3;
        },
        
        moveAngle: function(vector, angle, distance) {
            let nVector3 = new Vector3f(vector.x, vector.y, vector.z);
            
            nVector3.x += distance * Math.sin(-angle);
            nVector3.z += distance * Math.cos(angle);
            
            return nVector3;
        },

		distance: function(vector1, vector2) {
			return (vector1.sub(vector2)).length;
		},

		distance2d: function(vector1, vector2) {
			let vector2d1 = new Vector2f(vector1.x, vector1.z);
			let vector2d2 = new Vector2f(vector2.x, vector2.z);
			return (vector2d1.sub(vector2d2)).length;
		},

		parse: function(string) {
			let vectorArray = string.split(", ");

			if (vectorArray.length != 3) return null;

			let x = Number(vectorArray[0]),
				y = Number(vectorArray[1]),
				z = Number(vectorArray[2]);

			if (isNaN(x) || isNaN(y) || isNaN(z)) return null;

			return new Vector3f(x, y, z);
		},

		stringify: function(vector3) {
			return vector3.x + ", " + vector3.y + ", " + vector3.z;
		},
	},

	// DataTypes
	validateData: function(type, data) {
		switch(type) {
			case "panumber":
				data = Number(data);
				if (isNaN(data) || data <= 0)
					return null;
				break;

			case "number":
				data = Number(data);
				if (isNaN(data))
					return null;
				break;

			case "player":
				return jcmp.utils.player.get(data);

			case "oplayer":
				return jcmp.utils.player.getOther(data);

			case "cplayer":
				return jcmp.utils.player.getClose(data, 12);

			case "splayer":
				return jcmp.utils.player.getClose(data, 100);

			case "ccplayer":
				return jcmp.utils.player.getClose(data, 7);

			case "position":
				return jcmp.utils.vector3.parse(data);
		}

		return data;
	},

    // Player
    player: {
        getById: function(id) {
            for (let key in jcmp.playersData) {
                if (jcmp.playersData[key].networkId == id)
                    return jcmp.playersData[key];
            }
            return null;
        },

        getByName: function(str) {
            let regex = null;
            try {
                regex = new RegExp(str, "gi");
            } catch(e) {
                return null;
            }

            for (let key in jcmp.playersData) {
                if (jcmp.playersData[key].name && (jcmp.playersData[key].name).match(regex))
                    return jcmp.playersData[key];
            }
            return null;
        },

        get: function(search) {
            if (isNaN(search))
                return jcmp.utils.player.getByName(search);
            else
                return jcmp.utils.player.getById(search);
        },

        getOther: function(search) {
            let player = jcmp.utils.player.get(search);
            if (!player || player.networkId == jcmp.localPlayer.networkId)
                return null;

            return player;
        },

        getClose: function(search, distance) {
            let player = jcmp.utils.player.getOther(search);
            if (!player || !player.networkPlayer || !player.networkPlayer.position)
                return null;
            
            if (jcmp.utils.vector3.distance(player.networkPlayer.position, jcmp.localPlayer.position) <= distance)
                return player;
            
            return null;
        },
    },
};


jcmp.roleplayData = {money: 0, govBavarium: 0, rebelsBavarium: 0, govDomination: 0, rebelsDomination: 0, fuelValue: 0, bavariumValue: 0};
jcmp.playersData = {};

// Player
jcmp.localPlayerData = {};

jcmp.localPlayerData.magneticDetectorLevel = 0;
jcmp.localPlayerData.loaded = false;
jcmp.localPlayerData.soundtrackVolume = 0;
jcmp.localPlayerData.working = false;
jcmp.localPlayerData.vehicle = null;
jcmp.localPlayerData.seat = null;
jcmp.localPlayerData.language = "en";
jcmp.localPlayerData.wantedStars = [];
jcmp.localPlayerData.wantedStarsCount = 0;
jcmp.localPlayerData.weaponsData = {};
jcmp.localPlayerData.myRaces = [];
jcmp.localPlayerData.sites = {};
jcmp.localPlayerData.bankStatements = [];
jcmp.localPlayerData.experienceBonuses = {};
jcmp.localPlayerData.badges = {};

jcmp.localPlayerData.statsStamina = 0;
jcmp.localPlayerData.statsLungCapacity = 0;
jcmp.localPlayerData.statsFlying = 0;
jcmp.localPlayerData.statsDriving = 0;
jcmp.localPlayerData.statsStealth = 0;
jcmp.localPlayerData.statsStrength = 0;


jcmp.events.AddRemoteCallable('PlayerNotFound', function() {
	jcmp.notifications.add(jcmp.languages.get("", "COMMON_PLAYER_NOT_FOUND"), "cancel", "cancel");
});


jcmp.events.AddRemoteCallable('PlayerNotClose', function() {
	jcmp.notifications.add(jcmp.languages.get("", "COMMON_PLAYER_NOT_CLOSE"), "cancel", "cancel");
});
