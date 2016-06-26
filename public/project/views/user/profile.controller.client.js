(function(){
    angular
        .module("FilmNerd")
        .controller("ProfileController", ProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();


        if($rootScope.currentUser.admin === "true"){
            vm.admin = "true";
        }else {
            vm.nonadmin = "false";
        }
        
        
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }

    }


})();