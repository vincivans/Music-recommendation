const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt-nodejs");

let exportMethods = {
	addUser(username, password){
		
		//check for valid input
		if(!username || typeof(username) !== "string")
			return Promise.reject("Please provide a valid userName");
		if(!password || typeof(password) !== "string")
			return Promise.reject("Please provide a valid password");
		return users().then((userCollection)=>{
			let favorite = [],//a list of user favorite songs
				history = [],//a list of user listened songs
				dislike = [],//a list of user dislike music
				likeAlbum = [],//a list of user liked album
				recommend = [],//recommendation list
				likeArtist = [];//a list of user liked artist

			let newUser = {
				_id: uuid.v4(),
				username: username,
				password: bcrypt.hashSync(password),
				favoriteSong: favorite,
				listenHistory: history,
				dislikeSong: dislike,
				favoriteAlbum: likeAlbum,
				favoriteArtist: likeArtist,
				recommendation: recommend
			};
			console.log(typeof newUser.password);
			return userCollection.insertOne(newUser).then((newInsertInformation)=>{
				return newInsertInformation.insertedId;
			}).then((newId)=>{
				return this.getUserById(newId);
			});
		});
	},

	getAll(){
		return users().then((userCollection)=>{
			return userCollection.find().toArray();
		})
	},

	getUserByUserName(username){
		if(!username)
			return Promise.reject("Please provide a valid username.");
		return users().then((userCollection)=>{
				return userCollection.findOne({ username: username}).then((user)=>{
					if(!user) Promise.reject("User not found");
					//user is object
					return user;
				}).catch((err)=>{
					console.log(err);
				});
		});
	},

	getUserById(userId){
		if(!userId)
			return Promise.reject("Please provide a valid userId.");

		return users().then((userCollection)=>{
				return userCollection.findOne({_id: userId}).then((user)=>{
					if(!user) Promise.reject("User not found");
					return user;
				}).catch((err)=>{
					console.log(err);
				});
		});
	},

	updateListenHistory(userName, track){
		if(!userName)
			return Promise.reject("Please log in first");

		return users().then((userCollection)=>{
			return userCollection.updateOne({username: userName}, {$push:{"listenHistory":track }})
				   .then((updateInformation)=>{
				   		//console.log("Add recent listened music");
				   		return this.getUserByUserName(userName);
				   })
		})
	},

	updateFavorite(userName, track){
		if(!userName)
			return Promise.reject("Please log in first");

		return users().then((userCollection)=>{
			return userCollection.updateOne({username: userName}, {$push:{"favoriteSong":track}})
				   .then((updateInformation)=>{
				   		//console.log("Add favorite success");
				   		return this.getUserByUserName(userName);
				   })
		})
	},

	removeFavorite(userName, track){
		if(!track)
			Promise.reject("Please provide a valid track to delete.");
		
		return users().then((userCollection) => {
            return userCollection.update({username: userName}, {
                $pull: {
                    "favoriteSong": {
                        "track.id": track.id
                    }
                }
            }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete favorite song with name of ${track.name}`);
                }
            });
        });
    },

	getAll(){
		return users().then((userlist)=>{
			return userlist.find().toArray();
		})
	}

}

module.exports = exportMethods;