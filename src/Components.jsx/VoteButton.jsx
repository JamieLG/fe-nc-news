import React from "react";

function VoteButton(props) {
  return (
    <div class="voteButtons">
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
    </div>
  );
}

export default VoteButton;
