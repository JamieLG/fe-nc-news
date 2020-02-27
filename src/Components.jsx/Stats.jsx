import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import ArticlesSearchDropdown from "./ArticlesSearchDropdown";
import loading from "../Images/Loading-Full.gif";
import { Link } from "@reach/router";
import Err from "./Err";
import UserArticles from "./UserArticles";

class Stats extends Component {
  state = {
    error: undefined,
    articleData: [],
    sort: "created_at",
    order: "desc",
    topicCount: 0,
    usersArticlesToShow: "jessjelly"
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
              <ul>
                {this.state.statsObj.usersPosting.map(user => {
                  return (
                    <li key={user[0]}>
                      {user[0]} : {user[1]}{" "}
                      <button onClick={() => this.setArticleUser(user[0])}>
                        show
                      </button>
                    </li>
                  );
                })}
              </ul>
              <UserArticles user={this.state.usersArticlesToShow} />
            </div>
          )}
          <h2>All Articles</h2>
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
                    Title:{" "}
                    <Link to={`/topics/${article.topic}/${article.article_id}`}>
                      {" "}
                      {article.title}.
                    </Link>
                  </p>
                  <br></br>
                  <p>Author: {article.author}</p>
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
        var sortedArticlePosts = [];
        for (var vehicle in articleDataObj.usersPosting) {
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
}

export default Stats;
