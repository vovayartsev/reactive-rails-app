class AggregatedEventSource {
  constructor() {
    this.stream = {};
  }

  subscribe(callback) {
    setTimeout(function () {
      callback({name: 'Vova'});
    }, 3000);
  }
}

