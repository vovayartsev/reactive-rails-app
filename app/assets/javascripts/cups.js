angular.module('coffee').factory('Cups', function ($rootScope) {
  var cups = [];
  var source = new EventSource('/coffee_cups.sse');

  source.addEventListener('row', function (event) {
    var data = JSON.parse(event.data);

    $rootScope.$apply(function() {
      if (data.old_val) { // cup updated
        alert("TODO: implement update");
      } else {
        cups.unshift(data.new_val);
      };
    });
  });

  return cups;
});
