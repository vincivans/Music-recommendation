(function($,window){

    $('.menu .item')
    .tab()
    ;
    //Render album list 
    let art= $('#art-name');

    let requestConfig = 
    {
        method: "GET",
        url: 'https://api.spotify.com/v1/artists/' + 
        art.attr('data-id') + '/albums?album_type=album&market=ES'
    };

    // let allAlbumCover = ($('.album-cover')[0]);
    // console.log(allAlbumCover);
    
    
    
    $.ajax(requestConfig).then(function (res) {
                res.items.forEach(function(singleAlbum){
                    console.log(singleAlbum.images[1].url);
                    let template = `<div class="inverted item">
                    <div class="ui image small-cover">
                      <img class="album-cover  image" data-src="" src="${singleAlbum.images[1].url}" alt="">
                    </div>
                    <div class="content">
                      <a href="/album/${singleAlbum["id"]}" class=" grey inverted header">${singleAlbum["name"]}</a>
                      <div class="meta">
                        <span class="cinema">No description</span>
                      </div>
                      <div class="description">
                        <p></p>
                      </div>
                    </div>
                  </div>`
                    $('.template-wrapper').append(template);
                    
                });
    });



})(jQuery,Window);