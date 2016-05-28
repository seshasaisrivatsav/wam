(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
 
        function createUser(user) {
            var newUser = UserService.createUser(user);

            if(newUser){
                $location.url("/user/"+newUser._id);
            }
            else{
                vm.error="error creating User";
            }
        }
   }





})();