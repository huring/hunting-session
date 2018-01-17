$(document).ready(function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
    });


    $('#location').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: "items",
        source:["item1", "item2", "item3", "item4"] 
    });
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

    // Ugly (but working...) autocomplete
    if (input.val().length >= 2) {
        $.getJSON('/sessions/json?s=' + input.val(), (result) => {
            console.log(input.val().length);
            $("#existingLocations").html("");
            if((result.length == 0)) {
                
                $("#existingLocations").html("");
                
            } else {
                result.forEach((element) => {
                    $("<p/>")
                        .text(element.location)
                        .on('click', (elm) => {
                            var text = elm.currentTarget.innerText;
                            $("#location").val(text);
                            $("#existingLocations").html("");
                        })
                        .appendTo("#existingLocations");
                }, this);
            }
        });
    } else {
        $("#existingLocations").html("");
    }
});


$('#addShot').on('click', function() {

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