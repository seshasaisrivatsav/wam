(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function RegisterController($location, UserService) {
        var vm = this;
        //vm.createUser = createUser;
        vm.register = register;
 
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
        
        function register(username, password) {
            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the fields";
                if(vm.myform.password !== vm.myform.vpassword){
                    vm.pwmatch = "entered passwords do not match!";
                }
            }else {
            UserService
                .register(username,password)
                .then(function (response) {
                        var user = response.data;
                        if(user){

                            $location.url("/user");
                        }

                    },
                    function (err) {
                        vm.error = err;
                    });
        }

        }
        // function createUser(user) {
        //   UserService
        //       .createUser(user)
        //       .then(function (res) {
        //           var newUser=res.data;
        //           switch (newUser){
        //               case "dupuid":
        //               {
        //                   return vm.error = "userId has been taken";
        //                   break;
        //               }
        //               case "uepw":
        //               {
        //
        //                   return vm.error = "pw no match";
        //                   break;
        //               }
        //               default:
        //                   $location.url("/user/"+newUser._id);
        //           }
        //       });
        //
        //     // if(typeof newUser === 'string'){
        //     //     vm.error = newUser;
        //     // }
        //
        //
        //
        // }
   }





})();