///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 3/7/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }
    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }
    /**
     *  Attributes:
     *  attrs.onKey || attrs.dataOnKey -> The main directive for all of these to work, which take a script as input to run
     *  attrs.onKeyAction || attrs.dataOnKeyAction -> The Events That This Action Supports ('keydown', 'keyup', 'keypress' default: 'keydown, keyup, keypress')
     *  attrs.onKeyAlt || attrs.dataOnKeyAlt -> take 'true' or 'false' to force event only if the key is pressed or not, otherwise 'unset' to work in all condition
     *  attrs.onKeyCtrl || attrs.dataOnKeyCtrl -> take 'true' or 'false' to force event only if the key is pressed or not, otherwise 'unset' to work in all condition
     *  attrs.onKeyShift || attrs.dataOnKeyShift -> take 'true' or 'false' to force event only if the key is pressed or not, otherwise 'unset' to work in all condition
     *  attrs.onKeyChars || attrs.dataOnKeyChars -> take an string which contains list of characters that this event should get called on
     *  attrs.onKeyCodes || attrs.dataOnKeyCodes -> take a coma separated list of character codes that this event should get called on
     *  attrs.onKeyPreventDefault || attrs.dataOnKeyPreventDefault -> Prevent Event On Parents
     *  attrs.onKeyAttachTo || attrs.dataOnKeyAttachTo -> if is set the event will get set on specified elements. (jquery based selector)
     *
     *  '$event' parameter properties:
     *  keyCode: Character Code
     *  altKey: Alt Key Status (true/false)
     *  ctrlKey: Ctrl Key Status (true/false)
     *  shiftKey: Shift Key Status (true/false)
     *  action: Event Name ('keyup', 'keydown', 'keypress')
     *
     *  Common Issues:
     *  1. Browser Event Get Called => Browser Events are set on 'keyup', and 'keydown' get called later
     *  2. Letter Key Event Does Not Work => Browser Naturally Send Capital Key Code: from 65 to 90
     */
    var OnKeyDirective = (function () {
        function OnKeyDirective() {
            this.restrict = 'A';
            this.link = function (scope, element, attrs) {
                var req = attrs.onKey || attrs.dataOnKey;
                var actions = attrs.onKeyAction || attrs.dataOnKeyAction;
                var alt = attrs.onKeyAlt || attrs.dataOnKeyAlt;
                var ctrl = attrs.onKeyCtrl || attrs.dataOnKeyCtrl;
                var shift = attrs.onKeyShift || attrs.dataOnKeyShift;
                var keyChars = attrs.onKeyChars || attrs.dataOnKeyChars;
                var keyCodes = attrs.onKeyCodes || attrs.dataOnKeyCodes;
                var preventDefault = attrs.onKeyPreventDefault || attrs.dataOnKeyPreventDefault;
                var attachTo = attrs.onKeyAttachTo || attrs.dataOnKeyAttachTo;
                if (Util.Utility.isNullOrUndefined(req))
                    throw new Error("No User Code Nor on-key Neither on data-on-key attributes.");
                if (!Util.Utility.isNullOrUndefinedOrWhiteSpace(actions)
                    && OnKeyDirective.matchAny(actions.split(','), function (w) { return w.trim().toLowerCase() != "keyup"
                        && w.trim().toLowerCase() != "keydown"
                        && w.trim().toLowerCase() != "keypress"; }))
                    throw new Error("Incorrect action found inside on-key-action or data-on-key-action, please use either one or more of these: 'keyup', 'keydown' or 'keypress'");
                if (Util.Utility.isNullOrUndefined(keyCodes)) {
                    if (Util.Utility.isNullOrUndefined(keyChars)) {
                        throw Error("Nor on-key-codes neither on-key-chars are defined, please at least set one of them.");
                    }
                }
                if (!Util.Utility.isNullOrUndefined(keyChars)) {
                    if (keyChars.length < 0)
                        throw new Error("onKeyChars can only accept a single or string based array of characters");
                    if (Util.Utility.isNullOrUndefined(keyCodes))
                        keyCodes = "";
                    for (var i = 0; i < keyChars.length; i++)
                        keyCodes += ((keyCodes.length == 0) ? "" : ",") + keyChars.charCodeAt(i).toString();
                }
                alt = (!Util.Utility.isNullOrUndefinedOrWhiteSpace(alt)) ? alt.trim().toLowerCase() : alt = "unset";
                ctrl = (!Util.Utility.isNullOrUndefinedOrWhiteSpace(ctrl)) ? ctrl.trim().toLowerCase() : "unset";
                shift = (!Util.Utility.isNullOrUndefinedOrWhiteSpace(shift)) ? shift.trim().toLowerCase() : "unset";
                if (alt != "true" && alt != "false" && alt != "unset")
                    throw new Error("either on-key-alt or data-on-key-alt has incorrect value, acceptable value are: 'true', 'false', 'unset'");
                if (ctrl != "true" && ctrl != "false" && ctrl != "unset")
                    throw new Error("either on-key-ctrl or data-on-key-ctrl has incorrect value, acceptable value are: 'true', 'false', 'unset'");
                if (shift != "true" && shift != "false" && shift != "unset")
                    throw new Error("either on-key-shift or data-on-key-shift has incorrect value, acceptable value are: 'true', 'false', 'unset'");
                if (!Util.Utility.isNullOrUndefined(preventDefault) && preventDefault != 'true' && preventDefault != 'false')
                    throw new Error("Either one of the on-key-prevent-default or data-on-key-prevent-default contains incorrect value, please refer to onKeyPreventDefault field of IOnKeyAttributes interface in onKey.ts file");
                var keyHandler = function (event) {
                    if ((alt == "unset" || event.altKey == (alt == "true"))
                        && (ctrl == "unset" || event.ctrlKey == (ctrl == "true"))
                        && (shift == "unset" || event.shiftKey == (shift == "true"))) {
                        if (OnKeyDirective.matchAny(keyCodes.split(','), function (w) { return parseInt(w.trim()) == event.which; })) {
                            scope.$apply(function () {
                                scope.$eval("$event=" +
                                    "{" +
                                    "'keyCode':" + event.which + "," +
                                    "'altKey':" + event.altKey + "," +
                                    "'ctrlKey':" + event.ctrlKey + "," +
                                    "'shiftKey':" + event.shiftKey + "," +
                                    "'action':'" + event.type + "'" +
                                    "};" + req);
                            });
                            if (Util.Utility.isNullOrUndefined(preventDefault) || preventDefault == 'true') {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                };
                var attachToElem;
                if (attachTo) {
                    attachToElem = angular.element(attachTo);
                    if (attachToElem.length == 0)
                        throw new Error("Cannot find the item(s) that is required by on-key-attach-to or data-on-key-attach-to");
                }
                var selectedElem = attachToElem || element;
                if (Util.Utility.isNullOrUndefined(actions)) {
                    actions = "keyup, keydown, keypress";
                }
                var events = actions.split(",");
                var strEvents = "";
                for (var i = 0; i < events.length; i++) {
                    strEvents += ((strEvents == "") ? "" : " ") + events[i].trim();
                }
                selectedElem.on(strEvents, keyHandler);
                scope.$on('$destroy', function () {
                    selectedElem.unbind(strEvents, keyHandler);
                });
            };
        }
        //compile: IDirectiveCompileFn;
        OnKeyDirective.matchAny = function (items, searchFunc) {
            for (var i = 0; i < items.length; i++) {
                if (searchFunc(items[i]))
                    return true;
            }
            return false;
        };
        OnKeyDirective.instance = function () {
            return new OnKeyDirective();
            // var directive: ng.IDirectiveFactory = ($parse: ng.IParseProvider, $rootScope: ng.IRootScopeService)=>new OnKeyDirective($parse, $rootScope);
            // directive.$inject = ["$parse", "$rootScope"];
            // return directive;
        };
        return OnKeyDirective;
    }());
    angular.module("angularUtility")
        .directive("onKey", OnKeyDirective.instance)
        .directive("dataOnKey", OnKeyDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onKey.js.map