const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
const tracks = require("../data/tracks");
const artists = require("../data/artists"); 
const albums = require("../data/albums"); 
const request = require('request');
let i = 0;

console.log("\n\n\n\n\n\n--- in seed.js prepare for db ---")

dbConnection().then(db => {
        return db.dropDatabase().then(() => {
            return dbConnection;
        })
    })
    .then((db) => {
        let v1 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=em&type=artist&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {                 
                    body = JSON.parse(body);
                    resolve(artists.addAllArtist(body.artists.items));
                    
                }
            })
        });
        let v2 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=j&type=artist&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(artists.addAllArtist(body.artists.items));
                    
                }
            })
        });
        let v3 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=girl&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v4 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=it&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v5 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=s&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v6 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=love&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v7 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=r&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v8 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=l&type=album&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v9 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=j&type=track&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);
                    resolve(tracks.addAllTracks(body.tracks.items));
                    
                }
            });

        });
        let v10 = new Promise((resolve, reject) => {
            request('https://api.spotify.com/v1/search?q=s&type=track&limit=50&offset=0', function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body);

                    resolve(tracks.addAllTracks(body.tracks.items));
                    
                }
            });

        });
        return Promise.all([v1, v2, v3, v4, v5, v6, v7, v8, v9, v10]);

    }).then((res) => {
  
        albums.getAllAlbums().then((Items) => {
            let a = [];
            for (let i = 0; i < Items.length; i++) {
                a[i] = new Promise((resolve, reject) => {
                    request(`https://api.spotify.com/v1/albums/${Items[i].id}`, function(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            body = JSON.parse(body);
                            resolve(albums.addTracksToAlbum(Items[i].id, body.tracks));
                
                        }
                    })

                })
                


            }
            return Promise.all(a);

        }).then(()=>{
            console.log("done");
        })
    })


console.log("First user created")
   user.addUser("aaa", "123").then((newUser) => {
        id = newUser._id;
        console.log(newUser);
    }).catch(err => {
        console.log("error occurs" + err);
    });












