(function () {
    angular
        .module("FilmNerd")
        .controller("MovieReviewController",MovieReviewController);

    function MovieReviewController($routeParams, $rootScope, $location,  $sce,TmdbApiService, UserService, MovieService) {

        var vm = this;
        vm.id = $routeParams.id;
        var userId = $rootScope.currentUser._id;
        var tmdbId = $routeParams.id;
        vm.submitRatingReview = submitRatingReview;

        function init() {
            getMovieDetails();
        }
        return init();




        // console.log(movie.title);
        // console.log("-----");
        // console.log("https://image.tmdb.org/t/p/w130/"+ movie.poster_path);
        // console.log(review.rating);
        // console.log(review.reviewtext);
        // console.log(userId);
        // console.log(tmdbId);



        function submitRatingReview(review, movie) {
            var imageUrl = "https://image.tmdb.org/t/p/w130/"+ movie.poster_path;
            var rates = {
               name : movie.title,
               tmdbid : tmdbId,
               rating : review.rating,
               imageUrl : imageUrl
            };
            var reviews = {
                name: movie.title,
                tmdbid : tmdbId,
                review : review.reviewtext,
                imageUrl : imageUrl
            };
            var rateandreview ={
                rates : rates,
                reviews : reviews
            };

            var ratings = {
                userId :userId,
                value : review.rating
            };

            var reviews = {
                userId : userId,
                text : review.reviewtext,
                visible : "true",
                flagged : "false"

            };

            var ratingsandreviews = {
                ratings : ratings,
                reviews : reviews
            };
                UserService
                     .submitRatingReview(userId,rateandreview)
                     .then(function (response) {
                         var addedReview = response.data;
                         if(addedReview){
                             $location.url("/movie/"+ tmdbId);
                         }else{
                             vm.error = "unable to add review";
                         }
                     });
                MovieService
                    .submitMovieRatingReview(tmdbId,ratingsandreviews)
                    .then(function (response) {
                        var addedReview = response.data;
                        if(addedReview){
                            $location.url("/movie/"+ tmdbId);
                        }else{
                            vm.error = "unable to add review";
                        }
                });


        }








        /* get all move detals */
        function getMovieDetails() {
            TmdbApiService.findMovieByID(vm.id,
                function (response) {
                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                        response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    vm.movie = response;


                    vm.movie.criticsRating = response.vote_average / 2;
                    vm.movie.ratedByUsers = [];
                    vm.movie.reviewedByUsers = [];
                    var now = new Date();
                    var releaseDate = new Date(response.release_date);
                    if(now > releaseDate) {
                        vm.released = true;
                    }

                });
        }


    }

    
})();
