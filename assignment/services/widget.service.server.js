
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){

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
    /* John pappy's - declare APIs at top and write functions below */


    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

    function createWidget (req,res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgets.push(widget);
        /* return true only if the JSON object is inserted */
        res.send(200);
    }
    function findAllWidgetsForPage (req,res) {
    var pageId = req.params.pageId;

        var resultSet = [];
        for(var i in widgets){
            if(widgets[i].pageId === pageId){
                resultSet.push(widgets[i]);
            }
        } res.send(resultSet);
    }
    function findWidgetById (req,res) {
        var widgetId  = req.params.widgetId;
        for(var i in widgets){
            if(widgetId === widgets[i]._id){
                res.send(widgets[i]);
            }
        }
    }
    function updateWidget (req,res) {
        var widgetId  = req.params.widgetId;
        var widget = req.body;

        for(var i in widgets){
            if(widgetId === widgets[i]._id){
                switch (widget.widgetType){
                    case "HEADER":
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].size = widget.size;
                        res.send(200);

                    case "IMAGE":
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                        widgets[i].file = widget.file;
                        res.send(200);

                    case "YOUTUBE":
                        widgets[i].name = widget.name;
                        widgets[i].text = widget.text;
                        widgets[i].url = widget.url;
                        widgets[i].width = widget.width;
                        res.send(200);
                }

            }
        }
        res.send(400);
    }
    function deleteWidget (req,res) {
        var widgetId  = req.params.widgetId;
        for(var i in widgets){
            if(widgetId === widgets[i]._id){
                widgets.splice(i,1);
                res.send(200);
            }
        }
        res.sendStatus(400);

    }
    
    
    
    



};