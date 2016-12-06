"use strict"
const mongoCollections = require("../config/mongoCollections");
const uuid = require("node-uuid")
const music = mongoCollections.music;
let exportMethods = {

    addMusic(track, album, artist, lyric, genre) {
        return music().then((musicCollection) => {
            let newMusic = {
                _id: uuid.v4(),
                track: track,
                album: album,
                artist: artist,
                lyric: lyric,
                link: "https://www.youtube.com/results?search_query=" + track,
                genre: genre,
                numOfSongHasDisplay: 0
            };
            return musicCollection.insertOne(newMusic).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getMusicById(newId);
            }).catch(err => {
                console.log(err);
            })
        });

    },
    getMusicById(musicId) {
        if (!musicId)
            return Promise.reject("Please provide a valid musicId.");
        return music().then((musicCollection) => {
            return musicCollection.findOne({ _id: musicId }).then((music) => {
                if (!music) Promise.reject("music not found");
                return music;
            }).catch((err) => {
                console.log(err);
            });
        });
    },
    getMusicByName(musicName) {
        if (!musicName)
            return Promise.reject("Please provide a valid music name.");
        return music().then((musicCollection) => {
            return musicCollection.findOne({ track: musicName }).then((music) => {
                if (!music) Promise.reject("music not found");
                return music;
            }).catch((err) => {
                console.log(err);
            });
        })
    },
    updateDisplay(musicId) {
        return music().then((musicCollection) => {
            return musicCollection.findOne({ _id: musicId }).then((music) => {
                let num = music.numOfSongHasDisplay + 1;
                return musicCollection.updateOne({ _id: id },
                    {
                        $set:
                        {
                            numOfSongHasDisplay: num
                        }
                    })
                    .then(() => {
                        return this.getMusicById(id);
                    }).catch((err) => {
                        console.log(err);
                    });

            });

        });
    },
    getMusicDisplayInfo(musicId){
        if (!musicId)
            return Promise.reject("Please provide a valid musicId.");
        return music().then((musicCollection) => {
            return musicCollection.findOne({ _id: musicId }).then((music) => {
                if (!music) Promise.reject("music not found");
                return music.numOfSongHasDisplay;
            }).catch((err) => {
                console.log(err);
            });
        });
    },
    getAllMusic() {
        return music().then((musicCollection) => {
            return musicCollection.find({}).toArray();
        })

    },
    getMusicByArtist(artist) {
        if (!artist)
            return Promise.reject("Please provide a valid artist.");
        return music().then((musicCollection) => {
            return this.getAllMusic();
        }).
            then((allMusic) => {

                var Music = [];
                for (var i = 0; i < allMusic.length; i++)
                {
                    if (allMusic[i].artist === artist)
                        Music.push(allMusic[i]);
                }
                return Music;
            }).catch(err => {
                console.log(err);
            })
    },
    getMusicByAlbum(album) {
        if (!album)
            return Promise.reject("Please provide a valid album.");
        return music().then((musicCollection) => {
            return this.getAllMusic();
        }).
            then((allMusic) => {

                var Music = [];
                for (var i = 0; i < allMusic.length; i++) {
                    if (allMusic[i].album === album)
                        Music.push(allMusic[i]);
                }
                return Music;
            }).catch(err => {
                console.log(err);
            })
    },
    getMusicByGenre(genre) {
        if (!genre)
            return Promise.reject("Please provide a valid genre.");
        return music().then((musicCollection) => {
            return this.getAllMusic();
        }).
            then((allMusic) => {

                var Music = [];
                for (var i = 0; i < allMusic.length; i++) {
                    if (allMusic[i].genre === genre)
                        Music.push(allMusic[i]);
                }
                return Music;
            }).catch(err => {
                console.log(err);
            })
    }
}
module.exports = exportMethods;