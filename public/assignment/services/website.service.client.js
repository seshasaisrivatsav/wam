
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
            for (var i in websites){
                if(websites[i]._id === websiteId){
                    return websites[i];

                }
            } return null;
        }
        
        function updateWebsite(websiteId, website){
            console.log(website);
            for (var i in websites){
                if(websites[i]._id === websiteId){
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for (var i in websites){
                if (websites[i]._id === websiteId){
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }


        // another way of writing it ??
        // function updateWebsite(websiteId, website){
        //     console.log(website);
        //
        //     if(website._id===findWebsiteById(websiteId)._id){
        //         website
        //     }
        //
        // }










    }
})();