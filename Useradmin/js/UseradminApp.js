var UseradminApp = angular.module('UseradminApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap.tooltip']);

UseradminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/user/', {
        templateUrl: 'template/usersearch.html',
        controller: 'UserCtrl'
      }).
      when('/application/', {
        templateUrl: 'template/applicationsearch.html',
        controller: 'ApplicationsearchCtrl'
      }).
      otherwise({
        redirectTo: '/user/'
      });
}]);

// "Global" variables
UseradminApp.controller('MainCtrl', function($scope, $routeParams) {
  $scope.activeTab = 'user';
  $scope.lang = 'en';
  $scope.errors = [];
});

// TODO: Move to separate js-file
UseradminApp.controller('ApplicationsearchCtrl', function($scope) {
  $scope.activeTab = 'application';
});