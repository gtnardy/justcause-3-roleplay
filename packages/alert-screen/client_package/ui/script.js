var idAlertScreen = null;

jcmp.AddEvent("LocalPlayerLoaded1", function() {
	jcmp.AddEvent('SetAlertScreen', function(id, title, text, type) {
		if (id) {
			jcmp.ShowCursor();

			$("body").fadeIn(100);
			$("#alert-screen-title").html(title);
			$("#alert-screen-text").html(text);
			
			$(".alert-screen-button").hide();
			if (type === 1)
				$(".button-1").show();
			else if (type === 2)
				$(".button-2").show();

			idAlertScreen = id;
		} else {
			jcmp.HideCursor();
			$("body").fadeOut(100);
			idAlertScreen = null;
		}
	});

	jcmp.AddEvent('KeyPress', (keycode, allowed, arrayMenus) => {
		arrayMenus = JSON.parse(arrayMenus);
		
		if (arrayMenus.isChatOpened || arrayMenus.isInputTextOpened)
			return;

		if (!idAlertScreen)
			return;

		if (keycode == 27 || keycode == 17) {
			close(false);
		} else if (keycode == 13) {
			close(true);
		}
	});
	
	$(".alert-screen-button").click(function() {
		if (!idAlertScreen)
			return;

		close($(this).html() !== "NO");
	});

	function close(bool) {
		jcmp.HideCursor();
		$("body").fadeOut(100);
		jcmp.CallEvent("AlertScreenSubmit", idAlertScreen, bool);
		idAlertScreen = null;
	}
});