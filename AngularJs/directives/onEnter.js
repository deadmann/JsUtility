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
    var OnEnterDirective = (function () {
        //scope: boolean|{[boundProperty:string]:string};
        function OnEnterDirective() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };
            this.link = function (scope, element, attrs) {
                element.on("keydown keypress", function (event) {
                    if (event.which === 13 && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            var req = (!Util.Utility.isNullOrUndefined(attrs.onEnter)) ? attrs.onEnter : attrs.dataOnEnter;
                            scope.$eval(req);
                        });
                        event.preventDefault();
                    }
                });
            };
        }
        OnEnterDirective.instance = function () {
            return new OnEnterDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnEnterDirective;
    }());
    angular.module("angularUtility")
        .directive("onEnter", OnEnterDirective.instance)
        .directive("dataOnEnter", OnEnterDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onEnter.js.map