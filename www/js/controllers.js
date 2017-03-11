angular.module('starter.controllers', [])

  .controller('AppCtrl', AppCtrl)
  .controller('PageCtrl', PageController);

AppCtrl.$inject = ['$scope', 'pageService', '$ionicSideMenuDelegate', '$ionicPopup', '$state', '$ionicViewSwitcher', '$ionicHistory', '$http'];
PageController.$inject = ['$scope', '$stateParams', 'pageService', '$state', '$window', '$ionicViewSwitcher', '$ionicPopup', '$cordovaInAppBrowser'];

function AppCtrl($scope, pageService, $ionicSideMenuDelegate, $ionicPopup, $state, $ionicViewSwitcher, $ionicHistory, $http) {
  $scope.menuItems = [];
  init();

  function init() {
    pageService.getMenuItems().then(function (result) {
      $scope.menuItems = result.menu;
    });
  }

  // $scope.exitApp = function () {
  //   console.log('exitApp');
  //   ionic.Platform.exitApp();
  //   window.close();
  // };

  $scope.itemClick = function (url) {
    $ionicViewSwitcher.nextDirection('exit');
    $state.go('app.page', {
      pageUrl: url
    });
  };

  $scope.showPopup = function (event) {
    var menuPopup = $ionicPopup.show({
      cssClass: 'menu',
      scope: $scope,
      templateUrl: 'templates/app_index.html',
      buttons: []
    });
    $scope.closePopup = function () {
      menuPopup.close();
      $ionicViewSwitcher.nextDirection('exit');
    };
  };

}

function PageController($scope, $stateParams, pageService, $state, $window, $ionicViewSwitcher, $ionicPopup, $cordovaInAppBrowser) {
  var menus = [],
    pageUrl = $stateParams.pageUrl,
    pageWidth = $window.innerWidth,
    tapSideWidth = 25,
    prevNav = null,
    nextNav = null,
    isNotesPopupShow = false;
  isStoreButtonClick = false;
  $scope.templates = [];
  $scope.templates = [{
    url: 'assets/pages/' + pageUrl + '.tpl.html'
  }];
  $scope.header = "";
  $scope.navDirectionSide = "back";

  $scope.openStore = function (val) {
    var url = 'https://play.google.com/store/apps/details?id=org.saravanakumar.ecmascript';
    if (val == 2) {
      url = 'https://saravanakumargn.github.io/'
    }
    isStoreButtonClick = true;
    document.addEventListener("deviceready", function () {
      $cordovaInAppBrowser.open(url, '_system')
        .then(function (event) {
          isStoreButtonClick = true;
        })
        .catch(function (event) {
          isStoreButtonClick = true;
        });
    }, false);
  }

  $scope.showAlert = function (event) {
    isNotesPopupShow = true;
    $ionicPopup.alert({
      title: event.target.text,
      template: event.target.title,
      buttons: [{
        text: 'Cancel',
        onTap: function (e) {
          isNotesPopupShow = false;
          return true;
        }
      }]
    });
  };

  $scope.onTapPage = function (event) {
    if (isNotesPopupShow || isStoreButtonClick) {
      isStoreButtonClick = false;
      return true;
    }
    $scope.navDirectionSide = "forward";
    var touchX = event.gesture.center.pageX;
    if (touchX < pageWidth * (tapSideWidth / 100)) {
      if (prevNav != null) {
        $ionicViewSwitcher.nextDirection('back');
        $state.go('app.page', {
          pageUrl: prevNav
        });
      }
    } else if (touchX > pageWidth * ((100 - tapSideWidth) / 100)) {
      if (nextNav != null) {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('app.page', {
          pageUrl: nextNav
        });
      }
    } else {
      // Include any tap functionality
    }
  };


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
