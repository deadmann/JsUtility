///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 1/1/2017.
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
    var OnEscapeDirective = (function () {
        function OnEscapeDirective() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     onEsc: '&?',
            //     dataOnEsc: '&?',
            //     onEscape: '&?',
            //     dataOnEscape: '&?'
            // };
            this.link = function (scope, element, attrs) {
                element.on("keydown keypress", function (event) {
                    if (event.which === 27 && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            var req = attrs.onEsc || attrs.onEscape || attrs.dataOnEsc || attrs.dataOnEscape;
                            scope.$eval(req);
                        });
                        event.preventDefault();
                    }
                });
            };
        }
        OnEscapeDirective.instance = function () {
            return new OnEscapeDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnEscapeDirective;
    }());
    angular.module("angularUtility")
        .directive("onEsc", OnEscapeDirective.instance)
        .directive("dataOnEsc", OnEscapeDirective.instance)
        .directive("onEscape", OnEscapeDirective.instance)
        .directive("dataOnEscape", OnEscapeDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onEsc.js.map