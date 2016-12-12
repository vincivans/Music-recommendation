const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const trackData = mongoCollections.tracks;
const bcrypt = require("bcrypt-nodejs");
const uuid = require("node-uuid");

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
				recommend = []//recommendation list

			let newUser = {
				_id: uuid.v4(),
				username: username,
				password: bcrypt.hashSync(password),
				favoriteSong: favorite,
				listenHistory: history,
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

	getAll(){
		return users().then((userlist)=>{
			return userlist.find().toArray();
		})
	},

	getUserFavoriteList(userName){
		/*let favoriteList = user.favoriteSong;
		return trackData().then((trackCollection)=>{
				return trackCollection.find({id: {$in: favoriteList}}).toArray();
		});
		*/
		return users().then((userCollection)=>{
				return userCollection.findOne({username: userName}).then((user)=>{
					let favoriteList = user.favoriteSong;
				return trackData().then((trackCollection)=>{
					return trackCollection.find({id: {$in: favoriteList}}).toArray();
				})
			});
		});
	},

	getUserListenedList(userName){
		return users().then((userCollection)=>{
				return userCollection.findOne({username: userName}).then((user)=>{
					let listenedList = user.listenHistory;
				return trackData().then((trackCollection)=>{
					return trackCollection.find({id: {$in: listenedList}}).toArray();
				})
			});
		});
	},

	updateListenHistory(userName, trackId){
		if(!userName)
			return Promise.reject("Please log in first");

		return users().then((userCollection)=>{
			return userCollection.findOne({username: userName}).then((user)=>{
				let array = user.listenHistory;

				if(array.length > 10)
					array.splice(0,1);
				else
					array.push(trackId);

				return userCollection.updateOne({username: userName}, {$set:{"listenHistory":array}})
				   .then((updateInformation)=>{
				   		return this.getUserByUserName(userName);
				   });

			});
		});
	},

	updateFavorite(userName, trackId){
		if(!userName)
			return Promise.reject("Please log in first");

		return users().then((userCollection)=>{
			return userCollection.findOne({username: userName}).then((user)=>{
				let array = user.favoriteSong;
				let index = array.indexOf(trackId);

				if(index > -1)
					array.splice(index,1);
				else
					array.push(trackId);

				return userCollection.updateOne({username: userName}, {$set:{"favoriteSong":array}})
				   .then((updateInformation)=>{
				   		return this.getUserByUserName(userName);
				   });

			});
		});
	}

}

module.exports = exportMethods;