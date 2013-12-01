function LayerController($scope) {
	$scope.layers = [];
  $scope.selectedIndex;

	$scope.addLayer = function (type) {
    if (type == "Button") {
      $scope.layers.push({
      "name":{"placeholder":"Untitled", "custom":"Label"},
      "type":type,
      "nameChanged":false,
    });
    } else {
      $scope.layers.push({
      "name":{"placeholder":"Untitled", "custom":""},
      "type":type,
      "nameChanged":false,
    })}

      $scope.selectedIndex = $scope.layers.length-1;
	};

  $scope.removeLayer = function (index) {
    $scope.layers.splice(index, 1);
    $scope.selectedIndex = index;
  }

  $scope.selectCell = function (index) {
    console.log(index);
    $scope.selectedIndex = index;
  }

  key('alt + down', function(){ 
    $scope.addLayer("Rectangle");
    $scope.$apply();
  });

  key('backspace', function(){ 
    $scope.removeLayer($scope.selectedIndex);
    $scope.$apply();
  });
}

angular.module('antetypeApp', ['myDirectives', 'draggableModule']);


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

angular.module('draggableModule', []).
directive('draggable', ['$document' , function($document) {
  return {
    restrict: 'A',
    link: function(scope, elm, attrs) {
      var startX, startY, initialMouseX, initialMouseY;
      elm.css({position: 'absolute'});
      elm.addClass("ui-draggable");

      elm.bind('mousedown', function($event) {
        startX = elm.prop('offsetLeft');
        startY = elm.prop('offsetTop');
        initialMouseX = $event.clientX;
        initialMouseY = $event.clientY;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        return false;
      });

      function mousemove($event) {
        var dx = $event.clientX - initialMouseX;
        var dy = $event.clientY - initialMouseY;
        elm.css({
          top:  startY + dy + 'px',
          left: startX + dx + 'px'
        });
        return false;
      }

      function mouseup() {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
    }
  };
}]);