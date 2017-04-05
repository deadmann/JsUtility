///<reference path="../outerReferences.d.ts"/>

/**
 * Created by Hassan on 1/28/2017.
 */

module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;

    export interface IContentEditableScope extends IRepeatScope{
        onChange: Function;
    }

    class OnEnterDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                onChange: '&'
            };

            this.link = function (scope: IContentEditableScope, element: IAugmentedJQuery, attrs: ng.IAttributes, ngModel: INgModelController) {
                function read() {
                    ngModel.$setViewValue(element.html());
                    if(scope.onChange) scope.onChange();
                }

                ngModel.$render = function() {
                    element.html(ngModel.$viewValue || "");
                };

                element.bind("blur keyup change", function() {
                    scope.$apply(read);
                });
            }
        }

        static instance(): ng.IDirective {
            return new OnEnterDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("contentEditable", OnEnterDirective.instance)
        .directive("dataContentEditable", OnEnterDirective.instance);
}