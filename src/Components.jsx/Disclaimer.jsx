import React, { Component } from "react";
import { Link } from "@reach/router";

class Disclaimer extends Component {
  state = {
    disclaimer: undefined
  };
  render() {
    return (
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnrpVgvpZbXT8hU8VqsGxnT-qBS0pu1LYxXGvZu0j02NFMzx79"
          alt="nc-news homepage logo"
        />
        <h2>Disclaimer</h2>
        <p>Bla bla bla must agree to x y z to continue</p>
        <Link to="/topics">
          <button
            onClick={() => {
              this.changeDisclaimerState("agree");
            }}
          >
            Agree
          </button>
        </Link>

        <button
          onClick={() => {
            this.changeDisclaimerState("disagree");
          }}
        >
          Disagree
        </button>
        {this.state.disclaimer === "disagree" && (
          <p>YOU MUST AGREE TO ENTER THE SITE</p>
        )}
      </div>
    );
  }
  changeDisclaimerState = input => {
    this.setState({ disclaimer: input });
  };
}

export default Disclaimer;
