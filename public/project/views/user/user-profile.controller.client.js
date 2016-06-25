(function(){
    angular
        .module("FilmNerd")
        .controller("UserProfileController", UserProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function UserProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        var username = $routeParams.username;
        vm.followUser = followUser;


        function init() {
            findUserByUsername();
            getLoggedInUser();
            alreadyFollowing()
        }
        return init();



        function alreadyFollowing() {
            UserService
                .findUserById($rootScope.currentUser._id)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    for (var i in userFollows) {
                        if (userFollows[i].username == username) {
                            vm.following = "true";
                            return;
                        }
                    }
                    vm.notfollowing = "true";

                });
        }



        function followUser() {

            UserService
                .findUserById($rootScope.currentUser._id)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    for(var i in userFollows){
                        if(userFollows[i].username == username){
                            vm.error = "Dear user, you are already following this user!";
                            return;
                        }
                    }

                    UserService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var returnedUser = response.data;
                            var userId = returnedUser._id;
                            var follows = {
                                userId : userId,
                                username : username
                            };

                            UserService
                                .followUser($rootScope.currentUser._id, follows)
                                .then(function (res) {
                                    var newUser = res.data;
                                    
                                    if (newUser){
                                        vm.success= "you are now following the user";
                                    }else{
                                        vm.error = "Something is wrong! you can follow this user"
                                    }
                                });
                        });

                });
        }


        // function followUse1() {
        //     UserService
        //         .findUserByUsername(username)
        //         .then(function (response) {
        //             var returnedUser = response.data;
        //             var userId = returnedUser._id;
        //             var follows = {
        //                 userId : userId,
        //                 username : username
        //             };
        //
        //             UserService
        //                 .followUser($rootScope.currentUser._id, follows)
        //                 .then(function (res) {
        //                     var newUser = res.data;
        //                     if (newUser){
        //                         vm.success= "you are now following the user";
        //                     }else{
        //                         vm.error = "Something is wrong! you can follow this user"
        //                     }
        //                 });
        //         });
        // }
        
        

        function findUserByUsername() {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.user = response.data;

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