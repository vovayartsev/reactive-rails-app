class AggregatedEventSource extends Rx.Subject {
  constructor(url) {
    super();

    this.source = new EventSource(url);
    this.state = {};

    this.source.addEventListener('row', (event) => {
      let data = JSON.parse(event.data);
      if (data.new_val) { // added or updated
        this.state[data.new_val.id] = data.new_val;
      } else { // deleted
        delete this.state[data.old_val.id];
      }

      this.onNext(_.values(this.state));
    });
  }
}
