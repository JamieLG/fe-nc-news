import React, { Component } from "react";
import axios from "axios";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";
import Comments from "./Comments";
import { Link } from "@reach/router";
import ArticlesSearchDropdown from "./ArticlesSearchDropdown";
import VoteButton from "./VoteButton";
import Err from "./Err";

class Articles extends Component {
  state = {
    error: undefined,
    articleData: [],
    sortBy: "created_at"
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div className="articles">
          <Navigation />
          <h2>Articles</h2>
          <ArticlesSearchDropdown
            getArticleData={this.getArticleData}
            value={this.state.sortBy}
          />

          {this.state.articleData.length === 0 && (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          )}
          <ol className="list">
            {this.state.articleData.map(article => {
              return (
                <>
                  <li key={article.article_id} className="singleArticle">
                    <p>
                      {this.state.sortBy} {article[this.state.sortBy]}
                    </p>
                    <p className="singleArticleAuthor">
                      Title:
                      <Link to={article.article_id.toString()}>
                        {article.title}.
                      </Link>
                    </p>
                    <br></br> <p>Author: {article.author}</p>
                    <div className="buttonContainer">
                      <button
                        className="commentsButton"
                        onClick={() => {
                          this.toggleComments(article.title);
                        }}
                      >
                        {article.showComments
                          ? "Hide Comments"
                          : "Show Comments"}
                      </button>
                      <VoteButton
                        function={this.articleVote}
                        value={article.article_id}
                      />

                      {this.state.sortBy !== "votes" && (
                        <p>Votes: {article.votes}</p>
                      )}
                    </div>
                    {article.showComments === true && (
                      <Comments articleId={article.article_id} />
                    )}
                  </li>
                  <br></br>
                </>
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
      .get("https://jamie-backendapp.herokuapp.com/api/articles/", {
        params: { topic: topicId, sort_by: sortBy }
      })
      .then(response => {
        this.setState({ articleData: response.data.articles, sortBy: sortBy });
      })
      .catch(err => {
        this.setState({ error: err });
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
      }
      return article;
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
