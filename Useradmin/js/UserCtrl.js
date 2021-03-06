UseradminApp.controller('UserCtrl', function($scope, $http, $routeParams, Users) {

  $scope.session.activeTab = 'user';

  $scope.users = Users;

  var noUsersSelectedMessage = 'Please select a user first!';
  Users.requiredMessage = noUsersSelectedMessage;

  $scope.$watch('users.selected', function(){
    Users.requiredMessage = (Users.selected) ? '' : noUsersSelectedMessage;
  });
  
  $scope.loadApplications 

  $scope.searchUsers = function() {
    Users.search($scope.searchQuery);
  }

  $scope.clearAllApps = function() {
    console.log('Clear all');
    angular.forEach( Users.applications, function(el, index) {
      el.isSelected = false;
    });
  }

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

  $scope.activateUserDetail = function(username) {
    console.log('Activating user detail...', username);
    $scope.getUserByUsername(username, function(data){
      $('#userdetail').modal('show');
      $scope.user = data;
    });
  }

  $scope.newUserDetail = function() {
    $('#userdetail').modal('show');
  }

  $scope.addRoleForUsers = function() {
    console.log('Adding roles for users...');
    $('#addrole').modal('show');
  }

  function init() {
    Users
    .search()
    .loadApplications(); 
    $('.dropdown-menu').click(function(e) {
      e.stopPropagation();
    });
  }

  if(Users.list.length<1) {
    init();
  }

});