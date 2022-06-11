$(document).ready(function() {
    console.log("Page Loaded");

    $("#filter").click(function() {
        // alert("button clicked!");
        makePredictions();
    });
});

// call Flask API endpoint
function makePredictions() {
    var city = $("#city").val();
    var county = $("#county").val();
    var hoa = $("#hoa").val();
    var squarefeet = $("#squarefeet").val();
    var beds = $("#beds").val();
    var baths = $("#baths").val();
    // var embarked = $("#embarked").val();

    // check if inputs are valid

    // create the payload
    var payload = {
        "city": city,
        "county": county,
        "hoa": hoa,
        "squarefeet": squarefeet,
        "beds": beds,
        "baths": baths
    }

    // Perform a POST request to the query URL
    $.ajax({
        type: "POST",
        url: "/makePredictions",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({ "data": payload }),
        success: function(returnedData) {
            // print it
            console.log(returnedData)
            // $("#output").text(`$${returnedData.prediction}`)
            $("#output").text(`$${Math.round(returnedData.prediction)}`)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        }
    });

}

