var UseradminApp = angular.module('UseradminApp', ['ngRoute', 'ngAnimate']);

UseradminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/user/', {
        templateUrl: 'templates/usersearch.html',
        controller: 'UserCtrl'
      }).
      when('/application/', {
        templateUrl: 'templates/applicationsearch.html',
        controller: 'ApplicationsearchCtrl'
      }).
      otherwise({
        redirectTo: '/user/'
      });
}]);

UseradminApp.controller('MainCtrl', function($scope, $routeParams) {
  $scope.activeTab = 'user';
  $scope.lang = 'en';
  $scope.users = [];
  $scope.usersSelected = false;
  $scope.errors = [];
});

UseradminApp.controller('UserCtrl', function($scope, $http, $routeParams) {

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

  $scope.getUserByUsername = function(username, callback) {
    console.log('Getting user by username:', username);
    $http({
      method: 'GET',
      url: 'json/user.json',
      params: {username:username}
    }).success(function(data){
      callback(data);
    });
  }

  $scope.searchUsers();
  $scope.loadApplications();

  $scope.activateUserDetail = function(username) {
    console.log('Activating user detail...', username);
    $scope.getUserByUsername(username, function(data){
      $('#userdetail').modal('show');
      $scope.user = data;
    });
  }

  console.log( $('button').tooltip({}) );

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

UseradminApp.directive('editableTr', function(){
  return {
    template: '<h1>LOL</h1>'
  }
});


UseradminApp.controller('ApplicationsearchCtrl', function($scope) {
  $scope.activeTab = 'application';
});

UseradminApp.directive('triStateCheckbox', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: { elements: '=', elementsSelected: '=' },
    template: '<input type="checkbox" ng-model="allChecked" ng-change="allCheckedChange()">',
    controller: function($scope, $element) {
      $scope.allCheckedChange = function() {
        if($scope.allChecked) {
          angular.forEach($scope.elements, function(el, index){
            el.isSelected = true;
          });
        } else {
          angular.forEach($scope.elements, function(el, index){
            el.isSelected = false;
          });
        }
      };
      $scope.$watch('elements', function() {
        var allSet = true, allClear = true;
        angular.forEach($scope.elements, function(el, index){
          if(el.isSelected) {
            allClear = false;
          } else {
            allSet = false;
          }
        });
        if(allSet) { 
          $scope.allChecked = true; 
          $element.prop('indeterminate', false);
        } else if(allClear) { 
          $scope.allChecked = false; 
          $element.prop('indeterminate', false);
        } else { 
          $scope.allChecked = false;
          $element.prop('indeterminate', true);
        }
        $scope.elementsSelected = !allClear;
        console.log($scope.elementsSelected);
      }, true);
    }
  };
});
