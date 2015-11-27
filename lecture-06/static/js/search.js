$(function() {
    var host = window.location.hostname,
        port = window.location.port;

    $('#search').keyup(function(e) {
        var $resultTable = $('#result'),
            $spinner = $('.spinner'),
            $noHits = $('.no-hits'),
            forbiddenKeyCodes = [16, 17, 18, 91, 13, 93, 37, 38, 39, 40];

        if (forbiddenKeyCodes.indexOf(e.keyCode) == -1) {
            var query = $(this).val(),
                url = 'http://' + host + ':' + port + '/?q=' + query;

            if (query != '') {
                $resultTable.find('tbody').html('');
                $resultTable.hide();
                $noHits.hide();
                $spinner.show();

                // TODO: if there is a new request, abort any other requests

                $.get(url, function (result) {
                    if (result != '[]') {
                        var movies = $.parseJSON(result), list = '';
                        $resultTable.show();
                        $(movies).each(function(idx, movie) {
                            $resultTable.find('tbody').append(
                                $('<tr rel="popover" data-img-id="' + movie.id + '">').append(
                                    '<td>' + (idx + 1) + '</td>' +
                                    '<td>' + movie.title + '</td>' +
                                    '<td>' + movie.year + '</td>'
                                )
                            );
                        });
                        $('tr[rel="popover"]').popover({
                            html: true,
                            trigger: 'hover',
                            placement: 'right',
                            content: function() {
                                return '<img src="https://usercontent.googleapis.com/freebase/v1/image/' +
                                    $(this).data('img-id') +
                                    '?key=AIzaSyCQVC9yA72POMg2VjiQhSJQQP1nf3ToZTs&maxwidth=150" />';
                            }
                        });
                        $spinner.hide();
                        $noHits.hide();
                    } else {
                        $spinner.hide();
                        $resultTable.find('tbody').html('');
                        $resultTable.hide();
                        $noHits.show();
                    }
                });
            } else {
                $spinner.hide();
                $noHits.hide();
                $resultTable.find('tbody').html('');
                $resultTable.hide();
            }
        }
    });
});