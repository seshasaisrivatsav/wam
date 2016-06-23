(function () {
    angular
        .module("FilmNerd")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider


            .when("/adminstats", {
                templateUrl: "views/admin/admin-stats.view.client.html"
            })

            .when("/admin",{
                templateUrl: "views/admin/create-admin.view.client.html"
            })

            .when("/movie/:id/review",{
                templateUrl: "views/main/movie-review.view.client.html",
                controller: "MovieReviewController",
                controllerAs: "model"

            })

            .when("/movie/:id",{
                templateUrl: "views/main/movie-info.view.client.html",
                controller: "MovieInfoController",
                controllerAs: "model"
            })

            .when("/moviedefault",{
                templateUrl : "views/main/movie-default.view.client.html",
                controller: "movieDefaultController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/user/profile.view.client.html",
                controller : "ProfileController",
                controllerAs: "model" ,
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/editprofile",{
                templateUrl: "views/user/profile-edit.view.client.html",
                controller : "ProfileEditController",
                controllerAs: "model" ,
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "views/user/register.view.client.html",
                controller : "RegisterController",
                controllerAs: "model"
            })

            .when("/login",{
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model"
            })

            .when("/search/:movieName",{
                templateUrl: "views/main/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })

            .when("/home", {
                templateUrl: "views/user/home.view.client.html"
            })
            .otherwise({
            templateUrl: "views/user/home.view.client.html"
        })

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