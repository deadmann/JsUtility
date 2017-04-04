///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 11/21/2016.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    function emptyForNullFilter() {
        return function (text) {
            return Util.Utility.isNullOrUndefined(text) ? "" : text;
        };
    }
    AngularUtility.emptyForNullFilter = emptyForNullFilter;
    emptyForNullFilter.$inject = [];
    angular.module("angularUtility")
        .filter("emptyForNull", emptyForNullFilter);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=emptyForNull.js.map