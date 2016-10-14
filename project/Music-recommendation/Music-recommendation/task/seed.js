const dbConnection = require("../config/mongoConnection");
const user = require("../data/user");
dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        return user.addUser("123", "123");
        }).then((added) => {
            return user.addUser("1233", "123");
        }).then((added) => {

            return user.login("123", "123");
        }).
        then((id) => {
            console.log(id);
        })



        .then((added) => {
            console.log("Done seeding database");
            db.close();
        })


},(error) => {
    console.log("asdasd");

    })