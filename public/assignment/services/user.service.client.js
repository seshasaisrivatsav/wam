/* this makes it easier to maintain longterm rather than several */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

 

    function UserService() {
        /* provide an API that allows access to this thing */
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserByUsername: findUserByUsername,
            getRegisterError: getRegisterError
        };

        return api;
        /*functions are implemented below*/

        function createUser(user) {
            for (var i in users){
                if (users[i].username === user.username){
                    var err = "dupuid";
                    return err;
                  
                    //return "yes";
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
            var err = "uepw";
            return err;
         }

        function findUserById(userId) {
            for (var i in users){
                if(users[i]._id === userId){
                    return users[i];
//                    index = i;
                }
            } return null;
        }

        function findUserByUsername(username){
            for(var i in users){
                if (users[i].username === username){
                    return user[i];
                }
            }
            return null;
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

        function updateUser(userId, user){

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


        function deleteUser(userId){
            for(var i in users){
                if(users[i]._id===userId){
                    users.splice(i,1);
                    return true;
                }
            }
            return false;
        }


        /* Helper Functions */
            /* Login Page Error Control */
        function generateError(username, password) {

            for(var i in users){
                if(users[i].username === username &&
                    users[i].password !== password) {
                    return "Wrong Password. Wake Up!";
                }
            } return "Username doesn't exist !!!";

        }

            /*Register Page Error*/
        function getRegisterError(user){
            for(var i in users){
                if (users[i].username === user.username){
                    return "Username is already chosen. Either be creative or forget this.";

                }

            }
                return "the passwords do not match! Wake up";
         }






        


        // function createUser(user) {
        //     for (var i in users){
        //         if (users[i].username === user.username){
        //             return null;
        //         }
        //     }
        //
        //     if(user.password === user.vpassword){
        //         var newUser = {
        //             _id: (new Date()).getTime() + "",
        //             username: user.username,
        //             password: user.password
        //         };
        //         users.push(newUser);
        //         return newUser;
        //     }
        //     return null;
        //
        // }


    }
})();