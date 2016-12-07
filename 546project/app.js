var expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    express        = require("express"),
    app            = express();
    passport       = require('passport');
    session        = require('express-session');
    flash          = require('connect-flash');
    configRoutes   = require("./routes");
    bcrypt         = require("bcrypt-nodejs");
    cookieParser   = require('cookie-parser');

    
//Connect to the database, use command './mongod' to run in terminal.
//mongoose.connect("mongodb://localhost/restful_app");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(cookieParser());
app.use(session({ secret: 'a',
                  resave: false,
                  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./routes/init')(passport);//passport configuration file
require('./routes/index.js')(app, passport);

configRoutes(app);


// Mongoose/Model config
/*
var songSchema = new mongoose.Schema({
    title: String,
    singer: {type: String, default:"Unknown"},
    cover: String,   //{type: String, default: "placeholder.jpg"}
    source: String,
    genre: {type: String, default:"Unknown"},
    description: {type: String, default:"None description"},
    comment: {type: Array, default:[]},
    created: {type: Date, default: Date.now}
});
var Song = mongoose.model('Song',songSchema); //A instance has mongodb method;


var userSchema =  new mongoose.Schema({
    username: String,
    passward: String
});

var User = mongoose.model('User', userSchema);
User.create({
    username: "aaa",
    passward: bcrypt.hashSync("123")
});*/

// Song.create({
//     title: "裂心",
//     singer: "王力宏",
//     cover: "https://y.gtimg.cn/music/photo_new/T002R300x300M0000019rBkH0xdGVc.jpg?max_age=2592000",
//     source: "https://y.qq.com/portal/song/102070024_num.html?ADTAG=h5_playsong",
// });



/*
 * RESTFUL ROUTE PARTTERN
 * 7 ROUTES:
 *  INDEX
 *  NEW
 *  CREATE
 *  SHOW
 *  UPDATE
 *  DESTROY
 */
 
//INDEX ROUTE
app.get('/songs', function(req,res){
    Song.find({},function(err,songs){
        if(err){
            console.log(err);
        }else{
            res.render('index',{songs: songs});
        }
    })
})

//NEW ROUTE
app.get('/songs/new', function(req,res){
    res.render('new');
})


//CREATE ROUTE
app.post('/songs',function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    console.log(req.body);
    req.body.song.comment = req.sanitize(req.body.song.comment);
    console.log("==============");
    console.log(req.body);
    Song.create(req.body.song, function(err, newSog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/songs");
        }
    })
})

//SHOW ROUTE
app.get('/songs/:id',function(req,res){
    Song.findById(req.params.id, function(err, foundSong){
        if(err){
            res.redirect('/songs');
        }else{
            res.render("show",{song: foundSong});
        }
    })
});

//EDIT ROUTE
app.get('/songs/:id/edit',function(req,res){
    Song.findById(req.params.id, function(err,foundSong){
        if(err){
            res.redirect('/songs');
        }else{
            res.render("edit",{song: foundSong});
        }
    })
});

//UPDATE ROUTE
app.put('/songs/:id',function(req,res){
    req.body.song.comment = req.sanitize(req.body.song.comment);
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong){
        if(err){
            res.redirect("/songs");
        }else{
            console.log(req.params.id);
            res.redirect("/songs/" + req.params.id);
        }
    })
});


//DESTROY ROUTE
app.delete('/songs/:id', function(req,res){
    //destory and redirect
    Song.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else{
            res.redirect("/songs");
        }
    })
})


//title
//image
//body
//created
/*
app.get('/login', function(req,res){
    res.render('login');
})


//songs ROUTES
app.get('/',function(req,res){
    res.redirect('/songs');
})*/

// ------------------------------------------
// Listen to your server;
app.listen(3000, function(){
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});