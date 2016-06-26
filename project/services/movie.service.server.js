module.exports = function (app, models) {

    var movieModel = models.movieModel;


    app.get('/api/project/moviecheck/:tmdbId',findMovieById);
    app.get('/api/project/findallmovies', findallmovies);
    app.put('/api/project/:tmdbId/ratingsandreviews',updateRatingAndReview);
    app.post('/api/project/movie',createMovie);
    app.put('/api/project/reportreview' ,reportReview);
    
    function findallmovies(req, res) {

        movieModel
            .findAllMovies()
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    
    function reportReview(req,res) {

        var tmdbId = req.body.tmdbId;
        var reviewId = req.body.reviewId;

            movieModel
            .findMovieById(tmdbId)
                .then(function (movie) {
                        var foundMovie = movie[0];
                        var reviews = foundMovie.reviews;
                        
                        for(var i in reviews){
                            if(reviews[i]._id == reviewId){
                                reviews[i].flagged = "true";
                            }
                        }

                    return movie[0].save();


                    },
                    function (error) {
                        res.statusCode(404).send(error);
                    });
    }

    function findMovieById(req, res){
        var id = req.params.tmdbId;
        
        movieModel
            .findMovieById(id)
            .then(function (movie) {
                    var foundMovie = movie[0];
                    res.send(foundMovie);
                },
                function (error) {
                    res.statusCode(404).send(error);
         });
    }


    function updateRatingAndReview(req, res) {

        var id = req.params.tmdbId;
        var ratingsandreviews = req.body;

        movieModel
            .updateRatingAndReview(id, ratingsandreviews)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createMovie(req,res) {
        var movie = req.body;
        movieModel
            .createMovie(movie)
            .then(
                function(movie){
                    res.json(movie);
                },
                function(error){
                    res.statusCode(404).send(error);
                }
            )
    }



};