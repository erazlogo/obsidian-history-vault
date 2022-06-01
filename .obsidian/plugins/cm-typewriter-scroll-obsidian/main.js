'use strict';

var obsidian = require('obsidian');
var state = require('@codemirror/state');
var view = require('@codemirror/view');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

// all credit to azu: https://github.com/azu/codemirror-typewriter-scrolling/blob/b0ac076d72c9445c96182de87d974de2e8cc56e2/typewriter-scrolling.js
var movedByMouse = false;
CodeMirror.commands.scrollSelectionToCenter = function (cm) {
    var cursor = cm.getCursor('head');
    var charCoords = cm.charCoords(cursor, "local");
    var top = charCoords.top;
    var halfLineHeight = (charCoords.bottom - top) / 2;
    var halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
    var scrollTo = Math.round((top - halfWindowHeight + halfLineHeight));
    cm.scrollTo(null, scrollTo);
};
CodeMirror.defineOption("typewriterScrolling", false, function (cm, val, old) {
    if (old && old != CodeMirror.Init) {
        const linesEl = cm.getScrollerElement().querySelector('.CodeMirror-lines');
        linesEl.style.paddingTop = null;
        linesEl.style.paddingBottom = null;
        cm.off("cursorActivity", onCursorActivity);
        cm.off("refresh", onRefresh);
        cm.off("mousedown", onMouseDown);
        cm.off("keydown", onKeyDown);
        cm.off("beforeChange", onBeforeChange);
    }
    if (val) {
        onRefresh(cm);
        cm.on("cursorActivity", onCursorActivity);
        cm.on("refresh", onRefresh);
        cm.on("mousedown", onMouseDown);
        cm.on("keydown", onKeyDown);
        cm.on("beforeChange", onBeforeChange);
    }
});
function onMouseDown() {
    movedByMouse = true;
}
const modiferKeys = ["Alt", "AltGraph", "CapsLock", "Control", "Fn", "FnLock", "Hyper", "Meta", "NumLock", "ScrollLock", "Shift", "Super", "Symbol", "SymbolLock"];
function onKeyDown(cm, e) {
    if (!modiferKeys.includes(e.key)) {
        movedByMouse = false;
    }
}
function onBeforeChange() {
    movedByMouse = false;
}
function onCursorActivity(cm) {
    const linesEl = cm.getScrollerElement().querySelector('.CodeMirror-lines');
    if (cm.getSelection().length !== 0) {
        linesEl.classList.add("selecting");
    }
    else {
        linesEl.classList.remove("selecting");
    }

    if(!movedByMouse) {
        cm.execCommand("scrollSelectionToCenter");
    }
}
function onRefresh(cm) {
    const halfWindowHeight = cm.getWrapperElement().offsetHeight / 2;
    const linesEl = cm.getScrollerElement().querySelector('.CodeMirror-lines');
    linesEl.style.paddingTop = `${halfWindowHeight}px`;
    linesEl.style.paddingBottom = `${halfWindowHeight}px`; // Thanks @walulula!
    if (cm.getSelection().length === 0) {
        cm.execCommand("scrollSelectionToCenter");
    }
}

var allowedUserEvents = /^(select|input|delete|undo|redo)(\..+)?$/;
var disallowedUserEvents = /^(select.pointer)$/;
var typewriterOffset = state.Facet.define({
    combine: function (values) { return values.length ? Math.min.apply(Math, values) : 0.5; }
});
var resetTypewriterScrollPaddingPlugin = view.ViewPlugin.fromClass(/** @class */ (function () {
    function class_1(view) {
        this.view = view;
    }
    class_1.prototype.update = function (update) {
        if (this.view.contentDOM.style.paddingTop) {
            this.view.contentDOM.style.paddingTop = "";
            this.view.contentDOM.style.paddingBottom = (update.view.dom.clientHeight / 2) + "px";
        }
    };
    return class_1;
}()));
var typewriterScrollPaddingPlugin = view.ViewPlugin.fromClass(/** @class */ (function () {
    function class_2(view) {
        this.view = view;
        this.topPadding = null;
    }
    class_2.prototype.update = function (update) {
        var offset = (update.view.dom.clientHeight * update.view.state.facet(typewriterOffset)) - (update.view.defaultLineHeight / 2);
        this.topPadding = offset + "px";
        if (this.topPadding != this.view.contentDOM.style.paddingTop) {
            this.view.contentDOM.style.paddingTop = this.topPadding;
            this.view.contentDOM.style.paddingBottom = (update.view.dom.clientHeight - offset) + "px";
        }
    };
    return class_2;
}()));
var typewriterScrollPlugin = view.ViewPlugin.fromClass(/** @class */ (function () {
    function class_3(view) {
        this.view = view;
        this.myUpdate = false;
    }
    class_3.prototype.update = function (update) {
        if (this.myUpdate)
            this.myUpdate = false;
        else {
            var userEvents = update.transactions.map(function (tr) { return tr.annotation(state.Transaction.userEvent); });
            var isAllowed = userEvents.reduce(function (result, event) { return result && allowedUserEvents.test(event) && !disallowedUserEvents.test(event); }, userEvents.length > 0);
            if (isAllowed) {
                this.myUpdate = true;
                this.centerOnHead(update);
            }
        }
    };
    class_3.prototype.centerOnHead = function (update) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // can't update inside an update, so request the next animation frame
                window.requestAnimationFrame(function () {
                    // current selection range
                    if (update.state.selection.ranges.length == 1) {
                        // only act on the one range
                        var head = update.state.selection.main.head;
                        var prevHead = update.startState.selection.main.head;
                        // TODO: work out line number and use that instead? Is that even possible?
                        // don't bother with this next part if the range (line??) hasn't changed
                        if (prevHead != head) {
                            // this is the effect that does the centering
                            var offset = (update.view.dom.clientHeight * update.view.state.facet(typewriterOffset)) - (update.view.defaultLineHeight / 2);
                            var effect = view.EditorView.scrollIntoView(head, { y: "start", yMargin: offset });
                            // const effect = EditorView.scrollIntoView(head, { y: "center" });
                            var transaction = _this.view.state.update({ effects: effect });
                            _this.view.dispatch(transaction);
                        }
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return class_3;
}()));
function typewriterScroll(options) {
    if (options === void 0) { options = {}; }
    return [
        options.typewriterOffset == null ? [] : typewriterOffset.of(options.typewriterOffset),
        typewriterScrollPaddingPlugin,
        typewriterScrollPlugin
    ];
}
function resetTypewriterSrcoll() {
    return [
        resetTypewriterScrollPaddingPlugin
    ];
}

var DEFAULT_SETTINGS = {
    enabled: true,
    typewriterOffset: 0.5,
    zenEnabled: false,
    zenOpacity: 0.25
};
var CMTypewriterScrollPlugin = /** @class */ (function (_super) {
    __extends(CMTypewriterScrollPlugin, _super);
    function CMTypewriterScrollPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.extArray = [];
        _this.toggleTypewriterScroll = function (newValue) {
            if (newValue === void 0) { newValue = null; }
            // if no value is passed in, toggle the existing value
            if (newValue === null)
                newValue = !_this.settings.enabled;
            // assign the new value and call the correct enable / disable function
            (_this.settings.enabled = newValue)
                ? _this.enableTypewriterScroll() : _this.disableTypewriterScroll();
            // save the new settings
            _this.saveData(_this.settings);
        };
        _this.changeTypewriterOffset = function (newValue) {
            _this.settings.typewriterOffset = newValue;
            if (_this.settings.enabled) {
                _this.disableTypewriterScroll();
                // delete the extension, so it gets recreated with the new value
                delete _this.ext;
                _this.enableTypewriterScroll();
            }
            _this.saveData(_this.settings);
        };
        _this.toggleZen = function (newValue) {
            if (newValue === void 0) { newValue = null; }
            // if no value is passed in, toggle the existing value
            if (newValue === null)
                newValue = !_this.settings.zenEnabled;
            // assign the new value and call the correct enable / disable function
            (_this.settings.zenEnabled = newValue)
                ? _this.enableZen() : _this.disableZen();
            // save the new settings
            _this.saveData(_this.settings);
        };
        _this.changeZenOpacity = function (newValue) {
            if (newValue === void 0) { newValue = 0.25; }
            _this.settings.zenOpacity = newValue;
            _this.css.innerText = "body{--zen-opacity: ".concat(newValue, ";}");
            // save the new settings
            _this.saveData(_this.settings);
        };
        _this.enableTypewriterScroll = function () {
            // add the class
            document.body.classList.add('plugin-cm-typewriter-scroll');
            // register the codemirror add on setting
            _this.registerCodeMirror(function (cm) {
                // @ts-ignore
                cm.setOption("typewriterScrolling", true);
            });
            if (!_this.ext) {
                _this.ext = typewriterScroll({ typewriterOffset: _this.settings.typewriterOffset });
                _this.extArray = [_this.ext];
                _this.registerEditorExtension(_this.extArray);
            }
            else {
                _this.extArray.splice(0, _this.extArray.length);
                _this.extArray.push(_this.ext);
                _this.app.workspace.updateOptions();
            }
        };
        _this.disableTypewriterScroll = function () {
            // remove the class
            document.body.classList.remove('plugin-cm-typewriter-scroll');
            // remove the codemirror add on setting
            _this.app.workspace.iterateCodeMirrors(function (cm) {
                // @ts-ignore
                cm.setOption("typewriterScrolling", false);
            });
            // clear out the registered extension
            _this.extArray.splice(0, _this.extArray.length);
            _this.extArray.push(resetTypewriterSrcoll());
            _this.app.workspace.updateOptions();
        };
        _this.enableZen = function () {
            // add the class
            document.body.classList.add('plugin-cm-typewriter-scroll-zen');
        };
        _this.disableZen = function () {
            // remove the class
            document.body.classList.remove('plugin-cm-typewriter-scroll-zen');
        };
        return _this;
    }
    CMTypewriterScrollPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        // enable the plugin (based on settings)
                        if (this.settings.enabled)
                            this.enableTypewriterScroll();
                        if (this.settings.zenEnabled)
                            this.enableZen();
                        this.css = document.createElement('style');
                        this.css.id = 'plugin-typewriter-scroll';
                        this.css.setAttr('type', 'text/css');
                        document.getElementsByTagName("head")[0].appendChild(this.css);
                        this.css.innerText = "body{--zen-opacity: ".concat(this.settings.zenOpacity, ";}");
                        // add the settings tab
                        this.addSettingTab(new CMTypewriterScrollSettingTab(this.app, this));
                        // add the commands / keyboard shortcuts
                        this.addCommands();
                        return [2 /*return*/];
                }
            });
        });
    };
    CMTypewriterScrollPlugin.prototype.onunload = function () {
        // disable the plugin
        this.disableTypewriterScroll();
        this.disableZen();
    };
    CMTypewriterScrollPlugin.prototype.addCommands = function () {
        var _this = this;
        // add the toggle on/off command
        this.addCommand({
            id: 'toggle-typewriter-sroll',
            name: 'Toggle On/Off',
            callback: function () { _this.toggleTypewriterScroll(); }
        });
        // toggle zen mode
        this.addCommand({
            id: 'toggle-typewriter-sroll-zen',
            name: 'Toggle Zen Mode On/Off',
            callback: function () { _this.toggleZen(); }
        });
    };
    return CMTypewriterScrollPlugin;
}(obsidian.Plugin));
var CMTypewriterScrollSettingTab = /** @class */ (function (_super) {
    __extends(CMTypewriterScrollSettingTab, _super);
    function CMTypewriterScrollSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    CMTypewriterScrollSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Toggle Typewriter Scrolling")
            .setDesc("Turns typewriter scrolling on or off globally")
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.enabled)
                .onChange(function (newValue) { _this.plugin.toggleTypewriterScroll(newValue); });
        });
        new obsidian.Setting(containerEl)
            .setName("Center offset")
            .setDesc("Positions the typewriter text at the specified percentage of the screen")
            .addSlider(function (slider) {
            return slider.setLimits(0, 100, 5)
                .setValue(_this.plugin.settings.typewriterOffset * 100)
                .onChange(function (newValue) { _this.plugin.changeTypewriterOffset(newValue / 100); });
        });
        new obsidian.Setting(containerEl)
            .setName("Zen Mode")
            .setDesc("Darkens non-active lines in the editor so you can focus on what you're typing")
            .addToggle(function (toggle) {
            return toggle.setValue(_this.plugin.settings.zenEnabled)
                .onChange(function (newValue) { _this.plugin.toggleZen(newValue); });
        });
        new obsidian.Setting(containerEl)
            .setName("Zen Opacity")
            .setDesc("The opacity of unfocused lines in zen mode")
            .addSlider(function (slider) {
            return slider.setLimits(0, 100, 5)
                .setValue(_this.plugin.settings.zenOpacity * 100)
                .onChange(function (newValue) { _this.plugin.changeZenOpacity(newValue / 100); });
        });
    };
    return CMTypewriterScrollSettingTab;
}(obsidian.PluginSettingTab));

module.exports = CMTypewriterScrollPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInR5cGV3cml0ZXItc2Nyb2xsaW5nLmpzIiwiZXh0ZW5zaW9uLnRzIiwibWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuLyoqIEBkZXByZWNhdGVkICovXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheSh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsIi8vIGFsbCBjcmVkaXQgdG8gYXp1OiBodHRwczovL2dpdGh1Yi5jb20vYXp1L2NvZGVtaXJyb3ItdHlwZXdyaXRlci1zY3JvbGxpbmcvYmxvYi9iMGFjMDc2ZDcyYzk0NDVjOTYxODJkZTg3ZDk3NGRlMmU4Y2M1NmUyL3R5cGV3cml0ZXItc2Nyb2xsaW5nLmpzXG5cInVzZSBzdHJpY3RcIjtcbnZhciBtb3ZlZEJ5TW91c2UgPSBmYWxzZTtcbkNvZGVNaXJyb3IuY29tbWFuZHMuc2Nyb2xsU2VsZWN0aW9uVG9DZW50ZXIgPSBmdW5jdGlvbiAoY20pIHtcbiAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgdmFyIGNoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKGN1cnNvciwgXCJsb2NhbFwiKTtcbiAgICB2YXIgdG9wID0gY2hhckNvb3Jkcy50b3A7XG4gICAgdmFyIGhhbGZMaW5lSGVpZ2h0ID0gKGNoYXJDb29yZHMuYm90dG9tIC0gdG9wKSAvIDI7XG4gICAgdmFyIGhhbGZXaW5kb3dIZWlnaHQgPSBjbS5nZXRXcmFwcGVyRWxlbWVudCgpLm9mZnNldEhlaWdodCAvIDI7XG4gICAgdmFyIHNjcm9sbFRvID0gTWF0aC5yb3VuZCgodG9wIC0gaGFsZldpbmRvd0hlaWdodCArIGhhbGZMaW5lSGVpZ2h0KSk7XG4gICAgY20uc2Nyb2xsVG8obnVsbCwgc2Nyb2xsVG8pO1xufTtcbkNvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKFwidHlwZXdyaXRlclNjcm9sbGluZ1wiLCBmYWxzZSwgZnVuY3Rpb24gKGNtLCB2YWwsIG9sZCkge1xuICAgIGlmIChvbGQgJiYgb2xkICE9IENvZGVNaXJyb3IuSW5pdCkge1xuICAgICAgICBjb25zdCBsaW5lc0VsID0gY20uZ2V0U2Nyb2xsZXJFbGVtZW50KCkucXVlcnlTZWxlY3RvcignLkNvZGVNaXJyb3ItbGluZXMnKTtcbiAgICAgICAgbGluZXNFbC5zdHlsZS5wYWRkaW5nVG9wID0gbnVsbDtcbiAgICAgICAgbGluZXNFbC5zdHlsZS5wYWRkaW5nQm90dG9tID0gbnVsbDtcbiAgICAgICAgY20ub2ZmKFwiY3Vyc29yQWN0aXZpdHlcIiwgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgICAgIGNtLm9mZihcInJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICAgICAgY20ub2ZmKFwibW91c2Vkb3duXCIsIG9uTW91c2VEb3duKTtcbiAgICAgICAgY20ub2ZmKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICBjbS5vZmYoXCJiZWZvcmVDaGFuZ2VcIiwgb25CZWZvcmVDaGFuZ2UpO1xuICAgIH1cbiAgICBpZiAodmFsKSB7XG4gICAgICAgIG9uUmVmcmVzaChjbSk7XG4gICAgICAgIGNtLm9uKFwiY3Vyc29yQWN0aXZpdHlcIiwgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgICAgIGNtLm9uKFwicmVmcmVzaFwiLCBvblJlZnJlc2gpO1xuICAgICAgICBjbS5vbihcIm1vdXNlZG93blwiLCBvbk1vdXNlRG93bik7XG4gICAgICAgIGNtLm9uKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICBjbS5vbihcImJlZm9yZUNoYW5nZVwiLCBvbkJlZm9yZUNoYW5nZSk7XG4gICAgfVxufSk7XG5mdW5jdGlvbiBvbk1vdXNlRG93bigpIHtcbiAgICBtb3ZlZEJ5TW91c2UgPSB0cnVlO1xufVxuY29uc3QgbW9kaWZlcktleXMgPSBbXCJBbHRcIiwgXCJBbHRHcmFwaFwiLCBcIkNhcHNMb2NrXCIsIFwiQ29udHJvbFwiLCBcIkZuXCIsIFwiRm5Mb2NrXCIsIFwiSHlwZXJcIiwgXCJNZXRhXCIsIFwiTnVtTG9ja1wiLCBcIlNjcm9sbExvY2tcIiwgXCJTaGlmdFwiLCBcIlN1cGVyXCIsIFwiU3ltYm9sXCIsIFwiU3ltYm9sTG9ja1wiXTtcbmZ1bmN0aW9uIG9uS2V5RG93bihjbSwgZSkge1xuICAgIGlmICghbW9kaWZlcktleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgIG1vdmVkQnlNb3VzZSA9IGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG9uQmVmb3JlQ2hhbmdlKCkge1xuICAgIG1vdmVkQnlNb3VzZSA9IGZhbHNlO1xufVxuZnVuY3Rpb24gb25DdXJzb3JBY3Rpdml0eShjbSkge1xuICAgIGNvbnN0IGxpbmVzRWwgPSBjbS5nZXRTY3JvbGxlckVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcuQ29kZU1pcnJvci1saW5lcycpO1xuICAgIGlmIChjbS5nZXRTZWxlY3Rpb24oKS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgbGluZXNFbC5jbGFzc0xpc3QuYWRkKFwic2VsZWN0aW5nXCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGluZXNFbC5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0aW5nXCIpO1xuICAgIH1cblxuICAgIGlmKCFtb3ZlZEJ5TW91c2UpIHtcbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJzY3JvbGxTZWxlY3Rpb25Ub0NlbnRlclwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBvblJlZnJlc2goY20pIHtcbiAgICBjb25zdCBoYWxmV2luZG93SGVpZ2h0ID0gY20uZ2V0V3JhcHBlckVsZW1lbnQoKS5vZmZzZXRIZWlnaHQgLyAyO1xuICAgIGNvbnN0IGxpbmVzRWwgPSBjbS5nZXRTY3JvbGxlckVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcuQ29kZU1pcnJvci1saW5lcycpO1xuICAgIGxpbmVzRWwuc3R5bGUucGFkZGluZ1RvcCA9IGAke2hhbGZXaW5kb3dIZWlnaHR9cHhgO1xuICAgIGxpbmVzRWwuc3R5bGUucGFkZGluZ0JvdHRvbSA9IGAke2hhbGZXaW5kb3dIZWlnaHR9cHhgOyAvLyBUaGFua3MgQHdhbHVsdWxhIVxuICAgIGlmIChjbS5nZXRTZWxlY3Rpb24oKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJzY3JvbGxTZWxlY3Rpb25Ub0NlbnRlclwiKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFeHRlbnNpb24sIFRyYW5zYWN0aW9uLCBGYWNldCB9IGZyb20gXCJAY29kZW1pcnJvci9zdGF0ZVwiXG5pbXBvcnQgeyBWaWV3UGx1Z2luLCBWaWV3VXBkYXRlLCBFZGl0b3JWaWV3IH0gZnJvbSBcIkBjb2RlbWlycm9yL3ZpZXdcIlxuZGVjbGFyZSB0eXBlIFNjcm9sbFN0cmF0ZWd5ID0gXCJuZWFyZXN0XCIgfCBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJjZW50ZXJcIjtcblxuY29uc3QgYWxsb3dlZFVzZXJFdmVudHMgPSAvXihzZWxlY3R8aW5wdXR8ZGVsZXRlfHVuZG98cmVkbykoXFwuLispPyQvXG5jb25zdCBkaXNhbGxvd2VkVXNlckV2ZW50cyA9IC9eKHNlbGVjdC5wb2ludGVyKSQvXG5cbmNvbnN0IHR5cGV3cml0ZXJPZmZzZXQgPSBGYWNldC5kZWZpbmU8bnVtYmVyLCBudW1iZXI+KHtcbiAgY29tYmluZTogdmFsdWVzID0+IHZhbHVlcy5sZW5ndGggPyBNYXRoLm1pbiguLi52YWx1ZXMpIDogMC41XG59KVxuXG5jb25zdCByZXNldFR5cGV3cml0ZXJTY3JvbGxQYWRkaW5nUGx1Z2luID0gVmlld1BsdWdpbi5mcm9tQ2xhc3MoY2xhc3Mge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IEVkaXRvclZpZXcpIHsgfVxuXG4gIHVwZGF0ZSh1cGRhdGU6IFZpZXdVcGRhdGUpIHtcbiAgICBpZiAodGhpcy52aWV3LmNvbnRlbnRET00uc3R5bGUucGFkZGluZ1RvcCkge1xuICAgICAgdGhpcy52aWV3LmNvbnRlbnRET00uc3R5bGUucGFkZGluZ1RvcCA9IFwiXCJcbiAgICAgIHRoaXMudmlldy5jb250ZW50RE9NLnN0eWxlLnBhZGRpbmdCb3R0b20gPSAodXBkYXRlLnZpZXcuZG9tLmNsaWVudEhlaWdodCAvIDIpICsgXCJweFwiO1xuICAgIH1cbiAgfVxufSlcblxuY29uc3QgdHlwZXdyaXRlclNjcm9sbFBhZGRpbmdQbHVnaW4gPSBWaWV3UGx1Z2luLmZyb21DbGFzcyhjbGFzcyB7XG4gIHByaXZhdGUgdG9wUGFkZGluZzogc3RyaW5nID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXc6IEVkaXRvclZpZXcpIHsgfVxuXG4gIHVwZGF0ZSh1cGRhdGU6IFZpZXdVcGRhdGUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSAodXBkYXRlLnZpZXcuZG9tLmNsaWVudEhlaWdodCAqIHVwZGF0ZS52aWV3LnN0YXRlLmZhY2V0KHR5cGV3cml0ZXJPZmZzZXQpKSAtICh1cGRhdGUudmlldy5kZWZhdWx0TGluZUhlaWdodCAvIDIpXG4gICAgdGhpcy50b3BQYWRkaW5nID0gb2Zmc2V0ICsgXCJweFwiXG4gICAgaWYgKHRoaXMudG9wUGFkZGluZyAhPSB0aGlzLnZpZXcuY29udGVudERPTS5zdHlsZS5wYWRkaW5nVG9wKSB7XG4gICAgICB0aGlzLnZpZXcuY29udGVudERPTS5zdHlsZS5wYWRkaW5nVG9wID0gdGhpcy50b3BQYWRkaW5nXG4gICAgICB0aGlzLnZpZXcuY29udGVudERPTS5zdHlsZS5wYWRkaW5nQm90dG9tID0gKHVwZGF0ZS52aWV3LmRvbS5jbGllbnRIZWlnaHQgLSBvZmZzZXQpICsgXCJweFwiO1xuICAgIH1cbiAgfVxufSlcblxuY29uc3QgdHlwZXdyaXRlclNjcm9sbFBsdWdpbiA9IFZpZXdQbHVnaW4uZnJvbUNsYXNzKGNsYXNzIHtcbiAgcHJpdmF0ZSBteVVwZGF0ZSA9IGZhbHNlO1xuICBcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3OiBFZGl0b3JWaWV3KSB7IH1cblxuICB1cGRhdGUodXBkYXRlOiBWaWV3VXBkYXRlKSB7XG4gICAgaWYgKHRoaXMubXlVcGRhdGUpIHRoaXMubXlVcGRhdGUgPSBmYWxzZTtcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHVzZXJFdmVudHMgPSB1cGRhdGUudHJhbnNhY3Rpb25zLm1hcCh0ciA9PiB0ci5hbm5vdGF0aW9uKFRyYW5zYWN0aW9uLnVzZXJFdmVudCkpXG4gICAgICBjb25zdCBpc0FsbG93ZWQgPSB1c2VyRXZlbnRzLnJlZHVjZTxib29sZWFuPihcbiAgICAgICAgKHJlc3VsdCwgZXZlbnQpID0+IHJlc3VsdCAmJiBhbGxvd2VkVXNlckV2ZW50cy50ZXN0KGV2ZW50KSAmJiAhZGlzYWxsb3dlZFVzZXJFdmVudHMudGVzdChldmVudCksXG4gICAgICAgIHVzZXJFdmVudHMubGVuZ3RoID4gMFxuICAgICAgKTtcbiAgICAgIGlmIChpc0FsbG93ZWQpIHtcbiAgICAgICAgdGhpcy5teVVwZGF0ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2VudGVyT25IZWFkKHVwZGF0ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhc3luYyBjZW50ZXJPbkhlYWQodXBkYXRlOiBWaWV3VXBkYXRlKSB7XG4gICAgLy8gY2FuJ3QgdXBkYXRlIGluc2lkZSBhbiB1cGRhdGUsIHNvIHJlcXVlc3QgdGhlIG5leHQgYW5pbWF0aW9uIGZyYW1lXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBjdXJyZW50IHNlbGVjdGlvbiByYW5nZVxuICAgICAgaWYgKHVwZGF0ZS5zdGF0ZS5zZWxlY3Rpb24ucmFuZ2VzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIC8vIG9ubHkgYWN0IG9uIHRoZSBvbmUgcmFuZ2VcbiAgICAgICAgY29uc3QgaGVhZCA9IHVwZGF0ZS5zdGF0ZS5zZWxlY3Rpb24ubWFpbi5oZWFkO1xuICAgICAgICBjb25zdCBwcmV2SGVhZCA9IHVwZGF0ZS5zdGFydFN0YXRlLnNlbGVjdGlvbi5tYWluLmhlYWQ7XG4gICAgICAgIC8vIFRPRE86IHdvcmsgb3V0IGxpbmUgbnVtYmVyIGFuZCB1c2UgdGhhdCBpbnN0ZWFkPyBJcyB0aGF0IGV2ZW4gcG9zc2libGU/XG4gICAgICAgIC8vIGRvbid0IGJvdGhlciB3aXRoIHRoaXMgbmV4dCBwYXJ0IGlmIHRoZSByYW5nZSAobGluZT8/KSBoYXNuJ3QgY2hhbmdlZFxuICAgICAgICBpZiAocHJldkhlYWQgIT0gaGVhZCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGVmZmVjdCB0aGF0IGRvZXMgdGhlIGNlbnRlcmluZ1xuICAgICAgICAgIGxldCBvZmZzZXQgPSAodXBkYXRlLnZpZXcuZG9tLmNsaWVudEhlaWdodCAqIHVwZGF0ZS52aWV3LnN0YXRlLmZhY2V0KHR5cGV3cml0ZXJPZmZzZXQpKSAtICh1cGRhdGUudmlldy5kZWZhdWx0TGluZUhlaWdodCAvIDIpO1xuICAgICAgICAgIGNvbnN0IGVmZmVjdCA9IEVkaXRvclZpZXcuc2Nyb2xsSW50b1ZpZXcoaGVhZCwgeyB5OiBcInN0YXJ0XCIsIHlNYXJnaW46IG9mZnNldCB9KTtcbiAgICAgICAgICAvLyBjb25zdCBlZmZlY3QgPSBFZGl0b3JWaWV3LnNjcm9sbEludG9WaWV3KGhlYWQsIHsgeTogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgICBjb25zdCB0cmFuc2FjdGlvbiA9IHRoaXMudmlldy5zdGF0ZS51cGRhdGUoeyBlZmZlY3RzOiBlZmZlY3QgfSk7XG4gICAgICAgICAgdGhpcy52aWV3LmRpc3BhdGNoKHRyYW5zYWN0aW9uKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGV3cml0ZXJTY3JvbGwob3B0aW9uczoge3R5cGV3cml0ZXJPZmZzZXQ/OiBudW1iZXJ9ID0ge30pOiBFeHRlbnNpb24ge1xuICByZXR1cm4gW1xuICAgIG9wdGlvbnMudHlwZXdyaXRlck9mZnNldCA9PSBudWxsID8gW10gOiB0eXBld3JpdGVyT2Zmc2V0Lm9mKG9wdGlvbnMudHlwZXdyaXRlck9mZnNldCksXG4gICAgdHlwZXdyaXRlclNjcm9sbFBhZGRpbmdQbHVnaW4sXG4gICAgdHlwZXdyaXRlclNjcm9sbFBsdWdpblxuICBdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldFR5cGV3cml0ZXJTcmNvbGwoKTogRXh0ZW5zaW9uIHtcbiAgcmV0dXJuIFtcbiAgICByZXNldFR5cGV3cml0ZXJTY3JvbGxQYWRkaW5nUGx1Z2luXG4gIF1cbn0iLCJpbXBvcnQgeyBFeHRlbnNpb24gfSBmcm9tICdAY29kZW1pcnJvci9zdGF0ZSc7XG5pbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgJy4vdHlwZXdyaXRlci1zY3JvbGxpbmcnXG5pbXBvcnQgeyBQbHVnaW4sIE1hcmtkb3duVmlldywgUGx1Z2luU2V0dGluZ1RhYiwgQXBwLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nXG5pbXBvcnQgeyByZXNldFR5cGV3cml0ZXJTcmNvbGwsIHR5cGV3cml0ZXJTY3JvbGwgfSBmcm9tICcuL2V4dGVuc2lvbidcblxuY2xhc3MgQ01UeXBld3JpdGVyU2Nyb2xsU2V0dGluZ3Mge1xuICBlbmFibGVkOiBib29sZWFuO1xuICB0eXBld3JpdGVyT2Zmc2V0OiBudW1iZXI7XG4gIHplbkVuYWJsZWQ6IGJvb2xlYW47XG4gIHplbk9wYWNpdHk6IG51bWJlcjtcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQ01UeXBld3JpdGVyU2Nyb2xsU2V0dGluZ3MgPSB7XG4gIGVuYWJsZWQ6IHRydWUsXG4gIHR5cGV3cml0ZXJPZmZzZXQ6IDAuNSxcbiAgemVuRW5hYmxlZDogZmFsc2UsXG4gIHplbk9wYWNpdHk6IDAuMjVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ01UeXBld3JpdGVyU2Nyb2xsUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IENNVHlwZXdyaXRlclNjcm9sbFNldHRpbmdzO1xuICBwcml2YXRlIGNzczogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZXh0OiBFeHRlbnNpb247XG4gIHByaXZhdGUgZXh0QXJyYXk6IEV4dGVuc2lvbltdID0gW107XG5cbiAgYXN5bmMgb25sb2FkKCkge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG4gICAgXG4gICAgLy8gZW5hYmxlIHRoZSBwbHVnaW4gKGJhc2VkIG9uIHNldHRpbmdzKVxuICAgIGlmICh0aGlzLnNldHRpbmdzLmVuYWJsZWQpIHRoaXMuZW5hYmxlVHlwZXdyaXRlclNjcm9sbCgpO1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnplbkVuYWJsZWQpIHRoaXMuZW5hYmxlWmVuKCk7XG5cbiAgICB0aGlzLmNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGhpcy5jc3MuaWQgPSAncGx1Z2luLXR5cGV3cml0ZXItc2Nyb2xsJztcbiAgICB0aGlzLmNzcy5zZXRBdHRyKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHRoaXMuY3NzKTtcbiAgICB0aGlzLmNzcy5pbm5lclRleHQgPSBgYm9keXstLXplbi1vcGFjaXR5OiAke3RoaXMuc2V0dGluZ3MuemVuT3BhY2l0eX07fWA7XG5cbiAgICAvLyBhZGQgdGhlIHNldHRpbmdzIHRhYlxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgQ01UeXBld3JpdGVyU2Nyb2xsU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgLy8gYWRkIHRoZSBjb21tYW5kcyAvIGtleWJvYXJkIHNob3J0Y3V0c1xuICAgIHRoaXMuYWRkQ29tbWFuZHMoKTtcbiAgfVxuXG4gIG9udW5sb2FkKCkge1xuICAgIC8vIGRpc2FibGUgdGhlIHBsdWdpblxuICAgIHRoaXMuZGlzYWJsZVR5cGV3cml0ZXJTY3JvbGwoKTtcbiAgICB0aGlzLmRpc2FibGVaZW4oKTtcbiAgfVxuXG4gIGFkZENvbW1hbmRzKCkgeyBcbiAgICAvLyBhZGQgdGhlIHRvZ2dsZSBvbi9vZmYgY29tbWFuZFxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3RvZ2dsZS10eXBld3JpdGVyLXNyb2xsJyxcbiAgICAgIG5hbWU6ICdUb2dnbGUgT24vT2ZmJyxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7IHRoaXMudG9nZ2xlVHlwZXdyaXRlclNjcm9sbCgpOyB9XG4gICAgfSk7XG5cbiAgICAvLyB0b2dnbGUgemVuIG1vZGVcbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICd0b2dnbGUtdHlwZXdyaXRlci1zcm9sbC16ZW4nLFxuICAgICAgbmFtZTogJ1RvZ2dsZSBaZW4gTW9kZSBPbi9PZmYnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHsgdGhpcy50b2dnbGVaZW4oKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgdG9nZ2xlVHlwZXdyaXRlclNjcm9sbCA9IChuZXdWYWx1ZTogYm9vbGVhbiA9IG51bGwpID0+IHtcbiAgICAvLyBpZiBubyB2YWx1ZSBpcyBwYXNzZWQgaW4sIHRvZ2dsZSB0aGUgZXhpc3RpbmcgdmFsdWVcbiAgICBpZiAobmV3VmFsdWUgPT09IG51bGwpIG5ld1ZhbHVlID0gIXRoaXMuc2V0dGluZ3MuZW5hYmxlZDtcbiAgICAvLyBhc3NpZ24gdGhlIG5ldyB2YWx1ZSBhbmQgY2FsbCB0aGUgY29ycmVjdCBlbmFibGUgLyBkaXNhYmxlIGZ1bmN0aW9uXG4gICAgKHRoaXMuc2V0dGluZ3MuZW5hYmxlZCA9IG5ld1ZhbHVlKVxuICAgICAgPyB0aGlzLmVuYWJsZVR5cGV3cml0ZXJTY3JvbGwoKSA6IHRoaXMuZGlzYWJsZVR5cGV3cml0ZXJTY3JvbGwoKTtcbiAgICAvLyBzYXZlIHRoZSBuZXcgc2V0dGluZ3NcbiAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICB9XG5cbiAgY2hhbmdlVHlwZXdyaXRlck9mZnNldCA9IChuZXdWYWx1ZTogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zZXR0aW5ncy50eXBld3JpdGVyT2Zmc2V0ID0gbmV3VmFsdWU7XG4gICAgaWYgKHRoaXMuc2V0dGluZ3MuZW5hYmxlZCkge1xuICAgICAgdGhpcy5kaXNhYmxlVHlwZXdyaXRlclNjcm9sbCgpO1xuICAgICAgLy8gZGVsZXRlIHRoZSBleHRlbnNpb24sIHNvIGl0IGdldHMgcmVjcmVhdGVkIHdpdGggdGhlIG5ldyB2YWx1ZVxuICAgICAgZGVsZXRlIHRoaXMuZXh0O1xuICAgICAgdGhpcy5lbmFibGVUeXBld3JpdGVyU2Nyb2xsKCk7XG4gICAgfVxuICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICB0b2dnbGVaZW4gPSAobmV3VmFsdWU6IGJvb2xlYW4gPSBudWxsKSA9PiB7XG4gICAgLy8gaWYgbm8gdmFsdWUgaXMgcGFzc2VkIGluLCB0b2dnbGUgdGhlIGV4aXN0aW5nIHZhbHVlXG4gICAgaWYgKG5ld1ZhbHVlID09PSBudWxsKSBuZXdWYWx1ZSA9ICF0aGlzLnNldHRpbmdzLnplbkVuYWJsZWQ7XG4gICAgLy8gYXNzaWduIHRoZSBuZXcgdmFsdWUgYW5kIGNhbGwgdGhlIGNvcnJlY3QgZW5hYmxlIC8gZGlzYWJsZSBmdW5jdGlvblxuICAgICh0aGlzLnNldHRpbmdzLnplbkVuYWJsZWQgPSBuZXdWYWx1ZSlcbiAgICAgID8gdGhpcy5lbmFibGVaZW4oKSA6IHRoaXMuZGlzYWJsZVplbigpO1xuICAgIC8vIHNhdmUgdGhlIG5ldyBzZXR0aW5nc1xuICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICBjaGFuZ2VaZW5PcGFjaXR5ID0gKG5ld1ZhbHVlOiBudW1iZXIgPSAwLjI1KSA9PiB7XG4gICAgdGhpcy5zZXR0aW5ncy56ZW5PcGFjaXR5ID0gbmV3VmFsdWU7XG4gICAgdGhpcy5jc3MuaW5uZXJUZXh0ID0gYGJvZHl7LS16ZW4tb3BhY2l0eTogJHtuZXdWYWx1ZX07fWA7XG4gICAgLy8gc2F2ZSB0aGUgbmV3IHNldHRpbmdzXG4gICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIGVuYWJsZVR5cGV3cml0ZXJTY3JvbGwgPSAoKSA9PiB7XG4gICAgLy8gYWRkIHRoZSBjbGFzc1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGx1Z2luLWNtLXR5cGV3cml0ZXItc2Nyb2xsJyk7XG5cbiAgICAvLyByZWdpc3RlciB0aGUgY29kZW1pcnJvciBhZGQgb24gc2V0dGluZ1xuICAgIHRoaXMucmVnaXN0ZXJDb2RlTWlycm9yKGNtID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNtLnNldE9wdGlvbihcInR5cGV3cml0ZXJTY3JvbGxpbmdcIiwgdHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRoaXMuZXh0KSB7XG4gICAgICB0aGlzLmV4dCA9IHR5cGV3cml0ZXJTY3JvbGwoeyB0eXBld3JpdGVyT2Zmc2V0OiB0aGlzLnNldHRpbmdzLnR5cGV3cml0ZXJPZmZzZXQgfSk7XG4gICAgICB0aGlzLmV4dEFycmF5ID0gW3RoaXMuZXh0XTtcbiAgICAgIHRoaXMucmVnaXN0ZXJFZGl0b3JFeHRlbnNpb24odGhpcy5leHRBcnJheSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5leHRBcnJheS5zcGxpY2UoMCwgdGhpcy5leHRBcnJheS5sZW5ndGgpO1xuICAgICAgdGhpcy5leHRBcnJheS5wdXNoKHRoaXMuZXh0KTtcbiAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS51cGRhdGVPcHRpb25zKCk7XG4gICAgfVxuICB9XG4gIFxuICBkaXNhYmxlVHlwZXdyaXRlclNjcm9sbCA9ICgpID0+IHtcbiAgICAvLyByZW1vdmUgdGhlIGNsYXNzXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tY20tdHlwZXdyaXRlci1zY3JvbGwnKTtcblxuICAgIC8vIHJlbW92ZSB0aGUgY29kZW1pcnJvciBhZGQgb24gc2V0dGluZ1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlQ29kZU1pcnJvcnMoY20gPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY20uc2V0T3B0aW9uKFwidHlwZXdyaXRlclNjcm9sbGluZ1wiLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICAvLyBjbGVhciBvdXQgdGhlIHJlZ2lzdGVyZWQgZXh0ZW5zaW9uXG4gICAgdGhpcy5leHRBcnJheS5zcGxpY2UoMCwgdGhpcy5leHRBcnJheS5sZW5ndGgpO1xuICAgIHRoaXMuZXh0QXJyYXkucHVzaChyZXNldFR5cGV3cml0ZXJTcmNvbGwoKSlcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UudXBkYXRlT3B0aW9ucygpO1xuICB9XG5cbiAgZW5hYmxlWmVuID0gKCkgPT4ge1xuICAgIC8vIGFkZCB0aGUgY2xhc3NcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsdWdpbi1jbS10eXBld3JpdGVyLXNjcm9sbC16ZW4nKTtcbiAgfVxuXG4gIGRpc2FibGVaZW4gPSAoKSA9PiB7XG4gICAgLy8gcmVtb3ZlIHRoZSBjbGFzc1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLWNtLXR5cGV3cml0ZXItc2Nyb2xsLXplbicpO1xuICB9XG59XG5cbmNsYXNzIENNVHlwZXdyaXRlclNjcm9sbFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblxuICBwbHVnaW46IENNVHlwZXdyaXRlclNjcm9sbFBsdWdpbjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQ01UeXBld3JpdGVyU2Nyb2xsUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIFR5cGV3cml0ZXIgU2Nyb2xsaW5nXCIpXG4gICAgICAuc2V0RGVzYyhcIlR1cm5zIHR5cGV3cml0ZXIgc2Nyb2xsaW5nIG9uIG9yIG9mZiBnbG9iYWxseVwiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmVuYWJsZWQpXG4gICAgICAgICAgLm9uQ2hhbmdlKChuZXdWYWx1ZSkgPT4geyB0aGlzLnBsdWdpbi50b2dnbGVUeXBld3JpdGVyU2Nyb2xsKG5ld1ZhbHVlKSB9KVxuICAgICAgKTtcbiAgICBcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiQ2VudGVyIG9mZnNldFwiKVxuICAgICAgLnNldERlc2MoXCJQb3NpdGlvbnMgdGhlIHR5cGV3cml0ZXIgdGV4dCBhdCB0aGUgc3BlY2lmaWVkIHBlcmNlbnRhZ2Ugb2YgdGhlIHNjcmVlblwiKVxuICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT5cbiAgICAgICAgc2xpZGVyLnNldExpbWl0cygwLCAxMDAsIDUpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnR5cGV3cml0ZXJPZmZzZXQgKiAxMDApXG4gICAgICAgICAgLm9uQ2hhbmdlKChuZXdWYWx1ZSkgPT4geyB0aGlzLnBsdWdpbi5jaGFuZ2VUeXBld3JpdGVyT2Zmc2V0KG5ld1ZhbHVlLzEwMCl9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJaZW4gTW9kZVwiKVxuICAgICAgLnNldERlc2MoXCJEYXJrZW5zIG5vbi1hY3RpdmUgbGluZXMgaW4gdGhlIGVkaXRvciBzbyB5b3UgY2FuIGZvY3VzIG9uIHdoYXQgeW91J3JlIHR5cGluZ1wiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT5cbiAgICAgICAgdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnplbkVuYWJsZWQpXG4gICAgICAgICAgLm9uQ2hhbmdlKChuZXdWYWx1ZSkgPT4geyB0aGlzLnBsdWdpbi50b2dnbGVaZW4obmV3VmFsdWUpIH0pXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlplbiBPcGFjaXR5XCIpXG4gICAgICAuc2V0RGVzYyhcIlRoZSBvcGFjaXR5IG9mIHVuZm9jdXNlZCBsaW5lcyBpbiB6ZW4gbW9kZVwiKVxuICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT5cbiAgICAgICAgc2xpZGVyLnNldExpbWl0cygwLCAxMDAsIDUpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnplbk9wYWNpdHkgKiAxMDApXG4gICAgICAgICAgLm9uQ2hhbmdlKChuZXdWYWx1ZSkgPT4geyB0aGlzLnBsdWdpbi5jaGFuZ2VaZW5PcGFjaXR5KG5ld1ZhbHVlIC8gMTAwKSB9KVxuICAgICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkZhY2V0IiwiVmlld1BsdWdpbiIsIlRyYW5zYWN0aW9uIiwiRWRpdG9yVmlldyIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxD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
