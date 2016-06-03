
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);


    function PageService($http){
    /* API is driven by the use cases*/
        var api =  {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;
        /*functions are implemented below*/

        function createPage(websiteId, page) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.post(url, page);
        }

     function findPageByWebsiteId(websiteId, page){
         var url = "/api/website/"+websiteId+"/page";
         return $http.get(url, page);

        }


        function findPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);

        }

        function updatePage(pageId, page){
            var url = "/api/page/" +pageId;
            return $http.put(url,page);


        }

        function deletePage(pageId){

            var url = "/api/page/" +pageId;
            return $http.delete(url);
    
        }


    }


})();