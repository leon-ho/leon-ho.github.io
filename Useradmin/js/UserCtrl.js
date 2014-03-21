UseradminApp.controller('UserCtrl', function($scope, $http, $routeParams) {

  $scope.activeTab = 'user';

  $scope.users = [];
  $scope.usersSelected = false;
  var noUsersSelectedMessage = 'Please select a user first!';
  $scope.usersRequiredMessage = noUsersSelectedMessage;

  $scope.$watch('usersSelected', function(){
    $scope.usersRequiredMessage = ($scope.usersSelected) ? '' : noUsersSelectedMessage;
  });
  
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

});