'use strict';

/**
 * @ngdoc overview
 * @name palacesApp
 * @description
 * # palacesApp
 *
 * Main module of the application.
 */
angular
  .module('palacesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'palacesApp.services',
    'ui.bootstrap',
    'LocalStorageModule',
    'ngMap'
  ])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('ls');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
  //      controller: 'CarruselCtrl',
  //      controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/onePalace', {
        templateUrl: 'views/onepalace.html',
        controller: 'OnepalaceCtrl',
        controllerAs: 'onePalace'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
//        controller: 'SearchCtrl',
//        controllerAs: 'search'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
