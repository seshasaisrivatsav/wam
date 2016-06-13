
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

   function WidgetService($http){
    /* API is driven by the use cases*/
        var api =  {
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget : updateWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            reorderWidgets:reorderWidgets
        };
        return api;
        /*functions are implemented below*/

       function reorderWidgets(startIndex, endIndex, pageId) {
           var url = "/api/page/"+pageId+"/widget?start="+startIndex+"&end="+endIndex;
           return $http.put(url);
       }

        function createWidget(pageId, widget){
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, widget);                
        }


        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }


        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId,pageId, position) {
            var url = "/api/widget/"+widgetId+"?pageId="+pageId+"&postobedeleted="+position;
            return $http.delete(url);
        }
    }
})();