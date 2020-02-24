import React from "react";

function ArticlesSearchDropdown(props) {
  return (
    <div>
      <form>
        <select
          value={props.value}
          onChange={event => {
            props.getArticleData(event.target.value);
          }}
        >
          <option value="created_at">Date Created</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </form>
    </div>
  );
}

export default ArticlesSearchDropdown;
