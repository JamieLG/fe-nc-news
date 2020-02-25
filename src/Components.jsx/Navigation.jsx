import React from "react";
import { Link } from "@reach/router";

function Navigation(props) {
  return (
    <nav className="nav">
      {console.log(props)}
      <Link to="/">
        <button className="navButton">HomePage</button>
      </Link>
      <Link to="/topics">
        <button className="navButton">Topics</button>
      </Link>
      <Link to="/topics/coding">
        <button className="navButton">Coding</button>
      </Link>
      <Link to="/topics/football">
        <button className="navButton">Football</button>
      </Link>
      <Link to="/topics/cooking">
        <button className="navButton">Cooking</button>
      </Link>
    </nav>
  );
}

export default Navigation;
