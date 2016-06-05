
/* unlike angular, if w e ask by name, we cant get it */

module.exports= function(app){

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    ];


    /* John pappy's - declare APIs at top and write functions below */
    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

     
    function createUser(req,res) {
        var user = req.body;

        for (var i in users){
            if (users[i].username === user.username){
                var err = "dupuid";
                res.send(err);

                //return "yes";
            }
        }

        if(user.password === user.vpassword){

                user._id = (new Date()).getTime() + "";

            users.push(user);
            res.send(user);
        }
        var err = "uepw";
        res.send(err);

    }



    function deleteUser(req,res) {
        var userId = req.params.userId;
        for(var i in users){
            if(users[i]._id===userId){
                users.splice(i,1);
                 console.log("deleted user");
                res.send(200); /* 200 - OK */
                return;
            }
        }
        res.send(400);
    }

    function updateUser(req,res) {
        var userId = req.params.userId;
        var user = req.body;
        for (var i in users){
            if(users[i]._id === userId){
                users[i].firstName = user.firstName;
                users[i].lastName = user.lastName;
                users[i].email = user.email;
                res.send(200);
            }
        }
        res.send(400);
    }

    function findUserById(req, res){var id = req.params.userId;
       for (var i in users){
            if(users[i]._id === id){
                res.send(users[i]);
                return;
            }
        } res.send({});
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password= req.query['password'];
        console.log(username);
        console.log(password);
        if(username && password){
            findUserByCredentials(username,password, res);
        } else if (username){
            findUserByUsername(username, res);
        }else {
            res.send(users);
        }
    }

    function findUserByCredentials (username, password, res){
        for (var i in users){
            if(users[i].username === username &&
                users[i].password === password){
                res.send(users[i]);
                return;
            }
        }
      //  res.send({});
        var user = generateError(username, password);
        res.send(user);
    }

    function findUserByUsername (username, res){
        for (var i in users){
            if(users[i].username === username){
                res.send(users[i]);
                return;
            }
        }

        var errMsg = generateError(username, password);
        console.log(errMsg);
        res.send(errMsg);
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