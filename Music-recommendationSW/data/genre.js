const mongoCollections = require("../config/mongoCollections");
const uuid = require("node-uuid")
const genre = mongoCollections.genre;

let exportMethods = {
		addGenre(name){
		
		//check for valid input
		if(!name || typeof(name) !== "string")
			return Promise.reject("Please provide a valid genre!");

		return genre().then((genreCollection)=>{
			let belongMusic = [];//a list of music belongs to the genre

			let newGenre = {
				_id: uuid.v4(),
				name: name,
				music: belongMusic,
			};

			return genreCollection.insertOne(newArtist).then((newInsertInformation)=>{
				return newInsertInformation.insertedId;
			}).then((newId)=>{
				return this.getGenreById(newId);
			});
		});
	},

	getGenreByName(genreName){
		if(!genreName)
			return Promise.reject("Please provide a valid genre name.");

		return genre().then((genreCollection)=>{
				return genreCollection.findOne({name: genreName}).then((genreRes)=>{
					if(!genreRes) Promise.reject("Genre not found");
					return genreRes;
				}).catch((err)=>{
					console.log(err);
				});
		});
	},

	getGenreById(genreId){
		if(!genreId)
			return Promise.reject("Please provide a valid genreId.");

		return genre().then((genreCollection)=>{
				return genreCollection.findOne({_id: genreId}).then((genreRes)=>{
					if(!genreRes) Promise.reject("Genre not found");
					return genreRes;
				}).catch((err)=>{
					console.log(err);
				});
		});
	}
}

module.exports = exportMethods;