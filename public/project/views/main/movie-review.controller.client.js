(function () {
    angular
        .module("FilmNerd")
        .controller("MovieReviewController",MovieReviewController);

    function MovieReviewController($routeParams) {

        var vm = this;

        vm.id = $routeParams.id;




    }

    
})();
