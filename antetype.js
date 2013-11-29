function LayerController($scope) {
	$scope.layers = [];
  $scope.selectedIndex;

	$scope.addLayer = function (type) {
		$scope.layers.push({
			"name":{"placeholder":"Untitled " + type, "custom":""},
			"type":type,
			"nameChanged":false,
		});
	};

  $scope.selectCell = function (index) {
    console.log(index);
    $scope.selectedIndex = index;
  }
}

angular.module('antetypeApp', ['myDirectives']);


angular.module('myDirectives', []).
  directive('contenteditable', function () {
      return {
          restrict: 'A', // only activate on element attribute
          require: '?ngModel', // get a hold of NgModelController
          link: function (scope, element, attrs, ngModel) {
              if (!ngModel) return; // do nothing if no ng-model

              // Specify how UI should be updated
              ngModel.$render = function () {
                  element.html(ngModel.$viewValue || '');
              };

              // Listen for change events to enable binding
              element.on('blur keyup change', function () {
                  scope.$apply(readViewText);
              });

              // No need to initialize, AngularJS will initialize the text based on ng-model attribute

              // Write data to the model
              function readViewText() {
                  var html = element.html();
                  // When we clear the content editable the browser leaves a <br> behind
                  // If strip-br attribute is provided then we strip this out
                  if (attrs.stripBr && html == '<br>') {
                      html = '';
                  }
                  ngModel.$setViewValue(html);
              }
          }
      };
  });