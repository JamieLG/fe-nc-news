import React from "react";

function ArticlesSearchDropdown(props) {
  return (
    <div className="searchDropdown">
      <form className="searchDropdownForm">
        <select
          value={props.valueSort}
          onChange={event => {
            props.updateSearchParams("sort", event.target.value);
          }}
        >
          <option value="created_at">Date Created</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
      </form>
      <form className="searchDropdownForm">
        <select
          value={props.valueOrder}
          onChange={event => {
            props.updateSearchParams("order", event.target.value);
          }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </form>
    </div>
  );
}

export default ArticlesSearchDropdown;
