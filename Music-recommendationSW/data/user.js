"use strict"
const mongoCollections = require("../config/mongoCollections");
const user = mongoCollections.user;
const uuid = require('node-uuid');
let exportedMethods = {


    getUserById(id) {
        return user().then((userCollection) => {
            return userCollection.findOne({ _id: id }).then((user) => {
                if (!user) throw "user not found";
                return user;
            });
        });
    },


    login(name, psword) {
        return user().then((userCollection) => {
            return userCollection.findOne({ Name: name, passWord: psword }).then((user) => {
                if (!user) reject("user not find or wrong password");
                return user;
            })

        });
    },


    addUser(name, psword) {
        if (typeof (name) !== "string" && typeof (psword) !== "string")
            throw "input error";

        return user().then((userCollection) => {
            return userCollection.findOne({ Name: name }).then((user) => {
                if (user) console.log("username already taken");
            })
                .then(() => {
                    return user().then((userCollection) => {
                        let favourite = [];
                        let newUser = {
                            _id: uuid.v4(),
                            Name: name,
                            passWord: psword,
                            Favourite: favourite,
                        };
                        return userCollection.insertOne(newUser).then((newUserInfo) => {
                            return newUserInfo.insertedId;
                        }).then((newId) => {
                            return this.getUserById(newId);
                        });

                    })
                })
        })
    }


}
module.exports = exportedMethods;