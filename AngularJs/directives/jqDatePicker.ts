///<reference path="../innerReferences.ts"/>
///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 12/6/2016.
 */
module AngularUtility {
    "use strict";
    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;

     export interface IDatePickerAttributes extends ng.IAttributes {
         datePickerConfig: DatePickerConfig;
     }

    export interface IDatePickerScope extends ng.IScope {
        datePickerConfig: DatePickerConfig;
    }

    export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
        datepicker:Function
    }

    class JqDatePickerDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                datePickerConfig: '=?'
            };

            this.link = function (scope: IDatePickerScope, element: IDatePickerElement, attrs: IDatePickerAttributes, ngModel: INgModelController) {

                var datePickerConfig = !Util.Utility.isNullOrUndefined(scope.datePickerConfig)
                    ? scope.datePickerConfig
                    :new DatePickerConfig();

                datePickerConfig.onSelect= function (date) {
                    ngModel.$setViewValue(date);
                    ngModel.$render();
                    scope.$apply();
                };

                scope.$watch(function(){
                    return scope.datePickerConfig.minDate
                }, function(newVal, oldVal){
                    element.datepicker('option', 'minDate', newVal);
                });

                scope.$watch(function(){
                    return scope.datePickerConfig.maxDate
                }, function(newVal, oldVal){
                    element.datepicker('option', 'maxDate', newVal);
                });

                element.datepicker(datePickerConfig);
            }
        }

        static instance(): ng.IDirective {
            return new JqDatePickerDirective();
        }
    }

    class DatePickerConfigDirective implements ng.IDirective {
        //link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;

        constructor() {
            this.restrict = 'A';
            this.require = 'jqDatePicker';
        }

        static instance(): ng.IDirective {
            return new DatePickerConfigDirective();
        }
    }

    angular.module("angularUtility")
        .directive("jqDatePicker", JqDatePickerDirective.instance)
        .directive("datePickerConfig", DatePickerConfigDirective.instance);
}