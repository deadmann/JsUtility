///<reference path="../outerReferences.d.ts"/>

/**
 * Created by Hassan on 11/21/2016.
 */
module AngularUtility {
    "use strict";


    export function emptyForNullFilter() {
        return (text: string) => {
            return Util.Utility.isNullOrUndefined(text) ? "" : text;
        };
    }

    emptyForNullFilter.$inject = [];

    angular.module("angularUtility")
        .filter("emptyForNull", emptyForNullFilter);
}