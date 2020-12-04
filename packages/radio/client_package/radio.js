const ui = new WebUIWindow("radio_ui", `package://radio/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "radio_ui")
		ui.BringToFront();
});


jcmp.events.Add('LocalPlayerValueChange', function(index, value) {
	if (index === "lastRadio")
		jcmp.ui.CallEvent("SwitchRadioStation", value);
	else if (index === "hasRadioFalloutNewVegas" && value) {
		jcmp.ui.CallEvent("AddRadioStation", 12);
		jcmp.ui.CallEvent("AddRadioStation", 13);
	}
});


jcmp.ui.AddEvent('RadioSwitched', function(station) {
    jcmp.events.Call("SetLocalPlayerValue", "lastRadio", station);
});
