class CupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cups: []};

    let aggregator = new AggregatedEventSource(this.props.url);
    aggregator.subscribe((cups) => {
      this.setState({cups: _.sortBy(cups, dateSorter)});
    });

    // helper method
    function dateSorter(cup) {
      return -new Date(cup.created_at);
    }
  }

  render() {
    var {cups} = this.state;
    return (
      <ul>
        {cups.map((cup) => {
          return (<li key={cup.id}> {cup.kind} - {cup.status} </li>);
        })}
      </ul>
    );
  }
}
