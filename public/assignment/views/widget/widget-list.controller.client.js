(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    /* you will need $routeParams to extract the page Id when you are implementing it */
    /* the below one just works for hard coded stuff */

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        /* based on the pageId, you have to retrieve widgets for that pageID */

         vm.pageId= $routeParams.pageId;
         vm.userId = $routeParams.userId;
       vm.websiteId = $routeParams.websiteId;
        

        var pageId = $routeParams.pageId;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.reorderWidgets= reorderWidgets;

        function reorderWidgets(startIndex, endIndex) {
            WidgetService
                .reorderWidgets(startIndex, endIndex, vm.pageId)
                .then(function (response) {
                    return "success";
                });
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }
 

        function init(){
            WidgetService.findWidgetsByPageId(pageId)
                .then(function (response) {
                    var rawList = response.data;
                    for (var i in rawList){
                        if (rawList[i].type === "IMAGE" ||
                            rawList[i].type === "YOUTUBE"){
                            rawList[i].width += "%";
                        }
                    }
                    
                    vm.widgets = rawList;

                    // $(".container")
                    //     .sortable({
                    //         axis: 'y'
                    //     });

                });
        //    vm.widgets = WidgetService.findWidgetsByPageId(pageId);
        }
        init();
    }



})();