///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 1/10/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    "use strict";
    function unsafeFilter($sce) {
        return $sce.trustAsHtml;
    }
    AngularUtility.unsafeFilter = unsafeFilter;
    unsafeFilter.$inject = ['$sce'];
    angular.module("angularUtility")
        .filter("unsafe", unsafeFilter)
        .filter("trustAsHtml", unsafeFilter);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=unsafe.js.map