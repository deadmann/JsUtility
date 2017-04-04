///<reference path="UtilityTypes.ts"/>

/**
 * Created by Hassan Faghihi on 7/25/2015.
 */
module Util {
    export class Utility {
        /**
         * @callback FnMatchCallback
         * @param arrayItem {*}
         * @param searchItem {*}
         */

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns False If Incoming Variable Is Not Null or Undefined, Otherwise True
         * @param obj {object}
         * @returns {boolean}
         */
        public static isNullOrUndefined(obj:Object):boolean {
            //return obj == null //juggling-check
            return typeof obj === 'undefined' || obj === null; //strict-check
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns False If Incoming Variable Contains Data, Otherwise True
         * @param obj {object}
         * @returns {boolean}
         */
        public static isNullOrUndefinedOrEmpty(obj:Object):boolean {
            if (Utility.isNullOrUndefined(obj))
                return true;

            //typeof for primitive string, instanceof for objective string
            if (typeof(obj) == "string" || obj instanceof String)
                return (<String>obj).valueOf() == "";
            else if (obj instanceof Array)
                return (<Array<any>>obj).length === 0;
            throw "Not Supported Exception";
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns False If Incoming Variable Contains Some Non-Whitespace Data, Otherwise True
         * @param obj {object}
         * @returns {boolean}
         */
        public static isNullOrUndefinedOrWhiteSpace(obj:Object):boolean {
            return Utility.isNullOrUndefined(obj) || (<String>obj).valueOf().trim() === "";
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns True If the Object Contains a Numeric Value
         * @param obj {*} The Incoming Object
         * @returns {boolean}
         */
        public static isNumeric(obj:any) {
            //From JQuery
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Try parse incoming value to Integer
         * @param value {*} the value to parse
         * @param defaultValue {*} value to return in case nothing is parsed
         * @returns {number} If parsed returns the parsed value, otherwise returns the default value
         */
        public static tryParseInt(value:any, defaultValue:any) {
            var retValue = defaultValue;
            if (value !== null) {
                if (value.length > 0) {
                    if (!isNaN(value)) {
                        retValue = parseInt(value);
                    }
                }
            }
            return retValue;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Try parse incoming value to float
         * @param value {*} the value to parse
         * @param defaultValue {*} value to return in case nothing is parsed
         * @returns {number} If parsed returns the parsed value, otherwise returns the default value
         */
        public static tryParseFloat(value:any, defaultValue:any) {
            var retValue = defaultValue;
            if (value !== null) {
                if (value.length > 0) {
                    if (!isNaN(value)) {
                        retValue = parseFloat(value);
                    }
                }
            }
            return retValue;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Compare two string in enUs Local, return 0 if both are equal, 1 if first one is greater, and -1 if second one is greater
         * @param string1 {string}
         * @param string2 {string}
         */
        public static compareString(string1:string, string2:string):number{
            if(this.isNullOrUndefined(string1))
                throw new Error("string1 cannot be null");
            if(this.isNullOrUndefined(string2))
                throw new Error("string2 cannot be null");
            return string1.localeCompare(string2,"enUs");
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Remove Item From Array, And Returns List Of Deleted Items
         * @param itemList{Array<*>} list of items that we want to search in
         * @param searchItem {*} item we use to match data
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @param removeOption {IterationOption|IterationOptionString} can be either of enum IterationOption or one of following values 'first' (default), 'last', 'all'
         * @returns {*[]} returns Deleted Items
         */
        public static remove(itemList:Array<any>, searchItem:any, fnMatch?:Function, removeOption:IterationOption|IterationOptionString = 'first'):Array<any> {
            var index:number;
            if (removeOption === 'first' || removeOption == IterationOption.First) {
                index = this.indexOf(itemList, searchItem, fnMatch);
                return itemList.splice(index, 1);
            } else if (removeOption === 'last' || removeOption == IterationOption.Last) {
                index = this.lastIndexOf(itemList, searchItem, fnMatch);
                return itemList.splice(index, 1);
            } else if (removeOption === 'all' || removeOption == IterationOption.All) {
                var deletedItems = [];
                var index=0;//We pass index as reference so we don't repeat the whole search (0=> we don't plus by 1 as deleted item wont be inside list any more, and we need to recheck the index)
                while ((index = this.indexOf(itemList, searchItem, fnMatch, index)) != -1) {
                    deletedItems.push(itemList.splice(index, 1)[0]);
                }
                return deletedItems;
            } else {
                throw "remove option is not supported"
            }
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Remove Item From Array, And Returns List Of Deleted Items
         * @param itemList{Array<*>} list of items that we want to search in
         * @param searchItem {*} item we use to match data
         * @param replaceWith {*} the item that should be replaced with searching item
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @param replaceOption {IterationOption|IterationOptionString} can be either of enum IterationOption or one of following values 'first' (default), 'last', 'all'
         * @returns {*[]} returns Deleted Items
         */
        public static replace(itemList:Array<any>, searchItem:any, replaceWith:any, fnMatch?:Function, replaceOption:IterationOption|IterationOptionString = 'first'):Array<any> {
            var index:number;
            if (replaceOption === 'first' || replaceOption == IterationOption.First) {
                index = this.indexOf(itemList, searchItem, fnMatch);
                var oldItem = itemList[index];
                itemList[index]=replaceWith;
                return oldItem;
            } else if (replaceOption === 'last' || replaceOption == IterationOption.Last) {
                index = this.lastIndexOf(itemList, searchItem, fnMatch);
                var oldItem = itemList[index];
                itemList[index]=replaceWith;
                return oldItem;
            } else if (replaceOption === 'all' || replaceOption == IterationOption.All) {
                var oldItems = [];
                var index = -1;//We pass index as reference so we don't repeat the whole search (-1=> 1. item doesn't delete, 2. we do plus by to bypass current item)
                while ((index = this.indexOf(itemList, searchItem, fnMatch, index+1)) != -1) {
                    oldItems.push(itemList[index]);
                    itemList[index]=replaceWith;
                }
                return oldItems;
            } else {
                throw "replace option is not supported"
            }
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Find item using Match function.
         * @param arr{Array<*>} list of items that we want to search in
         * @param searchItem {*} item we use to match data
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @returns {*|null} returns matched item
         */
        public static find(arr:Array<any>, searchItem:any, fnMatch?:Function) {
            for (var i = 0; i < arr.length; i++) {
                if (fnMatch) {
                    if (fnMatch(arr[i], searchItem)) {
                        return arr[i];
                    }
                }
                else {
                    if (arr[i] === searchItem) {
                        return arr[i];
                    }
                }
            }
            return null;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Iterate Per Item Within The Provided Array
         * @param arr {*}
         * @param callBack {Function} This Function Will Be Called Per Item While Iterating
         */
        public static forEach(arr:Array<any>, callBack:Function) {
            for (var i = 0; i < arr.length; i++) {
                callBack(arr[i]);
            }
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns True If The Array Contains Duplicated Items
         * @param arr {Array<*>}
         * @param fnSelector {Function} Optional - If Specified, Should Process The Model, And Return Custom Value
         * @returns {boolean}
         */
        public static hasDuplicates(arr:Array<any>, fnSelector?:Function) {
            var x = {}, len = arr.length;
            for (var i = 0; i < len; i++) {
                if(fnSelector){
                    if (x[fnSelector(arr[i])] === true) {
                        return true;
                    }
                    x[fnSelector(arr[i])] = true;
                }else{
                    if (x[arr[i]] === true) {
                        return true;
                    }
                    x[arr[i]] = true;
                }
            }
            return false;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Returns False If The Array Contains Duplicated Items
         * @param arr {Array<*>}
         * @param fnSelector {Function} Optional - If Specified, Should Process The Model, And Return Custom Value
         * @returns {boolean}
         */
        public static isDistinct(arr:Array<any>, fnSelector?:Function) {
            return !Utility.hasDuplicates(arr, fnSelector);
        }

        /**
         * returns true if the matched item exists within the array, otherwise returns false
         * @param items {Array<*>} list of items that we want to search in
         * @param searchItem {*} item we use to match data
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @returns {boolean}
         */
        public static contains(items:any[], searchItem:any, fnMatch?:Function) {
            var flag:boolean = false;
            for (var i:number = 0; i < items.length; i++) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        flag = true;
                    }
                } else {
                    if (items[i] === searchItem) {
                        flag = true;
                    }
                }
            }
            return flag;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * returns index of searched item at first found position, otherwise returns -1
         * @param items {Array<*>} list of items that we want to search in
         * @param searchItem {*|null} item we use to match data / null if want to match with global or other accessible data
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @param startIndex {number} the starting index where the search start from within the array
         * @returns {number}
         */
        public static indexOf(items:any[], searchItem:any, fnMatch?:Function, startIndex:number=0) {
            //If we don't have specific match function, we can use array indexOf if exists
            if (!fnMatch && Array.prototype.indexOf) {
                return items.indexOf(searchItem);
            }
            for (var i:number = startIndex; i < items.length; i++) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        return i;
                    }
                } else {
                    if (items[i] === searchItem) {
                        return i;
                    }
                }
            }
            return -1;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * returns index of searched item at last found position, otherwise returns -1
         * @param items {Array<*>} list of items that we want to search in
         * @param searchItem {*|null} item we use to match data / null if want to match with global or other accessible data
         * @param fnMatch {FnMatchCallback} if defined this function will be used to match two models, other wise object reference will be used. firstItem come from array and second is searchItem
         * @param startIndex {number} the starting index where the search start from within the array
         * @returns {number}
         */
        public static lastIndexOf(items:any[], searchItem:any, fnMatch?:Function, startIndex:number=(items.length-1)) {
            //If we don't have specific match function, we can use array lastIndexOf if exists
            if (!fnMatch && Array.prototype.lastIndexOf) {
                return items.lastIndexOf(searchItem);
            }
            for (var i:number = startIndex; i > 0; i--) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        return i;
                    }
                } else {
                    if (items[i] === searchItem) {
                        return i;
                    }
                }
            }
            return -1;
        }

        /**
         * Generate a Shallow Copy Array from Existing Array
         * @param list {Array<T>}
         * @returns {Array<T>}
         */
        public static copyArray<T>(list: Array<T>):Array<T>{
            var copyList:Array<T>=[];
            for(var i = 0; i < list.length; i++)
                copyList.push(list[i]);

            return copyList;
        }

        /**
         * Generate a Shallow Copy Array from Existing Array
         * @param list {Array<T>} items will copy from this array
         * @param target {Array<T>} items will copy to this array
         * @returns {Array<T>}
         */
        public static copyArrayTo<T>(list: Array<T>, target: Array<T>){
            target.length = 0; //Clear array by reference ... said to work, not sure...
            for(var i = 0; i < list.length; i++)
                target.push(list[i]);
        }

        /**
         * Returns an Unordered Array From Given Array
         * Need to get fixed, Relies on Heavy functions O^2
         * @param list {Array<T>}
         * @returns {Array<T>}
         */
        public static shuffleItems<T>(list:Array<T>):Array<T> {
            var copyList = this.copyArray(list);
            var newList:Array<T> = [];
            do {
                var randomIndex = this.getRandomInt(0, copyList.length);
                newList.push(copyList[randomIndex]);

                this.remove(copyList, copyList[randomIndex], null, IterationOption.First);
            } while (copyList.length > 0);

            return newList;
        }

        /**
         * Same as shuffleItems
         * Maybe less Accurate, And So Light Weight O
         * @param list
         * @returns {Array<T>}
         */
        public static shuffleItems2<T>(list:Array<T>):Array<T>{
            var copyArray:Array<T>=this.copyArray(list);
            var currentIndex = copyArray.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = copyArray[currentIndex];
                copyArray[currentIndex] = copyArray[randomIndex];
                copyArray[randomIndex] = temporaryValue;
            }

            return copyArray;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Padding desired value with specified character
         * @param val {string} Value to pad
         * @param len {number} desired total length
         * @param sign {string} the sign to used for padding (default '0')
         * @returns {string}
         */
        public static padLeft(val:string, len:number, sign?:string) {
            return Array(len - String(val).length + 1).join(sign || "0") + val;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Padding desired value with specified character
         * @param val {string} Value to pad
         * @param len {number} desired total length
         * @param sign {string} the sign to used for padding (default '0')
         * @returns {string}
         */
        public static padRight(val:string, len:number, sign?:string) {
            return val + Array(len - String(val).length + 1).join(sign || "0");
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Generate array of numbers that are within the given range
         * @param start {number} start number
         * @param end {number} end number
         * @param includeEnd {boolean} true if we want to include last number, otherwise we generate until the end number
         * @return {Array<number>} Array of numbers that are within the range
         */
        public static generateRange(start:number, end:number, includeEnd):Array<number> {
            var result = [];
            for (var i = start
                ; (start <= end)
                     ? (includeEnd == false) ? (i < end) : (i <= end)
                     : (includeEnd == false) ? (i > end) : (i >= end)
                ; (start <= end) ? i++ : i--) {
                result.push(i);
            }
            return result;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Escape a regex string
         * @param str
         * @return {*|string|void}
         */
        public static escapeRegExp(str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Removing All Html Code From String, Replacing Html Tags With Spaces
         * @param htmlStr
         * @returns {*|string|void}
         */
        public static removeHtmlTags(htmlStr){
            return htmlStr.replace(/<\/?[^>]+(>|$)/g, " ");
        }

        /**
         * Convert Incoming Data to Date, or Return it, if it Already is a Date Object
         * @param date {number|string|Date}
         */
        public static toDate(date:number|string|Date):Date{
            if(typeof date === 'number'){
                return new Date(date);
            } else if (typeof date === 'string'){
                return new Date(date)
            } else if (date instanceof Date){
                return date;
            } else {
                throw new Error("Incoming 'date' Object, Is Not Convertible To Type 'Date'");
            }
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Turn String To Numerical Data, and Compare It, 0 if equal, 1 if first is greater, -1 if second is greater
         * @param date1 {string}
         * @param date2 {string}
         * @returns {number}
         */
        public static compareDates(date1:string, date2:string):number {
            var dateNum1 = parseInt(date1.replace(/\D/g, ''));
            var dateNum2 = parseInt(date2.replace(/\D/g, ''));
            return (dateNum1 == dateNum2) ? 0
                : ((dateNum1 > dateNum2) ? 1
                : -1);
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Return True if Provided Date String Is Between Of Two Other Dates
         * @param date {string}
         * @param startDate {string}
         * @param endDate {string}
         * @returns {boolean}
         */
        public static isBetweenDates(date:string, startDate:string, endDate:string):boolean {
            return (this.compareDates(date, startDate) >= 0 && this.compareDates(date, endDate) <= 0);
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Get Differences Between Two Dates
         * @param date1 {string|number|Date}
         * @param date2 {string|number|Date}
         * @param by {DateDifferencesType}
         */
        public static getDateDifferences(date1:string|number|Date, date2:string|number|Date, by:DateDifferencesType){
            var d1=this.toDate(date1);
            var d2=this.toDate(date2);

            var timeDiff = Math.abs(d1.getTime() - d2.getTime());
            switch (by){
                case DateDifferencesType.Milliseconds:
                    return timeDiff;
                case DateDifferencesType.Seconds:
                    return Math.ceil(timeDiff/1000);
                case DateDifferencesType.Minutes:
                    return Math.ceil(timeDiff/(1000*60));
                case DateDifferencesType.Hours:
                    return Math.ceil(timeDiff/(1000*3600));
                case DateDifferencesType.Days:
                    return Math.ceil(timeDiff / (1000 * 3600 * 24));
                case DateDifferencesType.Weeks:
                    return Math.ceil(timeDiff / (1000 * 3600 * 24 * 7));
                default:
                    throw new Error("Not Implemented Exception")
            }

        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * (Slow) Generate Random Distinguishable Human Readable Color
         * @param number
         * @returns {string[]} String Array of Hexadecimal RGB color
         */
        public static generateRandomDistinguishableColors(number) {
            /*
             This generates colors using the following algorithm:
             Each time you create a color:
             Create a random, but attractive, color{
             Red, Green, and Blue are set to random luminosity.
             One random value is reduced significantly to prevent greyscale.
             Another is increased by a random amount up to 100%.
             They are mapped to a random total luminosity in a medium-high range (bright but not white).
             }
             Check for similarity to other colors{
             Check if the colors are very close together in value.
             Check if the colors are of similar hue and saturation.
             Check if the colors are of similar luminosity.
             If the random color is too similar to another,
             and there is still a good opportunity to change it:
             Change the hue of the random color and try again.
             }
             Output array of all colors generated
             */
            //if we've passed preload colors and they're in hex format
            if (typeof(arguments[1]) != 'undefined' && arguments[1].constructor == Array && arguments[1][0] && arguments[1][0].constructor != Array) {
                for (var i = 0; i < arguments[1].length; i++) { //for all the passed colors
                    var vals = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(arguments[1][i]); //get RGB values
                    arguments[1][i] = [parseInt(vals[1], 16), parseInt(vals[2], 16), parseInt(vals[3], 16)]; //and convert them to base 10
                }
            }
            var loadedColors = typeof(arguments[1]) == 'undefined' ? [] : arguments[1],//predefine colors in the set
                number = number + loadedColors.length,//reset number to include the colors already passed
                lastLoadedReduction = Math.floor(Math.random() * 3),//set a random value to be the first to decrease
                rgbToHSL = function (rgb) {//converts [r,g,b] into [h,s,l]
                    var r = rgb[0], g = rgb[1], b = rgb[2], cMax = Math.max(r, g, b), cMin = Math.min(r, g, b), delta = cMax - cMin, l = (cMax + cMin) / 2, h = 0, s = 0;
                    if (delta == 0)h = 0; else if (cMax == r)h = 60 * ((g - b) / delta % 6); else if (cMax == g)h = 60 * ((b - r) / delta + 2); else h = 60 * ((r - g) / delta + 4);
                    if (delta == 0)s = 0; else s = delta / (1 - Math.abs(2 * l - 1));
                    return [h, s, l]
                }, hslToRGB = function (hsl) {//converts [h,s,l] into [r,g,b]
                    //noinspection JSUnusedLocalSymbols
                    var h = hsl[0], s = hsl[1], l = hsl[2], c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r, g, b;
                    if (h < 60) {
                        r = c;
                        g = x;
                        b = 0
                    } else if (h < 120) {
                        r = x;
                        g = c;
                        b = 0
                    } else if (h < 180) {
                        r = 0;
                        g = c;
                        b = x
                    } else if (h < 240) {
                        r = 0;
                        g = x;
                        b = c
                    } else if (h < 300) {
                        r = x;
                        g = 0;
                        b = c
                    } else {
                        r = c;
                        g = 0;
                        b = x
                    }
                    return [r, g, b]
                }, shiftHue = function (rgb, degree) {//shifts [r,g,b] by a number of degrees
                    var hsl = rgbToHSL(rgb); //convert to hue/saturation/luminosity to modify hue
                    hsl[0] += degree; //increment the hue
                    if (hsl[0] > 360) { //if it's too high
                        hsl[0] -= 360; //decrease it mod 360
                    } else if (hsl[0] < 0) { //if it's too low
                        hsl[0] += 360; //increase it mod 360
                    }
                    return hslToRGB(hsl); //convert back to rgb
                }, differenceRecursions = {//stores recursion data, so if all else fails we can use one of the hues already generated
                    differences: [],//used to calculate the most distant hue
                    values: []//used to store the actual colors
                }, fixDifference = function (color) {//recursively asserts that the current color is distinctive
                    if (differenceRecursions.values.length > 23) {//first, check if this is the 25th recursion or higher. (can we try any more unique hues?)
                        //if so, get the biggest value in differences that we have and its corresponding value
                        var ret = differenceRecursions.values[differenceRecursions.differences.indexOf(Math.max.apply(null, differenceRecursions.differences))];
                        differenceRecursions = {differences: [], values: []}; //then reset the recursions array, because we're done now
                        return ret; //and then return up the recursion chain
                    } //okay, so we still have some hues to try.
                    var differences = []; //an array of the "difference" numbers we're going to generate.
                    for (var i = 0; i < loadedColors.length; i++) { //for all the colors we've generated so far
                        var difference = loadedColors[i].map(function (value, index) { //for each value (red,green,blue)
                                return Math.abs(value - color[index]); //replace it with the difference in that value between the two colors
                            }), sumFunction = function (sum, value) { //function for adding up arrays
                                return sum + value
                            }, sumDifference = difference.reduce(sumFunction), //add up the difference array
                            loadedColorLuminosity = loadedColors[i].reduce(sumFunction), //get the total luminosity of the already generated color
                            currentColorLuminosity = color.reduce(sumFunction), //get the total luminosity of the current color
                            lumDifference = Math.abs(loadedColorLuminosity - currentColorLuminosity), //get the difference in luminosity between the two
                        //how close are these two colors to being the same luminosity and saturation?
                            differenceRange = Math.max.apply(null, difference) - Math.min.apply(null, difference),
                            luminosityFactor = 50, //how much difference in luminosity the human eye should be able to detect easily
                            rangeFactor = 75; //how much difference in luminosity and saturation the human eye should be able to dect easily
                        if (luminosityFactor / (lumDifference + 1) * rangeFactor / (differenceRange + 1) > 1) { //if there's a problem with range or luminosity
                            //set the biggest difference for these colors to be whatever is most significant
                            differences.push(Math.min(differenceRange + lumDifference, sumDifference));
                        }
                        differences.push(sumDifference); //otherwise output the raw difference in RGB values
                    }
                    var breakdownAt = 64, //if you're generating this many colors or more, don't try so hard to make unique hues, because you might fail.
                        breakdownFactor = 25, //how much should additional colors decrease the acceptable difference
                        shiftByDegrees = 15, //how many degrees of hue should we iterate through if this fails
                        acceptableDifference = 250, //how much difference is unacceptable between colors
                        breakVal = loadedColors.length / number * (number - breakdownAt), //break down progressively (if it's the second color, you can still make it a unique hue)
                        totalDifference = Math.min.apply(null, differences); //get the color closest to the current color
                    if (totalDifference > acceptableDifference - (breakVal < 0 ? 0 : breakVal) * breakdownFactor) { //if the current color is acceptable
                        differenceRecursions = {differences: [], values: []}; //reset the recursions object, because we're done
                        return color; //and return that color
                    } //otherwise the current color is too much like another
                    //start by adding this recursion's data into the recursions object
                    differenceRecursions.differences.push(totalDifference);
                    differenceRecursions.values.push(color);
                    color = shiftHue(color, shiftByDegrees); //then increment the color's hue
                    return fixDifference(color); //and try again
                }, color = function () { //generate a random color
                    var scale = function (x) { //maps [0,1] to [300,510]
                            return x * 210 + 300; //(no brighter than #ff0 or #0ff or #f0f, but still pretty bright)
                        }, randVal = function () { //random value between 300 and 510
                            return Math.floor(scale(Math.random()))
                        }, luminosity = randVal(), //random luminosity
                        red = randVal(), //random color values
                        green = randVal(), //these could be any random integer but we'll use the same function as for luminosity
                        blue = randVal(),
                        rescale, //we'll define this later
                        thisColor = [red, green, blue], //an array of the random values
                    /*
                     #ff0 and #9e0 are not the same colors, but they are on the same range of the spectrum, namely without blue.
                     Try to choose colors such that consecutive colors are on different ranges of the spectrum.
                     This shouldn't always happen, but it should happen more often then not.
                     Using a factor of 2.3, we'll only get the same range of spectrum 15% of the time.
                     */
                        valueToReduce = Math.floor(lastLoadedReduction + 1 + Math.random() * 2.3) % 3, //which value to reduce
                    /*
                     Because 300 and 510 are fairly close in reference to zero,
                     increase one of the remaining values by some arbitrary percent betweeen 0% and 100%,
                     so that our remaining two values can be somewhat different.
                     */
                        valueToIncrease = Math.floor(valueToIncrease + 1 + Math.random() * 2) % 3, //which value to increase (not the one we reduced)
                        increaseBy = Math.random() + 1; //how much to increase it by
                    lastLoadedReduction = valueToReduce; //next time we make a color, try not to reduce the same one
                    thisColor[valueToReduce] = Math.floor(thisColor[valueToReduce] / 16); //reduce one of the values
                    thisColor[valueToIncrease] = Math.ceil(thisColor[valueToIncrease] * increaseBy); //increase one of the values
                    rescale = function (x) { //now, rescale the random numbers so that our output color has the luminosity we want
                        return x * luminosity / thisColor.reduce(function (a, b) {
                                return a + b
                            }); //sum red, green, and blue to get the total luminosity
                    };
                    thisColor = fixDifference(thisColor.map(function (a) {
                        return rescale(a)
                    })); //fix the hue so that our color is recognizable
                    if (Math.max.apply(null, thisColor) > 255) { //if any values are too large
                        rescale = function (x) { //rescale the numbers to legitimate hex values
                            return x * 255 / Math.max.apply(null, thisColor)
                        };
                        thisColor = thisColor.map(function (a) {
                            return rescale(a)
                        });
                    }
                    return thisColor;
                };
            for (var i:number = loadedColors.length; i < number; i++) { //Start with our predefined colors or 0, and generate the correct number of colors.
                loadedColors.push(color().map(function (value) { //for each new color
                    return Math.round(value); //round RGB values to integers
                }));
            }
            //then, after you've made all your colors, convert them to hex codes and return them.
            return loadedColors.map(function (color) {
                var hx = function (c) { //for each value
                    var h = c.toString(16);//then convert it to a hex code
                    return h.length < 2 ? '0' + h : h;//and assert that it's two digits
                };
                return "#" + hx(color[0]) + hx(color[1]) + hx(color[2]); //then return the hex code
            });
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * (Fast) Generate Random Color
         * @param number {number}
         * @returns {Array<object>} Object Array of HSL Color
         */
        public static generateRandomHslColors(number) {
            var colors = [];
            for (var i = 0; i < 360; i += 360 / number) {
                var HSLColor = {
                    hue: null, saturation: null, lightness: null
                };
                HSLColor.hue = i;
                HSLColor.saturation = 90 + Math.random() * 10;
                HSLColor.lightness = 50 + Math.random() * 10;
                colors.push(HSLColor);
            }
            return colors;
        };

        //noinspection JSUnusedGlobalSymbols
        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   {number}  h       The hue
         * @param   {number}  s       The saturation
         * @param   {number}  l       The lightness
         * @return  {Array}           The RGB representation
         */
        public static hslToRgb(h, s, l) {
            var r, g, b;

            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };

                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }

            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   {number}  r       The red color value
         * @param   {number}  g       The green color value
         * @param   {number}  b       The blue color value
         * @return  {Array}           The HSL representation
         */
        public static rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }

            return [h, s, l];
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Convert RGB to Hex
         * @param r
         * @param g
         * @param b
         * @returns {string}
         */
        public static rgbToHex(r, g, b) {
            var componentToHex = function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Convert Hex to RGB
         * @param hex
         * @returns {{r: number, g: number, b: number}}
         */
        public static hexToRgb(hex: string) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        /**
         * Getting a random number between 0 and 1, inclusive
         * @returns {number}
         */
        public static getRandom() {
            return Math.random();
        }

        /**
         * Getting a random number between two values
         * @param min
         * @param max
         * @returns {any}
         */
        public static getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        /**
         * Getting a random integer between two values
         * @param min
         * @param max
         * @returns {any}
         */
        public static getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        /**
         * Getting a random integer between two values, inclusive
         * @param min
         * @param max
         * @returns {any}
         */
        public static getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Return all values within passed enum
         * @param enumeration {Enumerator}
         * @returns {Array<string>}
         */
        public static getEnumValues(enumeration):Array<string>{
            var result:Array<string>=[];
            for(var item in enumeration){
                var isValueProperty = parseInt(item,10)>=0;//parse int in system of base 10 (normal human numerical language)
                if(! isValueProperty){
                    result.push(item);
                }
            }
            return result;
        }

        //noinspection JSUnusedGlobalSymbols
        /**
         * Return all values within passed enum
         * @param enumeration {Enumerator}
         * @returns {Array<number>}
         */
        public static getEnumKeys(enumeration):Array<number>{
            var result:Array<number>=[];
            var value:number;
            for(var item in enumeration){
                var isValueProperty = (value = parseInt(item,10))>=0;//parse int in system of base 10 (normal human numerical language)
                if(isValueProperty){
                    result.push(value);
                }
            }
            return result;
        }
    }
}