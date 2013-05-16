var my = my || {};

$(document).ready(function () {



    function food() {
        this.food_id = ko.observable();
        this.food_name = ko.observable();
        this.food_type = ko.observable();
        this.food_url = ko.observable();
        this.food_description = ko.observable();
    }

    my.viewModel = function () {

        var foodSearchResults = ko.observableArray([]);
        var maxResult = ko.observable(0);
        var totalResults = ko.observable(0);
        var pageNumber = ko.observable(0);
        var searchForRecipe = function () {
            foodSearchResults.removeAll();
            $('#searchResultDetails').addClass('hidden');
            $("#resultList").addClass("hidden");
            $('#loading-indicator').removeClass('hidden');
            $.ajax({
                type: "GET",
                url: "http://recipesearch.azurewebsites.net/api/Recipe?searchString=" + $("#searchBar").val(),
                dataType: 'json',
                success: function (jsonString) {
                    var json = $.parseJSON(jsonString)
                    maxResult(json.foods.max_results);
                    totalResults(json.foods.total_results);
                    pageNumber(json.foods.page_number);
                    
                    $.each(json.foods.food, function (y, recipe) {
                        foodSearchResults.push(new food()
                            .food_id(recipe.food_id)
                            .food_name(recipe.food_name)
                            .food_type(recipe.food_type)
                            .food_url(recipe.food_url)
                            .food_description(recipe.food_description));
                    });
                    $('#loading-indicator').addClass('hidden');
                    $("#resultList").removeClass("hidden");
                    $("#searchResultDetails").removeClass("hidden");
                },
                failure: function (error) {
                    alert(error);
                }
            });
            //    return false;
        };
        return {
            foodSearchResults: foodSearchResults,
            searchForRecipe: searchForRecipe,
            maxResult: maxResult,
            totalResults: totalResults,
            pageNumber: pageNumber,
        };
    }();

    //Applies KO bindings        
    ko.applyBindings(my.viewModel);


    $(document).keypress(function (e) {
        if (e.which == 13) {
            my.viewModel.searchForRecipe();
            return false;
        }
    });
});
