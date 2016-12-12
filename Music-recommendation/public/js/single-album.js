(function ($) {


    

    $('.playlist').css('height',($(window).height() * 0.8 - 47));


    $(window).on('resize',function(){
        console.log(1);
        let a = $(window).height() * 0.8 - 47;
        $('.playlist').css('height',a);
    });


    let degree = 0;
    let rotateTimer = setInterval(function () {

        degree += 1;
        let rotate = 'rotate(' + degree + 'deg)';
        if (degree == 360) {
            degree = 0;
        }
        $('#signle-album-rota').css('transform', rotate);
    }, 32);

    $('.track-name').each(function () {
       
        $(this).on('click', function (e) {
            // get
            e.preventDefault();
            let getRequestConfig = {
                method: "GET",
                url: "/track/" + this.dataset.id
            };
            
            let This = this;

            $.ajax(getRequestConfig).then(function (res) {
                let player = $(res);
                $(This).closest('.item').append(player);

            });


            //post
            let lId = $(this).attr('data-id');
            let pRequestConfig = {
                method: "POST",
                url: "/album/listened",
                data: JSON.stringify({id: lId})
            };

            $.ajax(pRequestConfig).then(function(message){
                if(message.error){
                    $(this).removeClass('red');
                    alert(message.error);
                }
            })


            $('.item audio').remove();
            $(This).closest('audio').attr('class', 'right floated');
            e.preventDefault();
            return false;
        });
    });

    var like = $('.heart');
        like.each(function () {

            $(this).on('click', function (e) {
                e.preventDefault();
                if($(this).hasClass('red'))
                    $(this).removeClass('red');
                else
                    $(this).addClass('red');

            let Id = $(this).attr('data-id');
            

            let postRequestConfig = {
                method: "POST",
                url: "/album/like",
                data: JSON.stringify({id: Id})
            };

            $.ajax(postRequestConfig).then(function(message){
                if(message.error){
                    $(this).removeClass('red');
                    alert(message.error);
                }
            })
        });
    })

    
})(jQuery);

(function(doc){var addEvent='addEventListener',type='gesturestart',qsa='querySelectorAll',scales=[1,1],meta=qsa in doc?doc[qsa]('meta[name=viewport]'):[];function fix(){meta.content='width=device-width,minimum-scale='+scales[0]+',maximum-scale='+scales[1];doc.removeEventListener(type,fix,true);}if((meta=meta[meta.length-1])&&addEvent in doc){fix();scales=[.25,1.6];doc[addEvent](type,fix,true);}}(document));