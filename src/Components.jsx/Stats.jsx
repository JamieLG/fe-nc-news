import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import ArticlesSearchDropdown from "./ArticlesSearchDropdown";
import loading from "../Images/Loading-Full.gif";
import { Link } from "@reach/router";
import Err from "./Err";

class Stats extends Component {
  state = {
    error: undefined,
    articleData: [],
    sortBy: "created_at",
    topicCount: 0
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div class="articleStatPage">
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
                  to={`/topics/${this.state.topicIdHighest}/${this.state.idHighest}`}
                >
                  {this.state.titleHighest}
                </Link>{" "}
                Author: {this.state.userHighest} Votes:{" "}
                {this.state.votesHighest}
              </p>
              <p>
                Most disliked article:{" "}
                <Link
                  to={`/topics/${this.state.topicIdLowest}/${this.state.idLowest}`}
                >
                  {this.state.titleLowest}
                </Link>
                , Author: {this.state.userLowest} Votes:{" "}
                {this.state.votesLowest}
              </p>
            </div>
          )}
          <h2>All Articles</h2>
          <ArticlesSearchDropdown
            getArticleData={this.getArticleData}
            value={this.state.sortBy}
          />

          {this.state.articleData.length === 0 && (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          )}

          <ol>
            {this.state.articleData.map(article => {
              return (
                <>
                  <li key={article.article_id} className="singleArticle">
                    <p>
                      {this.state.sortBy} {article[this.state.sortBy]}
                    </p>
                    <p className="singleArticleAuthor">
                      Title: {article.title}.
                    </p>
                    <br></br>
                    <p>Author: {article.author}</p>
                  </li>
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
    axios
      .get("https://jamie-backendapp.herokuapp.com/api/articles/", {
        params: { sort_by: sortBy }
      })
      .then(response => {
        let articleDataObj = {
          total: 0,
          votesHighest: { votes: -999 },
          votesLowest: { votes: 999 }
        };
        response.data.articles.forEach(article => {
          if (articleDataObj[article.topic] === undefined) {
            articleDataObj[article.topic] = true;
            articleDataObj.total++;
          }
          if (article.votes > articleDataObj.votesHighest.votes) {
            articleDataObj.votesHighest.votes = article.votes;
            articleDataObj.votesHighest.user = article.author;
            articleDataObj.votesHighest.title = article.title;
            articleDataObj.votesHighest.id = article.article_id;
            articleDataObj.votesHighest.topic = article.topic;
          }
          if (article.votes < articleDataObj.votesLowest.votes) {
            articleDataObj.votesLowest.votes = article.votes;
            articleDataObj.votesLowest.user = article.author;
            articleDataObj.votesLowest.title = article.title;
            articleDataObj.votesLowest.id = article.article_id;
            articleDataObj.votesLowest.topic = article.topic;
          }
        });
        this.setState({
          articleData: response.data.articles,
          sortBy: sortBy,
          topicCount: articleDataObj.total,
          votesHighest: articleDataObj.votesHighest.votes,
          titleHighest: articleDataObj.votesHighest.title,
          userHighest: articleDataObj.votesHighest.user,
          idHighest: articleDataObj.votesHighest.id,
          topicIdHighest: articleDataObj.votesHighest.topic,
          votesLowest: articleDataObj.votesLowest.votes,
          titleLowest: articleDataObj.votesLowest.title,
          userLowest: articleDataObj.votesLowest.user,
          idLowest: articleDataObj.votesLowest.id,
          topicIdLowest: articleDataObj.votesLowest.topic
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default Stats;
