const loginRoutes = require("./login");
const passport = require('passport');

const constructorMethod = (app) =>{

	//Route for logged in users
	app.use("/", loginRoutes);

	//Welcome page?
	//app.use("/main");


	app.use("*", (req, res)=>{
		//any unmatched routes(ie. none exist routes) will his this catch-all route
		//let route = path.resolve(`static/about.html`);
		//res.sendFile(route);
		res.sendStatus(404);
	})
};

module.exports = constructorMethod;