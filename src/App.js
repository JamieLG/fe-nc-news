import React from "react";
import "./App.css";
import Header from "./Components.jsx/Header";
import Disclaimer from "./Components.jsx/Disclaimer";
import { Router } from "@reach/router";
import Topics from "./Components.jsx/Topics";
import Articles from "./Components.jsx/Articles";
import IndividualArticle from "./Components.jsx/IndividualArticle";
import Err from "./Components.jsx/Err";
import "typeface-roboto";
import Stats from "./Components.jsx/Stats";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Disclaimer path="/" />
        <Topics path="/topics" />
        <Articles path="/topics/:topic" />
        <IndividualArticle path="/topics/:topic/:id" />
        <Stats path="/stats" />
        <Err path="/*" />
      </Router>
    </div>
  );
}

export default App;
