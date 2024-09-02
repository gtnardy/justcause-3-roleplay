'use strict';


jcmp.events.Call("AddCommand",
	{
		command: "vip",
		permissions: 1,
		subcommands: {
			stats: {
				callback: function(args) {
					if (!jcmp.utils.checkIsVip(1))
						return;
					
					jcmp.ui.CallEvent('chat_message', jcmp.languages.get("VIP_EXPIRATION", [jcmp.localPlayerData.vipFinishDate]), 255, 255, 255);
					jcmp.ui.CallEvent('chat_message', jcmp.languages.get("VIP_LEVEL", [jcmp.languages.get("VIP_LEVEL_" + jcmp.localPlayerData.vip)]), 255, 255, 255);
				}
			},
			activate: {
				parameters: [{parameter: "code", type: "string"}],					
				callback: function(args) {
					jcmp.events.CallRemote("ActivateVip", args.code);
				}
			}
		}
	}
);