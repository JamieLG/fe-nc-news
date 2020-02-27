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
    articlesVotedOn: {},
    articleData: [],
    sort: "created_at",
    order: "desc"
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div className="articles">
          <Navigation />
          <h2>Articles - {this.props.topic} </h2>
          <ArticlesSearchDropdown
            updateSearchParams={this.updateSearchParams}
            valueSort={this.state.sort}
            valueOrder={this.state.order}
          />
          {this.state.articleData.length === 0 && (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          )}
          <ol>
            {this.state.articleData.map(article => {
              return (
                <li key={article.article_id} className="singleArticle">
                  <p>
                    {this.state.sort} {article[this.state.sort]}
                  </p>
                  <p className="singleArticleAuthor">
                    Title:
                    <Link to={article.article_id.toString()}>
                      {article.title}.
                    </Link>
                  </p>
                  <p>Author: {article.author}</p>
                  <div className="buttonContainer">
                    <button
                      className="commentsButton"
                      onClick={() => {
                        this.toggleComments(article.title);
                      }}
                    >
                      {article.showComments ? "Hide Comments" : "Show Comments"}
                    </button>
                    {this.state.articlesVotedOn[article.article_id] === true ? (
                      <p className="alreadyVotedText">
                        You have already voted!
                      </p>
                    ) : (
                      <VoteButton
                        function={this.articleVote}
                        value={article.article_id}
                      />
                    )}

                    {this.state.sortBy !== "votes" && (
                      <p>Votes: {article.votes}</p>
                    )}
                  </div>
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

  updateSearchParams = (paramType, paramValue) => {
    this.setState({ [paramType]: paramValue });
  };

  getArticleData = () => {
    let topicId = this.props.uri.split("/")[2];
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles", {
        params: {
          topic: topicId,
          sort_by: this.state.sort,
          order: this.state.order
        }
      })
      .then(response => {
        this.setState({ articleData: response.data.articles });
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
            articlesVotedOn: {
              ...currentState.articlesVotedOn,
              [articleId]: true
            },
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.getArticleData();
    }
    if (prevState.order !== this.state.order) {
      this.getArticleData();
    }
  }
}

export default Articles;
