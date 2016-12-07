const mongoose       = require("mongoose");

//mongoose.connect("mongodb://localhost/test");

mongoose.Promise = global.Promise;

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

module.exports = Song;