(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function LoginController(){
        /* vm is view model. bound to instance of controller */
        /* we bind instance of controller to local variable vm. where ever we bind to VM, we are bound to instance of controller */
        var vm = this;

var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
];
        vm.login = function (username, password) {
            for(var i in users){
                if (users[i].username ===username
                    &&users[i].password=== password){
                console.log("Yay");
                }else{
                    vm.error="User not found";
                }

            }
        }
}

})();