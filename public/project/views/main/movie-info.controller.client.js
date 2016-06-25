(function () {
    angular
        .module("FilmNerd")
        .controller("MovieInfoController",MovieInfoController);
    
    function MovieInfoController($routeParams, $rootScope, TmdbApiService, $sce, $location, MovieService, UserService) {
        var vm = this;

        vm.id = $routeParams.id;
        vm.reviewPage = reviewPage;
        var submitted = false;
        var loggedInUserId = $rootScope.currentUser._id;


        function init() {
            getMovieDetails();
            getMovieReviewsandRatings();
            checkAlreadySubmitted(loggedInUserId, vm.id);
            getLoggedInUser();
        }
        return init();
        
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;
                console.log(loggedInUserId + " from inside");
            } else {
                vm.notLoggedIn = "true";
            }
        }


        console.log(loggedInUserId + "from outside");

        function checkAlreadySubmitted(userId, tmdbId) {
            UserService
                .findUserById(loggedInUserId)
                .then(function (response) {
                     var usersReviews = response.data.reviews;
                        for(var i in usersReviews){
                        if(usersReviews[i].tmdbId == tmdbId){
                              submitted = true ;
                        }
                    }
                });
        }


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
            console.log(submitted);
                if(submitted) {
                    vm.error = "already submitted";
                }
                else{
                $location.url("/movie/"+ vm.id +"/review");}


        }


    }
})();
