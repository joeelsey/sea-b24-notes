'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('UsersController', function(){
  var $controllerConstructor;
  var $httpBackend;
  var $scope;
  var $location;
  var $cookies = {jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDg5ZDI2MmYwNjU4NzQ1MDJiODNjZjIiLCJleHAiOjE0MTgzMjIwMDE0NzZ9.FNSFnPIAQXs6KX3iwwW2KOUg3tLMfcF7Fo_pYi6cvzY '};

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $controllerConstructor = $controller;
  }));

  it('should be able to create a users controller', function(){
    var usersController = $controllerConstructor('UsersCtrl', {$scope: $scope});
    expect(typeof usersController).toBe('object');
  });

  describe('users tests', function(){
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
      $controllerConstructor('UsersCtrl', {$scope: $scope, $cookies: $cookies});
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create a user', function(){
      $httpBackend.expectPOST('/api/users').respond(200,{'email':'test@example.com','password':'foobar123','passwordConfirmation':'foobar123'});
      // $scope.newUser.email = 'test51@example.com';
      $scope.newUser.password = 'foobar123';
      $scope.newUser.passwordConfirmation = 'foobar123';

      $scope.signUp();
      $httpBackend.flush();

      expect($scope.newUser).toBeDefined();
    });
  });

});
