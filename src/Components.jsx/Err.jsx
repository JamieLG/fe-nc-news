import React from "react";
import Navigation from "./Navigation";

function Err(props) {
  return (
    <div>
      <Navigation />
      {props.error ? (
        <h2 className="errorHeader">{props.error.response.data.msg}</h2>
      ) : (
        <h2 className="errorHeader">Not Found! Invalid Link!</h2>
      )}
    </div>
  );
}

export default Err;
