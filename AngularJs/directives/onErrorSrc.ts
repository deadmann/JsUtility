///<reference path="../outerReferences.d.ts"/>

/**
 * Created by Hassan on 2/7/2017.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;

    export interface IErrorSrcAttributes extends ng.IAttributes {
        onErrorSrc: string;
        dataOnErrorSrc: string;
        src: string;
    }

    class OnErrorSrcDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        restrict: string;

        constructor() {
            this.restrict = 'A';

            this.link = function(scope: IRepeatScope, element: IAugmentedJQuery, attrs: IErrorSrcAttributes) {
                element.on('error', function() {
                    if (attrs.src != (attrs.onErrorSrc||attrs.dataOnErrorSrc)) {
                        attrs.$set('src', (attrs.onErrorSrc||attrs.dataOnErrorSrc));
                    }
                });
            };
        }

        static instance(): ng.IDirective {
            return new OnErrorSrcDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onErrorSrc", OnErrorSrcDirective.instance)
        .directive("dataOnErrorSrc", OnErrorSrcDirective.instance);
}