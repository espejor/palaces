'use strict';

/**
 * @ngdoc function
 * @name palacesApp.controller:OnepalaceCtrl
 * @description
 * # OnepalaceCtrl
 * Controller of the palacesApp
 */
angular.module('palacesApp')
  .controller('OnepalaceCtrl', ['$scope','factoryPalaces', 'indexSrvc','$filter',function ($scope,factoryPalaces,indexSrvc,$filter) {
    $scope.name = indexSrvc.name;
    $scope.onePalace = {};
    var palaces = factoryPalaces.getPalaces();
    var palace = $filter ('filter')(palaces,function(value){
      return value.name == $scope.name;
    })
    $scope.onePalace = palace[0];
    $scope.comments = $scope.onePalace.comments;
    $scope.noComments = $scope.onePalace.comments.length;

    $scope.getIndex=function(){
      $scope.name = indexSrvc.name;
    };
  }]);
