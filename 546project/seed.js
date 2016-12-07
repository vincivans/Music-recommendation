const mongoose       = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

mongoose.connect("mongodb://localhost/test");

mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
	username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

User.create({
    username: "aaa",
    password: bcrypt.hashSync("123")
});