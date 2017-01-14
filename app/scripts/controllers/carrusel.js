'use strict';

/**
 * @ngdoc function
 * @name palacesApp.controller:CarruselCtrl
 * @description
 * # MainCtrl
 * Controller of the palacesApp
 */
angular.module('palacesApp')
  .controller('CarruselCtrl', function ($scope) {
    $scope.setInterval = 4000;
    $scope.slides = [
      {
        title:'Beautiful palaces in the world',
        image:'/images/mostbeautifulpalace.jpg',
        text: 'Look up the most beautiful palaces you know'
      },
      {
        title:'Inside and outside',
        image:'/images/insidethepalace.jpg',
        text: 'You can see the most sumptouos halls and amazing gardens'
      },
      {
        title:'From Thailand ...',
        image:'/images/Grand_Palace-Bangkok.jpg',
        text: 'Palaces throughout the world'
      },
      {
        title:'... To Spain',
        image:'/images/lagranja.jpg',
        text: 'All kind of palaces'
      }
    ];
  });
