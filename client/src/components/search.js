import React from "react";
import { FaTimes } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

export default function Search(props) {
  const { searchQuery, handleQueryChange, className2, emptySearch } = props;

  return (
    <div className={props.className}>
      <div className={className2}>
        <input
          className="search search-bar"
          type="text"
          value={searchQuery}
          onChange={handleQueryChange}
          placeholder="Search items"
        />
        <FaTimes onClick={emptySearch} />
      </div>
      <div className="search-checkbox">
        <div
          className="showCompletedCheck"
          onClick={props.handleShowComplete}
          type="checkbox"
        >
          <ImCheckmark />
        </div>
        <div className="showCompletedText">show completed items</div>
      </div>
    </div>
  );
}
