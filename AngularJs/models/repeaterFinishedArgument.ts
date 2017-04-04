/**
 * Created by Hassan on 1/1/2017.
 */
var RepeaterFinishedArguments = (function () {
    function RepeatFinishedArguments(commandName, modelObject, element, attrs) {
        this.CommandName = commandName;
        this.ModelObject = modelObject;
        this.LastElement = element;
        this.Attributes = attrs;
    }
    return RepeatFinishedArguments;
})();