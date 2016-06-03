
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);



    function WebsiteService($http){
    /* API is driven by the use cases*/
        var api =  {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite
        };
        return api;
        /*functions are implemented below*/

        function createWebsite(userId, website){
            var url = "/api/user/"+userId+"/website";

            var newWebsite = {
                //ID is created in server side . dont know why
                name : website.name,
                description : website.description,
                developerId : userId };
            return $http.post(url,newWebsite);

        }

        function findWebsitesByUser(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);

        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);

        }
        
        function updateWebsite(websiteId, website){
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);

        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);

        }
    }
})();