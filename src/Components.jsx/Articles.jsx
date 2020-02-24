import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";
import Comments from "./Comments";
import { Router } from "@reach/router";

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
              <li key={article.article_id}>
                Title: {article.title}. Author: {article.author}
                <button
                  onClick={() => {
                    this.toggleComments(article.title);
                  }}
                >
                  Show Comments
                </button>
                {article.showComments === true && (
                  <Comments articleId={article.article_id} />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  componentDidMount() {
    let topicId = this.props.uri.split("/")[2];
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles", {
        params: { topic: topicId }
      })
      .then(response => {
        this.setState({ articleData: response.data.articles });
      });
  }

  toggleComments(articleTitle) {
    let newArticleData = this.state.articleData.map(article => {
      if (article.title === articleTitle) {
        if (article.showComments !== true) {
          return { ...article, showComments: true };
        }
        if (article.showComments === true) {
          return { ...article, showComments: false };
        }
      } else return article;
    });
    this.setState({ articleData: newArticleData });
  }
}

export default Articles;
