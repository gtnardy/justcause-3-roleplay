var timeout = null;
var visible = false;

jcmp.AddEvent("ActivePoliceRadio", function(bool) {
    if (timeout)
        clearTimeout(timeout);

    if (bool) {
        timeout = setTimeout(function(){
            setVisible(true);
        }, 3000);

    } else
        setVisible(false);
});


jcmp.AddEvent("HidePoliceRadio", function(bool) {
    setHidden(bool);
});


jcmp.AddEvent("UpdatePoliceRadioData", function(players) {
    players = JSON.parse(players);

    $("#reloading").hide();
    $("#player-list ul").html("");

    if (players.length > 0) {
        let length = Math.min(5, players.length);
        for (let p = 0; p < length; p++) {
            $("#player-list ul").append(`<li>${players[p].wantedStarsCount} <img src="star.png"/> ${players[p].name}</li>`);
        }
    } else {
        $("#player-list ul").append("<li>Nobody is being wanted at the moment.</li>");
    }
});


function setHidden(bool) {
    if (bool) {
        if ($("#police-radio").css("bottom") == "-130px")
            return;
        $("#police-radio").animate({bottom: '-130px'});
        $("#exit-key").html("<strong>(&#8593;)</strong> Show Police Radio");
    } else {
        if ($("#police-radio").css("bottom") == "0px")
            return;
        $("#police-radio").animate({bottom: '0px'});
        $("#exit-key").html("<strong>(CTRL)</strong> Hide");
    }

    jcmp.CallEvent("PlaySound", "radio-switch-tick");
}


function setVisible(bool) {
    visible = bool;
    if (bool) {
        $("#police-radio").css({bottom: '-130px'});
        $("#police-radio").show();
        setHidden(false);
        jcmp.CallEvent("UpdateHUD", JSON.stringify({hideHelpmessage: true}));
        jcmp.CallEvent("GetWantedPlayers");
    } else {
        $("#police-radio").hide();
        jcmp.CallEvent("UpdateHUD", JSON.stringify({hideHelpmessage: false}));
    }
}


jcmp.AddEvent("KeyUp", function(key, allowed, arrayMenus) {
	if ($("#police-radio").css("display") !== "none") {
        // jcmp.CallEvent("chat_message", JSON.stringify({html: "a " + $("#police-radio").css("bottom")}));
        if ($("#police-radio").css("bottom") === "0px") {
            if (key == 17)
                setHidden(true);
        } else
            if (key == 38 && allowed)
                setHidden(false);
	}
});


setInterval(function() {
    if (!visible)
        return;

    $("#reloading").show();
    jcmp.CallEvent("GetWantedPlayers");
}, 30000);