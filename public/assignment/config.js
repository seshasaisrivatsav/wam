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
            .when("/user",{
                templateUrl :"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            /* Website */
            .when("/user/:userId/website",{
                templateUrl :"views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/new",{
                templateUrl :"views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId",{
                templateUrl :"views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            /* Page */
            .when("/user/:userId/website/:websiteId/page",{
                templateUrl :"views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/new",{
                templateUrl :"views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }   
            })
            .when("/user/:userId/website/:websiteId/page/:pageId",{
                templateUrl :"views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })


            /* Widget */
            .when("/user/:userId/website/:websiteId/page/:pageId/widget",{
                templateUrl :"views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new",{
                templateUrl :"views/widget/widget-choose.view.client.html",
                controller: "WidgetChooseController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId",{
                templateUrl :"views/widget/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }

            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr",{
                templateUrl :"views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }

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


        // $q is part of angularlibrary used to handle promises(asynchronous calls)
        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            //deferred obj has promise
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if(user=='0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");  
                });

            return deferred.promise;
        }
    }
})();