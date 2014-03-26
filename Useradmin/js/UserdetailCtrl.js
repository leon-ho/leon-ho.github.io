UseradminApp.controller('UserdetailCtrl', function($scope, $http, $routeParams) {
  
  $scope.session.activeTab = 'user';
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

  var noRolesSelectedMessage = 'Please select a role first!';
  $scope.rolesRequiredMessage = noRolesSelectedMessage;

  $scope.$watch('usersSelected', function(){
    $scope.rolesRequiredMessage = ($scope.rolesSelected) ? '' : noRolesSelectedMessage;
  });
  

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
