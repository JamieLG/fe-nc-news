import React, { Component } from "react";
import Navigation from "./Navigation";
import loading from "../Images/Loading-Full.gif";
import axios from "axios";
import Comments from "./Comments";

class IndividualArticle extends Component {
  state = {
    individualArticleData: []
  };

  render() {
    return (
      <div>
        <Navigation />
        {this.state.individualArticleData.length === 0 && (
          <img class="img.loading" src={loading} alt="loading gif"></img>
        )}
        <h2>{this.state.individualArticleData.title}</h2>
        <ul>
          <li>Title: {this.state.individualArticleData.title}</li>
          <li>Topic: {this.state.individualArticleData.topic}</li>
          <li>Author: {this.state.individualArticleData.author}</li>
          <li>Date Created: {this.state.individualArticleData.created_at}</li>
          <li>Body: {this.state.individualArticleData.body}</li>
        </ul>
        {this.state.individualArticleData.article_id > 0 && (
          <Comments articleId={this.state.individualArticleData.article_id} />
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
        this.setState({ individualArticleData: response.data.article });
      });
  }
}

export default IndividualArticle;
