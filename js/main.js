var App = (
    function () {

        var timeoutSearch = null;
        var timeoutToSearch = 500;
        var searchUrl = "data/data.json";
        var submitUrl = "#";

        function initial() {
            fixKeyboardMobile();
            $('#search_query').focus();
            $('#search_query').trigger('focus');
            
            $('#search_query').on('keyup', function (e) {
                if (timeoutSearch && e.which != 13)
                    clearTimeout(timeoutSearch);

                var searchText = $(this).val();
                if (searchText.trim().length <= 0)
                    return;

                if (e.which == 13) {
                    search(searchText);
                    return;
                }

                timeoutSearch = setTimeout(function () {
                    search(searchText);
                }, timeoutToSearch);
            });

            $('#enquiry_form').on('submit', function () {
                var name = $('#name').val();
                var city = $('#city').val();
                var state = $('#state').val();
                if (name.length == 0 || city.length == 0 || state.length == 0)
                    return false;

                var param = $(this).serialize();
                console.log(submitUrl + '?' + param);

                $.ajax({
                    type: 'GET',
                    url: submitUrl + '?' + param,
                    success: function (data) {
                        hideNotFound(function () {
                            showSubmit();
                        });
                    },
                    error: function () { }
                });

                return false;
            });

            setTopForSearchContainer();

            var timeout = null;
            $(window).on('resize', function () {
                if (timeout)
                    clearTimeout(timeout);

                timeout = setTimeout(function () {
                    clearTimeout(timeout);
                    setTopForSearchContainer();
                }, 200);
            });
        }

        function fixKeyboardMobile() {
            if (Modernizr.touch) {
                $('#search_query').on('focus', function () {
                    $('#topContainer').addClass('keyboard-show');
                    $('body').scrollTop(0);
                }).on('blur', function () {
                    $('#topContainer').removeClass('keyboard-show');
                });
            }
        }

        function setTopForSearchContainer() {
            var height = $('#topContainer').height();

            $('#searchResultContainer').css('padding-top', height + 10 + 'px');
        }

        function search(searchText) {
            $.ajax({
                type: 'GET',
                url: searchUrl + "?q=" + searchText,
                datatype: 'json',
                async: true,
                success: function (data) {
                    //if ($('#search_not_found_submit').css('display') == 'block') {
                    //    hideSubmit(function () {
                    //        showNotFound();
                    //    });
                    //}
                    //else {
                    //    showNotFound();
                    //}
                    //return;

                    if (data && data.length > 0) {
                        generateResult(data);
                    }
                    else {
                        $('#search_result').html('');
                        if ($('#search_not_found_submit').css('display') == 'block') {
                            hideSubmit(function () {
                                showNotFound();
                            });
                        }
                        else {
                            showNotFound();
                        }
                    }
                },
                error: function () {
                }
            });
        }

        function generateResult(data) {
            if ($('#search_not_found').css('display') == 'block') {
                hideNotFound(function () {
                    generateResultData(data);
                });
            }
            else if ($('#search_not_found_submit').css('display') == 'block') {
                hideSubmit(function () {
                    generateResultData(data);
                });
            }
            else {
                generateResultData(data);
            }
        }

        function generateResultData(data) {
            $('#search_result').html('');
            var html = "";
            for (var i = 0; i < data.length; i++) {
                html += '<a href="' + data[i].URL + '" class="search-result-item" title="">' +
                            '<div class="result-item-icon"><img src="./img/' + data[i].Icon + '" alt=""/></div>' +
                            '<div class="result-item-text">' +
                                data[i].Name + ', ' + data[i].Town + ', ' + data[i]['State Abbrev'] + ' ' + data[i].Zip +
                            '</div>' +
                        '</a>';
            }

            $('#search_result').html(html);
            animateResult(0, data.length);
        }

        function animateResult(index, length) {
            var props = 'transition.slideUpBigIn';
            var opts = {
                duration: 300,
                easing: 'ease-in-out',
                complete: function () {
                }
            };
            for (var i = index; i < length; i++) {
                opts.delay = i * 100;
                $('.search-result-item').eq(i).velocity(props, opts);
            }
        }

        function showNotFound() {
            var props = 'transition.slideUpBigIn';
            var opts = {
                duration: 300,
                easing: 'ease-in-out'
            };
            $('#search_not_found').velocity(props, opts);
        }

        function hideNotFound(callback) {
            var props = 'transition.slideUpBigOut';
            var opts = {
                duration: 300,
                easing: 'ease-in-out',
                complete: function () {
                    if (callback)
                        callback();
                }
            };
            $('#search_not_found').velocity(props, opts);
        }

        function showSubmit() {
            var props = 'transition.slideUpBigIn';
            var opts = {
                duration: 300,
                easing: 'ease-in-out'
            };
            $('#search_not_found_submit').velocity(props, opts);
        }

        function hideSubmit(callback) {
            var props = 'transition.slideUpBigOut';
            var opts = {
                duration: 300,
                easing: 'ease-in-out',
                complete: function () {
                    if (callback)
                        callback();
                }
            };
            $('#search_not_found_submit').velocity(props, opts);
        }

        return {
            start: initial
        };
    }
)();





$(document).ready(function () {
    App.start();
});