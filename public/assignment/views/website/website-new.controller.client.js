(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController",NewWebsiteController);

    /*we need $routeParams to know which user is creating the website*/
    /*we use location to navigate back s*/
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite =createWebsite;
        
        /* we'd get website from ng-click in the controller*/
        function createWebsite(website){
            if(vm.myform.$valid == false){
                vm.error = "Enter the name of the website";
                vm.alert = "* Enter the website name";
            }else{
                WebsiteService
                    .createWebsite(vm.userId, website)
                    /* we'd get a promise from the service client */
                    .then(function (response) {
                        var newWebsite = response.data;
                        if(newWebsite){
                            $location.url("/user/"+vm.userId+"/website");
                        }else{
                            vm.error = "unable to create website";
                        }
                    });

            }
            
            // var newWebsite = WebsiteService.createWebsite(vm.userId, website);
            // if(newWebsite){
            //     $location.url("/user/"+vm.userId+"/website");
            // }else{
            //     vm.error = "unable to create website";
            // }

        }

    }
})();