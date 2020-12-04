const ui = new WebUIWindow('input_ui', `package://input-text/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

var input = null;
jcmp.isInputTextOpened = false;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "input_ui")
		ui.BringToFront();
});


jcmp.events.Add("SetInputText", function(id, label, def, maxLength, capt, lett) {
	if (input) return false;
	input = id;
	jcmp.isInputTextOpened = true;
	jcmp.events.Call("SetControlsEnabled", false);
	jcmp.ui.CallEvent('SetInputText', id, label, def, maxLength, capt, lett);
});


jcmp.events.Add("SetInputTextArea", function(id, label, def, maxLength, cols, rows) {
	if (input) return false;
	input = id;
	jcmp.isInputTextOpened = true;
	jcmp.events.Call("SetControlsEnabled", false);
	jcmp.ui.CallEvent('SetInputTextArea', id, label, def, maxLength, cols, rows);
});


jcmp.ui.AddEvent("InputTextSubmit", function(id, value) {
	if (input != id) return;
	jcmp.ui.CallEvent('PlaySound', "accept");
	input = null;
	jcmp.isInputTextOpened = false;
	jcmp.events.Call("SetControlsEnabled", true);
	jcmp.events.Call("InputTextSubmit", id, value);
});
