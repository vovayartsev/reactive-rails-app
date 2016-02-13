class CupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: 'loading...'};
  }

  componentDidMount() {
    this.aggregator = new AggregatedEventSource(this.props.url);
    this.aggregator.subscribe(this.setState.bind(this));
  }

  render() {
    return (
      <div>Hello {this.state.name}</div>
    );
  }
}
