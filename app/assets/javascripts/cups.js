//angular.module('coffee').factory('Cups', function ($rootScope) {
//  var cups = {};
//  var source = new EventSource('/coffee_cups.sse');
//
//  source.addEventListener('row', function (event) {
//    var data = JSON.parse(event.data);
//    $rootScope.$apply(function() {
//      if (data.new_val) { // added or updated
//        cups[data.new_val.id] = data.new_val;
//      } else { // deleted
//        delete cups[data.old_val.id];
//      }
//    });
//  });
//
//  return cups;
//});
