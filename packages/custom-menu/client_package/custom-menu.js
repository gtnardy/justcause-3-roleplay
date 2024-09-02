const ui = new WebUIWindow('custom-menu-ui', `package://custom-menu/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.hasMenuOpened = false;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "custom-menu-ui")
		ui.BringToFront();
});


jcmp.events.Add("HideHUD", function(hud, menus, notifications, alertUi) {
	ui.hidden = menus;
});


jcmp.events.Add("UpdateCustomMenuItem", function(id, data) {
	jcmp.ui.CallEvent('UpdateCustomMenuItem', id, JSON.stringify(data));
});


jcmp.events.Add("OpenCustomMenu", function(data, freezes) {
	jcmp.ui.CallEvent('OpenCustomMenu', JSON.stringify(data), freezes);
});


jcmp.events.Add("CloseCustomMenu", function(id) {
	jcmp.ui.CallEvent('CloseCustomMenu', id);
});


jcmp.ui.AddEvent("CustomMenuOpened", function(id, freezes){
    jcmp.hasMenuOpened = {id: id, freezes: freezes};
    
	if (freezes)
        jcmp.events.Call("SetControlsEnabled", false);
        
	jcmp.ui.CallEvent("SetUIHideable", true);
});


jcmp.ui.AddEvent("CustomMenuClosed", function(id) {
	jcmp.events.Call("CustomMenuClosed_" + id);
	jcmp.hasMenuOpened = false;
	jcmp.events.Call("SetControlsEnabled", true);
	jcmp.ui.CallEvent("SetUIHideable", false);
});


jcmp.ui.AddEvent("CustomMenuPressed", function(args) {
	args = JSON.parse(args);
	if (args.value) args.value = JSON.parse(args.value);
	jcmp.events.Call("CustomMenuPressed_" + args.menuId, args);
});


jcmp.ui.AddEvent("CustomMenuSelected", function(args) {
	args = JSON.parse(args);
	if (args.value) args.value = JSON.parse(args.value);
	jcmp.events.Call("CustomMenuSelected_" + args.menuId, args);
});
