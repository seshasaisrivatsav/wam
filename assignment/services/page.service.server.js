
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    /* John pappy's - declare APIs at top and write functions below */


    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website",findAllWebsitesForUser);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

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