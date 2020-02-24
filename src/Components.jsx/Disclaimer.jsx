import React, { Component } from "react";
import { Link } from "@reach/router";
import n from "../Images/n.png";
import c from "../Images/c.png";

class Disclaimer extends Component {
  state = {
    disclaimer: undefined
  };
  render() {
    return (
      <div class="disclaimerImageGroup">
        <div>
          <img src={n} alt="nc-news  n homepage logo" />
          <img src={c} alt="nc-news  c homepage logo" />
        </div>
        <h2>Disclaimer</h2>
        <p>
          If you require any more information or have any questions about our
          site's disclaimer, please feel free to contact us by email at
          admin@nc-news.com Disclaimers for NC-News All the information on this
          website - https://jamie-backendapp.herokuapp.com - is published in
          good faith and for general information purpose only. NC-News does not
          make any warranties about the completeness, reliability and accuracy
          of this information. Any action you take upon the information you find
          on this website (NC-News), is strictly at your own risk.
        </p>
        <div class="disclaimerButtonGroup">
          <Link to="/topics">
            <button
              class="disclaimerButtonAgree"
              onClick={() => {
                this.changeDisclaimerState("agree");
              }}
            >
              Agree
            </button>
          </Link>

          <button
            class="disclaimerButtonDisagree"
            onClick={() => {
              this.changeDisclaimerState("disagree");
            }}
          >
            Disagree
          </button>
        </div>
        {this.state.disclaimer === "disagree" && (
          <p class="disagree">YOU MUST AGREE TO ENTER THE SITE</p>
        )}
      </div>
    );
  }
  changeDisclaimerState = input => {
    this.setState({ disclaimer: input });
  };
}

export default Disclaimer;
