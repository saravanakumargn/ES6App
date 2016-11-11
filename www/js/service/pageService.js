angular.module('starter').factory('pageService', pageService);

pageService.$inject = ['$http', '$q'];

function pageService($http, $q) {

    function getMenuItems() {
        var deferred = $q.defer();
        $http.get('assets/menu.json').success(menuSuccess);
        function menuSuccess(data) {
            deferred.resolve(data);
            //console.log(data);
        }
        return deferred.promise;
    }

    // function getPages(param) {
    //     var deferred = $q.defer();
    //     $http.get('assets/pages/' + param + '.tpl.html').success(pageSuccess).error(pageError);
    //     function pageSuccess(data) {
    //         deferred.resolve(data);
    //     }
    //     function pageError(msg, code) {
    //         //console.log(msg, code);
    //         deferred.reject(msg);
    //     }
    //     return deferred.promise;
    // }

    return {
        getMenuItems: getMenuItems,
        //getPages: getPages
    }

}