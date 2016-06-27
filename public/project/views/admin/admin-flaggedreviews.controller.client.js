(function () {
    angular
        .module("FilmNerd")
        .controller("AdminFlaggedReviewsController",AdminFlaggedReviewsController);

    function AdminFlaggedReviewsController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;

        vm.removeReview = removeReview;
        vm.donotremoveReview = donotremoveReview;


        function init() {
            getLoggedInUser();
            findFlaggedReviews();
        }
        init();



        function removeReview(_id, tmdbId) {
            var reviewId = _id;

            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            MovieService
                .removeReview(twoIds)
                .then(function (response) {
                        console.log("entered the func");
                        vm.reportReviewMessage = "removed the review";
                        findFlaggedReviews();
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong. will report this";
                    }
                );
        }



        function donotremoveReview(_id, tmdbId) {
            var reviewId = _id;

            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            MovieService
                .donotremoveReview(twoIds)
                .then(function (response) {
                        vm.reportReviewMessage = "everything is okay review";
                        findFlaggedReviews();
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong. will report this";
                    }
                );
        }


        function findFlaggedReviews() {
            MovieService
                .findAllMovies()
                .then(function (response) {
                    var allMovies = response.data;
                    var resultset=[];
                    for(var i in allMovies){
                     for(var j in allMovies[i].reviews){

                         allMovies[i].reviews[j].tmdbId = allMovies[i].tmdbId;
                         allMovies[i].reviews[j].title= allMovies[i].title;
                         resultset.push(allMovies[i].reviews[j]);
                     }
                    }

                    vm.results = resultset;
                    
                    return resultset;


                });
        }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }

    }
})();