const mongoCollections = require("../config/mongoCollections");
const uuid = require("node-uuid")
const albums = mongoCollections.albums;

let exportMethods = {
		addAlbum(name, artist, pic){
		
		//check for valid input
		if(!name || typeof(name) !== "string")
			return Promise.reject("Please provide a valid name!");
		if(!artist || typeof(artist) !== "string")
			return Promise.reject("Please provide a valid artist!");

		return albums().then((albumCollection)=>{
			let belongMusic = [],//a list of music belongs to the album
				genre = [];//a list of genre that fit this album

			let newAlbum = {
				_id: uuid.v4(),
				name: name,
				artist: artist,
				music: belongMusic,
				cover: pic,//album cover picture
				genre: genre
			};

			return albumCollection.insertOne(newAlbum).then((newInsertInformation)=>{
				return newInsertInformation.insertedId;
			}).then((newId)=>{
				return this.getAlubmById(newId);
			});
		});
	},

	getAlbumByName(alubmName){
		if(!alubmName)
			return Promise.reject("Please provide a valid alubm name.");

		return albums().then((albumCollection)=>{
				return albumCollection.findOne({name: alubmName}).then((albumRes)=>{
					if(!albumRes) Promise.reject("Genre not found");
					return albumRes;
				}).catch((err)=>{
					console.log(err);
				});
		});
	},

	getAlbumById(alubmId){
		if(!alubmId)
			return Promise.reject("Please provide a valid alubmId.");

		return albums().then((albumCollection)=>{
				return albumCollection.findOne({_id: alubmId}).then((albumRes)=>{
					if(!albumRes) Promise.reject("Genre not found");
					return albumRes;
				}).catch((err)=>{
					console.log(err);
				});
		});
	}
}

module.exports = exportMethods;