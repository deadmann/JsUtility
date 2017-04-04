/**
 * Created by Hassan on 2/7/2017.
 */
///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 1/1/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    var OnErrorSrcDirective = (function () {
        function OnErrorSrcDirective() {
            this.restrict = 'A';
            this.link = function (scope, element, attrs) {
                element.on('error', function () {
                    if (attrs.src != (attrs.onErrorSrc || attrs.dataOnErrorSrc)) {
                        attrs.$set('src', (attrs.onErrorSrc || attrs.dataOnErrorSrc));
                    }
                });
            };
        }
        OnErrorSrcDirective.instance = function () {
            return new OnErrorSrcDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return OnErrorSrcDirective;
    }());
    angular.module("angularUtility")
        .directive("onErrorSrc", OnErrorSrcDirective.instance)
        .directive("dataOnErrorSrc", OnErrorSrcDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onErrorSrc.js.map