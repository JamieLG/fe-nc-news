import React from "react";

function VoteButton(props) {
  return (
    <div>
      <button
        className="voteButtonLike"
        onClick={() => {
          props.function(1, props.value);
        }}
      >
        Like
      </button>
      <br></br>
      <button
        className="voteButtonDislike"
        onClick={() => {
          props.function(-1, props.value);
        }}
      >
        Dislike
      </button>
    </div>
  );
}

export default VoteButton;
