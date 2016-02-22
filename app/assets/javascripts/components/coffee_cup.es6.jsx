class CoffeeCup extends React.Component {
  render() {
    var {cup} = this.props;
    var icon = (cup.status == 'ready') ? 'coffee' : 'wait';
    return (
      <div className="card">
        <div className="content">
          <i className={`right floated ${icon} icon`}></i>
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
  }
}
