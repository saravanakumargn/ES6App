angular.module('starter.controllers', [])

  .controller('AppCtrl', AppCtrl)
  .controller('PageCtrl', PageController);

AppCtrl.$inject = ['$scope', 'pageService', '$ionicSideMenuDelegate', '$ionicPopup', '$state', '$ionicViewSwitcher', '$ionicHistory', '$http'];
PageController.$inject = ['$scope', '$stateParams', 'pageService', '$state', '$window', '$ionicViewSwitcher', '$ionicPopup'];

function AppCtrl($scope, pageService, $ionicSideMenuDelegate, $ionicPopup, $state, $ionicViewSwitcher, $ionicHistory, $http) {
  $scope.menuItems = [];
  init();

  function init() {
    pageService.getMenuItems().then(function (result) {
      $scope.menuItems = result.menu;
    });
    $http.get('https://raw.githubusercontent.com/saravanakumargn/ecmascriptapp/master/data/es6app.json')
      .then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        alert('111');
        console.log(response.data);
        // response.data.show = false;
        // console.log(response.data.show);
        response.data.desc = '<p>Kindly try ECMAScript full version.</p><a style="background-color: #4CAF50;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;" href="http://ionicframework.com/docs/api/service/$ionicPopover/">View App</a>';
        if (response.data.show) {
          $ionicPopup.alert({
            title: 'Try ECMAScript full version',
            template: response.data.desc,
            buttons: [{
              text: 'Check it later',
              onTap: function (e) {
                return true;
              }
            }]
          });
        }
      }, function errorCallback(response) {
        alert('2');
        alert(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
  }

  $scope.exitApp = function () {
    ionic.Platform.exitApp();
  };

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

function PageController($scope, $stateParams, pageService, $state, $window, $ionicViewSwitcher, $ionicPopup) {
  var menus = [],
    pageUrl = $stateParams.pageUrl,
    pageWidth = $window.innerWidth,
    tapSideWidth = 25,
    prevNav = null,
    nextNav = null,
    isNotesPopupShow = false;
  $scope.templates = [];
  $scope.templates = [{
    url: 'assets/pages/' + pageUrl + '.tpl.html'
  }];
  $scope.header = "";
  $scope.navDirectionSide = "back";


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
    if (isNotesPopupShow) {
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
