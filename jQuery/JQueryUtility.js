/**
 * Created by Hassan on 3/16/2017.
 */
var Util;
(function (Util) {
    //import IAugmentedJQuery = angular.IAugmentedJQuery;
    var JQueryUtility = (function () {
        function JQueryUtility() {
        }
        //public static closestAnyDirection($source:IAugmentedJQuery,selector:string):IAugmentedJQuery {
        JQueryUtility.closestAnyDirection = function ($source, selector) {
            if ($source == null)
                return $([]);
            var $matchingChildren = $source.find(selector);
            if ($matchingChildren.length != 0)
                return $($matchingChildren.get(0));
            else
                return JQueryUtility.closestAnyDirection($source.parent(), selector);
        };
        return JQueryUtility;
    }());
    Util.JQueryUtility = JQueryUtility;
})(Util || (Util = {}));
//# sourceMappingURL=JQueryUtility.js.map