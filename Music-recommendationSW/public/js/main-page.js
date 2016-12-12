(function ($) {
   
    $('#main-banner').css({'min-height':$(window).height()});
    $('.topten').css({'max-height':$(window).height()-160});
    $(window).resize(function(){
        console.log(1);
        $('#main-banner').css({'min-height':$(window).height()});
        $('.topten').css({'max-height':$(window).height()-160});
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
        apiSettings: {
        url: 'https://api.spotify.com/v1/search?q={query}&type=track,artist,album&limit=2'
        },
        fields: {
        results : 'items',
        title   : 'name',
        url     : 'html_url'
        },
        minCharacters : 3
    })
    ;

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
                $.each(SpotifyResponse.albums, function(index, item) {
                var
                    language   = item.language || 'Unknown',
                    maxResults = 8
                ;
                if(index >= maxResults) {
                    return false;
                }
                // create new language category
                if(response.results[language] === undefined) {
                    response.results[language] = {
                    name    : language,
                    results : []
                    };
                }
                // add result to category
                response.results[language].results.push({
                    title       : item.name,
                    description : item.description,
                    url         : item.html_url
                });
                });
                return response;
            },
            url: 'https://api.spotify.com/v1/search?q={query}&type=track,artist,album&limit=2'
            }
        })
        ;
  
})(jQuery);