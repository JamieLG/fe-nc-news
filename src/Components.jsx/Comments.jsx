import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import AddCommentForm from "./AddCommentForm";

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
            return (
              <li key={comment.comment_id}>
                Coment: {comment.body} Author: {comment.author}, Votes:{" "}
                {comment.votes}
              </li>
            );
          })}
        </ol>
        {this.state.id !== undefined && (
          <AddCommentForm
            articleId={this.state.id}
            postComment={this.postComment}
            addCommentToData={this.addCommentToData}
          />
        )}
      </div>
    );
  }
  componentDidMount() {
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/articles/${this.props.articleId}/comments`
      )
      .then(response => {
        this.setState({
          commentData: response.data.comments,
          id: this.props.articleId
        });
      });
  }
  addCommentToData = data => {
    this.setState(currentState => {
      return { commentData: [...currentState.commentData, data.comment] };
    });
  };
}

export default Comments;
