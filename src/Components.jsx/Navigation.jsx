import React from "react";
import { Link } from "@reach/router";

function Navigation(props) {
  return (
    <div class="nav">
      <Link to="/">HomePage</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/coding">Coding</Link>
      <Link to="/football">Football</Link>
      <Link to="/cooking">Cooking</Link>
    </div>
  );
}

export default Navigation;
