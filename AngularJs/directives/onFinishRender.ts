///<reference path="../index.d.ts"/>
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

    export interface IFinishRenderAttributes extends ng.IAttributes {
        commandName: string;
        dataCommandName: string;
        modelObject: any;
        dataModelObject: any;
        onRepeaterFinishRender:string;
        dataOnRepeaterFinishRender:string;
    }

    // export interface IDatePickerScope extends ng.IScope {
    //     datePickerConfig: DatePickerConfig;
    // }

    // export interface IDatePickerElement extends /*Element,*/ IAugmentedJQuery{
    //     datepicker:Function
    // }

    class OnRepeaterFinishRender implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;
        require: string|string[]|{[controller:string]:string};
        restrict: string;
        scope: boolean|{[boundProperty:string]:string};

        constructor(private $timeout:ng.ITimeoutService) {
            this.restrict = 'A';
            // this.require = 'ngModel';
            // this.scope = {
            //     datePickerConfig: '=?'
            // };

            this.link = function (scope: IRepeatScope, element: IAugmentedJQuery, attrs: IFinishRenderAttributes) {
                if (scope.$last === true) {
                    this.$timeout(function () {
                        //Get Command Name
                        var commandName = (attrs.commandName!= undefined)?attrs.commandName:attrs.dataCommandName;
                        //Get Model Object
                        var modelObjectAttr = (attrs.modelObject!=undefined)?attrs.modelObject:attrs.dataModelObject;
                        var modelObject = scope.$eval(modelObjectAttr);
                        //Get Emit Name
                        var emitName = 'onRepeaterFinishRender';
                        if(attrs.onRepeaterFinishRender != undefined || attrs.onRepeaterFinishRender!=null){
                            emitName = attrs.onRepeaterFinishRender;
                        }else if(attrs.dataOnRepeaterFinishRender != undefined || attrs.dataOnRepeaterFinishRender!=null){
                            emitName = attrs.dataOnRepeaterFinishRender;
                        }

                        var repeatFinishedArgs = new RepeaterFinishedArguments(commandName, modelObject, element[0], attrs);

                        scope.$emit(emitName, repeatFinishedArgs);
                    });
                }
            }
        }

        static instance(): ng.IDirective {
            //return new OnRepeaterFinishRender();
            var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            directive.$inject=["$timeout"];
            return directive;
        }
    }

    angular.module("angularUtility")
        .directive("onRepeaterFinishRender", <any>OnRepeaterFinishRender.instance())
        .directive("dataOnRepeaterFinishRender", <any>OnRepeaterFinishRender.instance());
}