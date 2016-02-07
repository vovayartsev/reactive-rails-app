var CupsList = React.createClass({
  getInitialState: function() {
    return {name: 'loading...'};
  },
  componentDidMount: function () {
    var self = this;
    this.stream = new AggregatedEventSource(this.props.url);
    this.stream.subscribe(function (newState) {
      self.setState(newState);
    });
  },
  render: function () {
    return (
      <div>Hello {this.state.name}</div>
    );
  }
});
