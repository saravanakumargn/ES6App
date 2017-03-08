// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'hljs'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    ionic.Platform.fullScreen();
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
var admobid = {};
        if (/(android)/i.test(navigator.userAgent)) {
      admobId = {
        banner: 'ca-app-pub-2445138966914411/1193165206',
        interstitial: 'ca-app-pub-2445138966914411/6262493201'
      };
    }
    else {
      admobId = {
        banner: 'ca-app-pub-2445138966914411/1193165206',
        interstitial: 'ca-app-pub-2445138966914411/6262493201'
      };
    }

    if(window.AdMob) window.AdMob.createBanner({
  adId: admobid.banner,
  position: AdMob.AD_POSITION.TOP_CENTER,
  autoShow: true });
    
  });
})
.filter('highlight', function($sce) {
  return function(input, lang) {
    if (lang && input) return hljs.highlight(lang, input).value;
    return input;
  }
}).filter('unsafe', function($sce) { return $sce.trustAsHtml; })
;