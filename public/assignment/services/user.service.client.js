/* this makes it easier to maintain longterm rather than several */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"},
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"},
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi"}
    ];

    function UserService() {
        /* provide an API that allows access to this thing */
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
        };
        return api;
        /*functions are implemented below*/

        function createUser(user) {
            for (var i in users){
                if (users[i].username === user.username){
                    return null;
                }
            }

            if(user.password === user.vpassword){
                var newUser = {
                    _id: (new Date()).getTime() + "",
                    username: user.username,
                    password: user.password
                };
                users.push(newUser);
                return newUser;
            }
            return null;

        }




        function findUserByUsername(username){
            for(var i in users){
                if (users[i].username === username){
                    return user[i];
                }
            }
            return null;
        }

        function deleteUser(userId){
            for(var i in users){
                if(users[i]._id===userId){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }


        function updateUser(userId, user){
            console.log(user);
            for (var i in users){
                if(users[i]._id === userId){
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return true;
                }
            }
            return false;
        }
        
        function findUserById(userId) {
           for (var i in users){
                if(users[i]._id === userId){
                    return users[i];
//                    index = i;
                }
            } return null;
        }

        function findUserByCredentials(username, password){

            for(var i in users){
                if (users[i].username ===username
                    &&users[i].password=== password){
                    return users[i];
                }
            }

          var errMsg = generateError(username, password);
          return errMsg;
        }
        

        function generateError(username, password) {

            for(var i in users){
                if(users[i].username === username &&
                    users[i].password !== password) {
                    return "Wrong PW. BOO!";
                }
            } return "User doesn't exist!";

        }
    }
})();