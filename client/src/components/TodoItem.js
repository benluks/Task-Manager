import React from "react";
import { FaTimes } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

export default function TodoItem(props) {
  const { id, text, handleDelete, className, handleTaskComplete } = props;

  return (
    <div className={className} key={id} id={id}>
      <div className="checkbox" onClick={handleTaskComplete} key={id} id={id}>
        <ImCheckmark id={id}></ImCheckmark>
      </div>
      <div className="todo-item-name" key={text} id={id}>
        {text}
      </div>
      <div className="delete-item" onClick={handleDelete} id={id}>
        <FaTimes id={id} />
      </div>
    </div>
  );
}
