UseradminApp.directive('triStateCheckbox', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: { elements: '=', elementsSelected: '=' },
    // IE9 doesn't trigger change-event when changing from indeterminate
    template: '<input type="checkbox" ng-model="allChecked" ng-change="allCheckedChange()">',
    controller: function($scope, $element) {
      $scope.allCheckedChange = function() {
        console.log('Tristate changed');
        angular.forEach($scope.elements, function(el, index){
          el.isSelected = $scope.allChecked;
        });
      };
      $scope.$watch('elements', function() {
        var allSet = true;
        var allClear = true;
        angular.forEach($scope.elements, function(el, index){
          if(el.isSelected) {
            allClear = false;
          } else {
            allSet = false;
          }
        });
        $scope.allChecked = allSet;
        $element.prop( 'indeterminate', !allSet && !allClear );
        $scope.elementsSelected = !allClear;
      }, true);
    }
  };
});