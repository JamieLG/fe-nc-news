import React, { Component } from "react";
import "./App.css";
import Header from "./Components.jsx/Header";
import Disclaimer from "./Components.jsx/Disclaimer";
import { Router } from "@reach/router";
import Topics from "./Components.jsx/Topics";
import Articles from "./Components.jsx/Articles";
import IndividualArticle from "./Components.jsx/IndividualArticle";
import Err from "./Components.jsx/Err";
import "typeface-roboto";
import Stats from "./Components.jsx/Stats";

class App extends Component {
  state = {
    loggedIn: true,
    username: "grumpy19"
  };
  render() {
    return (
      <div>
        <Header
          username={this.state.username}
          changeUsername={this.changeUsername}
          loggedIn={this.state.loggedIn}
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
}
export default App;
