///<reference path="../outerReferences.d.ts"/>
/**
 * Created by Hassan on 2/26/2017.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    //import IRepeatScope = angular.IRepeatScope;
    import ITimeoutService = angular.ITimeoutService;

    // export interface IEnterAttributes extends ng.IAttributes {
    //     onEsc: string,
    //     dataOnEsc: string,
    //     onEscape: string,
    //     dataOnEscape: string
    // }

    export interface IEscape2Scope extends ng.IScope {
        onEsc2: Function,
        dataOnEsc2: Function,
        onEscape2: Function,
        dataOnEscape2: Function
    }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnEscape2Directive implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        //require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor() {
            this.restrict = 'A';
            // this.require = 'ngModel';
            this.scope = {
                onEsc2: '&?',
                dataOnEsc2: '&?',
                onEscape2: '&?',
                dataOnEscape2: '&?'
            };

            this.link = function (scope: IEscape2Scope, element: IAugmentedJQuery, attrs: ng.IAttributes) {
                element.on("keydown keypress", function (event) {//bind -> Deprecated on version 3.0
                    if (event.which === 27){// && !event.altKey && !event.ctrlKey && !event.shiftKey) {
                        scope.$apply(function () {
                            /**@type {Function}*/
                            var funcEsc = scope.onEsc2 || scope.onEscape2 || scope.dataOnEsc2 || scope.dataOnEscape2;
                            if(Util.Utility.isNullOrUndefined(funcEsc)){
                                throw new Error("No Function Bound To Escape2 Directive");
                            }

                            funcEsc({$event:event});
                        });

                        event.preventDefault();
                    }
                });
            }
        }

        static instance(): ng.IDirective {
            return new OnEscape2Directive();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onEsc2", OnEscape2Directive.instance)
        .directive("dataOnEsc2", OnEscape2Directive.instance)
        .directive("onEscape2", OnEscape2Directive.instance)
        .directive("dataOnEscape2", OnEscape2Directive.instance);
}