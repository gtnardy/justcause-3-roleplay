
jcmp.AddEvent("LocalPlayerLoaded1", function() {
    console.log("loading national-id");
    jcmp.AddEvent("ActiveNationalID", function(data) {
        data = JSON.parse(data);
        if (data) {
            $("#label-id").html(data.id);
            $("#label-name").html(data.name);
            $("#label-job").html(data.job);

            setYesNo($("#label-land"), data.land);
            setYesNo($("#label-land-bike"), data.landBike);
            setYesNo($("#label-sea"), data.sea);
            setYesNo($("#label-air"), data.air);
            setYesNo($("#label-air-helis"), data.airHelis);
            setYesNo($("#label-health"), data.health);
            setYesNo($("#label-life"), data.life);

            $("#label-nationality").html('<img src="blank.gif" class="flag flag-' + data.country + '" />')
            setVisible(true);
        } else
            setVisible(false);
    });


    function setYesNo(el, data) {
        el.html(data);
        if (data === "No" || data === "Não")
            el.addClass("no");
        else
            el.removeClass("no");
    }


    function setVisible(bool) {
        if (bool) {
            $("#national-id").css("opacity", "1");
            $("#national-id").animate({bottom: '-1vw'});
        } else {
            $("#national-id")
                .animate({bottom: '-60vw'})
                .animate({opacity: '0'});
        }
        
        jcmp.CallEvent("NationalIdActived", bool);
        
        jcmp.CallEvent("PlaySound", "paper");
    }


    jcmp.AddEvent("KeyUp", function(key, allowed, arrayMenus) {
        if ($("#national-id").css('opacity') !== '0') {
            if (key == 17)
                setVisible(false);
        }
    });
    console.log("loaded");
});