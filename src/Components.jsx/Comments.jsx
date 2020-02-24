import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";

class Comments extends Component {
  state = {
    commentData: []
  };
  render() {
    return (
      <div>
        <h3>Comments</h3>
        {this.state.commentData.length === 0 && (
          <img src={loading} alt="loading gif"></img>
        )}
        <ol className="comments.list">
          {this.state.commentData.map(comment => {
            console.log(comment);
            return (
              <li key={comment.comment_id}>
                Author: {comment.author}, Votes: {comment.votes}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/articles/${this.props.articleId}/comments`
      )
      .then(response => {
        this.setState({ commentData: response.data.comments });
      });
  }
}

export default Comments;
