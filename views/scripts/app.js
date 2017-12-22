$(document).ready(function() {
    console.log('hello world');
});

$('.stat-card').on('click', function(evt) {

    $.getJSON('/ajax_test', function(data) {
        console.log(data);
    });

});