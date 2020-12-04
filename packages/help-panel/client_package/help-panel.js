const ui = new WebUIWindow('helppanel_ui', `package://help-panel/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;
ui.Reload(true);

jcmp.isHelpPanelOpened = false;

jcmp.ui.AddEvent("ToggledHelpPanel", function(bool) {
     jcmp.isHelpPanelOpened = bool;

     if (!bool && jcmp.localPlayerData.firstTimeTutorial) {
         jcmp.localPlayerData.firstTimeTutorial = false;
         jcmp.events.Call("StartTutorial", "BEGINNER");
     }
});

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "helppanel_ui")
		ui.BringToFront();
});