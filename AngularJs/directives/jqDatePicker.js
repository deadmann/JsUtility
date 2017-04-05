///<reference path="../index.d.ts"/>
///<reference path="../outerReferences.d.ts"/>
/**
 * Created by Hassan on 12/6/2016.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    var JqDatePickerDirective = (function () {
        function JqDatePickerDirective() {
            this.restrict = 'A';
            this.require = 'ngModel';
            this.scope = {
                datePickerConfig: '=?'
            };
            this.link = function (scope, element, attrs, ngModel) {
                var datePickerConfig = !Util.Utility.isNullOrUndefined(scope.datePickerConfig)
                    ? scope.datePickerConfig
                    : new AngularUtility.DatePickerConfig();
                datePickerConfig.onSelect = function (date) {
                    ngModel.$setViewValue(date);
                    ngModel.$render();
                    scope.$apply();
                };
                scope.$watch(function () {
                    return scope.datePickerConfig.minDate;
                }, function (newVal, oldVal) {
                    element.datepicker('option', 'minDate', newVal);
                });
                scope.$watch(function () {
                    return scope.datePickerConfig.maxDate;
                }, function (newVal, oldVal) {
                    element.datepicker('option', 'maxDate', newVal);
                });
                element.datepicker(datePickerConfig);
            };
        }
        JqDatePickerDirective.instance = function () {
            return new JqDatePickerDirective();
        };
        return JqDatePickerDirective;
    }());
    var DatePickerConfigDirective = (function () {
        function DatePickerConfigDirective() {
            this.restrict = 'A';
            this.require = 'jqDatePicker';
        }
        DatePickerConfigDirective.instance = function () {
            return new DatePickerConfigDirective();
        };
        return DatePickerConfigDirective;
    }());
    angular.module("angularUtility")
        .directive("jqDatePicker", JqDatePickerDirective.instance)
        .directive("datePickerConfig", DatePickerConfigDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=jqDatePicker.js.map