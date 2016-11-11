angular.module('starter.controllers', [])

  .controller('PageCtrl', PageController)
  .controller('AppCtrl', AppCtrl)
  ;

AppCtrl.$inject = ['$scope', 'pageService', '$ionicSideMenuDelegate', '$ionicPopup'];
PageController.$inject = ['$scope', '$stateParams', 'pageService'];

function AppCtrl($scope, pageService, $ionicSideMenuDelegate, $ionicPopup) {
  // console.log('AppCtrl');
  $scope.menuItems = [];
  // $scope.pageContent = '';
  //$scope.title = "eeee";
  // $scope.templates = [];
  init();
// $scope.header = 'element.header';
  // $scope.pageView = pageView;


  function init() {
    //$scope.pageId = "'assets/pages/js_home.tpl.html'";//'js_home';
    pageService.getMenuItems().then(function (result) {
      $scope.menuItems = result.menu;
      //console.log($scope.menuItems);
    });

    // $scope.templates = [
    //   { label: 'Home', url: 'assets/pages/js_home.tpl.html' }
    // ];

    // pageDefaultCall();
  }


  // function pageDefaultCall() {

  //   // $scope.addTemplate = function (name, url) {
  //   //   $scope.templates.push({ name: name, url: url });
  //   // };
  //   // pageView(
  //   //   {
  //   //     header: 'Home',
  //   //     url: 'js_home'
  //   //   }
  //   // );
  // }

  $scope.showAlert = function (event) {
    //console.log(event.target.text);
    //console.log(angular.element(document).find(title));
    $ionicPopup.alert({
      title: event.target.text,
      template: event.target.title
    });
  };

  // $scope.openLink = function (event) {
  //   // console.log("openLink");
  //   event.preventDefault();
  //   var link = event.target.href;
  //   var options = {
  //     location: 'yes',
  //     clearcache: 'no',
  //     toolbar: 'no'
  //   };
  //   // console.log("openBrowser");
  //   $cordovaInAppBrowser.open(link, '_blank', options)
  //     .then(function (event) {
  //       // success
  //     })
  //     .catch(function (event) {
  //       // error
  //     });

  //   // $scope.openBrowser = function () {

  //   // }
  // };
  // function pageView(param) {
  //   // console.log(param);
  //   $ionicSideMenuDelegate.toggleLeft();
  //   $scope.header = param.header;
  //   $scope.templates = [];
  //   $scope.templates = [
  //     {
  //       header: param.header,
  //       url: 'assets/pages/' + param.url + '.tpl.html'
  //     }
  //   ];


  // }
}

function PageController($scope, $stateParams, pageService) {
  // console.log('PageController');
  // console.log(angular.element(document).find('a'));
  $scope.templates = [];
  var menus = [], pageUrl = $stateParams.pageUrl;
  $scope.templates = [
    {
      //header: 'param.header',
      url: 'assets/pages/' + pageUrl + '.tpl.html'
    }
  ];
  $scope.header = "";

  pageService.getMenuItems().then(function (result) {
    menus = result.menu;
    //console.log($scope.menuItems);
    // console.log(menus);
    menus.forEach(function (element) {
      if (pageUrl === element.url) {
        //  console.log(element.header);
        $scope.header = element.header;
      }
    }, this);
  });

}