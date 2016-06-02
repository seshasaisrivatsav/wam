(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $routeParams.userId;
        var userId = $routeParams.userId;
        /*it is good practice to declare initialization ina function. say init*/
        function init(){
           UserService
               .findUserById(userId)
               .then(function (response) {
                   vm.user = response.data;
               });
        }
       init();

        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/login");
                    }else{
                        vm.error = "can't delete you."
                    }
                });
        }

        function updateUser(user){
           UserService
               .updateUser(userId, user)
               .then(function (res) {
                   var updatedUser = res.data;
                   if (updatedUser){
                       vm.success="successfully updated!";
                   }else{
                       vm.error = "Some thing doesn't seem right here";
                   }
               });
        }
        
        

   }


})();