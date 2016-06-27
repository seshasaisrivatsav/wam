
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
        followUser: followUser,
        unfollowUser : unfollowUser,
        findUserByUsername: findUserByUsername,
        updateRatesandReviews: updateRatesandReviews,
        findUserByGoogleId: findUserByGoogleId,
        findAllUsers: findAllUsers

    };
    return api;
    //findByID returns just one

    function findUserByGoogleId(id) {
        return User.findOne({"google.id": id});
    }

    function findAllUsers() {
        return User.find();
    }


    function updateRatesandReviews(id, rateandreview) {
        var rate = rateandreview.rates;
        var review = rateandreview.reviews;

        return User
            .update({_id: id},
                {$push: {rates: rate,
                        reviews : review }}
            );
    }


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
                    email: user.email,
                      admin : user.admin}}
            );
    }


    function unfollowUser(id, username) {
        return User.update(
            {_id: id},
            {
                $pull: {
                    follows:
                    {
                        username: username
                    }
                }
            }
        );
    }

    
    function followUser(id, follows) {
        return User
            .update({_id: id},
                {$push: {follows: follows}}
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