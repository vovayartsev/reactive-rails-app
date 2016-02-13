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
      <div className="ui cards">
        {cups.map((cup) => {
          return (
            <div className="card" key={cup.id}>
              <div className="content">
                <i className="right floated coffee icon"></i>
                <div className="header"> {cup.kind} </div>
                <div className="meta">
                  <div className="ui tiny progress">
                    <div className="bar" style={{width: cup.percent + '%'}}></div>
                  </div>
                </div>
                <div className="description"> {cup.status} </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
