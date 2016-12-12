const mongoCollections = require("../config/mongoCollections");
const albums = mongoCollections.albums;

let exportedMethods = {
    getAlbumById(id) {
        return albums().then((albumCollection) => {
            
            return albumCollection.findOne({
                id: id
            }).then((album) => {
                if (!album) throw "Album not found";

                return album;
            });
        });
    },
    getAlbumByInsertId(id) {
        return albums().then((albumCollection) => {
            
            return albumCollection.findOne({
                _id: id
            }).then((album) => {
                if (!album) throw "Album not found";

                return album;
            });
        });
    },
    getSeveralAlbums(num) {
        return albums().then((albumCollection) => {
            return albumCollection.find({}).limit(num).toArray();
        });

    },
    getAllAlbums() {
        return albums().then((albumCollection) => {
            return albumCollection.find({}).toArray();
        });

    },
    addAlbum(data) {
        return albums().then((albumCollection) => {
           

            return albumCollection.insertOne(data).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getAlbumByInsertId(newId);
            });
        });
    },
    addAllAlbum(arr) {
        return albums().then((albumCollection) => {
            console.log("all");
            return albumCollection.insertMany(arr);
        });
    },
    addTracksToAlbum(id, tracks) {
        return albums().then((albumCollection) => {

            return albumCollection.updateOne({
                id: id
            }, {
                $set: {
                    tracks: tracks
                }
            }).then(() => {
                return this.getAlbumById(id);
            });
        });
        
    },

}
module.exports = exportedMethods;