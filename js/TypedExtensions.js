/**
 * Created by Hassan Faghihi on 7/25/2015.
 */
/// <reference path="TypedUtility.ts" />
String.prototype.insertAt = function (index, strText) {
    return this.substr(0, index) + strText + this.substr(index - 1 + strText.length);
};
String.prototype.replaceAt = function (index, count, strReplacement) {
    if (count < 0)
        throw "count cannot be less than 0";
    return this.substr(0, index) + strReplacement + this.substr(index + (count) + strReplacement.length);
};
/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|Object}
 */
String.prototype.trimStart = function (strTrim) {
    var result = this;
    if (strTrim == undefined) {
        result = this.replace(/\s+$/, "");
    }
    else {
        while (result.indexOf(strTrim) === 0 && result.length !== 0) {
            result = result.replaceAt(0, 1, "");
        }
    }
    return result.valueOf();
};
/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|Object}
 */
String.prototype.trimEnd = function (strTrim) {
    var result = this;
    if (strTrim == undefined) {
        result = this.replace(/^\s+/, '');
    }
    else {
        while (result.indexOf(strTrim) === result.length - strTrim.length && result.length !== 0) {
            result = result.replaceAt(result.length - strTrim.length, strTrim.length, "");
        }
    }
    return result.valueOf();
};
/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|object}
 */
String.prototype.fullTrim = function (strTrim) {
    return this.trimStart(strTrim).trimEnd(strTrim).valueOf();
};
String.prototype.startWith = function (strStart) {
    if (this.lastIndexOf(strStart) === -1)
        return false;
    return this.indexOf(strStart) === 0;
};
String.prototype.endWith = function (strEnd) {
    if (this.lastIndexOf(strEnd) === -1)
        return false;
    return this.lastIndexOf(strEnd) === this.length - strEnd.length;
};
/**
 * Padding the string value with specified character
 * @param len {number} desired total length
 * @param sign {string} the sign to used for padding (default '0')
 * @returns {string}
 */
String.prototype.padLeft = function (len, sign) {
    return Array(len - String(this).length + 1).join(sign || "0") + this;
};
/**
 * Padding the string value with specified character
 * @param len {number} desired total length
 * @param sign {string} the sign to used for padding (default '0')
 * @returns {string}
 */
String.prototype.padLeft = function (len, sign) {
    return this + Array(len - String(this).length + 1).join(sign || "0");
};
String.prototype.contains = function (term, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    return ignoreCase ?
        this.toLowerCase().indexOf(term.toLowerCase()) :
        this.indexOf(term) !== -1;
};
String.prototype.replaceAll = function (find, replace) {
    return this.replace(new RegExp(Util.Utility.escapeRegExp(find), 'g'), replace);
};
String.prototype.format = function () {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i - 0] = arguments[_i];
    }
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp("\\{" + i + "\\}", "gi");
        formatted = formatted.replace(regexp, params[i]);
    }
    return formatted;
};
String.prototype.putThousandComma = function () {
    var nStr = this + '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};
String.prototype.removeThousandComma = function () {
    return this.replace(/,/g, '');
};
String.prototype.filterNumbers = function () {
    return this.replace(/\D/g, '');
};
String.prototype.removeHtmlTags = function () {
    return Util.Utility.removeHtmlTags(this);
};
Number.prototype.padLeft = function (len, sign) {
    if (isNaN(this))
        return "NaN";
    if (!isFinite(this))
        return "Infinity";
    return Array(len - String(this).length + 1).join(sign || "0") + this;
};
Number.prototype.putThousandComma = function () {
    return this.toString().putThousandComma();
};
Date.prototype.getDayName = function () {
    switch (this.getDay()) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            throw new Error("Day Out Of Range Exception");
    }
};
/**
 * Find item using Match function.
 * @param searchItem {*} item we use to match data
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @returns {*|null} returns matched item
 */
Array.prototype.find = function (searchItem, fnMatch) {
    return Util.Utility.find(this, searchItem, fnMatch);
};
/**
 * returns true if the matched item exists within the array, otherwise returns false
 * @param searchItem {*} item we use to match data
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @returns {boolean}
 */
Array.prototype.contains = function (searchItem, fnMatch) {
    return Util.Utility.contains(this, searchItem, fnMatch);
};
/**
 * returns index of searched item at first found position, otherwise returns -1
 * @param searchItem {*|null} item we use to match data / null if want to match with global or other accessible data
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @param startIndex {number} the starting index where the search start from within the array
 * @returns {number}
 */
Array.prototype.indexOfMatch = function (searchItem, fnMatch, startIndex) {
    return Util.Utility.indexOf(this, searchItem, fnMatch, startIndex);
};
/**
 * returns index of searched item at last found position, otherwise returns -1
 * @param searchItem {*|null} item we use to match data / null if want to match with global or other accessible data
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @param startIndex {number} the starting index where the search start from within the array
 * @returns {number}
 */
Array.prototype.lastIndexOfMatch = function (searchItem, fnMatch, startIndex) {
    return Util.Utility.lastIndexOf(this, searchItem, fnMatch, startIndex);
};
/**
 * Remove Item From Array, And Returns List Of Deleted Items
 * @param searchItem {*} item we use to match data
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @param removeOption {IterationOption|IterationOptionString} can be either of enum IterationOption or one of following values 'first' (default), 'last', 'all'
 * @returns {*[]} returns Deleted Items
 */
Array.prototype.remove = function (searchItem, fnMatch, removeOption) {
    if (removeOption === void 0) { removeOption = 'first'; }
    return Util.Utility.remove(this, searchItem, fnMatch, removeOption);
};
/**
 * Replace Item Inside Array, And Returns List Of Deleted Items
 * @param searchItem {*} item we use to match data
 * @param replaceWith {*} the item that should be replaced with searching item
 * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
 * @param replaceOption {IterationOption|IterationOptionString} can be either of enum IterationOption or one of following values 'first' (default), 'last', 'all'
 * @returns {*[]} returns Deleted Items
 */
Array.prototype.replace = function (searchItem, replaceWith, fnMatch, replaceOption) {
    if (replaceOption === void 0) { replaceOption = 'first'; }
    return Util.Utility.replace(this, searchItem, replaceWith, fnMatch, replaceOption);
};
/**
 * Return a Shallow Copy From `this` Array
 * @returns {Array<any>}
 */
Array.prototype.copyArray = function () {
    return Util.Utility.copyArray(this);
};
/**
 * Shallow Copy Items of Given Array to `this` Array
 * @param sourceArray
 */
Array.prototype.copyArrayFrom = function (sourceArray) {
    Util.Utility.copyArrayTo(sourceArray, this);
};
/**
 * Shallow Copy Items of `this` Array to The Given Array
 * @param targetArray
 */
Array.prototype.copyArrayTo = function (targetArray) {
    Util.Utility.copyArrayTo(this, targetArray);
};
/**
 * Returns Unordered List of Items
 * Relays on Heavy Functions O^2
 */
Array.prototype.shuffleItems = function () {
    return Util.Utility.shuffleItems(this);
};
/**
 * Returns Unordered List of Items
 * Maybe Less Accurate, And So Lightweight O
 */
Array.prototype.shuffleItems2 = function () {
    return Util.Utility.shuffleItems2(this);
};
/**
 * Add Another Array Of Items to the End of This Array While Modifying Its Item
 * @param items {Array<*>} New List of Items
 * @param fnConvert {Function?} If Provided, Can Be Used to Modify Object Within the Provided Method
 * @returns {void}
 */
Array.prototype.addRangeToBegin = function (items, fnConvert) {
    for (var i = items.length - 1; i >= 0; i--) {
        this.unshift((fnConvert != undefined)
            ? fnConvert(items[i])
            : items[i]);
    }
};
/**
 * Add Another Array Of Items to the begin of This Array While Modifying Its Item
 * @param items {Array<*>} New List of Items
 * @param fnConvert {Function?} If Provided, Can Be Used to Modify Object Within the Provided Method
 * @returns {void}
 */
Array.prototype.addRangeToEnd = function (items, fnConvert) {
    for (var i = items.length - 1; i >= 0; i--) {
        this.push((fnConvert != undefined)
            ? fnConvert(items[i])
            : items[i]);
    }
};
/**
 * Add an Item to the End of This Array While Modifying the Item
 * @param item {*} The New Item
 * @param fnConvert {Function?} If Provided, Can Be Used to Modify Object Within the Provided Method
 * @returns {void}
 */
Array.prototype.addToBegin = function (item, fnConvert) {
    this.unshift((fnConvert != undefined)
        ? fnConvert(item)
        : item);
};
/**
 * Add an Item to the begin of This Array While Modifying Its Item
 * @param item {*} New List of Items
 * @param fnConvert {Function?} If Provided, Can Be Used to Modify Object Within the Provided Method
 * @returns {void}
 */
Array.prototype.addToEnd = function (item, fnConvert) {
    this.push((fnConvert != undefined)
        ? fnConvert(item)
        : item);
};
//// Add To Extensions
//// ReSharper disable once NativeTypePrototypeExtending
//String.prototype.toDate = function () {
//    "use strict";
//
//    var nd = this.toNumberDate();
//
//    if(nd != null) return nd;
//
//    var iso8601d = this.toISO8601Date();
//
//    if(iso8601d !=null )return iso8601d;
//
//    return null;
//};
//
//String.prototype.toNumberDate = function () {
//    "use strict";
//
//    var match = /\/Date\((\d{13})\)\//.exec(this);
//
//    return match === null ? null : new Date(parseInt(match[1], 10));
//};
//
//String.prototype.toISO8601Date = function (isUTC) {
//    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
//        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
//        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
//    var d = this.match(new RegExp(regexp));
//
//    var offset = 0;
//    var date = new Date(d[1], 0, 1);
//
//    if (d[3]) { date.setMonth(d[3] - 1); }
//    if (d[5]) { date.setDate(d[5]); }
//    if (d[7]) { date.setHours(d[7]); }
//    if (d[8]) { date.setMinutes(d[8]); }
//    if (d[10]) { date.setSeconds(d[10]); }
//    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
//    if (d[14]) {
//        offset = (Number(d[16]) * 60) + Number(d[17]);
//        offset *= ((d[15] == '-') ? 1 : -1);
//    }
//
//    //offset -= date.getTimezoneOffset();
//    var time = (Number(date) + (offset * 60 * 1000));
//    var newDate = new Date();
//    newDate.setTime(Number(time));
//
//    return (d===null)? null : newDate;
//};
//
//// ReSharper disable once NativeTypePrototypeExtending
//Array.prototype.unshiftRange = function (items){
//    "use strict";
//
//    for(var i = items.length -1 ; i >=0  ; i--){
//        this.unshift(items[i]);
//    }
//};
//
///**
// * Unshift range of array while creating new object from owned object
// * @param items
// * @param fnConvertor : convertor function, which receive item, and return new object
// * @example myArr.unshiftRange(existList, function(c){ return new { element1: c.element1, element2: c.element2}; });
// */
//
//Array.prototype.unshiftRange = function (items, fnConvertor) {
//    "use strict";
//
//    for(var i = items.length -1 ; i >= 0; i--){
//        this.unshift(fnConvertor(items[i]));
//    }
//};
//
//
///**
// * Unshift range of array while creating new object from owned object,
// * And let to do more operation in middle of adding items... Also iterate even after last item added
// * @param items
// * @param fnConvertor(curItem) : convertor function, which receive item, and return new object
// * @param fnBeforeAdd(thisArray, lowerItem, higherItem) :
// * @example myArr.unshiftRange(existList, function(c){ return new { element1: c.element1, element2: c.element2}; });
// */
//
//Array.prototype.unshiftRange = function (items, fnConvertor, fnBeforeAdd) {
//    "use strict";
//
//    for(var i = items.length -1 ; i >= -1; i--){
//        var convertedItem = (i != -1)? fnConvertor(items[i]) : null;
//
//        if(fnBeforeAdd != undefined) {
//            //first Item on list (after unshift new item is first item)
//            fnBeforeAdd(this, convertedItem, (this[0] != undefined) ? this[0] : null);
//        }
//
//        if(i != -1)
//            this.unshift(convertedItem);
//    }
//}; 
//# sourceMappingURL=TypedExtensions.js.map