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
           PageService.findPageById(pageId)
               .then(function (response) {
                   vm.page = response.data ;

               });
        }
        init();


        function deletePage(pageId){
            PageService.deletePage(pageId)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page");
                    }else{
                        vm.error = "unable to delete page";
                    }
                });
            
        }

        function updatePage(page){
            if(vm.myform.$valid == false){
                vm.error = "Enter the name of the Page";
                vm.alert = "* Enter the Page name";
            }else{
                PageService.updatePage(vm.pageId, page)
                    .then (function (response) {
                        var result = response.data;
                        if(result){
                            $location.url("/user/"+ vm.userId+"/website/"+vm.websiteId+"/page");
                        } else{
                            vm.error = "unable to modify page";
                        }
                    });

            }



        }




        
       

    }
})();