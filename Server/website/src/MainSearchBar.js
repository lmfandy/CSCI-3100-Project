class MainSearchBar extends React.Component {
  render() {
    return (
      <form className="p-3 mb-2 bg-dark text-white" onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Party Room Name"/>
        <input type="submit" value="Search" />
      </form>
    );
  }
}
