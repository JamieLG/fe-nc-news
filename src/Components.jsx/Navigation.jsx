import React from "react";
import { Link } from "@reach/router";
import Button from "@material-ui/core/Button";

function Navigation(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <Button variant="contained" color="primary">
          HomePage
        </Button>
      </Link>
      <div className="divider"></div>
      <Link to="/topics">
        <Button variant="contained" color="primary">
          Topics
        </Button>
      </Link>
      <div className="divider"></div>
      <Link to="/stats">
        <Button variant="contained" color="primary">
          Articles/Stats
        </Button>
      </Link>
      <p className="navLoggedInAs">Logged in as: grumpy19</p>
    </nav>
  );
}

export default Navigation;
