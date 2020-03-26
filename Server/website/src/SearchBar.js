class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', startDate: new Date()};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    alert('A party room name was submitted: ' + this.state.value);
    var data = {
      name: this.state.value
    }
    fetch("/search", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(data)
    })
    .then(function(response){
      return response.json();
    })
    .then(function(result){
      alert('The party room description:\n ' + result.description);
    });
    e.preventDefault();
  }

  render() {
    return (
      <form className="p-3 mb-2 bg-light text-dark" onSubmit={this.handleSubmit}>
        <div style={{padding: "0px 40px"}}>
          <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Party Room Name"/>
        </div>
        <div className="d-flex">
          <div className="flex-fill">
            <p>Date:
            <DatePicker selected={this.state.startDate} onChange={date => setStartDate(date)} />
            <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Party Room Name"/>
            </p>
            <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Party Room Name"/>
          </div>
          <div className="flex-fill">
          </div>
        </div>
      </form>
    );
  }
}

ReactDOM.render(
  <SearchBar />,
  document.getElementById('mainSearchBar')
);
