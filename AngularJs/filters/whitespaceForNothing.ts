///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 1/10/2017.
 */
module AngularUtility {
    "use strict";


    export function whitespaceForNothingFilter($sce) {
        return (text:string) => {
            if (Util.Utility.isNullOrUndefined(text) || text.trim()=="")
                return $sce.trustAsHtml('&nbsp;');
            else
                return $sce.trustAsHtml(text);
        };
    }

    whitespaceForNothingFilter.$inject = ['$sce'];

    angular.module("angularUtility")
        .filter("whitespaceForNothing", whitespaceForNothingFilter);
}