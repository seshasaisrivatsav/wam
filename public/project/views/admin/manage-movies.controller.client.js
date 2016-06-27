(function () {
    angular
        .module("FilmNerd")
        .controller("ManageMoviesController",ManageMoviesController);

    function ManageMoviesController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;



        function init() {
            getLoggedInUser();
            findAllMovies();
        }
        init();



        function findAllMovies() {
            MovieService
                .findAllMovies()
                .then(function (response) {
                    vm.movies = response.data;
                    vm.moviesCount = vm.movies.length;

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