
module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level
   
    var MovieSchema = mongoose.Schema({
        tmdbId: String,
        title: String,
        imageUrl: String,
      
        // ids of ratings for this movie
        ratings: [
            {
                userId: String,
                username: String,
                value: Number
            }
        ],

        reviews: [
            {
                userId: String,
                username: String,
                text: String,
                visible: String,
                flagged: String
            }
        ]
        // store movie documents in this collection
    }, {collection: 'project.movie'});
    return MovieSchema;
};