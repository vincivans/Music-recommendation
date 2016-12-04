const data = require('../data');
const userData = data.users;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt-nodejs");


const constructorMethods = (passport) =>{
	passport.use('local-login', new LocalStrategy({
			usernameField: 'username',
            passwordField: 'password',
			passReqToCallback: true
		},
			(username, password, done)=>{
			userData.getUserByUserName(username).then((user)=>{
				if(!user) return done(null, false, {message: 'User not found.'});
				
				let userJSON = JSON.parse(user);
				return bcrypt.compare(password, userJSON.password, (error, res)=>{
					if(res === true)
						return done(null, user);
					else
						return done(null, false, { message: 'Incorrect password.'});

				});
			});
		})
	);


	passport.use('local-signup', new LocalStrategy({
			usernameField: 'username',
            passwordField: 'password',
			passReqToCallback: true
		},
			(req, username, password, done)=>{
			findOrCreatUser = ()=>{
				userData.getUserByUserName(username).then((user)=>{
				//check if user exits
				if(user) 
					return done(null, false, {message: 'User already exits.'});
				else{
					//if not then create one
						userData.addUser(username, password).then((newUser)=>{
							console.log(newUser);
							return done(null, newUser);
						})
				}
			});
		}
		})
	);



};

module.exports = constructorMethods;