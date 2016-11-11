angular.module('starter.controllers', [])

  .controller('PageCtrl', PageController)
  .controller('AppCtrl', AppCtrl)
  ;

AppCtrl.$inject = ['$scope', 'pageService', '$ionicSideMenuDelegate', '$ionicPopup'];
PageController.$inject = ['$scope', '$stateParams', 'pageService'];

function AppCtrl($scope, pageService, $ionicSideMenuDelegate, $ionicPopup) {
  $scope.menuItems = [];
  init();

  function init() {
    pageService.getMenuItems().then(function (result) {
      $scope.menuItems = result.menu;
    });
  }

  $scope.showAlert = function (event) {
    $ionicPopup.alert({
      title: event.target.text,
      template: event.target.title
    });
  };
}

function PageController($scope, $stateParams, pageService) {
  $scope.templates = [];
  var menus = [], pageUrl = $stateParams.pageUrl;
  $scope.templates = [
    {
      url: 'assets/pages/' + pageUrl + '.tpl.html'
    }
  ];
  $scope.header = "";

  pageService.getMenuItems().then(function (result) {
    menus = result.menu;
    menus.forEach(function (element) {
      if (pageUrl === element.url) {
        $scope.header = element.header;
      }
    }, this);
  });

}