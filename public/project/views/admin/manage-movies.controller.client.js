(function () {
    angular
        .module("FilmNerd")
        .controller("ManageMoviesController",ManageMoviesController);

    function ManageMoviesController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;
        
        vm.updateMovie = updateMovie;
        vm.deleteMovie = deleteMovie;

        function init() {
            getLoggedInUser();
            findAllMovies();
        }
        init();

        function deleteMovie(tmdbId, userId) {
            MovieService
                .deleteMovie(tmdbId,userId)
                .then(function (response) {
                    // var result= response.data;
                    // if(result){
                    //     $location.url("/managemovies");
                    // }else{
                    //     vm.error = "can't delete you."
                    // }
                    findAllMovies();
                });
        }

        function updateMovie(tmdbId, userId, visible, text) {
            var reviews = {
                userId: userId ,
                visible : visible,
                text : text
            };

            MovieService
                .updateMovie(tmdbId, reviews)
                .then(function (response) {
                    var addedObject = response.data;
                    if(addedObject){
                        $location.url("/managemovies");
                    }else{
                        vm.error = "unable to add review";
                    }
                });
            

        }


        function findAllMovies() {
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