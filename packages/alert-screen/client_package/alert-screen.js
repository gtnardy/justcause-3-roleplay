const ui = new WebUIWindow('alert_ui', `package://alert-screen/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var alertScreen = null;
jcmp.isAlertScreenOpened = false;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "alert_ui")
		ui.BringToFront();
});

jcmp.events.Add("HideHUD", function(hud, menus, notifications, alertUi) {
	ui.hidden = alertUi;
});


jcmp.events.Add("SetAlertScreen", function(id, title, text, type) {
	if (alertScreen) return false;
	alertScreen = id;
	jcmp.isAlertScreenOpened = true;
	jcmp.events.Call("SetControlsEnabled", false);
    jcmp.ui.CallEvent('SetAlertScreen', id, title, text, type);
    ui.BringToFront();
});


jcmp.ui.AddEvent("AlertScreenSubmit", function(id, value) {
	if (alertScreen != id) return;
	
	if (value)
		jcmp.ui.CallEvent('PlaySound', "accept");
	else
		jcmp.ui.CallEvent('PlaySound', "deny");

	alertScreen = null;
	jcmp.isAlertScreenOpened = false;
	jcmp.events.Call("SetControlsEnabled", true);
	jcmp.events.Call("AlertScreenSubmit", id, value);
});