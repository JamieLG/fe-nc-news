import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import Navigation from "./Navigation";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    allTopicsData: [],
    username: "grumpy19"
  };
  render() {
    return (
      <div className="topics">
        <Navigation />
        <h2>Topics</h2>
        {this.state.allTopicsData.length === 0 && (
          <img className="img.loading" src={loading} alt="loading gif"></img>
        )}
        <ol>
          {this.state.allTopicsData.map(topic => {
            return (
              <li>
                Title: <Link to={topic.slug}>{topic.slug}</Link>. Description:{" "}
                {topic.description}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  componentDidMount() {
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/topics")
      .then(response => {
        console.log(response.data);
        this.setState({ allTopicsData: response.data.topics });
      });
  }
}

export default Topics;
