
const LAWYER_PRICE = 1000;

jcmp.events.Add("ReleasePrisioner", function(lawyer, prisioner) {
	if (!prisioner.arrested) {
		jcmp.notifications.send(lawyer, "JOB_NAME_15", "LAWYER_NOT_REQUIRING", false, "lawyer");
		return;
	}
	
	prisioner.setValue("arrested", 5);

	jcmp.events.Call('SetPlayerMoneyBank', prisioner, -LAWYER_PRICE, "Lawyer");
	jcmp.events.Call("JobDone", lawyer, Math.floor(LAWYER_PRICE / 2), LAWYER_PRICE);

	jcmp.notifications.send(lawyer, "JOB_NAME_15", "LAWYER_YOU_RELEASED_PRISIONER", [prisioner.nname, LAWYER_PRICE, LAWYER_PRICE / 2], "lawyer");
	jcmp.notifications.send(prisioner, "JOB_NAME_15", "LAWYER_LAWYER_RELEASED_YOU", [lawyer.nname, LAWYER_PRICE], "lawyer");
});