///<reference path="../outerReferences.d.ts"/>

/**
 * Created by Hassan on 1/1/2017.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;

    export interface IScrollAttributes extends ng.IAttributes {
        onScroll: string;
        dataOnScroll: string;
    }

    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnScrollDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        //require: string|string[]|{[controller:string]:string};
        restrict: string;
        //scope: boolean|{[boundProperty:string]:string};

        constructor() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IScrollAttributes) {
                element.on("scroll", function (event) {//bind -> Deprecated on version 3.0
                        scope.$apply(function () {
                            var req = (!Util.Utility.isNullOrUndefined(attrs.onScroll))? attrs.onScroll : attrs.dataOnScroll;
                            scope.$eval(req);
                        });

                        event.preventDefault();
                });
            }
        }

        static instance(): ng.IDirective {
            return new OnScrollDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onScroll", OnScrollDirective.instance)
        .directive("dataOnScroll", OnScrollDirective.instance);
}