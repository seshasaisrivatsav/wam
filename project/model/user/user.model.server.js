
module.exports = function () {

    var mongoose = require ("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User", UserSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername

    };
    return api;
    //findByID returns just one

    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {firstName : user.firstName,
                    lastName : user.lastName,
                    email: user.email}}
            );
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
        return  User.create(user);
    }

};