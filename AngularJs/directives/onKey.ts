///<reference path="../outerReferences.d.ts"/>

/**
 * Created by Hassan on 3/7/2017.
 */

module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;
    import IDirectiveCompileFn = angular.IDirectiveCompileFn;

    export interface IOnKeyAttributes extends ng.IAttributes {
        /**The main directive, which register an action over one or several keys*/
        onKey: string;
        /**The main directive, which register an action over one or several keys*/
        dataOnKey: string;
        /**this directive define actions in coma separated list on which the onKey operates on. ('keydown', 'keyup', 'keypress', default='keydown,keyup,keypress')*/
        onKeyAction: string,
        /**this directive define actions in coma separated list on which the onKey operates on. ('keydown', 'keyup', 'keypress', default='keydown,keyup,keypress')*/
        dataOnKeyAction: string,
        /**define the alt status for this directive to work ('true', 'false', 'unset', default='unset')*/
        onKeyAlt: string,
        /**define the alt status for this directive to work ('true', 'false', 'unset', default='unset')*/
        dataOnKeyAlt: string,
        /**define the ctrl status for this directive to work ('true', 'false', 'unset', default='unset')*/
        onKeyCtrl: string,
        /**define the ctrl status for this directive to work ('true', 'false', 'unset', default='unset')*/
        dataOnKeyCtrl: string,
        /**define the shift status for this directive to work ('true', 'false', 'unset', default='unset')*/
        onKeyShift: string,
        /**define the shift status for this directive to work ('true', 'false', 'unset', default='unset')*/
        dataOnKeyShift: string,
        /**define character list which each define a keyboard key*/
        onKeyChars: string,
        /**define character list which each define a keyboard key*/
        dataOnKeyChars: string,
        /**define list of coma separated list of character code*/
        onKeyCodes: string,
        /**define list of coma separated list of character code*/
        dataOnKeyCodes: string
        /**tell directive to disable default functionality of browser or previous codes ('true', 'false', default='true')*/
        onKeyPreventDefault: string;
        /**tell directive to disable default functionality of browser or previous codes ('true', 'false', default='true')*/
        dataOnKeyPreventDefault: string;
        /**if is set then this directive register the event on one or more element which included using jquery based selector(default current element)*/
        onKeyAttachTo: string;
        /**if is set then this directive register the event on one or more element which included using jquery based selector(default current element)*/
        dataOnKeyAttachTo: string;
    }

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
    class OnKeyDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        //require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty: string]: string};
        //compile: IDirectiveCompileFn;

        private static matchAny(items: Array<any>, searchFunc: Function): boolean {
            for (var i: number = 0; i < items.length; i++) {
                if (searchFunc(items[i])) return true;
            }
            return false;
        }

        constructor() {
            this.restrict = 'A';

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IOnKeyAttributes) {
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
                    && OnKeyDirective.matchAny(actions.split(',')
                        , w=> w.trim().toLowerCase() != "keyup"
                        && w.trim().toLowerCase() != "keydown"
                        && w.trim().toLowerCase() != "keypress"))
                    throw new Error("Incorrect action found inside on-key-action or data-on-key-action, please use either one or more of these: 'keyup', 'keydown' or 'keypress'");

                if (Util.Utility.isNullOrUndefined(keyCodes)) { //None Are Defined
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

                var keyHandler = function (event) {//bind -> Deprecated on version 3.0
                    if ((alt == "unset" || event.altKey == (alt == "true"))
                        && (ctrl == "unset" || event.ctrlKey == (ctrl == "true"))
                        && (shift == "unset" || event.shiftKey == (shift == "true"))) {

                        if (OnKeyDirective.matchAny(keyCodes.split(','), w=>parseInt(w.trim()) == event.which)) {

                            scope.$apply(function () {
                                scope.$eval("$event=" +
                                    "{" +
                                    "'keyCode':" + event.which + "," +
                                    "'altKey':" + event.altKey + "," +
                                    "'ctrlKey':" + event.ctrlKey + "," +
                                    "'shiftKey':" + event.shiftKey + "," +
                                    "'action':'" + event.type + "'"+
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
                for(var i:number=0;i<events.length;i++){
                    strEvents += ((strEvents=="")?"":" ") + events[i].trim();
                }

                selectedElem.on(strEvents, keyHandler);
                scope.$on('$destroy', function () {
                    selectedElem.unbind(strEvents, keyHandler);
                });
            };
        }

        static instance(): ng.IDirective {
            return new OnKeyDirective();
            // var directive: ng.IDirectiveFactory = ($parse: ng.IParseProvider, $rootScope: ng.IRootScopeService)=>new OnKeyDirective($parse, $rootScope);
            // directive.$inject = ["$parse", "$rootScope"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onKey", OnKeyDirective.instance)
        .directive("dataOnKey", OnKeyDirective.instance);
}