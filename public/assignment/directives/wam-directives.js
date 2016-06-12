(function () {
    angular
        .module("wamDirectives",[])
        .directive("wamSortable ",wamSortable);

    function wamSortable() {
        return {
            template : "these are my TODOs"
        }
    }
})();