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
      when('/about/', {
        templateUrl: 'template/about.html',
        controller: 'AboutCtrl'
      }).
      otherwise({
        redirectTo: '/user/'
      });
}]);

// "Global" variables
UseradminApp.controller('MainCtrl', function($scope, $routeParams) {
  $scope.conf = {
    lang: 'en',
    errors: []
  }
  $scope.session = {
    activeTab: 'user',
    foundUserList: []
  }
});

// TODO: Move to separate js-file
UseradminApp.controller('ApplicationsearchCtrl', function($scope) {
  $scope.session.activeTab = 'application';
});

// TODO: Move to separate js-file
UseradminApp.controller('AboutCtrl', function($scope) {
  $scope.session.activeTab = 'about';
});

// TODO: Move to separate js-file
UseradminApp.controller('AddroleCtrl', function($scope) {
});