const loginRoutes = require("./login");
const albumRoutes = require("./album");
const artistRoutes = require("./artist");
const trackRoutes   = require("./track");//originally song track
const mainRoutes   = require("./main");
const passport    = require('passport');

const constructorMethod = (app) =>{

	//Route for logged in users
	app.use("/", loginRoutes);

	//Route for each album
	app.use("/album", albumRoutes);

	//Route for each artist
	app.use("/artist", artistRoutes);

	//Route for each track(song)
	app.use("/track", trackRoutes);

	//Route for main page
	app.use("/main", mainRoutes);

	app.use("*", (req, res)=>{
		//any unmatched routes(ie. none exist routes) will his this catch-all route
		//let route = path.resolve(`static/about.html`);
		//res.sendFile(route);
		res.sendStatus(404);
	})
};

module.exports = constructorMethod;