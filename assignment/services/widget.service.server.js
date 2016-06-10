
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app, models){

    var widgetModel = models.widgetModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


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
    //UPLOAD
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */
    function uploadImage(req, res) {
         var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;


        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }


        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


        var widget = { url: "/uploads/"+filename};

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });


        // for (var i in widgets){
    //     if(widgets[i]._id === widgetId){
    //         widgets[i].url = "/uploads/"+filename;
    //
    //
    //     }
    // }

        res.redirect("/assignment/#/user/"+userId +"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }



    function createWidget (req,res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);

            }, function (err) {
                res.sendStatus(400).send(err);
            });

        // widgets.push(widget);
        // /* return true only if the JSON object is inserted */
        // res.send(200);
    }


    function findAllWidgetsForPage (req,res) {
    var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                    res.json(widgets);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });


        // var resultSet = [];
        // for(var i in widgets){
        //     if(widgets[i].pageId === pageId){
        //         resultSet.push(widgets[i]);
        //     }
        // } res.send(resultSet);
    }
    function findWidgetById (req,res) {
        var widgetId  = req.params.widgetId;
        
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
        // for(var i in widgets){
        //     if(widgetId === widgets[i]._id){
        //         res.send(widgets[i]);
        //     }
        // }
    }
    function updateWidget (req,res) {

        var widgetId  = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });



    }
    function deleteWidget (req,res) {
        var widgetId  = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then (function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });


    }


};