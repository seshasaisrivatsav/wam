
(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]
        ;



    function WidgetService(){
    /* API is driven by the use cases*/
        var api =  {
            findWidgetsByPageId: findWidgetsByPageId,
            updateWidget : updateWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            createWidget: createWidget
        };
        return api;
        /*functions are implemented below*/

        function createWidget(pageId, widget){
            widgets.push(widget);
            /* return true only if the JSON object is inserted */
            return true;
        }


        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var i in widgets){
                if(widgets[i].pageId === pageId){
                    resultSet.push(widgets[i]);
                }
            } return resultSet;

        }


        function findWidgetById(widgetId) {
            for(var i in widgets){
                if(widgetId === widgets[i]._id){
                    return widgets[i];
                }
            }
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets){
                if(widgetId === widgets[i]._id){
                    switch (widget.widgetType){
                        case "HEADER":
                            widgets[i].name = widget.name;
                            widgets[i].text = widget.text;
                            widgets[i].size = widget.size;
                            return true;

                        case "IMAGE":
                            widgets[i].name = widget.name;
                            widgets[i].text = widget.text;
                            widgets[i].url = widget.url;
                            widgets[i].width = widget.width;
                            widgets[i].file = widget.file;
                            return true;

                        case "YOUTUBE":
                            widgets[i].name = widget.name;
                            widgets[i].text = widget.text;
                            widgets[i].url = widget.url;
                            widgets[i].width = widget.width;
                            return true;
                    }

                }
            }
            return false;
        }


        function deleteWidget(widgetId) {
            for(var i in widgets){
                if(widgetId === widgets[i]._id){
                    widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }


    }
})();