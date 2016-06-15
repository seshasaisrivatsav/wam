//we'dintegrate with passport. generate session, cookie
//we will use LOCAL STRATEGY of passport.js
// LocalStrategy = our datavase

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




/* unlike angular, if w e ask by name, we cant get it */
// we are passing models
module.exports= function(app, models){

   var userModel = models.userModel;

    /* John pappy's - declare APIs at top and write functions below */
    app.get("/api/user", getUsers);
    app.post("/api/login",login); //created afer introduction of sessions/passport
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

    function login ( req, res){

        var username = req.body.username;
        var password  = req.body.password;
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {



                    req.session.currentUser= user;


                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });

    }


     
    function createUser(req,res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function(user){
                    console.log(user);
                    res.json(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            )


        // for (var i in users){
        //     if (users[i].username === user.username){
        //         var err = "dupuid";
        //         res.send(err);
        //
        //         //return "yes";
        //     }
        // }

        // if(user.password === user.vpassword){
        //
        //     //     user._id = (new Date()).getTime() + "";
        //     //
        //     // users.push(user);
        //     // res.send(user);
        // }
        // var err = "uepw";
        // res.send(err);

    }



    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {
                console.log(stats);
                res.send(200);
            },
            function (error) {
                res.statusCode(404).send(error);
            });

        // for(var i in users){
        //     if(users[i]._id===userId){
        //         users.splice(i,1);
        //          console.log("deleted user");
        //         res.send(200); /* 200 - OK */
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function updateUser(req,res) {


        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

        // for (var i in users){
        //     if(users[i]._id === userId){
        //         users[i].firstName = user.firstName;
        //         users[i].lastName = user.lastName;
        //         users[i].email = user.email;
        //         res.send(200);
        //     }
        // }
        // res.send(400);
    }

     function findUserById(req, res){
         var id = req.params.userId;

         userModel
             .findUserById(id)
             .then(function (user) {
                 res.send(user);
             },
             function (error) {
                 res.statusCode(404).send(error);
             });
        // for (var i in users){
        //     if(users[i]._id === id){
        //         res.send(users[i]);
        //         return;
        //     }
        // } res.send({});
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password= req.query['password'];
 
        if(username && password){
            findUserByCredentials(username,password, req, res);
        } else if (username){
            findUserByUsername(username, res);
        }else {
            res.send(users);
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {



                req.session.currentUser= user;


                res.json(user);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
      //   for (var i in users){
      //       if(users[i].username === username &&
      //           users[i].password === password){
      //           res.send(users[i]);
      //           return;
      //       }
      //   }
      // //  res.send({});
      //   var user = generateError(username, password);
      //   res.send(user);
    }

    function findUserByUsername (username, res){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
        // for (var i in users){
        //     if(users[i].username === username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        //
        // var errMsg = generateError(username, password);
        // console.log(errMsg);
        // res.send(errMsg);
    }



    /* helper functions */
    function generateError(username, password) {

        for(var i in users){
            if(users[i].username === username &&
                users[i].password !== password) {
                return "Wrong Password. Wake Up!";
            }
        } return "Username doesn't exist !!!";

    }

    function getRegisterError(user){
        for(var i in users){
            if (users[i].username === user.username){
                return "Username is already chosen. Either be creative or forget this.";

            }

        }
        return "the passwords do not match! Wake up";
    }

};