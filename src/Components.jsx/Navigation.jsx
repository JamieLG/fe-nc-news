import React from "react";
import { Link } from "@reach/router";

function Navigation(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <button>HomePage</button>
      </Link>
      <Link to="/topics">
        <button>Topics</button>
      </Link>
      <Link to="/topics/coding">
        <button>Coding</button>
      </Link>
      <Link to="/topics/football">
        <button>Football</button>
      </Link>
      <Link to="/topics/cooking">
        <button>Cooking</button>
      </Link>
    </nav>
  );
}

export default Navigation;
