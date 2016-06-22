(function () {
    angular
        .module("FilmNerd")
        .controller("searchController", searchController);

    function searchController (TmdbApiService) {

        var vm = this;
        
        vm.searchMovies = searchMovies;
        vm.genreName = genreName;



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
