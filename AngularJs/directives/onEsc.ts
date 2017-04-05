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

    export interface IEscapeAttributes extends ng.IAttributes {
        onEsc: string,
        dataOnEsc: string,
        onEscape: string,
        dataOnEscape: string
    }

    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnEscapeDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        //require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     onEsc: '&?',
            //     dataOnEsc: '&?',
            //     onEscape: '&?',
            //     dataOnEscape: '&?'
            // };

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IEscapeAttributes) {
                element.on("keydown keypress", function (event) {//bind -> Deprecated on version 3.0
                    if (event.which === 27 && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            var req= attrs.onEsc || attrs.onEscape || attrs.dataOnEsc || attrs.dataOnEscape;
                            scope.$eval(req);
                        });

                        event.preventDefault();
                    }
                });
            }
        }

        static instance(): ng.IDirective {
            return new OnEscapeDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onEsc", OnEscapeDirective.instance)
        .directive("dataOnEsc", OnEscapeDirective.instance)
        .directive("onEscape", OnEscapeDirective.instance)
        .directive("dataOnEscape", OnEscapeDirective.instance);
}