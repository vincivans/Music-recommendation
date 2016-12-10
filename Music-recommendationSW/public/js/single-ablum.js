(function ($) {
    let degree = 0;
    let rotateTimer = setInterval(function () {

        degree += 1;
        let rotate = 'rotate(' + degree + 'deg)';
        if (degree == 360) {
            degree = 0;
        }
        $('#signle-album-rota').css('transform', rotate);
    }, 32);

    $('.play').each(function () {
        $(this).on('click', function (e) {
            console.log(this.dataset.id);
            let requestConfig = {
                method: "GET",
                url: "/track/songs/" + this.dataset.id
            };
            let This = this;
            $.ajax(requestConfig).then(function (res) {
                console.log(res);
                let player = $(res);
                console.log($(this));
                $(This).closest('.item').append(player);

            });

            $('.item audio').remove();
            $(This).closest('audio').attr('class', 'right floated');
            e.preventDefault();
            return false;
        })
    });
})(jQuery);