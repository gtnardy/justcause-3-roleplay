'use strict';

var Moment = require('moment');

jcmp.chat = {
	send: function(player, message, r = null, g = null, b = null) {
		jcmp.events.CallRemote("chat_system_message", player, message, r, g, b);
	},
	broadcast: function(...args) {
        jcmp.chat.send(null, ...args);
	},
};


jcmp.notifications = {
	send: function(player, header_label, txt_label, params, image, sound) {
		jcmp.events.CallRemote("AddNotification", player, header_label, txt_label, JSON.stringify(params), image, sound || "notification");
	},
	broadcast: function(...args) {
        jcmp.notifications.send(null, ...args);
	},
};


jcmp.console = {
	print: function(message) {
        let date = jcmp.utils.getDate("time");
		console.log(`[${date}]: ${message}`);
		jcmp.events.Call("console_message", `[${date}]: ${message}`);
	}
};


jcmp.discordOld = {
	print: function(message) {
		jcmp.events.Call("SendDiscordMessage", message);
	}
};


jcmp.utils = {
    validatePlayer: function(player) {
        return (typeof player != 'undefined' && player && player.client && player.client.steamId);
    },
	vector3: {
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
    
    player: {
        getById: function(id) {
            for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
                if (jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) && jcmp.loggedPlayers[p].loaded && jcmp.loggedPlayers[p].networkId == id)
                    return jcmp.loggedPlayers[p];
            }
            return false;
        },

        getByName: function(str) {
            let regex = null;
            try {
                regex = new RegExp(str, "gi");
            } catch(e) {
                return false;
            }

            for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
                if (jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) && jcmp.loggedPlayers[p].loaded && (jcmp.loggedPlayers[p].nname).match(regex))
                    return jcmp.loggedPlayers[p];
            }
            return false;
        },
    },

	dailyWeather: [0, 0, 0, 0, 2, 1, 0, 0, 2, 3, 0, 0, 0, 4, 4, 0, 0, 0, 1, 2, 0, 0, 0, 5, 5, 0, 0, 0, 4, 2, 1, 0],

	getWeather: function() {
		let globalDate = new Date();
		return jcmp.utils.dailyWeather[globalDate.getUTCDate()];
    },
    
    getDate: function(str) {
		switch(str) {
			case "fullwseconds":
				return Moment().utc().format("DD-MM-YYYY HH:mm");// "0000-00-00 00:00"
				
			case "fullwtime":
				return Moment().utc().format("DD-MM-YYYY"); // "0000-00-00"

			case "time":
				return Moment().utc().format("HH:mm:ss"); // "00:00:00"

			case "timewseconds":
				return Moment().utc().format("HH:mm"); // "00:00"
			
			default:
				return Moment().utc();				
		}
    },
};

// Player
jcmp.events.Add('PlayerDestroyedAfter', function(player) {
	if (!player.timeouts)
		return;

	for (let t in player.timeouts) {
		jcmp.console.print("cleaning timeout " + t + " from " + player.nname);
		clearTimeout(player.timeouts[t]);
	}
});


jcmp.events.Add('CreatePlayer', function(player) {
	
	jcmp.loggedPlayers.push(player);
	
	player.nname = player.name;
	player.loaded = false;
	player.working = false;
	player.discordAvatar = false;
	
	player.bankStatements = [];
	player.tags = [];
	player.timeouts = {};

	player.wantedStars = [];
    player.sites = [];
    player.experienceBonuses = {};
    player.badges = {};
	player.servicesCall = {};
	
    player.getJobLevel = function() {

        if ([1, 3, 5, 18].indexOf(this.idJob) != -1)
            return false;

        if (this.jobLevels && this.jobLevels[this.idJob])
            return this.jobLevels[this.idJob].level;
        
        return 1;
    };

	player.setValue = function(index, value) {
		this[index] = value;
		jcmp.events.Call('PlayerValueChange', this, index, value);
		jcmp.events.Call('PlayerValueChangeSave', this, index, value);
		jcmp.events.CallRemote('LocalPlayerValueChange', this, index, JSON.stringify(value));

		// whilelist
		if (index == "color" || index == "idJob" || index == "level" || index == "handcuffed") {
            if (this.loaded) {
                jcmp.events.CallRemote("PlayerValueChange", null, this.networkId, index, JSON.stringify(value));
                
                if (index == "idJob")
                    jcmp.events.CallRemote("PlayerValueChange", null, this.networkId, "jobLevel", JSON.stringify(this.getJobLevel()));
            }
            
		} else if (index == "nname") {
            jcmp.events.CallRemote('chat2/store_name', player, value);
            if (this.loaded)
			    jcmp.events.CallRemote("PlayerValueChange", null, this.networkId, "name", JSON.stringify(value));
		}
	};

	player.saveValue = function(index, value) {
		if (index != "position")
            this[index] = value;
            
		jcmp.events.Call('PlayerValueChange', this, index, value);
		jcmp.events.Call('PlayerValueChangeSave', this, index, value);
	};

	player.saveValues = function(values) {
		for (let index in values) {
			this[index] = values[index];
			jcmp.events.Call('PlayerValueChange', this, index, values[index]);
		}

		jcmp.events.Call('PlayerValuesChangeSave', this, values);
	};

	player.createValue = function(index, value) {
        if (this.loaded || index === "loaded") {
			if (index === "working") {
				if (value === false) {
					jcmp.SQL.query(
						"INSERT INTO LogPlayerJobSession SET ?",
						{
							idPlayer: player.client.steamId,
							idJob: player.workingJob,
							startedTime: player.workingStartedTime,
							endedTime: jcmp.utils.getDate(),
							data: player.working,
						},
						function(r) {},
						player
					);
	
					if (player.workingStartedTime)
						delete player.workingStartedTime;
	
					if (player.workingJob)
						delete player.workingJob;
				} else {
					player.workingStartedTime = jcmp.utils.getDate();
					player.workingJob = player.idJob;
				}
			} else if (index === "tags" || index === "afk" || index === "wantedStars" || index === "ping" || index === "badges" || index === "loaded")
                jcmp.events.CallRemote("PlayerValueChange", null, this.networkId, index, JSON.stringify(value));

            else if (index === "jobLevels")
                jcmp.events.CallRemote("PlayerValueChange", null, this.networkId, "jobLevel", JSON.stringify(this.getJobLevel()));
		}
		
        this[index] = value;
        
		jcmp.events.CallRemote('LocalPlayerValueChange', this, index, JSON.stringify(value));
        jcmp.events.Call('PlayerValueChange', this, index, value);
	};

	player.createValues = function(values) {
		for (let index in values) {
			this[index] = values[index];
			jcmp.events.Call('PlayerValueChange', this, index, values[index]);
		}

		jcmp.events.CallRemote('LocalPlayerValuesChange', this, JSON.stringify(values));
	};
});