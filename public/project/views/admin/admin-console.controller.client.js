(function () {
    angular
        .module("FilmNerd")
        .controller("AdminConsoleController",AdminConsoleController);
    
    function AdminConsoleController(TmdbApiService, $rootScope, $location, $sce, UserService) {
        var vm = this;



        function init() {

            getLoggedInUser();
        }
        return init();
        
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