import React, { Component } from "react";
import axios from "axios";

class AddCommentForm extends Component {
  state = {
    body: ""
  };
  render() {
    return (
      <form onSubmit={this.postComment}>
        <label>
          Body:
          <input
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Put your comment here."
            required
          ></input>
        </label>
        <button type="submit">Add Comment</button>
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
          username: "grumpy19",
          body: comment
        }
      )
      .then(({ data }) => {
        this.props.addCommentToData(data);
        this.setState({ body: "" });
      });
  };
}

export default AddCommentForm;
