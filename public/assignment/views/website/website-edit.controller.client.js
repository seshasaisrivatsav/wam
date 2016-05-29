(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController",EditWebsiteController);

    /*we need $routeParams to know which user is creating the website*/
    /*we use location to navigate back s*/
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        var websiteId = $routeParams.websiteId;
        vm.userId = $routeParams.userId;
        vm.websiteId= websiteId;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function  init() {
            vm.website = WebsiteService.findWebsiteById(websiteId);
        }

        init();


        function deleteWebsite(websiteId){
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result){
                $location.url("/user/"+ vm.userId+"/website");
            }else{
                vm.error = "unable to delete website";
            }

        }

        function updateWebsite(website){
            var result = WebsiteService.updateWebsite(websiteId, website);
            if(result){
                $location.url("/user/"+ vm.userId +"/website");
            } else{
                vm.error = "unable to modify website";
            }

        }




        
       

    }
})();