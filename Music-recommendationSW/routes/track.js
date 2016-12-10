const express = require('express');
const router = express.Router();
const data = require("../data");
const trackData = data.tracks;
const request = require('request');
//This is a file used to be the "/songs" route


// credentials are optional 





/*
 * RESTFUL ROUTE PARTTERN
 * 7 ROUTES:
 *  INDEX
 *  NEW
 *  CREATE
 *  SHOW
 *  UPDATE
 *  DESTROY
 */

//INDEX ROUTE     //get the top 10 music, rolling album, 
router.get('/', (req, res) => {
    trackData.getTop10Tracks().then((trackList) => {
        let rollAlbum = [];
        let rollArtist = [];
        let topTrack = trackList;

        return Promise.all([trackList, trackList.forEach((ele)=>{
                            rollAlbum.push(ele.album);
                            rollArtist.push(ele.artists)})]).then((value)=>{
        res.render('index', { tracks: topTrack, rartist: rollArtist, ralbum: rollAlbum});
    }).catch((err)=>{
        console.log(err);
    })
  })
});



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








//SHOW ROUTE     
router.get("/:id", (req, res) => {
        //direct get the track information from the Internet
        url = 'https://api.spotify.com/v1/tracks/' + req.params.id;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
        
                body = JSON.parse(body);
                res.render('show', { track: body });
            }
        })
});






/////////////////
//search route
router.post('/search',function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    var keyWord = req.sanitize(req.body.keyword);
    //console.log(Song);
    let url = 'https://api.spotify.com/v1/search?q='+keyWord+'&type=track,artist,album&limit=1';
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                body = JSON.parse(body);
                res.render('searchresult', { tracklist: body.tracks, //an array of tracks
                                             artistlist: body.artists,//a array of artist
                                             albumlist: body.albums });//a array of album
            }
        })
});








//Binglin Xie ALL TRACK ROUTE      use: http://localhost:3000/track/songs
router.get('/songs', (req, res) => {//limit the trackList.length = 10
  console.log('whe');
    trackData.getSeveralTracks(10).then((trackList) => {
        res.render('track/index', { tracks: trackList })
    }).catch((err)=>{
        console.log(err);
    })
});




//Binglin Xie SINGLE TRACK ROUTE   use: http://localhost:3000/track/songs/:id
router.get("/songs/:id", (req, res) => {
        //direct get the track information from the Internet
        let url = 'https://api.spotify.com/v1/tracks/'+ req.params.id;
        request(url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
        
                body = JSON.parse(body);
                res.render('track/single', { track: body });
            }
        })
});


module.exports = router;


/*
 * RESTFUL ROUTE PARTTERN
 * 7 ROUTES:
 *  INDEX
 *  NEW
 *  CREATE
 *  SHOW
 *  UPDATE
 *  DESTROY
 */
 /*
//INDEX ROUTE
router.get('/', function(req,res){
    Song.find({},function(err,songs){
        if(err){
            console.log(err);
        }else{
            //console.log(songs);
            res.render('index',{songs: songs});
        }
    })
})

//NEW ROUTE
router.get('/new', function(req,res){
    res.render('new');
})


//CREATE ROUTE
router.post('/',function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    console.log(req.body);
    req.body.song.comment = req.sanitize(req.body.song.comment);
    console.log("==============");
    console.log(req.body);
    Song.create(req.body.song, function(err, newSog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/");
        }
    })
})


/////////////////
//search route
router.post('/search',function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    console.log(req.body);
    var keyWord = req.sanitize(req.body.keyword);
    //console.log(Song);
    Song.find([{name: {$regex: keyWord, $options: "i"}},
               {artists: {$regex: keyWord,$options: "i"}},
               {album: {$regex: keyWord ,$options: "i"}}
             ]).exec().then((docs)=>{
            if(!docs) console.log("No match result");
            console.log(docs);
            res.render("show", {music: docs[0]});
    }).catch((err)=>{
        console.log(err);
    });
});










//SHOW ROUTE
router.get('/:id',function(req,res){
    Song.findById(req.params.id, function(err, foundSong){
        if(err){
            res.redirect('/');
        }else{
            res.render("show",{song: foundSong});
        }
    })
});

//EDIT ROUTE
router.get('/:id/edit',function(req,res){
    Song.findById(req.params.id, function(err,foundSong){
        if(err){
            res.redirect('/');
        }else{
            res.render("edit",{song: foundSong});
        }
    })
});

//UPDATE ROUTE
router.put('/:id',function(req,res){
    req.body.song.comment = req.sanitize(req.body.song.comment);
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong){
        if(err){
            res.redirect("/");
        }else{
            console.log(req.params.id);
            res.redirect("/" + req.params.id);
        }
    })
});


//DESTROY ROUTE
router.delete('/:id', function(req,res){
    //destory and redirect
    Song.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else{
            res.redirect("/");
        }
    })
})

*/
module.exports = router;