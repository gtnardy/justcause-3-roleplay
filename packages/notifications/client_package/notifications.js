const ui = new WebUIWindow('notifications_ui', `package://notifications/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "notifications_ui")
		ui.BringToFront();
});


jcmp.events.Add("HideHUD", function(hud, menus, notifications, alertUi) {
	ui.hidden = notifications;
});


jcmp.events.AddRemoteCallable("AddNotification", function(header_label, txt_label, txt_params, image, sound) {
    if (txt_params) {
        txt_params = JSON.parse(txt_params);
        for (let p = 0; p < txt_params.length; p++) {
            if (txt_params[p].constructor === Array) {
                txt_params[p] = jcmp.languages.get(txt_params[p][0]);
            }
        }
    }
    
	jcmp.ui.CallEvent("AddNotification", jcmp.languages.get(header_label), jcmp.languages.get(txt_label, txt_params), image, sound);
});
