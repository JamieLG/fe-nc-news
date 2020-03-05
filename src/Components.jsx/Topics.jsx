import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import Navigation from "./Navigation";
import { Link } from "@reach/router";
import Err from "./Err";
import Button from "@material-ui/core/Button";

class Topics extends Component {
  state = {
    error: undefined,
    allTopicsData: [],
    username: "grumpy19"
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div className="topics">
          <Navigation />
          <h2>Topics</h2>

          {this.state.allTopicsData.length === 0 && (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          )}
          <div>
            <ol className="topicsList">
              {this.state.allTopicsData.map(topic => {
                return (
                  <li className="topicsListItem" key={topic.slug}>
                    <Link to={topic.slug} topic={topic.slug}>
                      <Button variant="contained" color="primary">
                        {topic.slug}
                      </Button>
                    </Link>
                    {topic.description}
                  </li>
                );
              })}
            </ol>
          </div>
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
        this.setState({ allTopicsData: response.data.topics });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default Topics;
