import React, { Component } from "react";
import axios from "axios";

class AddCommentForm extends Component {
  state = {
    inputBody: ""
  };
  render() {
    return (
      <form onSubmit={this.postComment}>
        <input
          type="text"
          name="inputBody"
          value={this.state.inputBody}
          onChange={this.handleChange}
          placeholder="Put your comment here."
          required
        ></input>

        <button className="addCommentSubmit" type="submit">
          Add Comment
        </button>
      </form>
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  postComment = event => {
    event.preventDefault();
    const comment = event.target[0].value;
    axios
      .post(
        `https://jamie-backendapp.herokuapp.com/api/articles/${this.props.articleId}/comments`,
        {
          username: this.props.user,
          body: comment
        }
      )
      .then(({ data }) => {
        this.props.addCommentToData(data);
        this.setState({ inputBody: "" });
      });
  };
}

export default AddCommentForm;
