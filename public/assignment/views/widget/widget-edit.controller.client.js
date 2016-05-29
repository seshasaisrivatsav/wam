(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    /* you will need $routeParams to extract the page Id when you are implementing it */
    /* the below one just works for hard coded stuff */

    function WidgetEditController($sce,$location, $routeParams, WidgetService) {
        var vm = this;
        /* based on the pageId, you have to retrieve widgets for that pageID */
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.widgetId = $routeParams.widgetId;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){

            vm.widget  = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(widget) {
            var result= WidgetService.updateWidget(vm.widgetId, widget);

            if(result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }else {
                vm.error = "Error";
            }

        }

        
        function deleteWidget(widget) {
            var result = WidgetService.deleteWidget(vm.widgetId);

            if (result){
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }else {
                vm.error = "Error";
            }
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }


    }
})();