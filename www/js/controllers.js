angular.module('starter.controllers', [])

  .controller('PageCtrl', PageController)
  .controller('AppCtrl', AppCtrl)
  ;

AppCtrl.$inject = ['$scope', 'pageService', '$ionicSideMenuDelegate', '$ionicPopup'];
PageController.$inject = ['$scope', '$stateParams', 'pageService', '$state', '$window'];

function AppCtrl($scope, pageService, $ionicSideMenuDelegate, $ionicPopup) {
  $scope.menuItems = [];
  init();

  function init() {
    pageService.getMenuItems().then(function (result) {
      $scope.menuItems = result.menu;
    });
  }
  $scope.showPopup = function (event) {
    var menuPopup = $ionicPopup.show({
      cssClass: 'menu',
      scope: $scope,
      template: '<a class="item " ng-repeat="item in menuItems" href="#/app/page/{{item.url}}" ng-click="closePopup()">{{item.header}}</a>',
      buttons: [{
        text: '<i class="icon ion-close"></i>'
      }]
    });
    $scope.closePopup = function () {
      menuPopup.close();
    };
  };



  $scope.showAlert = function (event) {
    $ionicPopup.alert({
      title: event.target.text,
      template: event.target.title
    });
  };
}

function PageController($scope, $stateParams, pageService, $state, $window) {
  $scope.templates = [];
  $scope.headerHide = true;
  var menus = [], pageUrl = $stateParams.pageUrl, pageWidth = $window.innerWidth, tapSideWidth = 20, prevNav = null, nextNav = null;
  $scope.templates = [
    {
      url: 'assets/pages/' + pageUrl + '.tpl.html'
    }
  ];
  $scope.header = "";
  $scope.onTapPage = function (event) {
    var touchX = event.gesture.center.pageX;
    if (touchX < pageWidth * (tapSideWidth / 100)) {
      if (prevNav != null) {
        $state.go('app.page', { pageUrl: prevNav });
      }
    }
    else if (touchX > pageWidth * ((100 - tapSideWidth) / 100)) {
      if (nextNav != null) {
        $state.go('app.page', { pageUrl: nextNav });
      }
    }
    else {
      $scope.headerHide = !$scope.headerHide;
    }
  }
  
  pageService.getMenuItems().then(function (result) {
    menus = result.menu;
    var menuItemIndex = 0;
    menus.forEach(function (element) {
      menuItemIndex++;
      if (pageUrl === element.url) {
        if (menuItemIndex > 1) {
          prevNav = menus[menuItemIndex - 2].url;
        }
        if (menuItemIndex < menus.length) {
          nextNav = menus[menuItemIndex].url;
        }
        $scope.header = element.header;
      }
    }, this);
  });

}