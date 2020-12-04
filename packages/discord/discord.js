const Discord = require('discord.js');


const ServerChat = new Discord.WebhookClient('CENSORED', 'CENSORED');

const config = {
	channels: {
		serverChat: '355841616667344906',
		staffChat: '371362477721780224',
		botCommands: '463120140448432128',
	},
	roles: {
		verifiedMember: '463327394720120832',
		vip: '341724664466243588',
	},
	token: "CENSORED",
};

jcmp.discord = {
	guild: null,
	channels: {
		serverChat: null,
		staffChat: null,
		botCommands: null,
	}
};

var DiscordClient;

function StartDiscordClient() {

	console.log("Starting...");

	if (DiscordClient)
		DiscordClient.destroy();

	DiscordClient = new Discord.Client();

	DiscordClient.on('error', (e) => console.error(e));

	DiscordClient.on("warn", (e) => console.warn(e));
		
	DiscordClient.on('disconnect', () => {
		console.log("Discord disconnected!");

		jcmp.discordOld.print("**Discord Disconnected!**");

		if (reconnectTimeout)
			clearTimeout(reconnectTimeout);

		if (updateTopicInterval)
			clearInterval(updateTopicInterval);

		reconnectTimeout = setTimeout(function() {
			StartDiscordClient();
			reconnectTimeout = null;
		}, 1000);
	});

	DiscordClient.on('ready', () => {
		console.log("Discord ready!");
		// config
		jcmp.discord.guild = DiscordClient.guilds.first();

		// let syed = jcmp.discord.guild.members.get('249882662590873621');
		// console.log (syed.id);

		jcmp.discord.channels.serverChat = jcmp.discord.guild.channels.get(config.channels.serverChat);
		jcmp.discord.channels.staffChat = jcmp.discord.guild.channels.get(config.channels.staffChat);
		jcmp.discord.channels.botCommands = jcmp.discord.guild.channels.get(config.channels.botCommands);

		updateServerChatTopic();
		
		if (updateTopicInterval)
			clearInterval(updateTopicInterval);
			
		updateTopicInterval = setInterval(function() {updateServerChatTopic()}, 60000);

		jcmp.discordOld.print("**Server Started!**");
	});

	DiscordClient.on('message', msg => {
		if (msg.author.bot)
			return;
		
		switch(msg.channel.id) {
			case config.channels.botCommands:
				handleBotCommands(msg);
				break;

			case config.channels.serverChat:
				handleServerChat(msg);
				break;
		}

	});

	DiscordClient.login(config.token).catch(console.error);
}

var reconnectTimeout, updateTopicInterval;

function updateServerChatTopic() {
	if (!jcmp.loggedPlayers)
		return;
		
	jcmp.discord.channels.serverChat.setTopic(`${jcmp.loggedPlayers.length}/${JSON.parse(jcmp.server.config).maxPlayers} players currently online | Current tick rate: ${jcmp.server.currentTickRate} | Last update: ${jcmp.utils.getDate("fullwseconds")}`)
}

function handleBotCommands(msg) {
	if (msg.content.charAt(0) != "!")
		return;

	const args = msg.content.slice(1).trim().split(/ +/g);

	switch (args[0]) {
		case "linkaccount":

			linkaccount(msg, args[1]);
			break;
	}

	return;
}

function handleServerChat(msg) {
	jcmp.chat.broadcast("[DISCORD] " + (msg.member.nick || msg.member.user.username) + ": " + msg.content);
}

function linkaccount(msg, code) {
	msg.delete();

	if (!code) {
		msg.reply("correct usage:```!linkaccount [YOUR SPECIAL CODE]```");
		return;
	}

	if (code.length > 8 || code.length < 5) {
		msg.reply("wrong code format!");
		return;
	}

	let namePart = (code.slice(0, Math.min(code.length - 4, 4)).toUpperCase()).replace("_", " ");
	let idPart = code.slice(-4);

	jcmp.SQL.query(
		"SELECT id, nname, discordId FROM Player WHERE SUBSTRING(id, 14, 4) = ? AND UPPER(SUBSTRING(nname, 1, 4)) = ?",
		[idPart, namePart],
		function (results) {
			if (results.length == 0) {
				msg.reply("invalid code!");
				return;
			}

			let playerData = results[0];

			if (playerData.discordId) {
				msg.reply("this account is already associated with a Discord account.");
				return;
			}

			jcmp.SQL.query(
				"UPDATE Player SET discordId = ? WHERE id = ?",
				[msg.author.id, playerData.id],
				function (update) {

					jcmp.events.Call("SetPlayerOfflineMoneyBank", playerData.id, 5000, "Discord Assoc.");
					
					jcmp.notifications.broadcast("DISCORD", "ROLEPLAY_DISCORD_ACCOUNT_ASSOCIATED", [playerData.nname], "discord");

					let player;
					for (let p = 0; p < jcmp.loggedPlayers.length; p++) {
						if (!jcmp.utils.validatePlayer(jcmp.loggedPlayers[p]) || !jcmp.loggedPlayers[p].loaded)
							continue;

						if (jcmp.loggedPlayers[p].client.steamId == playerData.id) {
							player = jcmp.loggedPlayers[p];

							player.createValue("discordId", msg.author.id);
							player.createValue("discordCode", null);
							
							player.badges["BADGE_DISCORD"] = true;
							player.createValue("badges", player.badges);
							break;
						}
					}

					msg.guild.fetchMember(msg.author)
						.then(function(member) {
							;
							member.setNickname(playerData.nname)
								.then(function(r) { 
									console.log("setting " + playerData.nname + " " + r);
								})
								.catch(function(e) {
									console.log("error setting " + playerData.nname + " " + e);
								});
								
							member.addRole(config.roles.verifiedMember);

							if (player) {
								player.guildMember = member;
								player.createValue("discordAvatar", member.user.avatarURL);
							}
							
							msg.reply("Yeah! Your Server account is now associated to your to Discord account! And you got $5,000 :moneybag: as reward!");
						});
				}
			);
		}
	);
}

jcmp.events.Add('PlayerValueChangeSave', function(player, index, value) {
	if (index !== "nname")
		return;

	if (!player.guildMember) {
		player.discordCode = (value.slice(0, 4).toUpperCase() + player.client.steamId.slice(-4)).replace(" ", "_");
		return;
	}
	
	player.guildMember.setNickname(value);
});


jcmp.events.Add("SendDiscordMessage", function(message) {
	ServerChat.send(`[${jcmp.utils.getDate("time")}]: ${message}`);
});


jcmp.events.Add("ServerLoaded", function() {
	//StartDiscordClient();
});

StartDiscordClient();