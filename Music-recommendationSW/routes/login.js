const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
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
		res.redirect('/songs');
});

//get the user private page
router.get("/private", ensureAuthenticated, (req, res)=>{
			res.render("show", {"user": req.user});
	});

//handle logout
router.get("/signout", (req, res)=>{
	req.logout();
	res.redirect('/');
});


//handle login post
router.post('/login', passport.authenticate('local-login', { successRedirect: '/songs',
														   failureRedirect: '/login',
														   failureFlash: true }));


//handle registration post
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/songs',
														   failureRedirect: '/signup',
														   failureFlash: true }));


module.exports = router;