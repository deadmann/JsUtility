///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 11/21/2016.
 */
module AngularUtility {
    "use strict";


    export function rialsFilter() {
        return (price: number) => {
            if(Util.Utility.isNullOrUndefined(price))
                return "";
            return Math.floor(price).putThousandComma() + " ریال";
        };
    }

    rialsFilter.$inject = [];

    angular.module("angularUtility")
        .filter("rials", rialsFilter);
}