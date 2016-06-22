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
            .when("/movieinfo",{
                templateUrl: "views/main/movie-info.view.client.html"
            })
            .when("/profile",{
                templateUrl: "views/user/profile.view.client.html"
            })

            .when("/profileedit",{
                templateUrl: "views/user/profile-edit.view.client.html"
            })
            .when("/register",{
                templateUrl: "views/user/register.view.client.html"
            })

            .when("/login",{
                templateUrl: "views/user/login.view.client.html"
            })

            .when("/search",{
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
    }
})();