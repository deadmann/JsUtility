///<reference path="../outerReferences.ts"/>

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

    export interface IEnterAttributes extends ng.IAttributes {
        onEnter: string;
        dataOnEnter: string;
    }

    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnEnterDirective implements ng.IDirective {
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

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IEnterAttributes) {
                element.on("keydown keypress", function (event) {//bind -> Deprecated on version 3.0
                    if (event.which === 13 && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            var req = (!Util.Utility.isNullOrUndefined(attrs.onEnter))? attrs.onEnter : attrs.dataOnEnter;
                            scope.$eval(req);
                        });

                        event.preventDefault();
                    }
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
        .directive("onEnter", OnEnterDirective.instance)
        .directive("dataOnEnter", OnEnterDirective.instance);
}