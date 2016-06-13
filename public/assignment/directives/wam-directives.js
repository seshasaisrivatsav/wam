(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find(".container")
                .sortable({
                    axis: 'y',
                    handle: ".move-me",
                    start: function (event, ui) {
                        console.log("sorting started");
                        startIndex = ui.item.index();

                    },
                    stop: function (event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        data.reorderWidgets(startIndex, endIndex);
                    }

                })
        }

        return {
            //element is the templateUrl
            templateUrl : "views/widget/wam-sortable.view.client.html",
            scope : {
                data: "=" // "=name" which is declared in the view
            },
            link: linker //linker can be any name

        }
    }
})();