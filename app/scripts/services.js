'use strict';



angular.module('palacesApp.services',[])
  .value ('version','0.1')

  .factory ('factoryPalaces', ['$http',function ($http) {
    var palaces = [];
    $http.get ('http://localhost:9000/palaces.json')
      .success(function(data){
        palaces = data;
      })
      .error(function(data,status, headers, config){
        alert ("Ha fallado la carga. Status: " + status);
      });
      return{
        getPalaces : function(){
          return palaces;
        }
      };
  }])

  .service ('normalize',function(){
    this.textNormalized = function(texto){
      texto = texto.replace(/[áàäâ]/g, "a");
      texto = texto.replace(/[éèëê]/g, "e");
      texto = texto.replace(/[íìïî]/g, "i");
      texto = texto.replace(/[óòôö]/g, "o");
      texto = texto.replace(/[úùüü]/g, "u");
      texto = texto.toUpperCase();
      return texto;
    }
  })

  .service('indexSrvc', function() {
    return {name : ''};

  })
  .service('txtABuscar', function(){
    return {txt : ''};
  })

  .service('palacesSrvc', function(){
    return{palaces : null};
  })

  .service('palacesShowedSrvc', function(){
    return{palaces : null};
  })

  .service('mapBoundSrvc', function(){
    return {bounds : null};
  })

  .service('mapSrvc', function(){
    return {myMap:null};
  })

  .service('viewSearchSrvc', function(){
    return {isViewPalaces:null};
  })



  .service('noPalacesForCountrySrvc',function(){
    return {listCountries:null};
  });
