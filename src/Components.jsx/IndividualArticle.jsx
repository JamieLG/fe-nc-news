import React, { Component } from "react";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";
import axios from "axios";
import Comments from "./Comments";
import Error from "./Err";

class IndividualArticle extends Component {
  state = {
    error: undefined,
    isLoading: true,
    individualArticleData: [],
    username: "grumpy19"
  };

  render() {
    if (this.state.error !== undefined) {
      return <Error error={this.state.error} />;
    } else
      return (
        <div className="articles">
          <Navigation />

          {this.state.isLoading === true && (
            <img className="img.loading" src={loading} alt="loading gif"></img>
          )}
          <h2>{this.state.individualArticleData.title}</h2>
          <ul className="individualArticleList">
            <li>Title: {this.state.individualArticleData.title}</li>
            <li>Topic: {this.state.individualArticleData.topic}</li>
            <li>Author: {this.state.individualArticleData.author}</li>
            <li>Date Created: {this.state.individualArticleData.created_at}</li>
            <br></br>
            <p className="articleBody">
              {this.state.individualArticleData.body}
            </p>
          </ul>
          {this.state.individualArticleData.article_id > 0 && (
            <div className="individualArticleComments">
              <Comments
                articleId={this.state.individualArticleData.article_id}
                user={this.state.username}
              />
            </div>
          )}
        </div>
      );
  }
  componentDidMount() {
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/articles/${this.props.id}`
      )
      .then(response => {
        this.setState({
          isLoading: false,
          username: this.props.user,
          individualArticleData: response.data.article
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({ username: this.props.user });
    }
  }
}

export default IndividualArticle;
