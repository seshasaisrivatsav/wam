(function () {
    angular
        .module("ExpApp")
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when("/forum",
                {
                    templateUrl:"./pages/forum.html"
                }
            )

    }
})();