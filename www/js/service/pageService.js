angular.module('starter').factory('pageService', pageService);

pageService.$inject = ['$http', '$q'];

function pageService($http, $q) {

    function getMenuItems() {
        var deferred = $q.defer();
        $http.get('assets/menu.json').success(menuSuccess);
        function menuSuccess(data) {
            deferred.resolve(data);
        }
        return deferred.promise;
    }

    return {
        getMenuItems: getMenuItems
    }

}