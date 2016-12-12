const express = require('express');
const router = express.Router();
const data = require("../data");
const trackData = data.tracks;
const request = require('request');
const passport = require('passport');


ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    console.log("Not authenticate");
    req.flash('error', 'You have to login first!');
    res.redirect('/login');
}

//INDEX ROUTE
router.get('/', ensureAuthenticated, (req, res) => {
    trackData.getTop10Tracks().then((trackList) => {
        let rAlbum = [];
        let rArtist = [];
        let topTrack = trackList;//note here may result in collision with the search's "traclist"
                                 //if any mistakes, rename the parameter
        return Promise.all([trackList, trackList.forEach((ele)=>{
                            rAlbum.push(ele.album);
                            rArtist.push(ele.artists)})]).then((value)=>{
        res.send({ tracks: topTrack, rollartist: rArtist, rollalbum: rAlbum});
                              /*tracks is an array of that contains 10 songs
                                rollArtist is generated through toptrack, is a two dimentional
                                array
                                ralbum is an array of albums
                              */
    }).catch((err)=>{
        console.log(err);
    })
  })
});




//SINGLE TRACK ROUTE
router.get("/:id", ensureAuthenticated, (req, res) => {
        let url = 'https://api.spotify.com/v1/tracks/'+req.params.id;

        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
        
                body = JSON.parse(body);
                res.render('./track/single', { track: body });
            }
        })
});



//Search Route
router.post('/search', ensureAuthenticated, function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    var keyWord = req.sanitize(req.body.keyword);
    //console.log(Song);
    let url = 'https://api.spotify.com/v1/search?q='+keyWord+'&type=track,artist,album&limit=2';
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                res.render('searchresult', { tracklist: body.tracks, //an array of tracks
                                             artistlist: body.artists,//a array of artist
                                             albumlist: body.albums });//a array of album
            }
        })
});



module.exports = router;






/*
tracks: an array of tracks

to get a single track     tracks.forEach(function(track)){...}


Each track, we can obtain the data as follow:

track:
    track["_id"],                           //we don't use this property
    track["album"]      //the result is an album object, 
                        to get details of the album:
                        use:
                            track["album"]["artists"]
                            track["album"]["available_markets"]   //we don't use this property     
                            track["album"]["external_url"]        //we don't use this property
                            track["album"]["href"]                //we don't use this property
                            track["album"]["id"]
                            track["album"]["images"]              //the result is an array of images, 
                                                                    to get each image use  track["album"]["images"][0]["url"], 
                                                                    track["album"]["images"][1]["url"],
                                                                    track["album"]["images"][2]["url"]         
                            track["album"]["name"]
                            track["album"]["type"]               //we don't use this property
                            track["album"]["uri"]                //we don't use this property

                                                        
    track["artists"]     //the result is an array of artists, 
                        to get each artist, use alb["artists"][0], alb["artist"][1]...
                        to get details of each artist, ie.details of the first artist:
                        use:    
                            track["artists"][0]["external_url"]        //we don't use this property
                            track["artists"][0]["href"]                //we don't use this property
                            track["artists"][0]["id"]                     
                            track["artists"][0]["name"]
                            track["artists"][0]["type"]               //we don't use this property
                            track["artists"][0]["uri"]                //we don't use this property


    track["available_markets"]              //we don't use this property
    track["disc_number"]                   //we don't use this property
    track["duration_ms"]                   //we don't use this property
    track["explicit"]                      //we don't use this property  
    track["external_urls"]["spotify"]     //we don't use this property
    track["external_ids"]["isrc"]         //we don't use this property
    track["href"]                         //we don't use this property
    track["id"]         //this is the id we use for searching and displaying track
    track["name"]
    track["popularity"]
    track["preview_url"]                   
    track["track_number"]                   //we don't use this property
    track["type"]                           //we don't use this property
    track["uri"]                            //we don't use this property

                    
each track example:


{ _id: 584a6411d393b1a63376f574,
  album: 
   { album_type: 'single',
     artists: [ [Object] ],
     available_markets: [ 'UY' ],
     external_urls: { spotify: 'https://open.spotify.com/album/5qBu7Ab6alstSCAzxTJMb1' },
     href: 'https://api.spotify.com/v1/albums/5qBu7Ab6alstSCAzxTJMb1',
     id: '5qBu7Ab6alstSCAzxTJMb1',
     images: [ [Object], [Object], [Object] ],
     name: 'Chill Bill',
     type: 'album',
     uri: 'spotify:album:5qBu7Ab6alstSCAzxTJMb1' },
  artists: 
   [ { external_urls: [Object],
       href: 'https://api.spotify.com/v1/artists/2hWs22BmQkK4czFtDLnar2',
       id: '2hWs22BmQkK4czFtDLnar2',
       name: 'Rob $tone',
       type: 'artist',
       uri: 'spotify:artist:2hWs22BmQkK4czFtDLnar2' },
     { external_urls: [Object],
       href: 'https://api.spotify.com/v1/artists/1rs3y69kDwkIdGJcOYngQt',
       id: '1rs3y69kDwkIdGJcOYngQt',
       name: 'J. Davi$',
       type: 'artist',
       uri: 'spotify:artist:1rs3y69kDwkIdGJcOYngQt' },
     { external_urls: [Object],
       href: 'https://api.spotify.com/v1/artists/3e2jFFSyQ3RQDSi1YI543i',
       id: '3e2jFFSyQ3RQDSi1YI543i',
       name: 'Spooks',
       type: 'artist',
       uri: 'spotify:artist:3e2jFFSyQ3RQDSi1YI543i' } ],
  available_markets: [ 'AD' ],
  disc_number: 1,
  duration_ms: 177184,
  explicit: true,
  external_ids: { isrc: 'USRC11601124' },
  external_urls: { spotify: 'https://open.spotify.com/track/5uDASfU19gDxSjW8cnCaBp' },
  href: 'https://api.spotify.com/v1/tracks/5uDASfU19gDxSjW8cnCaBp',
  id: '5uDASfU19gDxSjW8cnCaBp',
  name: 'Chill Bill',
  popularity: 88,
  preview_url: 'https://p.scdn.co/mp3-preview/aeb15a42574fb5888f02e6dbd3ee65a9848ed3c4?cid=null',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:5uDASfU19gDxSjW8cnCaBp' }

*/


