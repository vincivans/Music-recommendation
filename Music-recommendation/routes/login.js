const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const trackData = data.tracks;
const passport = require('passport');


ensureAuthenticated = (req, res, next) => {
		if(req.isAuthenticated())
			return next();
		console.log("Not authenticate");
		res.redirect('/login');
}


passport.serializeUser(function(user, done) {
	  done(null, user);
});

passport.deserializeUser(function(user, done) {
	    done(null, user);
});

//get login page(main page)
router.get("/login",(req, res) => {
		res.render('login', { message: req.flash('error') });
	});


//get signup page
router.get("/signup",(req, res) => {
		res.render("register", { message: req.flash('error') });
	});

//get the logined user private page
router.get("/", ensureAuthenticated, (req, res, next) => {
		res.redirect('/main');
});

//get the user private page and recommend music
router.get("/private", ensureAuthenticated, (req, res)=>{
	return userData.getUserFavoriteList(req.user.username).then((fList)=>{
			let fa = fList;
			userData.getUserListenedList(req.user.username).then((lList)=>{
					res.render("show", {favorite: fList, listened : lList});
			}).catch((err)=>{
				console.log(err);
			});
		});
			
});

//handle logout
router.get("/signout", (req, res)=>{
	req.logout();
	res.redirect('/');
});


//check login status
router.get('/login/isLoggedIn', function (req, res) {
    if (req.isAuthenticated()) {
        res.json({user: req.user});
    }
});
//handle login post
router.post('/login', passport.authenticate('local-login', { successRedirect: '/main',
														   failureRedirect: '/login',
														   failureFlash: true }));


//handle registration post
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/main',
														   failureRedirect: '/signup',
														   failureFlash: true }));


module.exports = router;