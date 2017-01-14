'use strict';

/**
 * @ngdoc function
 * @name palacesApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the palacesApp
 */
angular.module('palacesApp')

.controller('MapCtrl',['NgMap','mapSrvc','mapBoundSrvc','txtABuscar','palacesSrvc',
  'factoryPalaces','$filter','normalize','palacesShowedSrvc','noPalacesForCountrySrvc','viewSearchSrvc',
      function(NgMap,mapSrvc,mapBoundSrvc,txtABuscar,palacesSrvc,factoryPalaces,$filter,normalize,palacesShowedSrvc,noPalacesForCountrySrvc,viewSearchSrvc) {
  var vm = this;
  vm.verPorPalacios = false;
  var palacesShowed = palacesShowedSrvc.palaces;
  var boundsOfMap = null;


  vm.cambiaVista = function(comboPalace){
    vm.verPorPalacios = true;
  }


  NgMap.getMap().then(function(map) {
    vm.map = map;
    if (palacesShowed == null){    // primera vez que se entra en la página de búsqueda
      vm.verPorPalacios = false;
      vm.map.setCenter({lat:0, lng: 0 });
      vm.map.zoom = 0;
    }
    mapSrvc.myMap = vm.map;
  });

  vm.showCity = function(event, p) {
    vm.selectedPalace = p;
    vm.map.showInfoWindow('myInfoWindow', this);
  };

  vm.hideInfo = function(event){
    vm.map.hideInfoWindow('myInfoWindow');
  };

  vm.setNewBounds = function(){
    var bounds = new google.maps.LatLngBounds();
    for (var p of palacesShowedSrvc.palaces){
      var coord = new google.maps.LatLng(p.coord[0], p.coord[1]);
      bounds. extend(coord);
      vm.map.fitBounds(bounds);
    }
  }

  vm.calculateNewBounds = function(){

    if (factoryPalaces.getPalaces().length != 0){
      palacesSrvc.palaces = factoryPalaces.getPalaces();
        palacesShowed = $filter('filter')(palacesSrvc.palaces,
        function (val){
        return normalize.textNormalized(val.name).includes(normalize.textNormalized(vm.address)) ||
               normalize.textNormalized(val.town).includes(normalize.textNormalized(vm.address)) ||
               normalize.textNormalized(val.country).includes(normalize.textNormalized(vm.address));
        }
      );
      palacesShowedSrvc.palaces = palacesShowed;
    }
    vm.setNewBounds();
    if (vm.map.getZoom() > 17)  // demasiado zoom
      vm.map.setZoom(17);
  }

  vm.addressChanged = function() {
    txtABuscar.txt = vm.address;
    vm.calculateNewBounds();
    vm.verPorPalacios = true;
  }


  vm.getNewBounds = function(){
    boundsOfMap = vm.map.getBounds();
  }

  vm.onBoundsChanged = function(){
    NgMap.getMap().then(function(evtMap) {
      vm.map = evtMap;
      vm.getNewBounds ();
      mapBoundSrvc.bounds = boundsOfMap;
      mapSrvc.myMap = vm.map;
    })
  }
}])

.controller('SearchCtrl',  ['$scope','factoryPalaces', 'indexSrvc','txtABuscar',
  'mapBoundSrvc','mapSrvc','palacesSrvc','normalize','noPalacesForCountrySrvc','viewSearchSrvc',
  function ($scope,factoryPalaces,indexSrvc,txtABuscar,mapBoundSrvc,mapSrvc,palacesSrvc,normalize,noPalacesForCountrySrvc,viewSearchSrvc) {

  var sc = this;

  sc.palaces = [];
  sc.busqueda = '';
  sc.map = mapSrvc.myMap;
  sc.listRate = ['5','4','3','2','1','0'];
  sc.rate = 0;
  sc.max = 5;
  sc.isReadonly = true;
  sc.palaces =  factoryPalaces.getPalaces();
  sc.countrySelected = "";
  sc.myFilter = txtABuscar.txt;
  sc.listRatesSelected = [false,false,false,false,false,false];
  sc.rateFilter = null;
  sc.listCountries = [[],[],[]];
  sc.listPalacesForCountry = [];
  sc.listCountriesToSelect = [];
  sc.listTowns = [];
  //sc.countriesSelected = "";
  sc.listCountriesSelected = null;
  sc.bounds = mapBoundSrvc.bounds;
  sc.listPalacesSelected = [];
  //var otroMap = sc.map.getCenter();

  sc.fillPalacesForCountries = function(){
    for (var i = 0;i < sc.palaces.length;i++){

    }
  }

  // Llenar un array de objetos con los palacios por paises ---------------------------------------------------------

  sc.fillListCountries = function(){

    for (var i = 0;i < sc.palaces.length ; i++){
      if (sc.listCountries[0].indexOf(sc.palaces[i].country) == -1){ // Es un nuevo pais
        sc.listCountries[0].push (sc.palaces[i].country);
        sc.listCountries[1].push (1);
        sc.listCountries[2].push (sc.palaces[i].picture);
      }else{
        sc.listCountries[1][sc.listCountries[0].indexOf(sc.palaces[i].country)] ++;
      }
    }
    sc.listCountriesToSelect = sc.listCountries[0].slice();
    sc.listCountriesToSelect.sort();
    for (var i=0;i < sc.listCountries[0].length;i++){
      var country = {country:sc.listCountries[0][i],totalPalaces:sc.listCountries[1][i],picture:sc.listCountries[2][i]};
      sc.listPalacesForCountry.push(country);
    }
    noPalacesForCountrySrvc.listPalaces = sc.listCountries;
  }

  sc.fillListCountries();

  // Llenar una array con las ciudades que tienen palacios  ---------------------------------------------------

  sc.fillListTowns = function(){
    var i=0;
    for (i = 0;i < sc.palaces.length ; i++){
      if (sc.listTowns.indexOf(sc.palaces[i].town) == -1){
        sc.listTowns.push (sc.palaces[i].town);
      }
    }
    sc.listTowns.sort();
  }
  sc.fillListTowns();


  sc.goToPalace = function(event,palace){
    indexSrvc.name = palace.name;
    location.href = '#/onePalace';
  }

  sc.setIndex = function(name){
    indexSrvc.name = name;
  };

  sc.selectCountry = function(comboPalace){
    sc.listCountriesSelected = [];
    sc.listCountriesSelected.push (comboPalace);
  }

  sc.customerFilter = function(value){
    var txtToLookUp = txtABuscar.txt;
    var listRatesSelectedIsNull = sc.listRatesSelected.indexOf(true) == -1;
//    var rateFilterIsNull = sc.rateFilter == null;
    var emptyListCountriesSelected = (sc.listCountriesSelected == null) || (sc.listCountriesSelected.length == 0);
    var isBoundNull = mapBoundSrvc.bounds == null;

    var countryIsOk = false;
    var rateIsOk = false;
    var txtIsOk = false;
    var mapIsOk = false;

    if (isBoundNull){
      mapIsOk = true;
    }else{
      mapIsOk = mapBoundSrvc.bounds.contains(new google.maps.LatLng(value.coord[0], value.coord[1]));
    }

    if (txtToLookUp == ''){
      txtIsOk = true;
    } else{
      txtIsOk =
        normalize.textNormalized(value.name).includes(normalize.textNormalized(txtToLookUp)) ||
        normalize.textNormalized(value.town).includes(normalize.textNormalized(txtToLookUp)) ||
        normalize.textNormalized(value.country).includes(normalize.textNormalized(txtToLookUp));
    }

    if (listRatesSelectedIsNull){
      rateIsOk = true;
    }else{
      rateIsOk = sc.listRatesSelected[sc.max - value.rate];
    }

    if (emptyListCountriesSelected){
      countryIsOk = true;
    }else{
      countryIsOk = sc.listCountriesSelected.indexOf(value.country) != -1;
    }

    if (rateIsOk && countryIsOk && mapIsOk && txtIsOk){
      return true;
    }else{
      return false;
    }

  };
}])


;
