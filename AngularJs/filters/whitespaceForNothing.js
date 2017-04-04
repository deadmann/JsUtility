///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 1/10/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    function whitespaceForNothingFilter($sce) {
        return function (text) {
            if (Util.Utility.isNullOrUndefined(text) || text.trim() == "")
                return $sce.trustAsHtml('&nbsp;');
            else
                return $sce.trustAsHtml(text);
        };
    }
    AngularUtility.whitespaceForNothingFilter = whitespaceForNothingFilter;
    whitespaceForNothingFilter.$inject = ['$sce'];
    angular.module("angularUtility")
        .filter("whitespaceForNothing", whitespaceForNothingFilter);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=whitespaceForNothing.js.map