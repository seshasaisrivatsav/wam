(function () {
    angular
        .module("FilmNerd")
        .controller("MovieInfoController",MovieInfoController);
    
    function MovieInfoController($routeParams, $rootScope, TmdbApiService, $sce, $location, MovieService, UserService) {
        var vm = this;

        vm.id = $routeParams.id;
        vm.reviewPage = reviewPage;
        vm.giveError = giveError;
        var submitted = false;
        vm.logout = logout;
        vm.reportReview = reportReview;
        vm.needtoLoginforProfile = needtoLoginforProfile;
       

        function reportReview(_id) {

            var reviewId = _id;
            var tmdbId = vm.id;
            
            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };
            // console.log(reviewId);
            // console.log(tmdbId);
            MovieService
                .reportReview(twoIds)
                .then(function (response) {
                    vm.reportReviewMessage = "reported this review. Our admin will look into this and make a decision to remove"
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong. Couldn't report this";
                    }
                );

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }


        var loggedInUserId = null;

        function init() {
            getMovieDetails();
            getMovieReviewsandRatings();
            //checkAlreadySubmitted(loggedInUserId, vm.id);
           getLoggedInUser();
        }
        return init();

        function  needtoLoginforProfile() {
            vm.givecheckoutusererror ="need to login to check out user's profiles";
        }

        function giveError() {
            vm.notLoggedInError = "You must login to leave ratings and reviews!";
        }
        
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
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


        // function reviewPage() {
        //         if(submitted) {
        //             vm.error = "You have already submitted a review!!";
        //         }
        //         else{
        //         $location.url("/movie/"+ vm.id +"/review");}
        //
        //
        // }
        
      

        function reviewPage() {
             
            UserService
                    .findUserById(loggedInUserId)
                    .then(function (response) {
                        var usersReviews = response.data.reviews;
                        for(var i in usersReviews){
                            if(usersReviews[i].tmdbId == vm.id){
                                vm.error = "Dear user, you have already submitted review!";

                                return;
                            }
                        }

                            $location.url("/movie/"+ vm.id +"/review");

                    });
            }



    }
})();
