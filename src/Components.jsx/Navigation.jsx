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
      <Link to="/topics/coding">
        <Button variant="contained" color="primary">
          Coding
        </Button>
      </Link>
      <div className="divider"></div>
      <Link to="/topics/football">
        <Button variant="contained" color="primary">
          Football
        </Button>
      </Link>
      <div className="divider"></div>
      <Link to="/topics/cooking">
        <Button variant="contained" color="primary">
          Cooking
        </Button>
      </Link>
    </nav>
  );
}

export default Navigation;
