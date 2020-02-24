import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";
import Comments from "./Comments";
import { Link } from "@reach/router";
import ArticlesSearchDropdown from "./ArticlesSearchDropdown";

class Articles extends Component {
  state = {
    articleData: [],
    sortBy: "created_at"
  };
  render() {
    return (
      <div class="articles">
        <Navigation />
        <h2>Articles</h2>
        <ArticlesSearchDropdown
          getArticleData={this.getArticleData}
          value={this.state.sortBy}
        />

        {this.state.articleData.length === 0 && (
          <img class="img.loading" src={loading} alt="loading gif"></img>
        )}
        <ol class="list">
          {this.state.articleData.map(article => {
            return (
              <li key={article.article_id} class="singleArticle">
                {this.state.sortBy} {article[this.state.sortBy]}
                <br></br> Title:
                <Link to={article.article_id.toString()}>{article.title}.</Link>
                Author: {article.author}
                <button
                  onClick={() => {
                    this.toggleComments(article.title);
                  }}
                >
                  {article.showComments ? "Hide Comments" : "Show Comments"}
                </button>
                <br></br>
                <button
                  onClick={() => {
                    this.articleVote(1, article.article_id);
                  }}
                >
                  Like
                </button>
                <button
                  onClick={() => {
                    this.articleVote(-1, article.article_id);
                  }}
                >
                  Dislike
                </button>
                {this.state.sortBy !== "votes" && <p>Votes: {article.votes}</p>}
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
    this.getArticleData();
  }

  getArticleData = (sortBy = "created_at") => {
    let topicId = this.props.uri.split("/")[2];
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles", {
        params: { topic: topicId, sort_by: sortBy }
      })
      .then(response => {
        this.setState({ articleData: response.data.articles, sortBy: sortBy });
      });
  };

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

  articleVote = (changeInVote, articleId) => {
    axios
      .patch(
        `https://jamie-backendapp.herokuapp.com/api/articles/${articleId}`,
        {
          inc_votes: changeInVote
        }
      )
      .then(response => {
        this.setState(currentState => {
          return {
            articleData: currentState.articleData.map(article => {
              if (article.article_id === articleId) {
                return { ...article, votes: response.data.article.votes };
              }
              return article;
            })
          };
        });
      });
  };
}

export default Articles;
