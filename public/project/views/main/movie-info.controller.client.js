(function () {
    angular
        .module("FilmNerd")
        .controller("MovieInfoController",MovieInfoController);
    
    function MovieInfoController($routeParams, TmdbApiService, $sce) {
        var vm = this;

        vm.id = $routeParams.id;


        function init() {

            getMovieDetails();
        }

        return init();



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
                    // MovieService
                    //     .getMovieDetails(vm.movie.id)
                    //     .then(function (response) {
                    //         if (response.data) {
                    //             vm.movie.usersRating = parseFloat(response.data.totalRatings);
                    //             vm.movie.tempUserReviews = response.data.reviews;
                    //             vm.movie.ratings = response.data.ratings;
                    //             vm.movie.ratedByUsers = response.data.ratedByUsers;
                    //             vm.movie.reviewedByUsers = response.data.reviewedByUsers;
                    //             populateCriticReviews();
                    //         }
                    //     })
                });
        }


    }
})();
