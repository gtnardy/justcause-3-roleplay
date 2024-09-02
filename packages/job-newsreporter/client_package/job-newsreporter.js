'use strict';

jcmp.events.Call("AddCommand",
	{
		command: "announce",
		permissions: 1,
		idJobs: [5],
		cooldown: 300,
		parameters: [
			{parameter: "text", type: "string"}
		],
		callback: function(args) {
			return Announce(args.text);
		}
	}
);


function Announce(text) {
	jcmp.events.CallRemote("Announce", text);
	return true;
}
