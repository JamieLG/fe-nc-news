import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import Navigation from "./Navigation";
import { Link } from "@reach/router";
import Err from "./Err";

class Topics extends Component {
  state = {
    err: undefined,
    allTopicsData: [],
    username: "grumpy19"
  };
  render() {
    if (this.state.err !== undefined) {
      return <Err err={this.state.err} />;
    } else
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
                <li className="topicsListItem" key={topic.slug}>
                  Title:{" "}
                  <Link to={topic.slug}>
                    <button>{topic.slug}</button>
                  </Link>
                  . Description: {topic.description}
                </li>
              );
            })}
          </ol>
        </div>
      );
  }
  componentDidMount() {
    this.getTopicData();
  }

  getTopicData = () => {
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/topics")
      .then(response => {
        console.log(response.data);
        this.setState({ allTopicsData: response.data.topics });
      })
      .catch(err => {
        this.setState({ err });
      });
  };
}

export default Topics;
