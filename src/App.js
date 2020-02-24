import React from "react";
import "./App.css";
import Header from "./Components.jsx/Header";
import Disclaimer from "./Components.jsx/Disclaimer";
import { Router } from "@reach/router";
import Topics from "./Components.jsx/Topics";
import Articles from "./Components.jsx/Articles";
const cors = require("cors");

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Disclaimer path="/" />
        <Topics path="/topics" />
        <Articles path="/coding" />
        <Articles path="/football" />
        <Articles path="/cooking" />
      </Router>
    </div>
  );
}

export default App;
