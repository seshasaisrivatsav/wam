(function () {
    angular
        .module("FilmNerd")
        .factory("MovieService", MovieService);
    
    
    function MovieService($http) {
        
        var api = {
            findMovieById: findMovieById,
            updateRatingAndReview: updateRatingAndReview,
            createMovie : createMovie
        };
        
        return api;
        
        
        function findMovieById(tmdbId) {
            
            var url = "/api/project/moviecheck/" + tmdbId;
            return $http.get(url);
        }

        function updateRatingAndReview(tmdbId, ratingsandreviews) {
            var url = "/api/project/"+tmdbId+"/ratingsandreviews";
            return $http.put (url, ratingsandreviews);
        }

        function createMovie(movie){
            var url = "/api/project/movie";
            return $http.post(url,movie);
        }

    }
})();