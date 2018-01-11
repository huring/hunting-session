$(document).ready(function() {
    $(':file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
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