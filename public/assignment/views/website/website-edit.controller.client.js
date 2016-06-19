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
            WebsiteService
                .findWebsiteById(websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }

        init();


        function deleteWebsite(websiteId){
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                    var result = response.data;
                    if(result){
                        $location.url("/user/"+ vm.userId+"/website");
                    }else{
                        vm.error = "unable to delete website";
                    }
                });


        }

        function updateWebsite(website){
            if(vm.myform.$valid == false){
                vm.error = "Enter the name of the website";
                vm.alert = "* Enter the website name";
            }else{
                WebsiteService
                    .updateWebsite(websiteId, website)
                    .then(function (response) {
                        var result = response.data;
                        if(result){
                            $location.url("/user/"+ vm.userId +"/website");
                        } else{
                            vm.error = "unable to modify website";
                        }
                    });
            }




            // var result = WebsiteService.updateWebsite(websiteId, website);
            // if(result){
            //     $location.url("/user/"+ vm.userId +"/website");
            // } else{
            //     vm.error = "unable to modify website";
            // }

        }




        
       

    }
})();