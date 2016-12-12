const mongoCollections = require("../config/mongoCollections");
const tracks = mongoCollections.tracks;


let exportedMethods = {
    getTrackById(id) {
        return tracks().then((trackCollection) => {
            return trackCollection.findOne({
                id: id
            }).then((track) => {
                if (!track) Promise.reject("Track not found");

                return track;
            });
        });
    },
    getTrackByInsertId(id) {
        return tracks().then((trackCollection) => {
            return trackCollection.findOne({
                _id: id
            }).then((track) => {
                if (!track) Promise.reject("Track not found");

                return track;
            });
        });
    },
    getSeveralTracks(num) {
        return tracks().then((trackCollection) => {
            return trackCollection.find({}).limit(num).toArray();
        });

    },
    getAllTracks() {
        return tracks().then((trackCollection) => {
            return trackCollection.find({}).toArray();
        });

    },
    addTrack(data) {
        return tracks().then((trackCollection) => {

            return trackCollection.insertOne(data).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getTrackByInsertId(newId);
            });
        });
    },
    addAllTracks(arr) {
        return tracks().then((trackCollection) => {
            return trackCollection.insertMany(arr);
        });
    },
    getTop10Tracks(){
        return tracks().then((trackCollection)=>{
            return trackCollection.find({popularity: {$gte: 75}}).limit(10).toArray();
        });
    }

}
module.exports = exportedMethods;