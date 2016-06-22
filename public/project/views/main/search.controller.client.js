(function () {
    angular
        .module("FilmNerd")
        .controller("searchController", searchController);

    function searchController (TmdbApiService, $routeParams, $location) {

        var vm = this;
        vm.searchMoviesfromSearchPage =searchMoviesfromSearchPage;
        

        vm.genreName = genreName;

        vm.movieName = $routeParams.movieName;
        var searchText = $routeParams.movieName;

        function init() {
            searchMovies(searchText);
            getGenres();
        }
        init();

        function searchMoviesfromSearchPage(searchText) {
            $location.url("/search/"+ searchText);
        }


        function searchMovies(searchText) {
            TmdbApiService
                .searchMovies(searchText)
                .then(function(response){
                        vm.movies = response.data.results;
                });
        }


        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
        }
  
        function getGenres() {
            TmdbApiService
                .getGenres()
                .then(function (response){
                    vm.genres = response.data.genres;
                })
        }

    }
})();
