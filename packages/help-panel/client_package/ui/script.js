
jcmp.AddEvent("LocalPlayerLoaded2", function() {
	console.log("loading help-panel");
	jcmp.AddEvent('ActiveHelpPanel', function(a) {
		activeHelpPanel(a);
	});


	function activeHelpPanel(a) {
		if (a) {
			jcmp.ShowCursor();
			$("body").show();
			selectHelp($(".help-panel-menu-item").first(), true);
			jcmp.CallEvent("PlaySound", "open-menu");
		} else {
			jcmp.HideCursor();
			$("body").hide();
			jcmp.CallEvent("PlaySound", "close-menu");
		}

		jcmp.CallEvent("ToggledHelpPanel", a);
		jcmp.CallEvent("SetControlsEnabled", !a);
	}


	$(".help-panel-close").click(function() {
		activeHelpPanel(false);
	});


	$(".help-panel-link").click(function() {
		let id = $(this).data("id");
		let item = $(".help-panel-menu-item[data-id='"+ id +"']");
		selectHelp(item, false);
	});


	$(".help-panel-menu-item").click(function() {
		selectHelp(this, false);
	});


	$(".help-panel-menu-item").mouseenter(function() {
		if ($(this).hasClass("selected"))
			return;
		jcmp.CallEvent("PlaySound", "switch");
	});


	$(".help-panel-close").mouseenter(function() {
		jcmp.CallEvent("PlaySound", "switch");
	});


	$(".help-panel-link").mouseenter(function() {
		jcmp.CallEvent("PlaySound", "switch");
	});


	$(".help-panel-externallink").click(function() {
		document.execCommand("copy");
		document.getSelection().removeAllRanges();
	});


	function selectHelp(item, silent) {
		$(".help-panel-menu-item").removeClass("selected");
		let id = $(item).data("id");
		$(item).addClass("selected");

		$(".help-panel-content-help").hide();
		$(".help-id-" + id).show();
		$(".help-panel-content").scrollTop(0);

		if (!silent)
			jcmp.CallEvent("PlaySound", "switch");
	}


	jcmp.AddEvent("KeyUp", function(key, allowed, arrayMenus) {
		if ($("body").is(":visible")) {
			if (key == 74 || key == 70 || key == 27 || key == 9 || key == 17)
				activeHelpPanel(false);
		} else if (key == 74 && allowed)
			activeHelpPanel(true);
	});
	console.log("loaded");
});