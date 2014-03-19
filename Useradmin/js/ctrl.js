var UseradminApp = angular.module('UseradminApp', ['ngRoute', 'ngAnimate']);

UseradminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/usersearch.html',
        controller: 'UsersearchCtrl'
      }).
      when('/user/:username', {
        templateUrl: 'templates/userdetail.html',
        controller: 'UserdetailCtrl'
      }).
      when('/application/', {
        templateUrl: 'templates/applicationsearch.html',
        controller: 'ApplicationsearchCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);

UseradminApp.controller('MainCtrl', function($scope, $routeParams) {
  $scope.activeTab = 'user';
  $scope.lang = 'en';
  $scope.users = [];
  $scope.errors = [];
});

UseradminApp.controller('UsersearchCtrl', function($scope, $http) {
  $scope.activeTab = 'user';
  
  $scope.loadApplications = function() {
    console.log('Searching for users...');
    $http({
      method: 'GET',
      url: 'json/applications.json'
    }).success(function (data) {
      $scope.applications = data.applications;
    });
  }

  $scope.searchUsers = function() {
    console.log('Searching for users...');
    $http({
      method: 'GET',
      url: 'json/users.json'
    }).success(function (data) {
      $scope.users = data.result;
    });
  };

  $scope.searchUsers();
  $scope.loadApplications();
 
});

UseradminApp.controller('UserdetailCtrl', function($scope, $http, $routeParams) {
  
  $scope.activeTab = 'user';
  $scope.editableUserProperties = [
    'firstName',
    'lastName',
    'email',
    'cellPhone'
  ];
  $scope.editableRoleProperties = [
    'applicationName',
    'organizationName',
    'roleName',
    'roleValue'
  ];
  $scope.dict = {
    en: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'E-mail',
      cellPhone: 'Cellphone',
      applicationName: 'Application',
      organizationName: 'Organization',
      roleName: 'Role',
      roleValue: 'Value'
    }
  }  
  $scope.getUserByUsername = function(username) {
    console.log('Getting user by username:', username);
    $http({
      method: 'GET',
      url: 'json/user.json',
      params: {username:username}
    }).success(function (data) {
      $scope.user = data;
    });
  }

  $scope.getUserByUsername($routeParams.username);

  function saveUser() {
    $http({
      method: 'GET',
      url: 'json/user.json',
      params: {jsond: JSON.stringify( $scope.user.identity ) }
    }).success(function(data){
      console.log('saved user', data);
    });
  }

});


UseradminApp.controller('ApplicationsearchCtrl', function($scope) {
  $scope.activeTab = 'application';
});

