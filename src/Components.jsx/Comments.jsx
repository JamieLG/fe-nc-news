import React, { Component } from "react";
import axios from "axios";
import loading from "../Images/Loading-Full.gif";
import AddCommentForm from "./AddCommentForm";
import VoteButton from "./VoteButton";
import Err from "./Err";

class Comments extends Component {
  state = {
    error: undefined,
    commentData: [],
    username: "grumpy19"
  };
  render() {
    if (this.state.error !== undefined) {
      return <Err error={this.state.error} />;
    } else
      return (
        <div className="commentsSection">
          <h3>Comments</h3>
          {this.state.commentData.length === 0 && (
            <img src={loading} alt="loading gif"></img>
          )}
          <ol className="comments.list">
            {this.state.commentData.map(comment => {
              return (
                <li key={comment.comment_id}>
                  Comment: {comment.body} Author: {comment.author}
                  <br></br>
                  {this.state.username === comment.author && (
                    <button
                      onClick={() => {
                        this.deleteComment(comment.comment_id);
                      }}
                    >
                      Delete Comment
                    </button>
                  )}
                  <br></br>
                  {this.state.username !== comment.author && (
                    <VoteButton
                      function={this.commentVote}
                      value={comment.comment_id}
                    />
                  )}
                  <p className="commentVotes">Votes: {comment.votes}</p>
                </li>
              );
            })}
          </ol>
          <br></br>
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
    this.fetchCommentData();
  }

  fetchCommentData = () => {
    axios
      .get(
        `https://jamie-backendapp.herokuapp.com/api/articles/${this.props.articleId}/comments`
      )
      .then(response => {
        this.setState({
          commentData: response.data.comments,
          id: this.props.articleId
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  addCommentToData = data => {
    this.setState(currentState => {
      return { commentData: [...currentState.commentData, data.comment] };
    });
  };

  deleteComment = commentId => {
    axios
      .delete(
        `https://jamie-backendapp.herokuapp.com/api/comments/${commentId}`
      )
      .then(response => {
        this.fetchCommentData();
      });
  };

  commentVote = (changeInVote, commentId) => {
    axios
      .patch(
        `https://jamie-backendapp.herokuapp.com/api/comments/${commentId}`,
        {
          inc_votes: changeInVote
        }
      )
      .then(response => {
        this.setState(currentState => {
          return {
            commentData: currentState.commentData.map(comment => {
              if (comment.comment_id === commentId) {
                return { ...comment, votes: response.data.comment.votes };
              }
              return comment;
            })
          };
        });
      });
  };
}

export default Comments;
