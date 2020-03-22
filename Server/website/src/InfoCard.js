class InfoCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: ''
    };
  }

  componentDidMount() {
    fetch("/info")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
            description: result.description
          });
        },
        (error) => {
          this.setState({
            name: 'error',
            description: 'error'
          });
        }
      )
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card mb-4 shadow-sm">
          <svg className="bd-placeholder-img card-img-top text-center" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><title>{this.name}</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">{this.state.name}</text></svg>
          <div className="card-body" style={{height: "200px"}}>
            <p className="card-text text-truncate">{this.state.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <InfoCard />,
  document.getElementById('InfoCardSection')
);
