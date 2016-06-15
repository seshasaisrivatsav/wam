/* this makes it easier to maintain longterm rather than several */

(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);




    function UserService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            findUserByUsername: findUserByUsername
        };

        return api;
        /*functions are implemented below*/

        
        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/login",user);

        }
        function findUserByCredentials(username, password){

            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);

         }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url ="/api/user?username="+username;
            return $http.get(url);

        }



        function updateUser(userId, user){
            var url="/api/user/"+userId;
            return $http.put(url, user);


        }


        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

        }


        /* Helper Functions */
            /* Login Page Error Control */
       

            /*Register Page Error*/







        


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