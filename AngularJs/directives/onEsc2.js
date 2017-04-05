///<reference path="../outerReferences.d.ts"/>
/**
 * Created by Hassan on 2/26/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }
    var OnEscape2Directive = (function () {
        function OnEscape2Directive() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            this.scope = {
                onEsc2: '&?',
                dataOnEsc2: '&?',
                onEscape2: '&?',
                dataOnEscape2: '&?'
            };
            this.link = function (scope, element, attrs) {
                element.on("keydown keypress", function (event) {
                    if (event.which === 27) {
                        scope.$apply(function () {
                            /**@type {Function}*/
                            var funcEsc = scope.onEsc2 || scope.onEscape2 || scope.dataOnEsc2 || scope.dataOnEscape2;
                            if (Util.Utility.isNullOrUndefined(funcEsc)) {
                                throw new Error("No Function Bound To Escape2 Directive");
                            }
                            funcEsc({ $event: event });
                        });
                        event.preventDefault();
                    }
                });
            };
        }
        OnEscape2Directive.instance = function () {
            return new OnEscape2Directive();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnEscape2Directive;
    }());
    angular.module("angularUtility")
        .directive("onEsc2", OnEscape2Directive.instance)
        .directive("dataOnEsc2", OnEscape2Directive.instance)
        .directive("onEscape2", OnEscape2Directive.instance)
        .directive("dataOnEscape2", OnEscape2Directive.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onEsc2.js.map