import React, { Component } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import ArticlesSearchDropdown from "./ArticlesSearchDropdown";
import loading from "../Images/Loading-Full.gif";

class Stats extends Component {
  state = {
    error: undefined,
    articleData: [],
    sortBy: "created_at",
    topicCount: 0
  };
  render() {
    return (
      <div>
        <Navigation />
        <h2>Stats</h2>
        {this.state.articleData.length === 0 ? (
          <>
            <p>Loading this page may take a while!</p>
            <img className="img.loading" src={loading} alt="loading gif"></img>
          </>
        ) : (
          <>
            <ul>
              <li>Article count: {this.state.articleData.length}</li>
              <li>Topic Count: {this.state.topicCount}</li>
            </ul>
            <p>
              Most liked article: {this.state.titleHighest}, Author:{" "}
              {this.state.userHighest} Votes: {this.state.votesHighest}
            </p>
            <p>
              Most disliked article: {this.state.titleLowest}, Author:{" "}
              {this.state.userLowest} Votes: {this.state.votesLowest}
            </p>
            <h2>All Articles</h2>{" "}
          </>
        )}

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
                  <p className="singleArticleAuthor">Title: {article.title}.</p>
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
            console.log(article);
          }
          if (article.votes < articleDataObj.votesLowest.votes) {
            articleDataObj.votesLowest.votes = article.votes;
            articleDataObj.votesLowest.user = article.author;
            articleDataObj.votesLowest.title = article.title;
            console.log(article);
          }
        });
        this.setState({
          articleData: response.data.articles,
          sortBy: sortBy,
          topicCount: articleDataObj.total,
          votesHighest: articleDataObj.votesHighest.votes,
          titleHighest: articleDataObj.votesHighest.title,
          userHighest: articleDataObj.votesHighest.user,
          votesLowest: articleDataObj.votesLowest.votes,
          titleLowest: articleDataObj.votesLowest.title,
          userLowest: articleDataObj.votesLowest.user
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default Stats;
