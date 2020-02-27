import React from "react";

function VoteButton(props) {
  return (
    <div>
      {props.loading === false ? (
        <div className="voteButtonContainer">
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
        </div>
      ) : (
        <>
          <button className="voteButtonLike">Like</button>
          <button className="voteButtonDislike">Dislike</button>{" "}
        </>
      )}
    </div>
  );
}

export default VoteButton;
