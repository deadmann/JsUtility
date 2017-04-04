/**
 * Created by Hassan on 3/16/2017.
 */
module Util {
    //import IAugmentedJQuery = angular.IAugmentedJQuery;
    export class JQueryUtility {
        //public static closestAnyDirection($source:IAugmentedJQuery,selector:string):IAugmentedJQuery {
        public static closestAnyDirection($source:JQuery,selector:string):JQuery {
            if($source == null) return  $([]);
            var $matchingChildren = $source.find(selector);
            if($matchingChildren.length != 0) return $($matchingChildren.get(0));
            else return JQueryUtility.closestAnyDirection($source.parent(), selector)
        }
    }
}