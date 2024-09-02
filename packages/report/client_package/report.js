'use strict';


jcmp.events.Call("AddCommand",
	{
		command: "reports", 
		permissions: 2,
		subcommands: {
			list: {
				command: "list", 
				callback: function(args) {
					jcmp.events.CallRemote("ListReports");
				}
			},
				
			delete: {
				command: "delete", 
				parameters: [
					{
						parameter: "id", 
						type: "number"
					}
				],				
				callback: function(args) {
					jcmp.events.CallRemote("DeleteReport", args.id);
				}
			}
		}
	}
);

jcmp.events.Call("AddCommand",
	{
		command: "reportsgoto", 
		permissions: 4,
		parameters: [
			{
				parameter: "id", 
				type: "number"
			}
		],				
		callback: function(args) {
			jcmp.events.CallRemote("GotoReport", args.id);
		}
	}
);


jcmp.events.Call("AddCommand",
	{
		command: "report",
		parameters: [
			{parameter: "text", description: "description of problem/suggestion", type: "string"}
		],
		permissions: 1,
		callback: function(args) {
			jcmp.events.CallRemote("AddReport", args.text);
			jcmp.notifications.add("", jcmp.languages.get("REPORT_SENT"), "asking");			
		}
	}
);