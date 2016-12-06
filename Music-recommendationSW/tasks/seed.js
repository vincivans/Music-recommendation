const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
const music = require("../data/music");
dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    });
});
    console.log("First user created")
    user.addUser("aaa", "123").then((newUser) => {
        id = newUser._id;
        console.log(newUser);
    }).catch(err => {
        console.log("error occurs" + err);
        });
    console.log("first music created");
    console.log("test");
var m = music.addMusic("track1", "album1", "auther", "lyc", "ge");
    m.then(() => {
       return  music.addMusic("track2", "album2", "auther", "lyc", "ge");
    })
    .then((newMusic) => {
        id = newMusic._id;
        name = newMusic.track;
        console.log(newMusic);
        return id;
    }).then((id) => {
        return music.updateDisplay(id);
        }).then((Music) => {
            console.log(Music);
            return music.updateDisplay(id);
        }).then((Music) => {
            
            return music.getMusicByName(Music.track);

        }).then((Music) => {
            return music.getMusicDisplayInfo(Music._id);
        }).then((num) => {
            console.log(num);
        }).then(() => {
            return music.getMusicByArtist("auther");

        }).then((collection) => {
            console.log(collection);
        }).catch(err => {
            console.log("error occurs" + err);
        });
        
        

console.log("Done seeding database");
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