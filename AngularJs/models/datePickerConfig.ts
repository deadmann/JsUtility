/**
 * Created by Hassan on 12/6/2016.
 */
module AngularUtility{
    "use strict";

    export class DatePickerConfig{
        public minDate: Date|string|number;
        public maxDate: Date|string|number;
        public numberOfMonths: number;
        public dateFormat: string;
        public showButtonPanel: boolean;

        public onSelect:Function;
    }
}