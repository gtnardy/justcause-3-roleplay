const ui = new WebUIWindow('news_ui', `package://news/ui/index.html`, new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));
ui.autoResize = true;

jcmp.isNewspaperOpened = false;

jcmp.events.Add("BringUiToFront", function(id) {
    if (id == "news_ui")
		ui.BringToFront();
});


jcmp.events.Add("ActiveNewspaper", function(bool) {
     ActiveNewspaper(bool);
});


jcmp.ui.AddEvent("ActiveNewspaper", function(bool) {
     ActiveNewspaper(bool);
});


function ActiveNewspaper(bool) {
     jcmp.isNewspaperOpened = bool;
     jcmp.ui.CallEvent("ToggleNewspaper", bool);
     jcmp.events.Call("SetControlsEnabled", !bool);
}


jcmp.events.Add("KeyUp", function(key, allowed, arrayMenus) {
     if (jcmp.isNewspaperOpened) {
          if (key == 78 || key == 70 || key == 27 || key == 9 || key == 17)
               ActiveNewspaper(false);
     } else {
          if (key == 78 && allowed)
               ActiveNewspaper(true);
     }
});
