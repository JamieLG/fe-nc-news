import React from "react";
import Navigation from "./Navigation";

function Err(props) {
  return (
    <div>
      <Navigation />
      {props.err ? (
        <h2 className="errorHeader">{props.err.response.data.msg}</h2>
      ) : (
        <h2 className="errorHeader">Not Found! Invalid Link!</h2>
      )}
    </div>
  );
}

export default Err;
