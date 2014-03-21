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
