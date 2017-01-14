'use strict';

angular.module('palacesApp')
  .controller('indexCtrl', ['$scope','txtABuscar','factoryPalaces','palacesSrvc',function ($scope,txtABuscar,factoryPalaces,palacesSrvc) {

    $scope.texto = '';
    var palaces = factoryPalaces.getPalaces();

    palacesSrvc.palaces = palaces;

    $scope.buscarClick=function(){

      txtABuscar.txt = $scope.texto;

      location.href = '#/search.html';
    };

  }]);
