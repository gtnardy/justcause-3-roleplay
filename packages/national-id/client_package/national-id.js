const ui = new WebUIWindow("national_id", `package://national-id/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "national_id")
		ui.BringToFront();
});

jcmp.isNationalIdOpened = false;

jcmp.ui.AddEvent("NationalIdActived", function(bool) {
	jcmp.isNationalIdOpened = bool;
});