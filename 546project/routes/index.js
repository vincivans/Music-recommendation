const loginRoutes = require("./login");
const songRoutes = require("./songs");
const passport = require('passport');

const constructorMethod = (app) =>{

	//Route for logged in users
	app.use("/", loginRoutes);

	//Route for each album
	//app.use("/album", albumRoutes);

	//Route for each artist
	//app.use("/artist", artistRoutes);

	//Route for each song
	app.use("/songs", songRoutes);

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