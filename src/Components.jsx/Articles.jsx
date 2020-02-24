import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";

class Articles extends Component {
  state = {
    articleData: []
  };
  render() {
    return (
      <div class="articles">
        <Navigation />
        <h2>Articles</h2>
        {this.state.articleData.length === 0 && (
          <img class="img.loading" src={loading} alt="loading gif"></img>
        )}
        <ol>
          {this.state.articleData.map(article => {
            return (
              <li>
                Title: {article.title}. Author: {article.author}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  componentDidMount() {
    let topicId = this.props.uri.substr(1);
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles", {
        params: { topic: topicId }
      })
      .then(response => {
        this.setState({ articleData: response.data.articles });
      });
  }
}

export default Articles;
