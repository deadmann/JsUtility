///<reference path="../outerReferences.d.ts"/>
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
    var OnScrollDirective = (function () {
        //scope: boolean|{[boundProperty:string]:string};
        function OnScrollDirective() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };
            this.link = function (scope, element, attrs) {
                element.on("scroll", function (event) {
                    scope.$apply(function () {
                        var req = (!Util.Utility.isNullOrUndefined(attrs.onScroll)) ? attrs.onScroll : attrs.dataOnScroll;
                        scope.$eval(req);
                    });
                    event.preventDefault();
                });
            };
        }
        OnScrollDirective.instance = function () {
            return new OnScrollDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnScrollDirective;
    }());
    angular.module("angularUtility")
        .directive("onScroll", OnScrollDirective.instance)
        .directive("dataOnScroll", OnScrollDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onScroll.js.map