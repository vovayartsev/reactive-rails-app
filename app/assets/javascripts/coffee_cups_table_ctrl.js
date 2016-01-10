'use stict';

angular.module('coffee').controller('CoffeeCupsTableCtrl', function(Cups) {
  this.sortedCups = function() {
    return _.sortByOrder(_.values(Cups), ['created_at'], ['desc']);
  }

  this.visible = function() {
    return _.any(Cups);
  }
});