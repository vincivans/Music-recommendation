const express = require('express');
const router = express.Router();
const data = require("../data");
const trackData = data.tracks;
const request = require('request');


router.get('/', (req, res) => {
    trackData.getTop10Tracks().then((trackList) => {
        let rAlbum = [];
        let rArtist = [];
        let topTrack = trackList;//note here may result in collision with the search's "traclist"
                                 //if any mistakes, rename the parameter
        return Promise.all([trackList, trackList.forEach((ele)=>{
                            rAlbum.push(ele.album);
                            rArtist.push(ele.artists)})]).then((value)=>{
        res.render('index', { tracks: topTrack, rollartist: rArtist, rollalbum: rAlbum});
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

module.exports = router;