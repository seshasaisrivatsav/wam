//we create a schema

module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level
 
    var UserSchema = mongoose.Schema ({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        admin: String,
        google: {
            id:    String,
            token: String
        },
        // tmdb ids of movies this user rates
        rates: [
            {
                name: String,
                tmdbId: String,
                rating: Number,
                imageUrl: String
            }
        ],

        reviews: [
            {
                name: String,
                tmdbId: String,
                review: String,
                imageUrl: String,
                visible: String,
                flagged: String
            }
        ],
        // movies this user has reviewed
        //reviewedMovies: [MovieSchema],
        follows: [
            {
                userId: String,
                username: String

            }
    ]
    }, {collection: 'project.user'});
    return UserSchema;
};
