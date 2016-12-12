const mongoCollections = require("../config/mongoCollections");
const artists = mongoCollections.artists;

let exportedMethods = {
	getArtistById(id) {
        return artists().then((artistCollection) => {
    
            return artistCollection.findOne({ id: id }).then((artist) => {
                if (!artist) throw "Artist not found";
                
                return artist;
            });
        });
    },
    getArtistByInsertId(id) {
        return artists().then((artistCollection) => {
            
            return artistCollection.findOne({ _id: id }).then((artist) => {
                if (!artist) throw "Artist not found";
                
                return artist;
            });
        });
    },
    getSeveralArtists(num) {
    	 return artists().then((artistCollection) => {
            return artistCollection.find({}).limit(num).toArray();
        });

    },
    getAllArtists() {
    	 return artists().then((artistCollection) => {
            return artistCollection.find({}).toArray();
        });

    },
	addArtist(data) {
        return artists().then((artistCollection) => {
           

            return artistCollection.insertOne(data).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getAlbumByInsertId(newId);
            });
        });
    },
    addAllArtist(arr) {
    	return artists().then((artistCollection) => {
            console.log("all");
            return artistCollection.insertMany(arr);
        });
    }

}
module.exports = exportedMethods;