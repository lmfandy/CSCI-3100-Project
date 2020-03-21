class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
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
      <form className="p-3 mb-2 bg-dark text-white" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Party Room Name"/>
        <input type="submit" value="Search" />
      </form>
    );
  }
}

ReactDOM.render(
  <SearchBar />,
  document.getElementById('searchBar')
);
