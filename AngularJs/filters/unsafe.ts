///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 1/10/2017.
 */
module AngularUtility {
    "use strict";


    export function unsafeFilter($sce) {
        return $sce.trustAsHtml;
    }

    unsafeFilter.$inject = ['$sce'];

    angular.module("angularUtility")
        .filter("unsafe", unsafeFilter)
        .filter("trustAsHtml", unsafeFilter);
}