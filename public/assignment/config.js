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

        /* User */
            .when("/login",{
                templateUrl :"views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .when("/register",{
                templateUrl : "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs : "model"

            })
            .when("/user/:userId",{
                templateUrl :"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })


            /* Website */
            .when("/user/:userId/website",{
                templateUrl :"views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/new",{
                templateUrl :"views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/website/:websiteId",{
                templateUrl :"views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })

            /* Page */
            .when("/user/:userId/website/:websiteId/page",{
                templateUrl :"views/page/page-list.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/new",{
                templateUrl :"views/page/page-new.view.client.html"
            })
            .when("/user/:userId/website/:websiteId/page/:pid",{
                templateUrl :"views/page/page-edit.view.client.html"
            })


            /* Widget */
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl :"views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new",{
                templateUrl :"views/widget/widget-choose.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl :"views/widget/widget-edit.view.client.html"

            })
            .when("/",{
                templateUrl :"views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })
            .otherwise({
                redirectTo: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            });

        
    }
})();