
//==> MOVE METHOD TO ANGULAR UTILITY TS FILES

app.directive('ncgRequestVerificationToken', ['$http', function ($http) {
    return function (scope, element, attrs) {
        $http.defaults.headers.common['RequestVerificationToken'] = attrs.ncgRequestVerificationToken || "no request verification token";
    };
}]);




app.filter('jalaliDate', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.format(format);
    }
});

app.filter('jalaliDay', function () {
    return function (inputDay) {
        var Day;
        switch (parseInt(inputDay)) {
            case 0:
                Day = "یکشنبه";
                break;
            case 1:
                Day = "دوشنبه";
                break;
            case 2:
                Day = "سه شنبه";
                break;
            case 3:
                Day = "چهارشنبه";
                break;
            case 4:
                Day = "پنجشنبه";
                break;
            case 5:
                Day = "جمعه";
                break;
            case 6:
                Day = "شنبه";
                break;
        }
        return Day;
    }
});

app.filter('jalaliMonth', function () {
    return function (inputDay) {
        var Month;
        switch (parseInt(inputDay)) {
            case 1:
                Month = "فروردین";
                break;
            case 2:
                Month = "اردیبهشت";
                break;
            case 3:
                Month = "خرداد";
                break;
            case 4:
                Month = "تیر";
                break;
            case 5:
                Month = "مرداد";
                break;
            case 6:
                Month = "شهریور";
                break;
            case 7:
                Month = "مهر";
                break;
            case 8:
                Month = "آبان";
                break;
            case 9:
                Month = "آذر";
                break;
            case 10:
                Month = "دی";
                break;
            case 11:
                Month = "بهمن";
                break;
            case 12:
                Month = "اسفند";
                break;
        }
        return Month;
    }
});

// app.directive('jqdatepicker', function () {
//     return {
//         restrict: 'A',
//         require: 'ngModel',
//         link: function (scope, element, attrs, ctrl) {
//             element.datepicker({
//                 minDate: 'D',
//                 dateFormat: 'yy-mm-dd',
//                 numberOfMonths: 2,
//                 showButtonPanel: true,
//                 onSelect: function (date) {
//                     ctrl.$setViewValue(date);
//                     ctrl.$render();
//                     scope.$apply();
//                 }
//             });
//         }
//     };
// });

app.directive('jqdatepickerbirthdat', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.datepicker({
                showButtonPanel: true,
                dateFormat: 'yy/mm/dd',
                changeMonth: true,
                changeYear: true,
                yearRange: "-120:+0",
                maxDate: "+0",
                minDate: "-115Y",
                onSelect: function (date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('jqdatepickerbirthdat', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.datepicker({
                showButtonPanel: true,
                dateFormat: 'yy/mm/dd',
                changeMonth: true,
                changeYear: true,
                yearRange: "-120:+0",
                maxDate: "+0",
                minDate: "-115Y",
                onSelect: function (date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('jqdatepickerbirthdatinf', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.datepicker({
                showButtonPanel: true,
                dateFormat: 'yy/mm/dd',
                changeMonth: true,
                changeYear: true,
                yearRange: "-120:+0",
                maxDate: "+0",
                minDate: "-2Y",
                onSelect: function (date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('jqdatepickerpass', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.datepicker({
                regional: '',
                minDate: 'D',
                showButtonPanel: true,
                dateFormat: 'yy/mm/dd',
                yearRange: "+0:+120",
                minDate: "+6m",
                changeMonth: true,
                changeYear: true,
                onSelect: function (date) {
                    ctrl.$setViewValue(date);
                    ctrl.$render();
                    scope.$apply();
                }
            });
        }
    };
});

app.filter('rlsformat', function () {
    return function (input) {
        if (input != null) {
            return input.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    }
});

app.filter('formatTimer', function () {
    return function (input) {
        function z(n) { return (n < 10 ? '0' : '') + n; }
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(seconds) + ' : ' + z(minutes));
    };
});

app.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                $(element).tooltip('show');
            }, function () {
                $(element).tooltip('hide');
            });
        }
    };
});

function checkMobile(mobileno) {
    var pattern = new RegExp(/^(((\+|00)98)|0)?9[01239]\d{8}$/);
    return pattern.test(mobileno);
};

function checkCodeMeli(code) {
    var L = code.length;
    if (L < 8 || parseInt(code, 10) == 0) return false;
    code = ('0000' + code).substr(L + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) == 0) return false;
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++)
        s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    return (s < 2 && c == s) || (s >= 2 && c == (11 - s));
    return true;
};