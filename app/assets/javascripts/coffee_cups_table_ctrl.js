'use stict';

angular.module('coffee').controller('CoffeeCupsTableCtrl', function(Cups) {
  this.cups = Cups;

  this.visible = function() {
    return Cups.length > 0;
  }
});