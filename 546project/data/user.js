const mongoose       = require("mongoose");

mongoose.connect("mongodb://localhost/test");

mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
	username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

userSchema.methods.getUserByUserName = (username) =>{
		if(!username)
			return Promise.reject("Please provide a valid username.");
		return User.findOne({ username: username}).then((user)=>{
					if(!user) Promise.reject("User not found");
					//user is object
					return user;
				}).catch((err)=>{
					console.log(err);
				});
		};


module.exports = User;
/*
module.exports = mongoose.model('User',{
	username: String,
    passward: String
});*/