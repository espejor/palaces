'use strict';

describe('Controller: OnepalaceCtrl', function () {

  // load the controller's module
  beforeEach(module('palacesApp'));

  var OnepalaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OnepalaceCtrl = $controller('OnepalaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OnepalaceCtrl.awesomeThings.length).toBe(3);
  });
});
