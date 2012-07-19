var devices = [ "ios", "android", "blackberry", "meego" ], CtrlDown = false, contextMenu,
    colors = [ "color", "background-color", "border-color" ],
    cursorSvg = 'url(\'data:image/svg+xml;utf-8,<svg xmlns="http:%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32"><path d="M 0.89285714%2C31.196429 C 10.357143%2C5.080357 17.406299%2C-5.6022602 27.946429%2C3.8749999 43.883929%2C18.205357 0.89285714%2C31.196429 0.89285714%2C31.196429 z" style="fill:%23f984ef;stroke:%23000000;stroke-width:1px;" %2F><%2Fsvg>\') 0 32, auto';

(function ($, undefined) {

    var ui = kendo.ui,
        Widget = ui.Widget,
        applications = {},
        counter = 1,
        clones = $.extend([], devices),
        widgetList = {
            icon: {
                name: "Icon",
                selector: ".km-icon",
                whitelist: [ "background-color", "background-image", "width", "height" ]
            },
            text: {
                name: "Text",
                selector: ".km-text",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            grouptitle: {
                name: "Group Title",
                selector: ".km-group-title",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            viewtitle: {
                name: "View Title",
                selector: ".km-view-title",
                whitelist: [ "color", "font-family", "font-style", "font-weight", "font-size" ]
            },
            listitem: {
                name: "List Item",
                selector: ".km-list > li",
                whitelist: [ "background-color", "background-image", "border-radius" ]
            },
            scrollitem: {
                name: "ScrollView Item",
                selector: ".km-scrollview > div > *",
                whitelist: [ "width", "height" ]
            },
            switchback: {
                name: "Switch Background",
                selector: ".km-switch-background",
                whitelist: [ "background-color", "background-image" ]
            },
            switchhandle: {
                name: "Switch Handle",
                selector: ".km-switch-handle",
                whitelist: [ "width", "height" ]
            },
            switchon: {
                name: "Switch On Label",
                selector: ".km-switch-label-on",
                whitelist: [ "left", "width", "height", "color", "text-shadow", "font-family", "font-style", "font-weight", "font-size" ]
            },
            switchoff: {
                name: "Switch Off Label",
                selector: ".km-switch-label-off",
                whitelist: [ "left", "width", "height", "color", "text-shadow", "font-family", "font-style", "font-weight", "font-size" ]
            },
            switch: {
                name: "Switch",
                selector: ".km-switch",
                whitelist: [ "width", "height" ],
                children: [ "switchback", "switchhandle", "switchon", "switchoff" ]
            },
            buttongroup: {
                selector: ".km-button-group",
                whitelist: [ "box-shadow", "border-radius" ],
                children: [ "button" ]
            },
            scrollview: {
                name: "ScrollView",
                selector: ".km-scrollview",
                whitelist: [ "background-color", "background-image", "box-shadow" ],
                children: [ "scrollitem" ]
            },
            button: {
                name: "Button",
                selector: ".km-button",
                whitelist: [ "background-color", "background-image"],
                children: [ "icon", "text" ]
            },
            navbar: {
                name: "NavBar",
                selector: ".km-navbar",
                whitelist: [ "background-color", "background-image" ],
                children: [ "button", "viewtitle" ]
            },
            listview: {
                name: "ListView",
                selector: ".km-list",
                whitelist: [ "background-color" ],
                children: [ "icon", "button", "switch", "listitem", "grouptitle" ]
            },
            content: {
                name: "View Content",
                selector: ".km-content",
                whitelist: [ "background-color", "background-image" ],
                children: [ "button", "listview", "scrollview", "switch", "buttongroup" ]
            },
            tabstrip: {
                name: "TabStrip",
                selector: ".km-tabstrip",
                whitelist: [ "background-color", "border-color", "border-width", "border-style" ],
                children: [ "button" ]
            },
            view: {
                name: "View",
                selector: ".km-view",
                whitelist: [ "background-color" ],
                children: [ "navbar", "content", "tabstrip", "loader" ]
            },
            ios: {
                selector: ".km-ios"
            },
            android: {
                selector: ".km-android"
            },
            blackberry: {
                selector: ".km-blackberry"
            },
            meego: {
                selector: ".km-meego"
            }
        };

    for (var idx in widgetList) {
        var children = widgetList[idx].children;
        if (children) {
            children.forEach(function (name) {
                var item = widgetList[name];
                if (item) { item.parents = [ idx ].concat(item.parents || []); }
            });
        }
    }

    var StyleEngine = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            that.object = {};

            that.styleElement = $("<style scoped></style>").insertBefore(element);
        },
        options: {
            name: "StyleEngine"
        },
        populate: function() {

        },
        update: function(element, styles) {
            element = $(element);
            var that = this, style,
                output = "", widget;

            $(element.parentsUntil(".km-root").add(element).get()).each(function (idx, value) {
                widget = that._findWidgetClass(value.className);
                if (widget) {
                    output += widget.selector + " ";
                }
            });
            output = output.substr(0, output.length-1);

            this.object[output] = $.extend(this.object[output], styles);

            style = $("<style scoped>\n" + that.getCSS() + "</style>").insertAfter(that.styleElement);
            that.styleElement.remove();
            that.styleElement = style;
        },
        getCSS: function () {
            var object = this.object, output = "";

            for (var i in object) {
                output += i + " {\n";
                for (var j in object[i]) {
                    output += "    " + j + ": " + object[i][j] + ";\n";
                }
                output += "}\n";
            }

            return output;
        },
        _findWidgetClass: function(className) {
            for(var idx in widgetList) {
                if (new RegExp(widgetList[idx].selector.substr(1).replace("*", "\\*")+"(\\s|$)").test(className)) {
                    return $.extend( { widget: idx },  widgetList[idx] );
                }
            }

            return false;
        }
    });

    kendo.ui.plugin(StyleEngine);

    window.getPropertySelector = function (property) {
        var output = "", widget;

        for(var idx in widgetList) {
            widget = widgetList[idx];
            if (((widget.whitelist && widget.whitelist.indexOf(property) != -1) || !property) && widget.selector[0] != ">") {
                output += widget.selector + ",";
            }
        }
        return output.substring(0, output.length-1);
    };

    window.getWidgets = function (property) {
        var widget, qualifiedWhiteList, widgets = { selector: "" };

        if (typeof property == "string")
            property = [ property ];

        for(var idx in widgetList) {
            widget = widgetList[idx];
            qualifiedWhiteList = widget.whitelist ? widget.whitelist.filter(function (value) { return property.indexOf(value) != -1; }) : [];

            if (((widget.whitelist && qualifiedWhiteList.length) || !property.length) && widget.selector[0] != ">") {
                widgets[idx] = widget;
                widgets[idx].whitelist = qualifiedWhiteList;
                widgets.selector += widget.selector + ",";
            }
        }

        widgets.selector = widgets.selector.substring(0, widgets.selector.length-1);

        return widgets;
    };

    window.getMenuDataItem = function (item, source) {
        item = $(item);
        var menuElement = item.closest(".k-menu"),
            dataItem = source,
            index = item.parentsUntil(menuElement, ".k-item").map(function () {
                return $(this).index();
            }).get().reverse();

        index.push(item.index());

        for (var i = -1, len = index.length; ++i < len;) {
            dataItem = dataItem[index[i]];
            dataItem = i < len-1 ? dataItem.items : dataItem;
        }

        return dataItem;
    };

    window.buildMenu = function (element) {
        var widgets = getWidgets(colors), menuStructure = [];

        for (var i in widgets ) {
            if (i != "selector") {
                if (element.closest(widgets[i].selector)[0]) {
                    var item = { text: widgets[i].name, items: [] };

                    for (var j in widgets[i].whitelist) {
                        item.items.push({ text: widgets[i].whitelist[j], value: widgets[i].selector });
                    }

                    menuStructure.push(item);
                }
            }
        }

        return menuStructure;
    };

    // Override Kendo History to avoid URL breaks and bad refresh
    kendo.history.navigate = function(to, silent) {
        var that = this;

        if (to === '#:back') {
            return;
        }

        to = to.replace(/^#*/, '');

        if (that.current === to || that.current === decodeURIComponent(to)) {
            return;
        }

        if (that._pushState) {
            history.pushState({}, document.title, that._makePushStateUrl(to));
            that.current = to;
        }

        if (!silent) {
            that.trigger("change", {url: that.current});
        }
    };

    function replaceIDs() {
        var id = this.id;
        this.id += counter;
        $(this).closest(".device").find("[href^=#" + id + "]").attr("href", "#" + this.id);
    }

    function replaceLayouts() {
        var that = $(this),
            newId = that.attr("data-id") + counter++;

        that.attr("data-id", newId);
        that.closest(".device").find("[data-layout]").attr("data-layout", newId);
    }

    clones.shift();
    $.each(clones.reverse(), function () {
        $("#iosDevice")
            .clone(true)
            .find("[id]") // Make sure there are no duplicate IDs.
            .each(replaceIDs)
            .end()
            .find("[data-id]")
            .each(replaceLayouts)
            .end()
            .attr("id", this.toString() + "Device")
            .insertAfter("#iosDevice");
    });

    $("#" + clones[0] + "Device [data-role=view]").attr("data-init", "initTargets");

    $.each(devices, function () {
        var that = this.toString(),
            deviceId = "#" + that + "Device";
        applications[that] = new kendo.mobile.Application(deviceId, { platform: that });
        $(deviceId).kendoStyleEngine();
    });

})(jQuery);

function initTargets() {
    setTimeout(function () {
        var property = "background-color",
            color = "transparent",
            defaultCSS = { cursor: "default" };

        defaultCSS[property] = "";

        $(".drop").kendoDraggable({
            dragstart: function (e) {
                $(document.documentElement).css("cursor", cursorSvg.replace("%23f984ef", this.element.css("background-color")));
            },
            dragend: function () {
                $(document.documentElement).css("cursor", 'default');
            }
        });

        $(".device").kendoDropFilter({
            filter: getWidgets(colors).selector,
            dragenter: function (e) {
                color = new Color(e.draggable.element.css(property)).get();

                var css = { cursor: cursorSvg.replace("%23f984ef", color) };

                css[property] = color;
                $(e.filterTarget).css(css);
            },
            dragleave: function (e) {
                $(e.filterTarget).css(defaultCSS);
            },
            drop: function (e) {
                var that = this,
                    target = $(e.filterTarget);

                target.css(defaultCSS);

                if (CtrlDown) {
                    var offset = target.offset(),
                        structure = buildMenu(target);

                    contextMenu.element.empty();
                    contextMenu.append(structure);
                    contextMenu.one("select", function (e) {
                        var style = {}, dataItem = getMenuDataItem(e.item, structure);
                        style[dataItem.text] = color;

                        target.parents(".device").data("kendoStyleEngine").update(target.closest(dataItem.value), style);
                    });
                    contextMenu.show(offset.left + e.offsetX, offset.top + e.offsetY);
                } else {
                    target.parents(".device").data("kendoStyleEngine").update(target, { "background-color": color });
                }
            }
        });

        contextMenu = $("<ul />").appendTo(document.body).kendoContextMenu().data("kendoContextMenu");

        $(document).on({
            keydown: function (e) { CtrlDown = e.which == 17; },
            keyup: function (e) { CtrlDown = !(e.which == 17); }
        });

//        var allProps = getPropertySelector();
//        $(document.body).on({
//            mouseover: function (e) {
//                $(".utility-active").removeClass("utility-active");
//                $(e.currentTarget).addClass("utility-active");
//                e.stopImmediatePropagation();
//            },
//            mouseout: function (e) {
//                $(".utility-active").removeClass("utility-active");
//                e.stopImmediatePropagation();
//            }
//        }, allProps);

        $(".device").on({
            click: function (e) {
                var target = $(e.currentTarget),
                    width = target.outerWidth();

                if (width - 20 < e.offsetX && e.offsetX < width && e.offsetY > 0 && e.offsetY < 20) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            }
        }, ".utility-active");

        $("#picky").kendoHSLPicker();
        $(".km-tabstrip").kendoHSLPicker({ change: function (e) {
            this.element.parents(".device").data("kendoStyleEngine").update(this.element, { "background-color": e.color.get() });
        } });
        $(".gradient").kendoGradientPicker();
        $(".km-navbar").kendoGradientPicker();
    }, 200);
}

function mobileAccountViewInit() {
    var listviews = this.element.find("ul.km-listview");

    this.element.find("[id^=settings-view]").kendoMobileButtonGroup({
        select: function() {
            listviews.hide()
                     .eq(this.selectedIndex)
                     .show();
        },
        index: 0
    });
}

var defaultColors = [ "#c5007c", "#6300a5", "#0010a5", "#0064b5", "#00a3c7", "#0fad00", "#8cc700", "#ffff00", "#fec500", "#ff9400", "#ff6600", "#ff0000",
                      "transparent", "#fff", "#e5e5e5", "#ccc", "#b2b2b2", "#999", "#7f7f7f", "#666", "#4c4c4c", "#333", "#191919", "#000" ],
    i = 0;

while (defaultColors[i]) {
   $('<div class="drop" style="background-color:' + defaultColors[i++] + '" />').appendTo(".colorHolder");
   if (!(i % 12)) {
       $("<br />").appendTo(".colorHolder");
   }
}

$(".menu").kendoMenu();

$("#getStyles").click(function () {
    var output = "";

    $.each(devices, function () {
        var that = this.toString();
        if ($("#" + that + "box")[0].checked) {
            output += $("#" + that + "Device").data("kendoStyleEngine").getCSS();
        }
    });

    alert(output);
});
