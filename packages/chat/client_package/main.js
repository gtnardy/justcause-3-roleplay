let max_characters = 1000;
let my_name;

jcmp.ui.AddEvent('chat_input_state', (s) => {
    jcmp.ui.CallEvent('mainui_prevent_open_menu', s);
	jcmp.isChatOpened = s;
	jcmp.events.Call("SetControlsEnabled", !s);
    chat_ui.BringToFront();
});

const chat_ui = new WebUIWindow('chat_ui', `package://chat/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
chat_ui.autoResize = true;
chat_ui.hidden = true;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "chat_ui")
		chat_ui.BringToFront();
});

jcmp.ui.AddEvent('chat_submit_message', (msg, channel) => {
    const returns = jcmp.events.Call('LocalPlayerChat', msg, channel);
    if (returns.some(r => r === false)) // Return false to LocalPlayerChat to stop msg from sending
    {
        return;
    }
	
    msg = msg.substring(0, max_characters); // Change this to synced char limit later

    jcmp.events.CallRemote('chat_submit_message', msg, channel);
});

jcmp.ui.AddEvent('chat_ready', () => {
    chat_ui.hidden = false;
    jcmp.events.CallRemote('chat_ready');
    jcmp.events.Call('chat_ready');
});

jcmp.events.AddRemoteCallable('chat_message', (obj, r, g, b) => {
    jcmp.ui.CallEvent('chat_message', obj, r, g, b);
});

jcmp.events.AddRemoteCallable('chat/InitConfig', (config) => {
    jcmp.ui.CallEvent('chat/InitConfig', config);
    config = JSON.parse(config);
    max_characters = config.max_characters;
});

jcmp.events.Add('LocalPlayerChat', (msg) => {
    if (msg == "/clear")
    {
        jcmp.ui.CallEvent('chat/ClearChat');
        return false;
    }
});

jcmp.events.AddRemoteCallable('chat2/store_name', (name) => 
{
    my_name = name;
    jcmp.ui.CallEvent('chat2/StoreName', my_name);
});

jcmp.events.AddRemoteCallable('chat2/AddPlayer', (id, name) => 
{
    if (id != jcmp.localPlayer.networkId)
    {
        jcmp.ui.CallEvent('chat2/AddPlayer', name);
    }
});

jcmp.events.AddRemoteCallable('chat2/RemovePlayer', (name) => 
{
    jcmp.ui.CallEvent('chat2/RemovePlayer', name);
})

jcmp.events.AddRemoteCallable('chat2/InitPlayers', (data) => 
{
    data = JSON.parse(data);
    data.forEach(function(entry) 
    {
        if (entry.id != jcmp.localPlayer.networkId)
        {
            jcmp.ui.CallEvent('chat2/AddPlayer', entry.name);
        }
    });
});