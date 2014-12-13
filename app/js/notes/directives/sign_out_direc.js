'use strict';
//work in progress

module.exports = function(app) {
  app.directive('signOut', function(){
    return {
      restrict: 'EAC',
      templateUrl: 'templates/notes/directives/sign_out_form.html',
      scope: {signout: '='},
      controller: function($scope){
        console.log($scope.signout);
        $scope.signOut = function(){
          return $scope.jwt = null;
        }
      };
    };
  });
};
