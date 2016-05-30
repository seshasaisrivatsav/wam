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

        function createWebsite(website){
            var newWebsite = WebsiteService.createWebsite(vm.userId, website);
            if(newWebsite){
                $location.url("/user/"+vm.userId+"/website");
            }else{
                vm.error = "unable to create website";
            }

        }

    }
})();