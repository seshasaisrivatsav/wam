(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */


    function LoginController($location, UserService){
        /* vm is view model. bound to instance of controller */
        /* we bind instance of controller to local variable vm. where ever we bind to VM, we are bound to instance of controller */
        var vm = this;


        // vm.login = function (username, password) {
        //     var user = UserService.findUserByCredentials (username, password);
        //     if (user){
        //         $location.url("/user/"+user._id);
        //     } else {
        //         vm.error = "User not found";
        //     }
        // }

        vm.login = function (username, password) {
            var user = UserService.findUserByCredentials (username, password);
             
            if(typeof user === 'string'){

                vm.error = user;
               // return true;

            }else{
                $location.url("/user/"+user._id);

            }
            console.log(user);
        }



}

})();