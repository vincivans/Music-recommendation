const express = require('express');
const router = express.Router();
//const data = require('../data');
//const userData = data.users;
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
		res.render("login/mainpage", { message: req.flash('error') });
	});


//get signup page
router.get("/signup",(req, res) => {
		res.render("login/register", { message: req.flash('error') });
	});

//get the logined user private page
router.get("/", ensureAuthenticated, (req, res, next) => {
		res.redirect('/private');
});

//get the user private page
router.get("/private", ensureAuthenticated, (req, res)=>{
			res.render("users/single", {"user": req.user});
	});

//handle logout
router.get("/signout", (req, res)=>{
	req.logout();
	res.redirect('/');
});


//handle login post
router.post('/login', passport.authenticate('local-login', { successRedirect: '/private',
														   failureRedirect: '/login',
														   failureFlash: true }));


//handle registration post
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/private',
														   failureRedirect: '/signup',
														   failureFlash: true }));


/*
router.get("/register", (req, res) =>{
		res.render("users/register");
});

router.get("/:id", (req, res)=>{
	user.getUserById(req.params._id).then((userData)=>{
		res.render("user/single", {singleuser: userData});
	}).catch((error)=>{
		res.status(404).json({message:"User not found"});
	});
});



router.get("/", (req, res)=>{
	user.getAllUsers().then((userList)=>{
		let u = [];
		userList.forEach((ele, index)=>{
			u.push(ele["userName"]);
		});
		res.json(u);
	}, ()=>{
		//something wrong with the server
		res.status(500).send();
	});
});

router.post("/", (req, res)=>{
	//Not implemented
	res.status(501).send();
});*/

module.exports = router;