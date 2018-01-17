$(document).ready(function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
    });


    $('.typeahead').typeahead(["item1","item2","item3"]);
});

// Get all sesssions
$('.stat-card').on('click', function(evt) {

    var type = $(evt.currentTarget).attr('data-type');

    $.getJSON('/ajax_test?' + type + '=true&timestamp=true', function(data) {
       console.log(data);
    });
});

$(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
});

$("#location").on('keyup', function() {
    console.log("Location is pressed")
    var input = $(this);
    var $typeahead = $(".typeahead");

    // console.log('/sessions/json?s=' + input.val());

    var current = $typeahead.typeahead("getActive");
    console.log(current);

    if (input.val().length >= 2) {
        $.getJSON('/sessions/json?s=' + input.val(), (result) => {
            console.log(result);
            $("#location").typeahead({ source:result });
        });
    } 
});


$('#addShot').on('click', function() {
    console.log("Add shot…")

    var shot = $(".shot-input").map(function() {
        return this.value
    }).get();

    $('<input />')
        .attr('type', 'text')
        .attr('name', 'shot_1')
        .addClass('shots-fired')
        .attr('value', shot)
        .appendTo($("#addSessionForm"));

    $('#shotsFiredModal').modal('hide');
});