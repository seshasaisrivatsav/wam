
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    /* John pappy's - declare APIs at top and write functions below */


    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        var newPage = {
            _id: (new Date()).getTime()+"",
            name: page.name,
            title: page.title,
            websiteId: websiteId
        }
        pages.push(newPage);
        res.send(newPage);

    }

    function findAllPagesForWebsite(req,res) {
        var websiteId = req.params.websiteId;

        var resultSet=[];
        for (var i in pages){
            if (pages[i].websiteId === websiteId){
                resultSet.push(pages[i]);
            }
        }
        res.send(resultSet);

    }
    function updatePage(req,res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for (var i in pages){
            if(pages[i]._id === pageId){
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.send(200);
            }
        }
        res.send(400);
    }
    function findPageById(req,res ) {
        var pageId = req.params.pageId;
        for (var i in pages){
            if (pages[i]._id === pageId){
                res.send(pages[i]);
            }
        } res.send({});
    }
    function deletePage(req,res) {
        var pageId = req.params.pageId;

        for (var i in pages){
            if (pages[i]._id === pageId){
                pages.splice(i,1);
                res.send(200);
            }
        }
        res.send(400);
    }



    function createWebsite(req,res) {
        var userId = req.params.userId;
        var website = req.body;

        website._id = (new Date()).getTime()+"";

        websites.push(website);

        res.send(website);

    }


    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        /*retrieves the websites in local websites array whose developerId matches the parameter userId */
        var resultSet = [];
        for (var i in websites){
            if (websites[i].developerId === userId) {
                resultSet.push(websites[i]);
            }
        }
        res.send(resultSet);


    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites){
            if(websites[i]._id === websiteId){
                res.send(websites[i]);

            }
        }
        //return null;
        res.send({});
    }

    function updateWebsite(req,res) {
        var websiteId = req.params.websiteId;
        var website  = req.body;
        for (var i in websites){
            if(websites[i]._id === websiteId){
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.send(200);
            }
        }
        res.send(400);
    }

    function deleteWebsite(req,res) {
        var websiteId = req.params.websiteId;
        for (var i in websites){
            if (websites[i]._id === websiteId){
                websites.splice(i, 1);
                res.send(200);
            }
        }
        res.send(400);

    }


};