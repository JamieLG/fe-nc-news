import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
  state = {
    commentData: []
  };
  render() {
    return (
      <div>
        <h2>Comments</h2>
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
