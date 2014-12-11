'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UsersController', function(){
  var $controllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a users controller', function(){
    var usersController = $controllerConstructor('UsersCtrl', {$scope : $scope});
    expect(typeof usersController).toBe('object');
  });

  
});
