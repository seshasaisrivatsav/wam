
(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ] ;

    function PageService(){
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

        function createPage(pageId) {
            return widgets;
        }




    }
})();