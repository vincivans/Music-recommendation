const peopleRoutes = require("./login");

const path = require('path');

const constructorMethod = (app) =>{
	app.use("./login", loginRoutes);

	app.use("*", (req, res)=>{
		//any unmatched routes(ie. none exist routes) will his this catch-all route
		let route = path.resolve(`static/about.html`);
		res.sendFile(route);
	})
};

module.exports = constructorMethod;