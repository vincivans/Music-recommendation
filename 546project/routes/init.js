const User = require('../data/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt-nodejs");

const constructorMethods = (passport) =>{

	passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
            passwordField: 'password',
			passReqToCallback: true
		},
			(req, username, password, done)=>{
				User.findOne({'username' : username}).exec().then((user)=>{
					if(!user)
						return done(null, false, {message: 'Invalid user or password.'});

					return bcrypt.compare(password, user.password, (error, res)=>{
						if(res === true)
							return done(null, user);
						else
							return done(null, false, {message:'Invalid user or password.'});
					});
				}).catch((err)=>{
					console.log(err);
				})
			})
		);



	passport.use('local-signup', new LocalStrategy({
			usernameField: 'username',
            passwordField: 'password',
			passReqToCallback: true
		},
			(req, username, password, done)=>{
				User.findOne({'username': username}).exec().then((user)=>{
				//check if user exits
				if(user) 
					return done(null, false, {message: 'User already exits.'});
				else if(req.body.password != req.body.confirmPassword)
					return done(null, false, {message: 'Password doesn\'t match'})
				else{
					//if not then create one
						User.create({username: username, password:  bcrypt.hashSync(password)}).then((newUser)=>{
							console.log(newUser);
							console.log("User create success.");
							return done(null, newUser);
						}).catch((err)=>{
							console.log(err);
						});
				}
			});
		})
	);



};

module.exports = constructorMethods;