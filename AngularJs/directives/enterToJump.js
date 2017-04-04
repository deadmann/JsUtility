///<reference path="../outerReferences.ts"/>
/**
 * Created by Hassan on 3/4/2017.
 */
var AngularUtility;
(function (AngularUtility) {
    // export interface ITabIndexedContainerScope extends ng.IRepeatScope {
    //     element: IAugmentedJQuery;
    // }
    var TabIndexedContainer = (function () {
        function TabIndexedContainer() {
            this.restrict = 'AE';
            // this.require = 'ngModel';
            // this.scope = {
            //     element: '=?'
            // };
            this.controller = ["$scope", function ($scope, $element) {
                    this.getElement = function () {
                        //return $scope.element;
                        return this.privateData.element;
                    };
                }];
            this.link = function (scope, element, attrs) {
                //scope.element = element;
                this.privateData = element;
            };
        }
        TabIndexedContainer.instance = function () {
            return new TabIndexedContainer();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return TabIndexedContainer;
    }());
    /**
     * If this property is set, then enterEvent will bind to closest selected element...
     * enter-to-jump-attach-to-closest || data-enter-to-jump-attach-to-closest
     * enter-as-tab-attach-to-closest || data-enter-as-tab-attach-to-closest
     *
     * If this property is set, then the current tabIndex value will be read from closest selected element...
     * (used to find next current tabIndex value, in case some plugin like telerik change it to -1 and set it on others)
     * enter-to-jump-closest-element-tab || data-enter-to-jump-closest-element-tab
     * enter-as-tab-closest-element-tab || data-enter-as-tab-closest-element-tab
     *
     * If this property is set, then find next tabIndex which also met one of the provided condition
     * Values are coma separated list of jquery-based selectors, Ex.: .class, #id, element, z+t
     * Priority Order: Tab Index which match Jquery Based Selector, else Tab Index
     * Cases to use: When middle elements Can be Disabled, Or the Used Plugin Provides Elements That Indexed, But Browser Cant Focus on Them
     * enter-to-jump-next-elements-conditions || data-enter-to-jump-next-elements-conditions
     * enter-as-tab-next-elements-conditions || data-enter-as-tab-next-elements-conditions
     */
    var EnterToJumpDirective = (function () {
        function EnterToJumpDirective() {
            this.restrict = 'A';
            this.require = ["?^^tabIndexedContainer", "?^^dataTabIndexedContainer"]; //? optional ctrl/null   ^ parent   ^^ parents   [nothing] locate on current element
            // this.require = 'ngModel';
            // this.scope = {
            //     onEsc: '&?',
            //     dataOnEsc: '&?',
            //     onEscape: '&?',
            //     dataOnEscape: '&?'
            // };
            this.link = function (scope, element, attrs, tabIndexContainerControllers) {
                var attachToClosest = attrs.enterToJumpAttachToClosest
                    || attrs.dataEnterToJumpAttachToClosest
                    || attrs.enterAsTabAttachToClosest
                    || attrs.dataEnterAsTabAttachToClosest;
                var attachToClosestElem;
                if (attachToClosest) {
                    attachToClosestElem = Util.JQueryUtility.closestAnyDirection(element, attachToClosest);
                    if (attachToClosestElem.length == 0)
                        throw new Error("Cannot find the item(s) that is required by the calling attribute (" +
                            "enter-to-jump, data-enter-to-jump, enter-as-tab, or data-enter-as-tab)");
                }
                var tabIndexClosest = attrs.enterToJumpClosestElementTab
                    || attrs.dataEnterToJumpClosestElementTab
                    || attrs.enterAsTabClosestElementTab
                    || attrs.dataEnterAsTabClosestElementTab;
                var tabIndexClosestElem;
                if (tabIndexClosest) {
                    tabIndexClosestElem = Util.JQueryUtility.closestAnyDirection(element, tabIndexClosest); //element.closest(tabIndexClosest);
                    if (tabIndexClosestElem.length == 0)
                        throw new Error("Cannot find the item(s) that is required by the calling attribute (" +
                            "enter-to-jump, data-enter-to-jump, enter-as-tab, or data-enter-as-tab)");
                }
                var targetElement = attachToClosestElem || element;
                var tabIndexElement = tabIndexClosestElem || element;
                targetElement.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        event.preventDefault();
                        var tabIndexContainerCtrl = tabIndexContainerControllers[0] || tabIndexContainerControllers[1];
                        //TODO: Find closest Scope Controller..............................................:@
                        //Limit Focus Jump To A Container
                        var container = (tabIndexContainerCtrl != null) ? tabIndexContainerCtrl.getElement() : null;
                        //Filter Only those element that explicitly defines tabindex attribute
                        var tabbedFormElements;
                        if (container == null) {
                            tabbedFormElements = angular.element("[tabindex]"); //as long as it doesn't contain '-' it's all lower case
                        }
                        else {
                            tabbedFormElements = container.find("[tabindex]");
                        }
                        /**
                         * Array of {tabIndex, element} items
                         * @type {Array<{tabIndex:number, element:any}>}
                         */
                        var tabs = [];
                        Util.Utility.forEach(tabbedFormElements, function (e) {
                            if (e.tabIndex !== -1)
                                tabs.push({ tabIndex: e.tabIndex, element: e });
                        });
                        tabs.sort(function (a, b) {
                            return a.tabIndex - b.tabIndex;
                        });
                        while (Util.Utility.hasDuplicates(tabs, function (tab) {
                            return tab.tabIndex;
                        })) {
                            console.warn("found duplicated tab indexes, Shift all tab indexes");
                            var shift = false;
                            for (var i = 0; i < tabs.length; i++) {
                                if (!shift && tabs[i + 1] != undefined) {
                                    if (tabs[i + 1].tabIndex === tabs[i].tabIndex) {
                                        shift = true;
                                    }
                                }
                                else if (shift) {
                                    tabs[i].tabIndex++;
                                    tabs[i].element.tabIndex++;
                                }
                            }
                        }
                        var nextJumpListElements = [];
                        var nextJumpList = attrs.enterToJumpNextElementsConditions
                            || attrs.dataEnterToJumpNextElementsConditions
                            || attrs.enterAsTabNextElementsConditions
                            || attrs.dataEnterAsTabNextElementsConditions;
                        if (nextJumpList) {
                            var nextJumpListSplit = nextJumpList.split(",");
                            if (nextJumpListSplit.length == 0)
                                throw new Error("condition attribute is defined, but it's value is null or empty");
                            for (var i = 0; i < nextJumpListSplit.length; i++) {
                                var elements;
                                if (container == null) {
                                    elements = angular.element(nextJumpList); //nextJumpListSplit[i]); //TODO: Fix priority by split to priotiy to by Whole
                                    if (elements.length != 0) {
                                        nextJumpListElements.push(elements);
                                    }
                                }
                                else {
                                    elements = container.find(nextJumpList); //nextJumpListSplit[i]); //TODO: Fix priority by split to priotiy to by Whole
                                    if (elements.length != 0) {
                                        nextJumpListElements.push(elements);
                                    }
                                }
                            }
                            if (nextJumpListElements.length == 0)
                                console.warn("Could not found any of the requested conditioned selector, " +
                                    "the application will continue to search for next index involving priority list");
                        }
                        var enabledTabs = [];
                        for (var i = 0; i < tabs.length; i++) {
                            if (angular.element(tabs[i].element).is(':enabled'))
                                enabledTabs.push(tabs[i]);
                        }
                        var nextTabIndex = -1;
                        if (nextJumpListElements.length == 0) {
                            var nextTabIndex = Util.Utility.indexOf(enabledTabs, /**currentItem*/ tabIndexElement[0], function (arrItem, searchItem) {
                                return arrItem.tabIndex === searchItem.tabIndex;
                            }) + 1; //Never Can Be -1 (unless there is an error)
                        }
                        else {
                            for (var j = 0; j < nextJumpListElements.length && nextTabIndex == -1; j++) {
                                var nextTabIndex = Util.Utility.indexOf(enabledTabs, /**currentItem*/ tabIndexElement[0], function (arrItem, searchItem) {
                                    function elementIsInList(elem, lst) {
                                        for (var i = 0; i < lst.length; i++) {
                                            if (elem == lst[i])
                                                return true;
                                        }
                                        return false;
                                    }
                                    return arrItem.tabIndex > searchItem.tabIndex
                                        && elementIsInList(angular.element(arrItem.element)[0], nextJumpListElements[j]);
                                });
                            }
                            if (nextTabIndex == -1) {
                                var nextTabIndex = Util.Utility.indexOf(enabledTabs, /**currentItem*/ tabIndexElement[0], function (arrItem, searchItem) {
                                    return arrItem.tabIndex === searchItem.tabIndex;
                                }) + 1; //Never Can Be -1 (unless there is an error)
                            }
                        }
                        var nextFocus = enabledTabs[nextTabIndex];
                        if (!Util.Utility.isNullOrUndefined(nextFocus) && angular.isDefined(nextFocus.element))
                            nextFocus.element.focus();
                    }
                });
            };
        }
        EnterToJumpDirective.instance = function () {
            return new EnterToJumpDirective();
            // var directive: ng.IDirectiveFactory = ($timeout:ng.ITimeoutService)=>new OnRepeaterFinishRender($timeout);
            // directive.$inject=["$timeout"];
            // return directive;
        };
        return EnterToJumpDirective;
    }());
    angular.module("angularUtility")
        .directive("tabIndexedContainer", TabIndexedContainer.instance)
        .directive("dataTabIndexedContainer", TabIndexedContainer.instance)
        .directive("enterToJump", EnterToJumpDirective.instance)
        .directive("enterAsTab", EnterToJumpDirective.instance)
        .directive("dataEnterToJump", EnterToJumpDirective.instance)
        .directive("dataEnterAsTab", EnterToJumpDirective.instance);
})(AngularUtility || (AngularUtility = {}));
//# sourceMappingURL=enterToJump.js.map