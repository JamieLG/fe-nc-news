import React from "react";

function VoteButton(props) {
  return (
    <>
      <button
        className="voteButtonLike"
        onClick={() => {
          props.function(1, props.value);
        }}
      >
        Like
      </button>
      <button
        className="voteButtonDislike"
        onClick={() => {
          props.function(-1, props.value);
        }}
      >
        Dislike
      </button>
    </>
  );
}

export default VoteButton;
