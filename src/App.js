import React from "react";
import "./App.css";
import Header from "./Components.jsx/Header";
import Disclaimer from "./Components.jsx/Disclaimer";
import { Router } from "@reach/router";
import Topics from "./Components.jsx/Topics";
import Articles from "./Components.jsx/Articles";

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Disclaimer path="/" />
        <Topics path="/topics" />
        <Articles path="/topics/coding/*" />
        <Articles path="/topics/football/*" />
        <Articles path="/topics/cooking/*" />
      </Router>
    </div>
  );
}

export default App;
