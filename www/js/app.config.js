angular.module('starter').config(config);

function config($stateProvider, $urlRouterProvider, $cordovaInAppBrowserProvider) {
  $stateProvider

    .state('appIndex', {
      url: '/app/appIndex',
      templateUrl: 'templates/app_index.html',
      controller: 'AppCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'AppCtrl'
        }
      }
    })
    .state('app.page', {
      url: '/page/:pageUrl',
      views: {
        'menuContent': {
          templateUrl: 'templates/page.html',
          controller: 'PageCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/page/js_intro');

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  document.addEventListener("deviceready", function () {

    $cordovaInAppBrowserProvider.setDefaultOptions(options)

  }, false);

}
