const express = require('express');
const router = express.Router();
const data = require('../data');
const artistData = data.artists;
const request  =require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const passport = require('passport');

ensureAuthenticated = (req, res, next) => {
        if(req.isAuthenticated())
            return next();
        console.log("Not authenticate");
        res.redirect('/login');
}

// credentials are optional 
var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://www.example.com/callback'
});




router.get("/", (req, res) => {//limit the artistList.length = 10
    artistData.getSeveralArtists(30).then((artistList) => {
            res.render('artist/index', {// 'artist/index' is  /views/artist/index.ejs
                artists: artistList//details list below
            })
        })
});

/*
artists: an array of artists

to get a single artist     artists.forEach(function(art)){...}


Each artist, we can obtain the data as follow:

art:
    art["_id"],                           //we don't use this property
    art["external_urls"]["spotify"]
    art["followers"]["href"]              //we don't use this property
    art["genres"]     //the result is an array of genres, 
                        to get each genre use  art["genres"][0], art["genres"][1]...

    art["href"]                           //we don't use this property
    art["id"]         //this is the id we use for searching and displaying artist
    art["images"]     //the result is an array of images, 
                        to get each image use  art["images"][0]["url"], art["images"][1]["url"],art["images"][2]["url"]  

    art["names"]     //artist name
    art["populartity"]           //this is the property we use to recommend  unlogged user
    art["type"]                           //we don't use this property
    art["uri"]                            //we don't use this property


each artist example:

{ _id: 584a6410d393b1a63376f52d,
    external_urls: { spotify: 'https://open.spotify.com/artist/6L7a6wPGpvLtTwOsMLnF1z' },
    followers: { href: null, total: 30076 },
    genres: [ 'deep big room', 'deep hardstyle', 'hardstyle' ],
    href: 'https://api.spotify.com/v1/artists/6L7a6wPGpvLtTwOsMLnF1z',
    id: '6L7a6wPGpvLtTwOsMLnF1z',
    images: [ [Object], [Object], [Object] ],
    name: 'D-Block & S-Te-Fan',
    popularity: 49,
    type: 'artist',
    uri: 'spotify:artist:6L7a6wPGpvLtTwOsMLnF1z' } ]
*/



router.get("/:id", (req, res) =>{//need to login
    let url = 'https://api.spotify.com/v1/artists/'+req.params.id;
    let url2 = 'https://api.spotify.com/v1/artists/'+req.params.id+'/related-artists';
	request(url, function(error, response, body) {
            if(error) console.log(error);
            if (!error && response.statusCode == 200) {
            	//body is a string
                body = JSON.parse(body);
                res.render('artist/single', { art: body });//art details as above
            }
        })
});

module.exports = router;