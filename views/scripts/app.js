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

$('#kills').on('keydown', function(evt) {

    console.log($('#animalType').css('display', 'block'));

    if ($(this).val().length >= 1)
        $('#killTypesContainer').show();
});