const mongoCollections = require("../config/mongoCollections");
const uuid = require("node-uuid")
const artists = mongoCollections.artists;

let exportMethods = {
		addArtist(name, pic){
		
		//check for valid input
		if(!name || typeof(name) !== "string")
			return Promise.reject("Please provide a valid artist name!");

		return artists().then((artistCollection)=>{
			let singMusic = [],//a list of artist's songs
				pubAlbum = [];//a list of artist's albums

			let newArtist = {
				_id: uuid.v4(),
				name: name,
				avatar: pic,//artist avatar
				music: singMusic,
				album: pubAlbum
			};

			return artistCollection.insertOne(newArtist).then((newInsertInformation)=>{
				return newInsertInformation.insertedId;
			}).then((newId)=>{
				return this.getArtistById(newId);
			});
		});
	},

	getArtistByName(artistName){
		if(!artistName)
			return Promise.reject("Please provide a valid aritst name!");

		return artists().then((artistCollection)=>{
				return artistCollection.findOne({name: artistName}).then((artist)=>{
					if(!artist) Promise.reject("Artist not found");
					return artist;
				}).catch((err)=>{
					console.log(err);
				});
		});
	},

	getArtistById(artistId){
		if(!artistId)
			return Promise.reject("Please provide a valid aritstId.");

		return artists().then((artistCollection)=>{
				return artistCollection.findOne({_id: artistId}).then((artist)=>{
					if(!artist) Promise.reject("Artist not found");
					return artist;
				}).catch((err)=>{
					console.log(err);
				});
		});
	}
}

module.exports = exportMethods;