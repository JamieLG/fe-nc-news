import React, { Component } from "react";

class Header extends Component {
  state = {
    inputBodyUsername: "",
    inputBodyPassword: ""
  };
  render() {
    return (
      <div className="header">
        <h1 className="headerHeading">NC-News</h1>
        {this.props.loggedIn === false ? (
          <div className="login">
            <form
              className="loginForm"
              onSubmit={() => {
                this.props.changeUsername(true, this.state.inputBodyUsername);
                this.clearUserPass();
              }}
            >
              <input
                className="loginInput"
                type="text"
                name="inputBodyUsername"
                value={this.state.inputBodyUsername}
                onChange={this.handleChange}
                placeholder="Username"
                required
              ></input>
              <input
                className="loginInput"
                type="text"
                name="inputBodyPassword"
                value={this.state.inputBodyPassword}
                onChange={this.handleChange}
                placeholder="Password"
                required
              ></input>

              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <div className="loggedInContainer">
            <div className="logout">
              <p>Username: {this.props.username}</p>
              <button
                className="logoutButton"
                onClick={() => {
                  this.props.changeUsername(false, "");
                }}
              >
                LogOut
              </button>
            </div>
            <img
              className="avatarImage"
              src="https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg"
              alt="user avatar"
            ></img>
          </div>
        )}
      </div>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  clearUserPass = () => {
    this.setState({ inputBodyUsername: "", inputBodyPassword: "" });
  };
}

export default Header;
