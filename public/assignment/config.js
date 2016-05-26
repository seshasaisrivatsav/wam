/* Java script in IFFE*/


(function () {
    //we are going  to load the application/ Configure it
    // If you don't provide the array, [], then it is a read operation
    angular

        .module("WebAppMaker") //.module gives an angular object
        .config(Config);

    // the function is parsed by angular and angular can read what it is
    //this is inverse of control. we are not responsible for life time of this

    function Config($routeProvider) {
        $routeProvider
            .when("/login",{
                templateUrl : "views/user/login.view.client.html"
            })
            .when("/register",{
                templateUrl : "views/user/register.view.client.html"
            })
            .when("/profile",{
                templateUrl : "views/user/profile.view.client.html"
            });
    }
})();