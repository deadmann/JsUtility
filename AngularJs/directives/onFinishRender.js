///<reference path="../index.d.ts"/>
///<reference path="../outerReferences.d.ts"/>
/**
 * Created by Hassan on 1/1/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }
    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }
    var OnRepeaterFinishRender = (function () {
        function OnRepeaterFinishRender($timeout) {
            this.$timeout = $timeout;
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };
            this.link = function (scope, element, attrs) {
                if (scope.$last === true) {
                    this.$timeout(function () {
                        //Get Command Name
                        var commandName = (attrs.commandName != undefined) ? attrs.commandName : attrs.dataCommandName;
                        //Get Model Object
                        var modelObjectAttr = (attrs.modelObject != undefined) ? attrs.modelObject : attrs.dataModelObject;
                        var modelObject = scope.$eval(modelObjectAttr);
                        //Get Emit Name
                        var emitName = 'onRepeaterFinishRender';
                        if (attrs.onRepeaterFinishRender != undefined || attrs.onRepeaterFinishRender != null) {
                            emitName = attrs.onRepeaterFinishRender;
                        }
                        else if (attrs.dataOnRepeaterFinishRender != undefined || attrs.dataOnRepeaterFinishRender != null) {
                            emitName = attrs.dataOnRepeaterFinishRender;
                        }
                        var repeatFinishedArgs = new RepeaterFinishedArguments(commandName, modelObject, element[0], attrs);
                        scope.$emit(emitName, repeatFinishedArgs);
                    });
                }
            };
        }
        OnRepeaterFinishRender.instance = function () {
            //return new OnRepeaterFinishRender();
            var directive = function ($timeout) { return new OnRepeaterFinishRender($timeout); };
            directive.$inject = ["$timeout"];
            return directive;
        };
        return OnRepeaterFinishRender;
    }());
    angular.module("angularUtility")
        .directive("onRepeaterFinishRender", OnRepeaterFinishRender.instance())
        .directive("dataOnRepeaterFinishRender", OnRepeaterFinishRender.instance());
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=onFinishRender.js.map