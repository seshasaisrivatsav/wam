(function () {
    angular
        .module("FilmNerd")
        .controller("AdminFlaggedReviewsController",AdminFlaggedReviewsController);

    function AdminFlaggedReviewsController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;



        function init() {

            getLoggedInUser();
            findFlaggedReviews();
        }
        return init();
        
        function findFlaggedReviews() {
            MovieService
                .findAllMovies()
                .then(function (response) {
                    var allMovies = response.data;
                    var resultset=[];
                    for(var i in allMovies){
                     for(var j in allMovies[i].reviews){
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