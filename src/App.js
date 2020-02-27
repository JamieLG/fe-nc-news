import React, { Component } from "react";
import "./App.css";
import Header from "./Components.jsx/Header";
import Disclaimer from "./Components.jsx/Disclaimer";
import { Router } from "@reach/router";
import Topics from "./Components.jsx/Topics";
import Articles from "./Components.jsx/Articles";
import IndividualArticle from "./Components.jsx/IndividualArticle";
import Err from "./Components.jsx/Err";
import Stats from "./Components.jsx/Stats";
import axios from "axios";

class App extends Component {
  state = {
    loggedIn: true,
    username: "grumpy19",
    avatar_url: "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
    name: ""
  };
  render() {
    return (
      <div>
        <Header
          username={this.state.username}
          changeUsername={this.changeUsername}
          loggedIn={this.state.loggedIn}
          avatar={this.state.avatar_url}
        />
        <Router>
          <Disclaimer path="/" />
          <Topics path="/topics" />
          <Articles path="/topics/:topic" />
          <IndividualArticle path="/topics/:topic/:id" />
          <Stats path="/stats" />
          <Err path="/*" />
        </Router>
      </div>
    );
  }
  changeUsername = (loggedIn, newUsername) => {
    this.setState({ username: newUsername, loggedIn: loggedIn });
  };
  componentDidMount() {
    // this.getUserData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.username !== this.state.username &&
      this.state.loggedIn === true
    ) {
      this.getUserData();
    }
  }

  getUserData = () => {
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/users/${this.state.username}`
      )
      .then(response => {
        console.log(response.data);
        console.log(this.setState);
        this.setState({
          avatar_url: response.data.user.avatar_url,
          name: response.data.user.name
        });
      });
  };
}
export default App;
