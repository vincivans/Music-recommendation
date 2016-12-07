const express = require('express');
const router = express.Router();
const passport = require('passport');
const Song = require('../data/song');

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
router.get('/', function(req,res){
    Song.find({},function(err,songs){
        if(err){
            console.log(err);
        }else{
            res.render('index',{songs: songs});
        }
    })
})

//NEW ROUTE
router.get('/new', function(req,res){
    res.render('new');
})


//CREATE ROUTE
router.post('/',function(req,res){
    //After clicking submit the data in the form will be packaged and send in req.body;
    console.log(req.body);
    req.body.song.comment = req.sanitize(req.body.song.comment);
    console.log("==============");
    console.log(req.body);
    Song.create(req.body.song, function(err, newSog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/");
        }
    })
})

//SHOW ROUTE
router.get('/:id',function(req,res){
    Song.findById(req.params.id, function(err, foundSong){
        if(err){
            res.redirect('/');
        }else{
            res.render("show",{song: foundSong});
        }
    })
});

//EDIT ROUTE
router.get('/:id/edit',function(req,res){
    Song.findById(req.params.id, function(err,foundSong){
        if(err){
            res.redirect('/');
        }else{
            res.render("edit",{song: foundSong});
        }
    })
});

//UPDATE ROUTE
router.put('/:id',function(req,res){
    req.body.song.comment = req.sanitize(req.body.song.comment);
    Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, updatedSong){
        if(err){
            res.redirect("/");
        }else{
            console.log(req.params.id);
            res.redirect("/" + req.params.id);
        }
    })
});


//DESTROY ROUTE
router.delete('/:id', function(req,res){
    //destory and redirect
    Song.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send(err);
        } else{
            res.redirect("/");
        }
    })
})


module.exports = router;