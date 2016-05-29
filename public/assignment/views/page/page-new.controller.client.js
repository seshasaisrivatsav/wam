(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController",NewPageController);

    /*we need $routeParams to know which user is creating the website*/
    /*we use location to navigate back s*/
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        
        vm.createPage =createPage;

        function createPage(page){
            
            var newPage = PageService.createPage(vm.websiteId, page);
            if(newPage){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }else{
                vm.error = "unable to create page";
            }

        }

    }
})();