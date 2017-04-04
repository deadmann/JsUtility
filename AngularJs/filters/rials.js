///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 11/21/2016.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    function rialsFilter() {
        return function (price) {
            if (Util.Utility.isNullOrUndefined(price))
                return "";
            return Math.floor(price).putThousandComma() + " ریال";
        };
    }
    AngularUtility.rialsFilter = rialsFilter;
    rialsFilter.$inject = [];
    angular.module("angularUtility")
        .filter("rials", rialsFilter);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=rials.js.map