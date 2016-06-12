(function () {
    angular
        .module("TestDirs", [])
        .directive("testingDir", testingDir);
    
    function testingDir() {
        return {
            template: "Please Work!!"
        }
    }
})();