///<reference path="../outerReferences.d.ts"/>
/**
 * Created by Hassan on 1/28/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    var OnEnterDirective = (function () {
        function OnEnterDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                onChange: '&'
            };
            this.link = function (scope, element, attrs, ngModel) {
                function read() {
                    ngModel.$setViewValue(element.html());
                    if (scope.onChange)
                        scope.onChange();
                }
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || "");
                };
                element.bind("blur keyup change", function () {
                    scope.$apply(read);
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
        .directive("contentEditable", OnEnterDirective.instance)
        .directive("dataContentEditable", OnEnterDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=contentEditable.js.map