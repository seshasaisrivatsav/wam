/* this makes it easier to maintain longterm rather than several */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function UserService(){
    /* provide an API that allows access to this thing */
        var api =  {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername
        };
        return api;
        /*functions are implemented below*/

        function createUser(user){
        /* take a new object and push it into the array*/

        }

        function deleteUser(user){
        /* find the user by ID and splice it from the array */

        }
        function updateUser(userId, user){
            console.log(newUser);
            for (var i in users){
                if(users[i]._id === userId){
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    return true;
                }
            }
            return false;
        }

        function findUserById(uid) {
           for (var i in users){
                if(users[i]._id === uid){
                    return users[i];
                    index = i;
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
            return null;
        }
    }
})();