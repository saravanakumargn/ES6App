angular.module('starter').config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.page', {
      url: '/page/:pageUrl',
      views: {
        'menuContent': {
          templateUrl: 'templates/page.html',
          controller: 'PageCtrl'
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/page/js_intro');
}