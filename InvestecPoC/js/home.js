$(function () {
    var viewModel = {
        firstName: ko.observable("John"),
        
        userInput: ko.observable(""),

        displayValue: function() {
            if (this.userInput().length > 0) {
                window.alert("You entered: " + this.userInput());
            }
        },
        
        //attr
        url: ko.observable("htto://johnpapa.net")
    };
    ko.applyBindings(viewModel);
})
 