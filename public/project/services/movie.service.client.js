(function () {
    angular
        .module("FilmNerd")
        .factory("MovieService", MovieService);
    
    
    function MovieService($http) {
        
        var api = {
            findMovieById: findMovieById,
            updateRatingAndReview: updateRatingAndReview,
            createMovie : createMovie,
            reportReview: reportReview,
            findAllMovies: findAllMovies
        };
        
        return api;

        function reportReview(twoIds) {
            var url = "/api/project/reportreview";
            return $http.put(url, twoIds);
        }

        function findAllMovies() {
            var url = "/api/project/findallmovies";
            return $http.get(url);
        }
        
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