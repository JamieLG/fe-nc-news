import React, { Component } from "react";
import loading from "../Images/Loading-Full.gif";
import Err from "./Err";
import Navigation from "./Navigation";
import axios from "axios";
import { Link } from "@reach/router";

class UserArticles extends Component {
  state = {
    error: undefined,
    userArticles: []
  };
  render() {
    return (
      <div className="userArticles">
        <h3>Articles from {this.props.user} </h3>
        {this.state.userArticles.length === 0 && (
          <img className="img.loading" src={loading} alt="loading gif"></img>
        )}
        <ol className="articleListByUser">
          {this.state.userArticles.map(article => {
            return (
              <Link to={`/topics/${article.topic}/${article.article_id}`}>
                <li> {article.title}</li>
              </Link>
            );
          })}
        </ol>
      </div>
    );
  }

  getArticleData = () => {
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/articles?author=${this.props.user}`
      )
      .then(response => {
        this.setState({
          userArticles: response.data.articles
        });
      });
  };

  componentDidMount() {
    this.getArticleData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.getArticleData();
    }
  }
}

export default UserArticles;
