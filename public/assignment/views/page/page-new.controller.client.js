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
            if(vm.myform.$valid == false){
                vm.error = "Enter the name of the Page";
                vm.alert = "* Enter the Page name";
            }else{
                PageService.createPage(vm.websiteId, page)
                    .then(function (response) {
                        var newPage = response.data;
                        if(newPage){
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                        }else{
                            vm.error = "unable to create page";
                        }
                    });
            }


        }
     }
})();