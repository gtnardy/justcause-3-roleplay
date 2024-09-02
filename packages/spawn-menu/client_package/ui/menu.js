;(function($, document, window, undefined) {

    let defaults = {
        tabs: [],
        title: 'Spawn Menu',
        iconBasePath: false,
        searchable: false,
        dataCallback: function() {},
        itemClickCallback: function() {}
    };

    function SpawnMenu(element, options) {
        this._name = 'SpawnMenu';
        this._defaults = defaults;
        this.settings = $.extend({}, defaults, options);
        this.element = element;
        this.el = $(element);

        this.data = {
            visible: false,
            lastClick: 0,
            hoverTimeout: null,
            elements: {
                menuContainer: null,
                dataContainer: null,
                hoverContainer: null
            }
        };

        this.init();
        this.el.addClass('compact');
        this.el.find('.tab-container a:first-of-type').click();
    }

    String.prototype.capitalizeFirstLetter = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    $.extend(SpawnMenu.prototype, {
        init: function() {
            let menu = this,
                container = $('<div class="menu-container"></div>');

            this.data.elements.menuContainer = container;
            this.data.elements.hoverContainer = $('<div class="spawn-menu-item vehicle-popout"></div>');

            // do we have any tabs?
            if (this.settings.tabs.length > 0) {
                let tab_container = $('<nav class="tab-container"></nav>'),
                    data_container = $('<div class="data-container"></div>');

                container.append(tab_container);
                container.append(data_container);

                this.data.elements.dataContainer = data_container;

                $.each(this.settings.tabs, function(key, value) {
                    let title = value;

                    // trim the tab value if the last character is 's'
                    if (value.charAt(value.length - 1) === 's')
                        value = value.substr(0, value.length - 1);

                    let tab = $(`<a href="#" data-tab="${value.toLowerCase()}">${title}</a>`);
                    tab_container.append(tab);

                    let content = $(`<div class="results-container tab-content" data-tab="${value.toLowerCase()}">
                        <h1 class="tab-title">${title}</h1>
                    </div>`);

                    data_container.append(content);

                    tab.on('click', function() {
                        let that = $(this),
                            tabval = that.data('tab');

                        menu.el.find('.tab-content.selected').removeClass('selected');
                        menu.el.find('.tab-container .selected').removeClass('selected');

                        that.addClass('selected');
                        menu.el.find(`.tab-content[data-tab="${tabval}"]`).addClass('selected');
                        return false;
                    });
                });
            }
            else
            {
                let title = $(`<h1 class="tab-title single">${this.settings.title}</h1>`);
                container.append(title);

                let data_container = $('<div class="data-container"></div>'),
                    results_container = $(`<div class="results-container tab-content single"></div>`);

                data_container.append(results_container);

                container.append(data_container);
                this.data.elements.dataContainer = data_container;
            }

            this.el.append(container);
            this.el.append(this.data.elements.hoverContainer);

            this.initData();
            this.initHandlers();
            this.initSettings();
        },
        initData: function() {
            let data = this.settings.dataCallback();
            if (typeof data !== 'object') {
                console.log('unknown data returned to data callback.');
                return false;
            }

            let menu = this;

            $.each(data, function(key, value) {
                let container = menu.el.find(`.results-container[data-tab="${value.type}"]`),
                    class_container = false;

                // single page things
                if (typeof value.type === 'undefined')
                    container = menu.el.find('.results-container.single');

                // if we have a class find the container or create it
                if (value.class) {
                    let cl = container.find(`div[data-class="${value.class}"]`);
                    if (cl.length === 0) {
                        class_container = $(`<div class="vehicle-class" data-class="${value.class}"></div>`);

                        $(`<h1 class="title"><span>${value.class.replace('_', ' ').capitalizeFirstLetter()}</span></h1>`).appendTo(class_container);
                        $(`<div class="results-container"></div>`).appendTo(class_container);
                        container.append(class_container);
                    } else {
                        class_container = cl;
                    }
                }

                // insert the menu item
                if (container.length > 0) {
                    let el = $(`<div class="spawn-menu-item">
                        <div class="extended-mode-only">
                            <div class="title${value.dlc !== null ? ' dlc' : ''}">
                                <span>${value.name}</span>
                                ${value.dlc !== null ? '<span class="dlc">DLC</span>' : ''}
                            </div>
                            ${menu.settings.iconBasePath !== false ? `<img src="${menu.settings.iconBasePath}/${value.model_name}.png" />` : ''}
                        </div>
                        <div class="compact-mode-only">
                            <span>${value.name}</span>
                            ${value.dlc !== null ? '<span class="dlc">DLC</span>' : ''}
                        </div>
                    </div>`);

                    el.appendTo(class_container ? class_container.children('.results-container') : container);

                    // store all the item data
                    $.each(value, function(key, value) {
                        el.data(key, value);
                    });
                }
            });
        },
        initHandlers: function() {
            let menu = this;

            this.el.on('click', '.spawn-menu-item', function() {
                let date = new Date();
                if ((date.getTime() - menu.data.lastClick) < 300)
                    return false;

                menu.data.lastClick = date.getTime();
                menu.settings.itemClickCallback($(this));
                return false;
            });

            if (menu.settings.iconBasePath !== false) {
                this.el.on('mouseenter', '.spawn-menu-item:not(.vehicle-popout)', function() {
                    if (menu.isCompactMode()) {
                        let that = $(this),
                            menu_container = menu.data.elements.menuContainer,
                            hover_contianer = menu.data.elements.hoverContainer;

                        hover_contianer.css({
                            top: that.offset().top - hover_contianer.height() / 2,
                            left: menu_container.offset().left - hover_contianer.width() - 53
                        });

                        hover_contianer.empty();
                        that.find('.extended-mode-only').children().clone().appendTo(hover_contianer);

                        hover_contianer.addClass('visible');

                        if (menu.data.hoverTimeout !== null) {
                            clearTimeout(menu.data.hoverTimeout);
                            menu.data.hoverTimeout = null;
                        }
                    }
                });

                this.el.on('mouseleave', '.spawn-menu-item:not(.vehicle-popout)', function() {
                    if (menu.isCompactMode() && menu.data.hoverTimeout === null) {
                        menu.data.hoverTimeout = setTimeout(function() {
                            menu.data.elements.hoverContainer.removeClass('visible');
                        }, 200);
                    }
                });
            }
        },
        initSettings: function() {
            const settings = this.el.children('.settings');
            settings.detach().appendTo(this.data.elements.menuContainer);
        },
        isCompactMode: function() {
            return this.el.hasClass('compact');
        },
        setVisible: function(visible) {
            this.data.visible = visible;

            if (visible) {
                this.el.addClass('visible');
                this.el.focus();
            } else {
                this.el.removeClass('visible');
            }
        },
        isVisible: function() {
            return this.data.visible;
        }
    });

    $.fn['spawnMenu'] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_spawnmenu'))
                $.data(this, 'plugin_spawnmenu', new SpawnMenu(this, options));
        });
    }

})(jQuery, document, window);
