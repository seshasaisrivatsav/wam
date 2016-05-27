
(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ]
        ;

    function WebsiteService(){
    /* API is driven by the use cases*/
        var api =  {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;
        /*functions are implemented below*/

        function createWebsite(userId, website){
        /* - adds the website parameter instance to the local websites array. The new website's developerId is set to the userId parameter*/

        }

        function findWebsitesByUser(userId){
           /*retrieves the websites in local websites array whose developerId matches the parameter userId */
            var resultSet = [];
            for (var i in websites){
                if (websites[i].developerId === userId) {
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }
        function findWebsiteById(websiteId){
        /* retrieves the website in local websites array whose _id matches the websiteId parameter*/

        }

        function updateWebsite(websiteId, website) {
            /*  updates the website in local websites array whose _id matches the websiteId parameter */

        }

        function deleteWebsite(websiteId) {
            /*  removes the website from local websites array whose _id matches the websiteId parameter */

        }

    }
})();