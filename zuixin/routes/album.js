const express = require('express');
const router = express.Router();
const data = require('../data');
const albumData = data.albums;
const request = require('request');
const userData = data.users;
const trackData= data.tracks;
const passport = require('passport');


ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    console.log("Not authenticate");
    req.flash('error', 'You have to login first!');
    res.redirect('/login');
}



router.get("/", (req, res) => {   //limit albumList.length = 30
    albumData.getSeveralAlbums(100).then((albumList) => {
            res.render('album/allalbum', { //album/allalbum   under /views/album/allalbum
                albums: albumList    //details list below
            });
        });
});



router.get("/:id", ensureAuthenticated, (req, res) => {//id is the spotify api id 
    let url = 'https://api.spotify.com/v1/albums/'+ req.params.id;
        request(url, function(error, response, body) {

            if (!error && response.statusCode == 200) {
                
                let album = JSON.parse(body);
                if(album.tracks.items.length){
                      album.tracks.items.forEach((ele)=>{
                          let tInsert = ele;
                            trackData.getTrackById(ele.id).then((trackTryInsert)=>{
                              if(!trackTryInsert)
                                    trackData.addTrack(ele);
                            })
                      })
                }  

                res.render('album/singlealbum', { album: album, favoriteSong: req.user.favoriteSong});
            }
        })
});


router.post("/like", ensureAuthenticated, (req, res)=>{
      let curUser = req.user.username;
      let likeTrack = JSON.parse(Object.keys(req.body)[0]);

      userData.updateFavorite(curUser, likeTrack.id).then((userUpdate)=>{
              ;
      }).catch((error)=>{
        console.log(error);
      })
        
});

router.post("/listened", ensureAuthenticated, (req, res)=>{
      let curUser = req.user.username;
      let listenTrack = JSON.parse(Object.keys(req.body)[0]);

      userData.updateListenHistory(curUser, listenTrack.id).then((userUpdate)=>{
              ;
      }).catch((error)=>{
        console.log(error);
      })
        
});


module.exports = router;



/*
albums: an array of albums

to get a single album     albums.forEach(function(alb)){...}


Each album, we can obtain the data as follow:

alb:
    alb["_id"],                           //we don't use this property
    alb["album_type"]                     //we don't use this property
    alb["artists"]     //the result is an array of artists, 
                        to get each artist, use alb["artists"][0], alb["artist"][1]...
                        to get details of each artist, ie.details of the first artist:
                        use:    
                            alb["artists"][0]["external_url"]        //we don't use this property
                            alb["artists"][0]["href"]                //we don't use this property
                            alb["artists"][0]["id"]                     
                            alb["artists"][0]["name"]
                            alb["artists"][0]["type"]               //we don't use this property
                            alb["artists"][0]["uri"]                //we don't use this property


    alb["available_markets"]              //we don't use this property
    alb["external_urls"]["spotify"]       //we don't use this property
    alb["href"]                           //we don't use this property
    alb["id"]         //this is the id we use for searching and displaying albums
    alb["images"]     //the result is an array of images, 
                        to get each image use  alb["images"][0]["url"], alb["images"][1]["url"],alb["images"][2]["url"]  

    alb["name"]       //album name
    alb["type"]                           //we don't use this property
    alb["uri"]                            //we don't use this property
    alb["tracks"]       //the result is an track object, 
                        to get details of each track:
                        use:    
                            alb["tracks"]["href"]                   //we don't use this property
                            alb["tracks"]["items"]    //the result is an array of tracks, 
                                                        to get each track(song), use alb["artists"][0], alb["artist"][1]...
                                                        to get details of each artist, ie.details of the first artist:
                                                        use:
                                                            alb["tracks"]["items"]["artists"]
                                                            alb["tracks"]["items"]["available_markets"]   //we don't use this property 
                                                            alb["tracks"]["items"]["disc_number"]         //we don't use this property
                                                            alb["tracks"]["items"]["duration_ms"]         //we don't use this property 
                                                            alb["tracks"]["items"]["explicit"]            //we don't use this property     
                                                            alb["tracks"]["items"]["external_url"]        //we don't use this property
                                                            alb["tracks"]["items"]["href"]                //we don't use this property
                                                            alb["tracks"]["items"]["id"]                     
                                                            alb["tracks"]["items"]["name"]
                                                            alb["tracks"]["items"]["preview_url"]         //we don't use this property
                                                            alb["tracks"]["items"]["track_number"]        //we don't use this property  
                                                            alb["tracks"]["items"]["type"]               //we don't use this property
                                                            alb["tracks"]["items"]["uri"]                //we don't use this property



                            alb["tracks"]["limit"]                  //we don't use this property                     
                            alb["tracks"]["next"]                   //we don't use this property
                            alb["tracks"]["offset"]                 //we don't use this property
                            alb["tracks"]["previous"]               //we don't use this property
                            alb["tracks"]["total"]                  //we don't use this property


                    
each album example:


{ _id: 584a6410d393b1a63376f4f2,
  album_type: 'album',
  artists: 
   [ { external_urls: [Object],
       href: 'https://api.spotify.com/v1/artists/5pKCCKE2ajJHZ9KAiaK11H',
       id: '5pKCCKE2ajJHZ9KAiaK11H',
       name: 'Rihanna',
       type: 'artist',
       uri: 'spotify:artist:5pKCCKE2ajJHZ9KAiaK11H' } ],
  available_markets: [ 'CA', 'US' ],
  external_urls: { spotify: 'https://open.spotify.com/album/3JSWZWeTHF4HDGt5Eozdy7' },
  href: 'https://api.spotify.com/v1/albums/3JSWZWeTHF4HDGt5Eozdy7',
  id: '3JSWZWeTHF4HDGt5Eozdy7',
  images: 
   [ { height: 640,
       url: 'https://i.scdn.co/image/0bd0f3a2fdf032314a1a5745fae4c902bf72aa66',
       width: 640 },
     { height: 300,
       url: 'https://i.scdn.co/image/c17b325724979ec2d24c48dbed16f4688a0fd72b',
       width: 300 },
     { height: 64,
       url: 'https://i.scdn.co/image/21739e50a36b3973931bb18c21233d635771d087',
       width: 64 } ],
  name: 'Good Girl Gone Bad: Reloaded',
  type: 'album',
  uri: 'spotify:album:3JSWZWeTHF4HDGt5Eozdy7',
  tracks: 
   { href: 'https://api.spotify.com/v1/albums/3JSWZWeTHF4HDGt5Eozdy7/tracks?offset=0&limit=50',
     items: 
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ],
     limit: 50,
     next: null,
     offset: 0,
     previous: null,
     total: 15 } }

*/

