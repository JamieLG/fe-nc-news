import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import { Link } from "@reach/router";
import Err from "./Err";
import UserArticles from "./UserArticles";
import Articles from "./Articles";

class Stats extends Component {
  state = {
    error: undefined,
    articleData: [],
    sort: "created_at",
    order: "desc",
    topicCount: 0,
    usersArticlesToShow: undefined
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div className="articleStatPage">
          <Navigation />
          <h2>Stats</h2>
          {this.state.articleData.length === 0 ? (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          ) : (
            <div className="statsArticle">
              <ul>
                <li>Topic Count: {this.state.topicCount}</li>
                <li>Article count: {this.state.articleData.length}</li>
              </ul>

              <p>
                Most liked article:{" "}
                <Link
                  to={`/topics/${this.state.statsObj.articleHighest.topic}/${this.state.statsObj.articleHighest.article_id}`}
                >
                  {this.state.statsObj.articleHighest.title}
                </Link>{" "}
                Author: {this.state.statsObj.articleHighest.author} Votes:{" "}
                {this.state.statsObj.articleHighest.votes}
              </p>
              <p>
                Most disliked article:{" "}
                <Link
                  to={`/topics/${this.state.statsObj.articleLowest.topic}/${this.state.statsObj.articleLowest.article_id}`}
                >
                  {this.state.statsObj.articleLowest.title}
                </Link>
                , Author: {this.state.statsObj.articleLowest.author} Votes:{" "}
                {this.state.statsObj.articleLowest.votes}
              </p>
              <p>Users that have posted the most articles:</p>
              <p className="articleListByUser">
                {this.state.statsObj.usersPosting.map(user => {
                  return (
                    <p className="articlesByUserList" key={user[0]}>
                      <button onClick={() => this.setArticleUser(user[0])}>
                        show
                      </button>{" "}
                      Articles by {user[0]} : Total articles: {user[1]}{" "}
                    </p>
                  );
                })}
              </p>
              {this.state.usersArticlesToShow !== undefined && (
                <UserArticles
                  user={this.state.usersArticlesToShow}
                  hideArticles={this.hideArticles}
                />
              )}
            </div>
          )}
          <h2>All Articles</h2>
          <Articles dontShowNav="true" />
        </div>
      );
  }
  componentDidMount() {
    this.getArticleData();
  }

  setArticleUser = user => {
    this.setState({ usersArticlesToShow: user });
  };

  getArticleData = () => {
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles/", {
        params: { sort_by: this.state.sort, order: this.state.order }
      })
      .then(response => {
        let articleDataObj = {
          total: 0,
          votesHighest: { votes: -999 },
          votesLowest: { votes: 999 },
          usersPosting: {}
        };
        response.data.articles.forEach(article => {
          if (articleDataObj[article.topic] === undefined) {
            articleDataObj[article.topic] = true;
            articleDataObj.total++;
          }
          if (article.votes > articleDataObj.votesHighest.votes) {
            articleDataObj.votesHighest.votes = article.votes;
            articleDataObj.articleHighest = article;
          }
          if (article.votes < articleDataObj.votesLowest.votes) {
            articleDataObj.votesLowest.votes = article.votes;
            articleDataObj.articleLowest = article;
          }
          if (articleDataObj.usersPosting[article.author] === undefined) {
            articleDataObj.usersPosting[article.author] = 1;
          } else {
            articleDataObj.usersPosting[article.author]++;
          }
        });
        let sortedArticlePosts = [];
        for (let vehicle in articleDataObj.usersPosting) {
          sortedArticlePosts.push([
            vehicle,
            articleDataObj.usersPosting[vehicle]
          ]);
        }
        sortedArticlePosts.sort(function(a, b) {
          return b[1] - a[1];
        });
        articleDataObj.usersPosting = sortedArticlePosts;
        this.setState({
          articleData: response.data.articles,
          topicCount: articleDataObj.total,
          statsObj: articleDataObj
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
  updateSearchParams = (paramType, paramValue) => {
    this.setState({ [paramType]: paramValue });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.getArticleData();
    }
    if (prevState.order !== this.state.order) {
      this.getArticleData();
    }
  }

  hideArticles = () => {
    this.setState({ usersArticlesToShow: undefined });
  };
}

export default Stats;
