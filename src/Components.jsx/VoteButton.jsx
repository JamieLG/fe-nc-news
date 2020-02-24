import React from "react";

function VoteButton(props) {
  return (
    <>
      <button
        class="voteButtonLike"
        onClick={() => {
          props.function(1, props.value);
        }}
      >
        Like
      </button>
      <button
        class="voteButtonDislike"
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
