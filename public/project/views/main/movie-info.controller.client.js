(function () {
    angular
        .module("FilmNerd")
        .controller("MovieInfoController",MovieInfoController);
    
    function MovieInfoController($routeParams, TmdbApiService, $sce, $location, MovieService) {
        var vm = this;

        vm.id = $routeParams.id;

        vm.reviewPage = reviewPage;

        function init() {

            getMovieDetails();
            getMovieReviewsandRatings();

        }
        return init();


        function getMovieReviewsandRatings() {
            MovieService
                .findMovieById(vm.id)
                .then(function (response) {
                    vm.movieInfo = response.data;
                    var noOfRatings = vm.movieInfo.ratings.length;
                    var sumOfRatings = 0;
                    for (var i in vm.movieInfo.ratings){
                         var sumOfRatings = sumOfRatings + vm.movieInfo.ratings[i].value;
                    }
                    var avgRating = sumOfRatings/noOfRatings;
                    vm.avgRating = avgRating.toFixed(1);
                });
        }


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
        
        function reviewPage() {
            $location.url("/movie/"+ vm.id +"/review");
        }


    }
})();
