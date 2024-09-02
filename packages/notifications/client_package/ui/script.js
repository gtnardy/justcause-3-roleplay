const timeout = 15000;


jcmp.AddEvent("LocalPlayerLoaded3", function() {
    console.log("loading notifications");
    function addNotification(header, txt, image, sound, isPrompt) {
        
        let notification = $(`
            <div class='notification'>
                <div class='notification-content'>         
                    <div class='notification-header'>
                        ${parseRGB(header)}
                    </div>
                    <div class='notification-text'>
                        ${parseRGB(txt)}
                    </div>
                </div>
            </div>
        `);

        notification.css("background-image", "url('http://justcauserp.com/images/notifications_icons/" + image + ".png')");

        let notification_container = $("<div class='notification-container'></div>");
        notification_container.html(notification);

        notification_container.hide();

        if (sound !== false) {
            if (!sound) 
                sound = "notification";
                
            jcmp.CallEvent("PlaySound", sound);
        }

        if (isPrompt) {
            notification.css("background-color", "rgba(52, 152, 219, 0.8)");
            $(".notifications-priority").prepend(notification_container);
        } else {
            $(".notifications-normal").prepend(notification_container);
            setTimeout(function() {
                notification_container.fadeOut(200, function() {
                    $(this).remove();
                });
            }, timeout); 
        }

        notification_container.fadeIn(200);
    }


    function parseRGB(txt) {
        let pos = txt.indexOf('[#');
        while (pos !== -1) {
            const start = pos;
            const end = pos + 8;

            if (txt.charAt(end) !== ']') {
                pos = txt.indexOf('[#', pos+1);
                continue;
            }

            const color = txt.substring(start + 1, end);
            let buf = txt.substr(0, start);
            buf += `</font><font style="color: ${color}">`;
            buf += txt.substr(end + 1, txt.length);

            txt = buf;
            pos = txt.indexOf('[#', end);
        }
        
        return txt;
    }


    jcmp.AddEvent("AddNotification", function(header, txt, image, sound) {
        addNotification(header, txt, image, sound);
    });


    jcmp.AddEvent("AddPromptNotification", function(header, txt, image) {
        addNotification(header, txt, image, "notification", true);
    });


    jcmp.AddEvent("UpdatePromptNotification", function(header, txt, fadeOut) {
        if (header)
            $(".notifications-priority").find(".notification-header").html(parseRGB(header));

        if (txt)
            $(".notifications-priority").find(".notification-text").html(parseRGB(txt));

        if (fadeOut)
            setTimeout(function() {
                $(".notifications-priority").find(".notification-container").fadeOut(200, function() {
                    $(this).remove();
                });
            }, 10000); 
    });


    jcmp.AddEvent("ClearPromptNotification", function() {
        $(".notifications-priority").html("");
    });
    console.log("loaded");
});