(function ($) {
    $('.ui.dropdown').on('mouseenter', function () {
        $('.ui.dropdown')
            .dropdown({
                on: 'hover'
            });
    });

    $('.ui .image').on('mouseenter', function () {
        $('.ui.dimmer')
            .dimmer({
                on: 'hover'
            });
    })
})(jQuery);