(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController",EditPageController);

    /*we need $routeParams to know which user is creating the website*/
    /*we use location to navigate back s*/
    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        var pageId =  $routeParams.pageId;

        vm.userId = $routeParams.userId;
        vm.websiteId= $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function  init() {
            vm.page = PageService.findPageById(pageId);
        }
        init();


        function deletePage(pageId){
            var result = PageService.deletePage(pageId);
            if(result){
                $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page");
            }else{
                vm.error = "unable to delete page";
            }
        }

        function updatePage(page){
            var result = PageService.updatePage(vm.pageId, page);
            if(result){
                $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page");
            } else{
                vm.error = "unable to modify page";
            }

        }




        
       

    }
})();