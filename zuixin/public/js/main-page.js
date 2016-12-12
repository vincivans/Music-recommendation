(function ($) {
   
    $('#main-banner').css({'min-height':$(window).height()});
    $('.topten').css({'max-height':$(window).height()-208});
    $(window).resize(function(){
        console.log(1);
        $('#main-banner').css({'min-height':$(window).height()});
        $('.topten').css({'max-height':$(window).height()-208});
    })


  
    console.log($('.shape'));

    let flipTimer = setInterval(flip,3000);

    function flip(){
        $('.shape').shape('flip right');
    }

    $('.ui .image').on('mouseenter', function () {
      
        $('.ui.dimmer')
            .dimmer({
                on: 'hover'
            });
    });
    
   

    $('.ui.search')
        .search({
            type          : 'category',
            minCharacters : 3,
            apiSettings   : {
            onResponse: function(SpotifyResponse) {
                var
                response = {
                    results : {}
                }
                ;
                // translate GitHub API response to work with search
                $.each(SpotifyResponse, function(index, item) {
                var
                    type   = item.items[0]["type"] || item.items[0]["type"]  || item.items[0]["album_type"] || 'Unknown',
                    maxResults = 8
                ;
                if(index >= maxResults) {
                    return false;
                }
                // create new language category
                if(response.results[type] === undefined) {
                    response.results[type] = {
                    name    : type,
                    results : []
                    };
                }
                // add result to category
                response.results[type].results.push({
                    title       : item.items[0]["name"],
                    description : 'no description',
                    url         : type+ '/' + item.items[0]["id"]
                });
                });
                return response;
            },
            url: 'https://api.spotify.com/v1/search?q={query}&type=track,artist,album&limit=2'
            }
        })
        ;
  
})(jQuery);