"use strict"
const MongoClient = require("mongodb").MongoClient;;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "Music-recommendation"
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }

    return _connection;
};
/*
let connectDb = MongoClient.connect(fullMongoUrl).then((db)=>{
    db.dropDatabase().then((res) =>{
        db.admin().listDatabases().then(()=>{
            db.close();
            console.log("Done");
        });
    });
})*/

module.exports = connectDb;
