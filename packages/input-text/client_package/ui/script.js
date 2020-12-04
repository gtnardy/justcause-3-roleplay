var idInput = null;
var capitalize = false;
var onlyLetter = false;

jcmp.AddEvent("LocalPlayerLoaded2", function() {

	jcmp.AddEvent('SetInputText', function(id, label, def, maxLength, capt, lett) {
		if (id) {
			jcmp.ShowCursor();
			$("#input-text-form").show();

			$("#input-text-ui").fadeIn(100);
			$(".input-text-label").html(label);

			$("#input-text").val(def);
			$("#input-text").attr('maxlength', maxLength);

			let len = $("#input-text").val().length;
			$("#input-text").focus();
			$("#input-text")[0].setSelectionRange(len, len);

			idInput = id;
			capitalize = capt;
			onlyLetter = lett;
		} else {
			jcmp.HideCursor();
			$("#input-text-ui").fadeOut(100);
			idInput = null;
		}
	});

	jcmp.AddEvent('SetInputTextArea', function(id, label, def, maxLength, cols, rows) {
		if (id) {
			jcmp.ShowCursor();
			$("#input-textarea-form").show();

			$("#input-text-ui").fadeIn(100);

			$(".input-text-label").html(label);

			$("#input-textarea").val(def);
			$("#input-textarea").attr('cols', cols);
			$("#input-textarea").attr('rows', rows);
			$("#input-textarea").attr('maxlength', maxLength);

			let len = $("#input-textarea").val().length;
			$("#input-textarea").focus();
			$("#input-textarea")[0].setSelectionRange(len, len);

			idInput = id;
		} else {
			jcmp.HideCursor();
			$("#input-text-ui").fadeOut(100);
			idInput = null;
		}
	});

	$("#input-text-form").submit(function (e) {
		e.preventDefault();

		if ($("#input-text").val().length < 3) {
			$(".input-text-error").html("Minimum 3 characters");
			jcmp.CallEvent("PlaySound", "cancel");
			return;
		}

		$("#input-text").blur();
		jcmp.HideCursor();
		$("#input-text-ui").fadeOut(100);
		$("#input-text-form").fadeOut(100).hide();
		capitalize = false;
		onlyLetter = false;
		setTimeout(function() {
			jcmp.CallEvent("InputTextSubmit", idInput, $("#input-text").val());
			$(this).reset();
		}, 300);
	});

	$("#input-textarea-form").submit(function(e) {
		e.preventDefault();
		$("#input-textarea").blur();
		jcmp.HideCursor();
		$("#input-text-ui").fadeOut(100);
		$("#input-textarea-form").fadeOut(100).hide();
		setTimeout(function() {
			jcmp.CallEvent("InputTextSubmit", idInput, $("#input-textarea").val());
			$(this).reset();
		}, 300);
	});

	$("#input-text").keypress(function(event) {
		$(".input-text-error").html("");
        var ew = event.which;
        
        if(!onlyLetter || ew == 13 || ew == 32 || ew == 35 || ew == 8 || (35 <= ew && ew <= 37) || (65 <= ew && ew <= 90) || (97 <= ew && ew <= 122)) {
			jcmp.CallEvent("PlaySound", "switch");
            return true;
		}

		jcmp.CallEvent("PlaySound", "deny");
        return false;
	});
	
	$("#input-text").keyup(function(event) {
		if (!capitalize)
			return true;

        $(this).val(capitalizeWords($(this).val()));
	});
	
	function capitalizeWords(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
});