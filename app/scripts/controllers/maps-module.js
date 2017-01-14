angular.module('palacesApp')
  .controller('MapCtrl', ['$scope','NgMap','txtABuscar','mapBoundSrvc', function ($scope,NgMap,txtABuscar,mapBoundSrvc) {
    var vm = this;
    vm.textoABuscar = '¿Qué deseas ver?';
    vm.placeChanged = function() {
      vm.place = this.getPlace();
      if (vm.place.geometry != undefined && vm.map != undefined){
        vm.map.setCenter(vm.place.geometry.location);
      }

    }
    vm.buscar = function(){

      NgMap.getMap().then(function(map) {
        vm.map = map;
        vm.map.zoom = 10;
    //    location.href = '#/search.html';
      });
    }
  }]);

/*

    var map;
    var busqueda = txtABuscar.txt;
    $scope.mapa = {
      center: null,
      zoom : 10
    };

    if (busqueda == ''){
      $scope.mapa.center = 'Spain';
      $scope.mapa.zoom = 5;
    }else{
      $scope.mapa.center = busqueda;
      $scope.mapa.zoom = 10;
    };

    var bounds = {
      NW : {
        lng : 0,
        lat : 0
      },
      SE : {
        lng : 0,
        lat : 0
      }
    };

    NgMap.getMap().then(function(evtMap) {
      map = evtMap;
      setNewBounds ();
      mapBoundSrvc.bounds = bounds;
    });


    $scope.placeChanged = function(){
      NgMap.getMap().then(function(evtMap) {
        map = evtMap;
        $scope.place = map.getPlace();
        map.setCenter($scope.place.geometry.location);
      });
    }

    setNewBounds = function(){
      bounds.NW.lng = map.getBounds().b.b;
      bounds.NW.lat = map.getBounds().f.b;
      bounds.SE.lng = map.getBounds().b.f;
      bounds.SE.lat = map.getBounds().f.f;
    }

    $scope.onBoundsChanged = function(){
      NgMap.getMap().then(function(evtMap) {
        map = evtMap;
        setNewBounds ();
        mapBoundSrvc.bounds = bounds;
      });
    }



// Esto hay que quitarlo de aquí
    $scope.marker = {
      position: $scope.mapa.center,
      icon: "icons/palace_blue.png"
    };

}]);*/
