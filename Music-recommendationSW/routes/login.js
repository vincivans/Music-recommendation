const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.users;

router.get("/:id", (req, res)=>{
	user.getUserById(req.params._id).then((userData)=>{
		res.json(userData);
	}).catch((error)=>{
		res.status(404).json({message:"user not found"});
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
});

module.exports = router;