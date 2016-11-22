const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");

let exportMethods = {
	addUser(userName, password){
		
		//check for valid input
		if(!userName || typeof(userName) !== "string")
			return Promise.reject("Please provide a valid userName");
		if(!password || typeof(password) !== "string")
			return Promise.reject("Please provide a valid password");

		return users().then((userCollection)=>{
			let favorite = [];//a list of user favorite songs
			let newUser = {
				_id: uuid.v4(),
				userName: userName,
				password: password,
				sessionId: uuid.v4(),
				favoriteSong: favorite
			};

			return userCollection.insertOne(newUser).then(()=>{
				return newInsertInformation.insertedId;
			}).then((newId)=>{
				return this.getUserById(newId);
			});
		});
	},

	getUserById(userId){
		if(!userId)
			return Promise.reject("Please provide a valid userId.");

		return user().then((userCollection)=>{
				return userCollection.findOne({_id: id}).then((user)=>{
					if(!user) throw "User not found";
					return user;
				});	
		});
	},

	getUserBySession(sessionId){
		if(!sessionId)
			return Promise.reject("Please provide a valid sessionId.");

		return users().then((userCollection)=>{
			return userCollection.findOne({sessionId: sessionId});
		});
	},

	authenticateUser(userName, password){
		if(!userName || typeof(userName) !== "string")
			return Promise.reject("Please provide a valid userName");
		if(!password || typeof(password) !== "string")
			return Promise.reject("Please provide a valid password");


		return users().then((userCollection)=>{
				return userCollection.findOne({userName: userName, password: password})
						.then((user)=>{
						if(!user) throw "User not found.";

						user.sessionId = uuid.v4();

						return userCollection.updateOne({_id: user._id}, user)
								.then(()=>{
									return user;
						});

				});
		});
	}

}

module.exports = exportMethods;