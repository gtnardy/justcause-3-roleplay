var custom_menus = {};

var timeoutCooldown = null;

jcmp.AddEvent("LocalPlayerLoaded4", function() {
	console.log("loading custom-menu");
	function updateCustomMenuItem(id, data) {
		let item = $("[data-id='" + id + "']");

		if (data.subTxt != null)
			item.children(".custom-menu-subitem").html(data.subTxt);

		if (data.headerTxt != null)
			item.children(".custom-menu-header").html(data.headerTxt);

		if (data.disabled)
			item.addClass("disabled");
		else if (data.disabled == false)
			item.removeClass("disabled");

		if (data.success)
			jcmp.CallEvent("PlaySound", "accept");

		if (data.error)
			jcmp.CallEvent("PlaySound", "deny");

		if (data.description) {
			item.attr("data-description", data.description);
			item.parent(".custom-menu-items").parent(".custom-menu-body").children(".custom-menu-item-description").hide();
			item.parent(".custom-menu-items").parent(".custom-menu-body").children(".custom-menu-item-description").html(data.description);
			item.parent(".custom-menu-items").parent(".custom-menu-body").children(".custom-menu-item-description").fadeIn(150);
		}

		if (data.notify) {
			let custom_menu = getActiveCustomMenu();
			let body_active = custom_menu.find(".custom-menu-body.active");
			body_active.children(".custom-menu-item-description").hide();
			body_active.children(".custom-menu-item-description").html(data.notify);
			body_active.children(".custom-menu-item-description").fadeIn(150);
		}

		if (data.color != null)
			$(".custom-menu-header").css("background-color", data.color);

		if (data.removeItem)
			item.remove();

		// item-list -- item == body
		if (data.cleanItems) {
			item.children(".custom-menu-items").html("");
		}

		if (data.addItem) {
			let custom_menu_item = createItem(data.addItem);
			item.children(".custom-menu-items").append(custom_menu_item);
		}

		if (data.addItems) {
			setTimeout(function(items) {
				for (let i in items) {
					let custom_menu_item = createItem(items[i]);
					item.children(".custom-menu-items").append(custom_menu_item);
				}
			}, 0, data.addItems);
		}

		if (data.descriptionItems) {
			let descriptionListData = "";
			for (let l in data.descriptionItems) {
				descriptionListData += createDescriptionItem(data.descriptionItems[l]);
			}
			item.attr("data-description-list", descriptionListData);
			
			if (data.refreshDescriptionItems)
				updateDescriptionList(item, item.parent(".custom-menu-items").parent(".custom-menu-body"));
		}

	}


	function createCustomMenu(data, freezes, isParentMenu) {

		if (custom_menus[data.id])
			deleteCustomMenu(data.id);

		var custom_menu = $("<div id=" + data.id + " class='custom-menu'></div>");

		custom_menu.attr("data-id", data.id);

		custom_menu.hide();

		if (data.lean) {
			custom_menu.addClass("lean");
			$(".custom-menu-container").css("margin-top", "7vw");
		}

		if (data.width)
			custom_menu.css("width", data.width);

		$(".custom-menu-container").css("margin", "5.5vw 0 0 0");
		
		if (data.offsetX)
			$(".custom-menu-container").css("margin-left", data.offsetX);

		if (data.offsetY)
			$(".custom-menu-container").css("margin-top", data.offsetY);

		if (isParentMenu)
			custom_menu.addClass("parent-menu");

		if (data.header) {
			var custom_menu_header = $("<div class='custom-menu-header'></div>");

			if (data.header.title)
				custom_menu_header.html(data.header.title);

			if (data.header.color)
				custom_menu_header.css("background-color", data.header.color);

			if (data.header.img)
				custom_menu_header.css("background-image", "url(headers/" + data.header.img + ")");

			if (data.header.font)
				custom_menu_header.css("font-family", data.header.font);

			custom_menu.append(custom_menu_header);
		}

		if (data.key)
			custom_menu.attr("data-key", data.key);

		if (data.value)
			custom_menu.attr("data-value", data.value);

		var custom_menu_body = createItems(data.body);
		custom_menu_body.addClass("active");

		selectItem(custom_menu, custom_menu_body, custom_menu_body.children(".custom-menu-items").children(":first"), true, true, true);

		custom_menu.append(custom_menu_body);

		$(".custom-menu-container").append(custom_menu);
		custom_menus[data.id] = custom_menu;

		openCustomMenu(data.id, !isParentMenu, freezes);

		if (data.parentMenu)
			createCustomMenu(data.parentMenu, freezes, true);
	}


	function createDescriptionItem(itemDescriptionData) {
		if (!itemDescriptionData)
			return "";

		let custom_menu_item_description = $("<span class='custom-menu-slot'></span>");
		custom_menu_item_description.html(itemDescriptionData.txt);

		let custom_menu_item_description_subitem = $("<span class='custom-menu-subitem'></span>");
		custom_menu_item_description_subitem.html(itemDescriptionData.subTxt);

		custom_menu_item_description.append(custom_menu_item_description_subitem);

		if (itemDescriptionData.alert)
			custom_menu_item_description.addClass("item-alert");

		return custom_menu_item_description.prop('outerHTML');
	}


	function createItem(itemData) {

		let txt = itemData.txt;
		let subTxt = itemData.subTxt;
		if (!subTxt) subTxt = "";

		let custom_menu_item = $("<div class='custom-menu-slot custom-menu-item'></div>");
		custom_menu_item.html(txt);

		let custom_menu_subitem = $("<span class='custom-menu-subitem'></span>");
		custom_menu_subitem.html(subTxt);

		// {text: ## value: ##}
		if (itemData.innerValues) {

			custom_menu_subitem.html("<span class='custom-menu-subitem-arrow'><</span>");

			let haveDefault = false;

			let custom_menu_subitem_inneritems = $("<div class='custom-menu-subitem-inneritems'></div>");
			for (let val in itemData.innerValues) {

				let custom_menu_subitem_inneritem = $("<span class='custom-menu-subitem-inneritem'></span>");
				custom_menu_subitem_inneritem.html(itemData.innerValues[val].txt);
				custom_menu_subitem_inneritem.attr("data-value", itemData.innerValues[val].value);

				if (itemData.innerValues[val].default) {
					custom_menu_subitem_inneritem.addClass("selected");
					haveDefault = true;
				}

				custom_menu_subitem_inneritems.append(custom_menu_subitem_inneritem);

			}

			custom_menu_subitem.append(custom_menu_subitem_inneritems);
			custom_menu_subitem.append("<span class='custom-menu-subitem-arrow'>></span>");

			if (!haveDefault)
				custom_menu_subitem_inneritems.children(".custom-menu-subitem-inneritem").first().addClass("selected");

			custom_menu_item.attr("data-innervalues", true);
		}

		if (itemData.value != undefined)
			custom_menu_item.attr("data-value", JSON.stringify(itemData.value));

		if (itemData.id)
			custom_menu_item.attr("data-id", itemData.id);

		if (itemData.description)
			custom_menu_item.attr("data-description", itemData.description);

		if (itemData.descriptionList) {
			//custom_menu_item.attr("data-description-list", itemData.descriptionList);
			let descriptionListData = "";

			// txt, subtxt
			for (let l in itemData.descriptionList) {
				descriptionListData += createDescriptionItem(itemData.descriptionList[l]);
			}

			custom_menu_item.attr("data-description-list", descriptionListData);
		}

		if (itemData.disabled)
			custom_menu_item.addClass("disabled");

		if (itemData.special)
			custom_menu_item.attr("data-special", itemData.special);

		if (itemData.color)
			custom_menu_item.css("background-color", itemData.color);

		custom_menu_item.append(custom_menu_subitem);

		if (itemData.body) {
			let subbody = createItems(itemData.body);
			custom_menu_item.append(subbody);
		}

		return custom_menu_item;
	}

	function createItems(body) {

		let custom_menu_body = $("<div class='custom-menu-body'></div>");
		let custom_menu_items = $("<div class='custom-menu-items'></div>");
		let custom_menu_footer = $("<div class='custom-menu-slot custom-menu-footer'><span class='custom-menu-footer-arrow'>&#708;</span><span class='custom-menu-footer-arrow'>&#x2C5;</span></div>");
		let custom_menu_item_description_list = $("<div class='custom-menu-item-description-list'></div>");
		let custom_menu_item_description = $("<div class='custom-menu-item-description'></div>");

		if (body.subheader) {
			let custom_menu_subheader = $("<div class='custom-menu-slot custom-menu-subheader'></div>");

			if (body.subheader.txt)
				custom_menu_subheader.html(body.subheader.txt);

			if (body.subheader.count) {
				custom_menu_subheader.append("<span class='custom-menu-subheader-count'></span>");
				custom_menu_body.attr("data-subheader-count", true);
			}
			
			custom_menu_body.append(custom_menu_subheader);
		}

		for (let key in body.items) {
			if (!body.items[key])
				continue;

			let custom_menu_item = createItem(body.items[key]);
			custom_menu_items.append(custom_menu_item);
		}

		custom_menu_body.attr("data-id", body.id);

		custom_menu_body.append(custom_menu_items);
		custom_menu_body.append(custom_menu_footer);
		custom_menu_body.append(custom_menu_item_description_list);
		custom_menu_body.append(custom_menu_item_description);

		//selectItem(custom_menu, custom_menu_body, custom_menu_items.children(":first"), true, false);

		return custom_menu_body;
	}


	function getActiveCustomMenu() {
		return $(".custom-menu.active").not(".parent-menu");
	}


	function deleteCustomMenu(id) {
		if (!custom_menus[id])
			return;

		if (custom_menus[id].hasClass("active"))
			closeCustomMenu(id);

		custom_menus[id].remove();
	}


	function openCustomMenu(id, closes, freezes) {
		if (!custom_menus[id])
			return;

		if (!custom_menus[id].hasClass("active")) {
			if (closes)
				closeCustomMenu();
			custom_menus[id].fadeIn(100);
			custom_menus[id].addClass("active");
			jcmp.CallEvent("PlaySound", "open-menu");
			jcmp.CallEvent("CustomMenuOpened", id, freezes);
			UpdateLegend(true);
			jcmp.CallEvent("UpdateHUD", JSON.stringify({hideHelpmessage: true, hideStats: true, hideRadio: true, hideMilitaryBases: true}));
		}
	}


	function UpdateLegend(bool) {
		if (bool) {
			let data = {};

			let custom_menu = getActiveCustomMenu();

			if (custom_menu.attr("data-key") !== "-1")
				data.back = true;
			
			if (custom_menu.length > 0) {
				let body_active = custom_menu.find(".custom-menu-body.active");
				let item = body_active.children(".custom-menu-items").children(".custom-menu-item.selected");

				if (body_active.children(".custom-menu-items").children(".custom-menu-item").length > 1)
					data.arrows_v = true;
							
				if (!item.hasClass("disabled"))
					data.enter = true;

				if (item.attr("data-innervalues"))
					data.arrows_h = true;
			}

			if (data.back)
				$(".custom-menu-help-item-back").show();
			else
				$(".custom-menu-help-item-back").hide();

			if (data.arrows_v)
				$(".custom-menu-help-item-arrows-v").show();
			else
				$(".custom-menu-help-item-arrows-v").hide();

			if (data.arrows_h)
				$(".custom-menu-help-item-arrows-h").show();
			else
				$(".custom-menu-help-item-arrows-h").hide();
			
			if (data.arrows_h || data.arrows_v)
				$(".custom-menu-help-item-arrows-v").show();
			else
				$(".custom-menu-help-item-arrows-v").hide();

			if (data.enter)
				$(".custom-menu-help-item-enter").show();
			else
				$(".custom-menu-help-item-enter").hide();

			$(".custom-menu-help-container").show();
		} else {
			$(".custom-menu-help-container").hide();
		}
	}


	function closeCustomMenu(id) {
		if (id && custom_menus[id]) {
			if (custom_menus[id].hasClass("active")) {
				custom_menus[id].fadeOut(100);
				custom_menus[id].removeClass("active");
				jcmp.CallEvent("CustomMenuClosed", id);
				jcmp.CallEvent("PlaySound", "close-menu");
				UpdateLegend(false);
				jcmp.CallEvent("UpdateHUD", JSON.stringify({hideHelpmessage: false, hideMilitaryBases: false}));
			}
		} else {
			$(".custom-menu.active").each(function(i) {
				$(this).hide();
				$(this).removeClass("active");
				jcmp.CallEvent("CustomMenuClosed", $(this).attr("id"));
				jcmp.CallEvent("PlaySound", "close-menu");
				UpdateLegend(false);
				jcmp.CallEvent("UpdateHUD", JSON.stringify({hideHelpmessage: false, hideMilitaryBases: false}));
			});
		}
		
	}


	function selectNextInnerItem(custom_menu, next) {
		let body_active = custom_menu.find(".custom-menu-body.active");

		let selected = body_active.children(".custom-menu-items").children(".custom-menu-item.selected");

		if (selected.hasClass("disabled")) {
			jcmp.CallEvent("PlaySound", "deny");
			return;
		}

		if (selected.length == 0)
			selected = body_active.children(".custom-menu-items").children(".custom-menu-item").first();

		if (!selected.attr("data-innervalues"))
			return;

		let inner_item_selected = selected.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem.selected");
		if (inner_item_selected.length == 0)
			inner_item_selected = selected.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem").first();

		let nextInnerItem = next ? inner_item_selected.next() : inner_item_selected.prev();

		if (nextInnerItem.length == 0)
			nextInnerItem = next ? selected.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem").first() : selected.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem").last();

		if (selected.attr("data-special")) {
			switch (selected.attr("data-special")) {
				case "cooldown":
					selected.addClass("disabled");
					if (timeoutCooldown)
						clearTimeout(timeoutCooldown);

					timeoutCooldown = setTimeout(function() {
						selected.removeClass("disabled");
						timeoutCooldown = null;
					}, 3000);
					break;
			}
		}

		selectInnerItem(custom_menu, body_active, selected, nextInnerItem);
	}


	function selectInnerItem(custom_menu, body_active, item, innerItem) {
		if (item.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem").length > 1) {
			if (innerItem.length > 0) {
				item.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem").removeClass("selected");
				innerItem.addClass("selected");

				jcmp.CallEvent("PlaySound", "switch");
				jcmp.CallEvent("CustomMenuSelected", JSON.stringify({menuId: custom_menu.attr('id'), bodyId: body_active.attr("data-id"), itemId: item.attr("data-id"), value: innerItem.attr("data-value")}));
			}
		} else {
			jcmp.CallEvent("PlaySound", "deny");
		}
	}


	// next false for up, true for down
	function selectNextItem(custom_menu, next) {

		let body_active = custom_menu.find(".custom-menu-body.active");

		let selected = body_active.children(".custom-menu-items").children(".custom-menu-item.selected");
		let nextItem = null;

		if (selected.length > 0)
			nextItem = next ? selected.next() : selected.prev();
		else
			nextItem = body_active.children(".custom-menu-items").children(".custom-menu-item").first();

		if (nextItem.length == 0)
			nextItem = next ? body_active.children(".custom-menu-items").children(".custom-menu-item").first() : body_active.children(".custom-menu-items").children(".custom-menu-item").last();

		selectItem(custom_menu, body_active, nextItem, next, false, false);
	}


	function updateDescriptionList(item, body_active) {
		if (item.attr("data-description-list")) {
			body_active.children(".custom-menu-item-description-list").hide();
			body_active.children(".custom-menu-item-description-list").html(item.attr("data-description-list"));
			body_active.children(".custom-menu-item-description-list").show();
		} else {
			body_active.children(".custom-menu-item-description-list").html("");
			body_active.children(".custom-menu-item-description-list").hide();
		}
	}


	function updateDescription(item, body_active) {
		if (item.attr("data-description")) {
			body_active.children(".custom-menu-item-description").hide();
			body_active.children(".custom-menu-item-description").html(item.attr("data-description"));
			body_active.children(".custom-menu-item-description").fadeIn(150);
		} else {
			body_active.children(".custom-menu-item-description").html("");
			body_active.children(".custom-menu-item-description").hide();
		}
	}


	function selectItem(custom_menu, body_active, item, scrolling, mute, internal) {

		if (internal || body_active.children(".custom-menu-items").children(".custom-menu-item").length > 1) {
			if (item.length > 0) {
				body_active.children(".custom-menu-items").children(".custom-menu-item").removeClass("selected");
				item.addClass("selected");

				updateDescriptionList(item, body_active);
				updateDescription(item, body_active);

				if (!mute)
					jcmp.CallEvent("PlaySound", "switch");

				let value = item.attr("data-value");
				let hover = false;
				if (item.attr("data-innervalues")) {
					hover = true;
					value = item.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem.selected").attr("data-value");
				}

				jcmp.CallEvent("CustomMenuSelected", JSON.stringify({menuId: custom_menu.attr('id'), bodyId: body_active.attr("data-id"), itemId: item.attr("data-id"), value: value, hover: hover}));
			}

			let index = body_active.children(".custom-menu-items").children(".custom-menu-item.selected").index();

			if (body_active.attr("data-subheader-count"))
				body_active.children(".custom-menu-subheader").children(".custom-menu-subheader-count").html((index + 1) + " / " + body_active.children(".custom-menu-items").children(".custom-menu-item").length);

			let scrolltop = body_active.children(".custom-menu-items").scrollTop();
			if (scrolling && scrolltop <= (28 * (index - 8)))
				scrolltop = 28 * (index - 8);

			if (!scrolling && scrolltop >= (28 * (index - 1)))
				scrolltop = 28 * (index - 1);

			if (scrolling && index === 0)
				scrolltop = 0;

			if (!scrolling && index === body_active.children(".custom-menu-items").children(".custom-menu-item").length - 1)
				scrolltop = (body_active.children(".custom-menu-items").children(".custom-menu-item").length - 8) * 28;

			body_active.children(".custom-menu-items").scrollTop(scrolltop);
			UpdateLegend(true);
		} else {
			jcmp.CallEvent("PlaySound", "deny");
		}
	}


	function backItem(custom_menu, close) {
		if (custom_menu.children(".custom-menu-body").length > 1) {
			let body_active = custom_menu.find(".custom-menu-body.active");
			body_active.remove();
			custom_menu.children(".custom-menu-body:last-child").addClass("active");
			UpdateLegend(true);
		} else if (close) {
			closeCustomMenu();
		}
	}


	function pressItem(custom_menu) {

		let body_active = custom_menu.find(".custom-menu-body.active");
		let item = body_active.children(".custom-menu-items").children(".custom-menu-item.selected");

		if (item.hasClass("disabled")) {
			jcmp.CallEvent("PlaySound", "deny");

		} else {

			if (item.has(".custom-menu-body").length) {
				custom_menu.children(".custom-menu-body").removeClass("active");
				custom_menu.append(item.children(".custom-menu-body").clone());
				custom_menu.children(".custom-menu-body:last-child").addClass("active");

				selectItem(custom_menu, custom_menu.children(".custom-menu-body:last-child"), custom_menu.children(".custom-menu-body:last-child").children(".custom-menu-items").children(":first"), true, false, true);

			} else {

				let values = null;

				if (item.attr("data-special")) {
					switch (item.attr("data-special")) {
						case "back":
							backItem(custom_menu);
							jcmp.CallEvent("PlaySound", "deny");
							return;

						case "confirm":
							backItem(custom_menu);
							jcmp.CallEvent("PlaySound", "accept");
							break;

						case "confirm2":
							backItem(custom_menu);
							backItem(custom_menu);
							jcmp.CallEvent("PlaySound", "accept");
							break;

						case "close":
							closeCustomMenu();
							break;

						case "disable":
							item.addClass("disabled");
							break;

						case "submit":
							values = {};

							body_active.children(".custom-menu-items").children(".custom-menu-item").each(function() {
								let value = getItemValue($(this));
								if (value)
									values[$(this).attr("data-id")] = value;
							});

							jcmp.CallEvent("PlaySound", "accept");
							break;

						case "submitdisable":
							values = {};

							body_active.children(".custom-menu-items").children(".custom-menu-item").each(function() {
								$(this).addClass("disabled");
								let value = getItemValue($(this));
								if (value)
									values[$(this).attr("data-id")] = value;
							});

							jcmp.CallEvent("PlaySound", "accept");
							break;
					}
				}

				let value = getItemValue(item);

				jcmp.CallEvent("CustomMenuPressed", JSON.stringify({menuId: custom_menu.attr('id'), bodyId: body_active.attr("data-id"), itemId: item.attr("data-id"), value: value, values: values}));
			}
		}

	}


	function getItemValue(item) {
		return item.attr("data-innervalues") ? item.children(".custom-menu-subitem").children(".custom-menu-subitem-inneritems").children(".custom-menu-subitem-inneritem.selected").attr("data-value") : item.attr("data-value");
	}

	// 38 up, 40 down, 13 enter, 39 right, 37 left
	jcmp.AddEvent('KeyUp', function(key, allowed, arrayMenus) {
		let custom_menu = getActiveCustomMenu();
		if (custom_menu.length == 0) return;

		arrayMenus = JSON.parse(arrayMenus);
		if (arrayMenus.isChatOpened || arrayMenus.isInputTextOpened || !arrayMenus.loaded) return;

		if (key == 13) {
			pressItem(custom_menu);
		}

		let closeKey = custom_menu.attr("data-key") || 70;

		if (key == 8 || key == 17) {
			backItem(custom_menu, (key == 17 && closeKey != -1));
			jcmp.CallEvent("PlaySound", "deny");
		}
		
		if (key == closeKey || (closeKey != -1 && key == 27)) {
			closeCustomMenu(custom_menu);
		}
	});


	jcmp.AddEvent('KeyDown', function(key, allowed, arrayMenus) {
		arrayMenus = JSON.parse(arrayMenus);
		if (arrayMenus.isChatOpened || arrayMenus.isInputTextOpened || !arrayMenus.loaded) return;

		let custom_menu = getActiveCustomMenu();
		if (custom_menu.length == 0) return;

		if (key == 38)
			selectNextItem(custom_menu, false);

		if (key == 40)
			selectNextItem(custom_menu, true);

		if (key == 39)
			selectNextInnerItem(custom_menu, true);

		if (key == 37)
			selectNextInnerItem(custom_menu, false);
	});


	jcmp.AddEvent('UpdateCustomMenuItem', function(id, data) {
		updateCustomMenuItem(id, JSON.parse(data));
	});


	jcmp.AddEvent('OpenCustomMenu', function(data, freezes) {
		data = JSON.parse(data);
		createCustomMenu(data, freezes);
	});


	jcmp.AddEvent('CloseCustomMenu', function(id) {
		closeCustomMenu(id);
	});
	console.log("loaded");
});