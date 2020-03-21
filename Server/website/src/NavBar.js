class NavBar extends React.Component {
  render() {
    const LogoStyle = {
      background: no-repeat center fixed url('./photos/webLogo.png');
    }

    return (
      <div>
        <div id="webLogo"></div>
        <div>Login or Signup</div>
      </div>
    );
  }
}

ReactDOM.render(
  <NavBar />,
  document.getElementById('navBar')
);
