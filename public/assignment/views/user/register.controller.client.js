(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;
 
        // function createUser(user) {
        //     var newUser = UserService.createUser(user);
        //
        //     if(newUser){
        //         $location.url("/user/"+newUser._id);
        //     }
        //     else{
        //         vm.error="error creating User";
        //     }
        // }

        function createUser(user) {
            var newUser = UserService.createUser(user);

            // if(typeof newUser === 'string'){
            //     vm.error = newUser;
            // }

            switch (newUser){
                case "dupuid":
                {
                    return vm.error = "userId has been taken";
                    break;
                }
                case "uepw":
                {

                    return vm.error = "pw no match";
                    break;
                }
                default:
                    $location.url("/user/"+newUser._id);
            }


        }
   }





})();