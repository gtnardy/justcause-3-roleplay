'use strict';

jcmp.events.Add("CustomMenuPressed_bank-custom-menu", function(args) {
	if (!jcmp.utils.checkInSite(3))
		return;

	if (args.itemId == "BANK_DEPOSIT") {
		Deposit(args.value);
	} else if (args.itemId == "BANK_WITHDRAW") {
		Withdraw(args.value);
	}

});


function getDescriptionList(moneyBank) {
	let savings = "0.5%";
	if (jcmp.localPlayerData.vip && jcmp.localPlayerData.vip == 2)
		savings = "<span style='color: #f1c40f; font-size: 11px;'>+" + savings + "</span> " + savings;

	return [
		{txt: jcmp.languages.get("BANK_BALANCE"), subTxt: "$ " + moneyBank},
		{txt: jcmp.languages.get("BANK_SAVINGS"), subTxt: savings},
	];
}


function getBankStatements() {
    let bank_statements = [];

    if (jcmp.localPlayerData.bankStatements.length > 0) {
        
        for (let s = 0; s < jcmp.localPlayerData.bankStatements.length; s++) {
            let bankStatementData = jcmp.localPlayerData.bankStatements[s];
            let value = bankStatementData.value > 0 ? `<span style="color: #2ecc71;">+$ ${bankStatementData.value}</span>` : `<span style="color: #e74c3c;">-$ ${-bankStatementData.value}</span>`;
            bank_statements.push({txt: `${bankStatementData.description} <span style="font-size: 10px; opacity: 0.7;">${bankStatementData.occurrenceDate}</span>`, subTxt: value});
        }
    } else {
        bank_statements.push({txt: jcmp.languages.get("BANK_STATEMENTS_CLEAR"), subTxt: ""});
    }

    return bank_statements;
}


jcmp.events.Add("OpenMenuSite", function(idSite) {
	if (idSite != 3) return;

    let descriptionList = getDescriptionList(jcmp.localPlayerData.moneyBank);
    let bankStatements = getBankStatements();

	let menu = {
		id: "bank-custom-menu",
		header: {img: "bank.jpg"},
		body: {
			id: "BANK_LIST",
			subheader: {txt: jcmp.languages.get("SITE_NAME_3")},
			items: [
				{
					id: "BANK_DEPOSIT",
					txt: jcmp.languages.get("BANK_DEPOSIT"),
					description: jcmp.languages.get("BANK_DEPOSIT_DESCRIPTION"),
					innerValues: [{txt: jcmp.languages.get("BANK_ALL"), value: 0}, {txt: "$ 50", value: 50}, {txt: "$ 100", value: 100}, {txt: "$ 500", value: 500}, {txt: "$ 1000", value: 1000}, {txt: "$ 10000", value: 10000}, {txt: "$ 100000", value: 100000}],
					descriptionList: descriptionList,
				},
				{
					id: "BANK_WITHDRAW",
					txt: jcmp.languages.get("BANK_WITHDRAW"),
					description: jcmp.languages.get("BANK_WITHDRAW_DESCRIPTION"),
					innerValues: [{txt: jcmp.languages.get("BANK_ALL"), value: 0}, {txt: "$ 50", value: 50}, {txt: "$ 100", value: 100}, {txt: "$ 500", value: 500}, {txt: "$ 1000", value: 1000}, {txt: "$ 10000", value: 10000}, {txt: "$ 100000", value: 100000}],
					descriptionList: descriptionList,
				},
				{
					id: "BANK_STATEMENTS",
					txt: jcmp.languages.get("BANK_STATEMENTS"),
                    description: jcmp.languages.get("BANK_STATEMENTS_DESCRIPTION"),
                    descriptionList: bankStatements,
				},
			],
		}
	};

	jcmp.events.Call('OpenCustomMenu', menu, true);
});


function Deposit(quantity) {
	if (quantity == 0)
		quantity = jcmp.localPlayerData.money;

	quantity = Math.floor(quantity);

	if (jcmp.localPlayerData.money < quantity) {
		quantity = Math.max(jcmp.localPlayerData.money, 0);
	}

	if (quantity <= 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "BANK_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.Call('UpdateCustomMenuItem', "BANK_DEPOSIT", {descriptionItems: getDescriptionList(jcmp.localPlayerData.moneyBank + quantity), refreshDescriptionItems: true});
    jcmp.events.Call('UpdateCustomMenuItem', "BANK_WITHDRAW", {descriptionItems: getDescriptionList(jcmp.localPlayerData.moneyBank + quantity), refreshDescriptionItems: true});
	jcmp.events.Call('UpdateCustomMenuItem', "BANK_LIST", {notify: jcmp.languages.get("BANK_DEPOSITED", [quantity]), success: true});

    jcmp.events.CallRemote('Deposit', quantity);
    jcmp.ui.CallEvent("PlaySound", "coins");
}


function Withdraw(quantity) {
	if (quantity == 0) quantity = jcmp.localPlayerData.moneyBank;

	quantity = Math.floor(quantity);

	if (jcmp.localPlayerData.moneyBank < quantity) {
		quantity = Math.max(jcmp.localPlayerData.moneyBank, 0);
	}

	if (quantity <= 0) {
		jcmp.events.Call('UpdateCustomMenuItem', "BANK_LIST", {notify: jcmp.languages.get("COMMON_NOT_ENOUGH_MONEY"), error: true});
		return;
	}

	jcmp.events.Call('UpdateCustomMenuItem', "BANK_DEPOSIT", {descriptionItems: getDescriptionList(jcmp.localPlayerData.moneyBank - quantity), refreshDescriptionItems: true});
	jcmp.events.Call('UpdateCustomMenuItem', "BANK_WITHDRAW", {descriptionItems: getDescriptionList(jcmp.localPlayerData.moneyBank - quantity), refreshDescriptionItems: true});
	jcmp.events.Call('UpdateCustomMenuItem', "BANK_LIST", {notify: jcmp.languages.get("BANK_WITHDRAWN", [quantity]), success: true});

    jcmp.events.CallRemote('Withdraw', quantity);
    jcmp.ui.CallEvent("PlaySound", "coins");
}


jcmp.events.Add("LocalPlayerValueChange", function(index, value) {
    if (index !== "bankStatements")
        return;

    if (!jcmp.hasMenuOpened || jcmp.hasMenuOpened.id !== "bank-custom-menu")
        return;

    jcmp.events.Call('UpdateCustomMenuItem', "BANK_STATEMENTS", {descriptionItems: getBankStatements()});
});