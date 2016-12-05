const dbConnection = require("../config/mongoConnection");
const user = require("../data/users");
dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    });
});
    console.log("First user created")
       user.addUser("aaa", "123").then((newUser) => {
            id = newUser._id;
            console.log(newUser);
        }).catch(err => {
            console.log("error occurs" + err);
        });

console.log("Done seeding database");
       /*
       then((newUser) => {
            console.log(newUser);
        }).then((added) => {
            console.log("Done seeding database");
            db.close();
        });
    },(error) => {
        console.log(error);
    });*/