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
    app.get("/api/loggedIn", loggedIn);
    app.post("/api/logout", logout);
    app.post('/api/login', passport.authenticate('wam'), login);//created afer introduction of sessions/passport
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

    // instead of wam if you use local in passport.authenticate, then you dont need to provide it here
    passport.use('wam', new LocalStrategy(localStrategy));

    //done - is to notify passport of success/failures

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                if(user){
                    done(null,user);
                }else {
                    done(null, false);
                  }
                },
                function(err) {
                    done(err);
                });
    }
    function login ( req, res){
        var user = req.user;
        res.json(user);
    }


    function logout(req, res) {
        //we're using function provided by passport
        req.logout();
        res.sendStatus(200); //success
    }

    function loggedIn(req,res) {

        //function given by passport
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            
            res.send('0');
        }
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