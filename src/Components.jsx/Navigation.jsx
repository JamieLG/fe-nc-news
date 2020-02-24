import React from "react";
import { Link } from "@reach/router";

function Navigation(props) {
  return (
    <div class="nav">
      <Link to="/">HomePage</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/topics/coding">Coding</Link>
      <Link to="/topics/football">Football</Link>
      <Link to="/topics/cooking">Cooking</Link>
    </div>
  );
}

export default Navigation;
