(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var uid = $routeParams.uid;
        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            vm.user = UserService.findUserById(uid);
        }
       init();


        function updateUser(newUser){
            UserService.updateUser(userId, user);
           
        }

   }


})();