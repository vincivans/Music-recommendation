const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
const tracks = require("../data/tracks");
const artists = require("../data/artists"); 
const albums = require("../data/albums"); 
const request = require('request');
let i = 0;

console.log("\n\n\n\n\n\n--- in seed.js prepare for db ---")

/*
console.log("First user created")
   user.addUser("aaa", "123").then((newUser) => {
        id = newUser._id;
        console.log(newUser);
    }).catch(err => {
        console.log("error occurs" + err);
    });
*/

dbConnection().then(db => {
        return db.dropDatabase().then(() => {
            return dbConnection;
        })
    })
    .then((db) => {
        let v1 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=s&type=artist&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body); // Show the HTML for the Google homepage.

                    resolve(artists.addAllArtist(body.artists.items));
                    
                }
            })
        });
        let v2 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=j&type=artist&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    //console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body); // Show the HTML for the Google homepage.

                    resolve(artists.addAllArtist(body.artists.items));
                    
                }
            })
        });
        let v3 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=girl&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v4 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=it&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v5 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=s&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v6 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=love&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v7 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=r&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v8 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=l&type=album&limit=5&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(albums.addAllAlbum(body.albums.items));
                    
                }
            })
        });
        let v9 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=j&type=track&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

                    resolve(tracks.addAllTracks(body.tracks.items));
                    
                }
            });

        });
        let v10 = new Promise((resolve, reject) => {
            request(`https://api.spotify.com/v1/search?q=s&type=track&limit=50&offset=0`, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    // console.log(typeof body)
                    body = JSON.parse(body);
                    // console.log(body) // Show the HTML for the Google homepage.

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
                            // console.log(typeof body)
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


//=== Spotify API ===============================================
//from: https://www.npmjs.com/package/spotify-web-api-node
/*
var SpotifyWebApi = require('spotify-web-api-node');
 
// credentials are optional 
var spotifyApi = new SpotifyWebApi({
  clientId : 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri : 'http://www.example.com/callback'
});


spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then((data) => {
    console.log('Artist information', data.body);
      artistobj = data.body;
      return artistobj;
     }, (err) =>{
      console.error(err);
  }).then((artistobj)=>{
      return artists.addArtistObj(artistobj)}).then((newArtist)=>{
        id = newArtist.id;
        console.log(newArtist);
  }).catch((err)=>{
    console.log(err);
  });



//=== Spotify API ===============================================
// from: https://www.npmjs.com/package/spotify-web-api-node 
 /*
var SpotifyWebApi = require('spotify-web-api-node');
 
var spotifyApi = new SpotifyWebApi();

// Get multiple albums 
spotifyApi.getAlbums(['5U4W9E5WsYb2jUQWePT8Xm', '3KyVcddATClQKIdtaap4bV'])
  .then(function(data) {
   // console.log('Albums information', data.body);
    console.log('Albums information', data.body.albums[0]);

    // let newMusic = {
    //     name: data.body.albums[0].name;
    //     image: data.body.albums[0].image; 
    // }

  }, function(err) {
    console.error(err);
  });
 
// Get an artist 
spotifyApi.getArtist('2hazSY4Ef3aB9ATXW7F5w3')
  .then(function(data) {
    console.log('Artist information', data.body);
  }, function(err) {
    console.error(err);
  });
// Get multiple artists 
spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  .then(function(data) {
    console.log('Artists information', data.body);
  }, function(err) {
    console.error(err);
  });

 // Get albums by a certain artist 
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
  .then(function(data) {
    console.log('Artist albums', data.body);
  }, function(err) {
    console.error(err);
  });
 
// Search tracks whose name, album or artist contains 'Love' 
//spotifyApi.searchTracks('Love')
spotifyApi.searchTracks('Try everything')
  .then(function(data) {
    console.log('Search by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });

// Search artists whose name contains 'Love' 
spotifyApi.searchArtists('Love')
  .then(function(data) {
    console.log('Search artists by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });
 // Search tracks whose artist's name contains 'Love' 
spotifyApi.searchTracks('artist:Love')
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Search tracks whose artist's name contains 'Kendrick Lamar', and track name contains 'Alright' 
spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
  .then(function(data) {
    console.log('Search tracks by "Love" in the artist name', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
 
// Search playlists whose name or description contains 'workout' 
spotifyApi.searchPlaylists('workout')
  .then(function(data) {
    console.log('Found playlists are', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

// Get tracks in an album 
spotifyApi.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit : 5, offset : 1 })
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

// Get an artist's top tracks 
spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB')
  .then(function(data) {
    console.log(data.body);
    }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Get artists related to an artist 
spotifyApi.getArtistRelatedArtists('0qeei9KQnptjwb8MgkqEoy')
  .then(function(data) {
    console.log(data.body);
  }, function(err) {
    done(err);
  });
 



// Playlist methods ===============================
// Get a playlist 
spotifyApi.getPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK')
  .then(function(data) {
    console.log('Some information about this playlist', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Get a user's playlists 
spotifyApi.getUserPlaylists('thelinmichael')
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });
 
// Create a private playlist 
spotifyApi.createPlaylist('thelinmichael', 'My Cool Playlist', { 'public' : false })
  .then(function(data) {
    console.log('Created playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Add tracks to a playlist 
spotifyApi.addTracksToPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"])
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Add tracks to a specific position in a playlist 
spotifyApi.addTracksToPlaylist('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK', ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"],
  {
    position : 5
  })
  .then(function(data) {
    console.log('Added tracks to playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
// Remove tracks from a playlist at a specific position 
spotifyApi.removeTracksFromPlaylistByPosition('thelinmichael', '5ieJqeLJjjI8iJWaxeBLuK', [0, 2, 130], "0wD+DKCUxiSR/WY8lF3fiCTb7Z8X4ifTUtqn8rO82O4Mvi5wsX8BsLj7IbIpLVM9")
  .then(function(data) {
    console.log('Tracks removed from playlist!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 



 //=== Tracks =========================================
 
// Get tracks in the signed in user's Your Music library 
spotifyApi.getMySavedTracks({
    limit : 2,
    offset: 1
  })
  .then(function(data) {
    console.log('Done!');
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 
 
// Check if tracks are in the signed in user's Your Music library 
spotifyApi.containsMySavedTracks(["5ybJm6GczjQOgTqmJ0BomP"])
  .then(function(data) {
 
    // An array is returned, where the first element corresponds to the first track ID in the query 
    var trackIsInYourMusic = data.body[0];
 
    if (trackIsInYourMusic) {
      console.log('Track was found in the user\'s Your Music library');
    } else {
      console.log('Track was not found.');
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
 

*/




//console.log("Done seeding database");
       /*
       then((newUser) => {
            console.log(newUser);
        }).then((added) => {
            console.log("Done seeding database");
            db.close();
        });
    },(error) => {
        console.log(error);
    });*/











