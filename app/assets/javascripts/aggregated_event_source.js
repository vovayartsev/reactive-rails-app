(function() {
  "use strict";

  function AggregatedEventSource(url) {
    this.stream = {}; //TODO
  }

  AggregatedEventSource.prototype.subscribe = function (callback) {
    setTimeout(function() {
      callback({name: 'Vova'});
    }, 3000);
  };

  window.AggregatedEventSource = AggregatedEventSource;
})();

