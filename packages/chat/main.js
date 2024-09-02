const config = require('./config');
const fs = require('fs');

jcmp.events.AddRemoteCallable('chat_submit_message', (player, message, channel) => {

    message = message.trim();
    if (message.startsWith('/')) 
    {
        jcmp.events.Call('chat_command', player, message, channel);
        return;
    }

    if (typeof channel == 'undefined' || channel == null || !config.default_channels.includes(channel))
    {
        jcmp.console.print(`${player.nname} sent a message on an invalid channel: ${channel}`);
        return;
    }

    const returns = jcmp.events.Call('chat_message', player, message, channel);

    if (returns.some(r => r === false)) 
    {
        return;
    }

    returns.forEach((r) => 
    {
        if (typeof r == 'string')
        {
            message = r;
        }
    });

    if (message.length > 0) 
    {
        // LogMessage(message, channel, player);
        console.log(`[${GetDate()} ${GetTime()}] [CHAT] ${player.nname}: ${message}`);
        if (channel == "Local")
        {
            const pos = player.position;
            jcmp.loggedPlayers.forEach((p) => 
            {
                if (dist(pos, p.position) < config.local_distance)
                {
                    jcmp.events.CallRemote('chat_message', p, JSON.stringify(FormatMessage(message, player, null, {channel: channel})));
                }
            });
        }
        else
        {
            jcmp.events.CallRemote('chat_message', null, JSON.stringify(FormatMessage(message, player, null, {channel: channel})));
			jcmp.discordOld.print("[CHAT] " + player.nname + ": " + message.replace(/(\[#)(.*?)(\])/g, ""));
        }

    }
});

/**
 * Formats a message.
 * 
 * @param {string} msg - Message sent by the player.
 * @param {Player} player - Player who sent the message.
 * @param {RGB} color - Color of the message, only used by system messages.
 * @param {object} args - Additional arguments for the message, such as channel or timeout.
 * @return {object} - Returns formatted message.
 */

function FormatMessage(msg, player, color, args)
{
    if (player != null && typeof player != 'undefined')
    {
        return FormatPlayerMessage(msg, player, args.channel);
    }
    else
    {
        color = (color == undefined) ? new RGB(255,255,255) : color;
        return FormatSystemMessage(msg, color, args);
    }
}

/**
 * Formats a message sent by the server.
 * 
 * @param {string} msg - Message sent by the player.
 * @param {RGB} c - Color of the message.
 * @param {object} args - Additional arguments for the message, such as channel or timeout.
 * @return {object} - Returns formatted message.
 */

// Can't put msg in the HTML in case players are using <i> or [#ffffff] things
function FormatSystemMessage(msg, c, args)
{
    if (typeof args == 'undefined')
    {
        return (
        {
            html: FormatChatMessage(`<span class="message-body" style="color:rgb(${c.r},${c.g},${c.b});" id="m_">${msg}</span>`),
        });
    }
    else
    {
        let obj = {};
        
        // If we don't use any vulnerable player names, just make it the HTML
        if (args.use_name == undefined)
        {
            obj.html = FormatChatMessage(`<span class="message-body" style="color:rgb(${c.r},${c.g},${c.b});" id="m_">${msg}</span>`);
        }
        else
        {
            obj.html = FormatChatMessage(`<span class="message-body" style="color:rgb(${c.r},${c.g},${c.b});" id="m_"></span>`);
            obj.msg = msg;
        }

        if (typeof args.timeout != 'undefined')
        {
            obj.timeout = args.timeout;
        }

        if (typeof args.channel != 'undefined')
        {
            obj.channel = args.channel;
        }

        if (typeof args.style != 'undefined')
        {
            obj.style = args.style;
        }

        return obj;
    }
}

/**
 * Formats a message sent by a player.
 * 
 * @param {string} msg - Message sent by the player.
 * @param {Player} player - Player who sent the message.
 * @param {string} channel - Channel that the player sent the message on.
 * @return {object} - Returns formatted message.
 */

function FormatPlayerMessage(msg, player, channel)
{
    let html = '';
    const obj = {
        html: html,
        name: player.nname,
        msg: msg,
        channel: channel,
        pid: player.networkId
    }

	let isAdmin = false;
	
	let htmlTags = "";
	if (player.tags != undefined) {
		for (let t in player.tags) {
			let tag = player.tags[t];
			htmlTags += `<span id="tag" style="background-color:${tag.color};">${tag.name}</span>`;
			
			isAdmin = (tag.name.toUpperCase() === "ADMIN");
		}
	}
	
	html = `${htmlTags}<span class="player-name" style="color: ${player.color};" id="n_${player.networkId}"></span>[#FFFFFF]: <span class="message-body" id="m_"></span>`;

	if (msg.indexOf(`@everyone`) > -1 && isAdmin)
	{
		obj.everyone = true;
	}

    
    html = FormatChatMessage(html);
    obj.html = html;
    
    return obj;
}

/**
 * Formats hex tags [#ffffff] into HTML.
 * 
 * @param {string} msg - Message to format for hex tags.
 * @return {string} - Returns formatted HTML string.
 */

// Credit to Jan Christophersen for the hex tag formatter from original chat package
function FormatChatMessage(msg) // Formats messages with [#FFFFFF] tags
{
    let i = 0;
	let pos = msg.indexOf('[#');
	while (pos !== -1) 
    {
		const start = pos;
		const end = pos + 8;

		if (msg.charAt(end) !== ']') 
        {
			pos = msg.indexOf('[#', pos+1);
			continue;
		}

		const color = msg.substring(start + 1, end);
		let buf = msg.substr(0, start);
        if (i == 0)
        {
            buf += `<font style="color: ${color}">`;
        }
        else
        {
            buf += `</font><font style="color: ${color}">`;
        }
		buf += msg.substr(end + 1, msg.length);

		msg = buf;
		pos = msg.indexOf('[#', end);
        i++;
	}
    msg = msg + "</font>";
    return msg;
}

const chat = 
{
    /**
     * Sends a message to a player.
     * 
     * @param {Player} target - Player to send the message to.
     * @param {string} message - Message to send to the player.
     * @param {RGB} color - Color of the message in RGB format. Optional.
     * @param {object} args - Additional arguments, such as timeout or channel.
     */
    send(target, message, color, args) 
    {
        const msg = JSON.stringify(FormatMessage(message, null, color, args));
        jcmp.events.CallRemote('chat_message', target, msg);
    },
    /**
     * Broadcasts a message to all players.
     * 
     * @param {string} message - Message to be sent.
     * @param {RGB} color - Color of the message in RGB format. Optional.
     * @param {object} args - Additional arguments, such as timeout, channel, style, or use_name.
     */
    broadcast(message, color, args)
    {
        const msg = JSON.stringify(FormatMessage(message, null, color, args));
        jcmp.events.CallRemote('chat_message', null, msg);
    }
}

jcmp.events.Add('get_chat', () => 
{
    return chat;
});

jcmp.events.Add('PlayerLoaded', (player) => 
{
    jcmp.events.CallRemote('chat/InitConfig', player, JSON.stringify(config));

    let data = [];
    jcmp.loggedPlayers.forEach(function(p) 
    {
        if (jcmp.utils.validatePlayer(p) && p.loaded && p.networkId != player.networkId)
        {
            data.push({id: p.networkId, name: p.nname});
        }
        
    });
    jcmp.events.CallRemote('chat2/InitPlayers', player, JSON.stringify(data));

})

/**
 * Logs a chat message sent by a player to the /logs folder in the chat package.
 * 
 * @param {string} msg - Message that the player sent.
 * @param {string} channel - Channel that the message was sent on.
 * @param {Player} player - Player who sent the message.
 */

function LogMessage(msg, channel, player)
{
    let time = GetTime();
    let date = GetDate();
    let log_message = `\r\n[${time}] [${channel}] [${player.client.steamId}] ${player.nname}: ${msg}`;

    fs.appendFile(`${__dirname}/logs/${date}.log`, log_message, function (err) 
    {
        if (err)
        {
            throw err;
        }
    });
}

jcmp.events.Add('PlayerDestroyedAfter', (player) => 
{
    jcmp.events.CallRemote('chat2/RemovePlayer', null, player.nname || player.name);
})

/**
 * Gets a nicely formatted time string.
 * 
 * @return {string}
 */

function GetTime()
{
    const date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return `${hour}:${min}:${sec}`;
}

/**
 * Gets a nicely formatted date string for log filenames.
 * 
 * @return {string}
 */

function GetDate()
{
    const date = new Date();

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return `${year}-${month}-${day}`;
}

/**
 * Returns the distance between two Vector3s.
 * 
 * @param {Vector3f} a
 * @param {Vector3f} b
 * @return {number}
 */

function dist(a, b) 
{
    return b.sub(a).length;
}