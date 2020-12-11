import React, { useState } from "react";

export default function AddTodo(props) {
  const { onSubmit } = props;
  const [itemName, setItemName] = useState("");

  const handleKeyPress = (e) => {
    if (e.keyPress === "Enter") {
      handleSubmit(e);
    }
  };

  const handleAddTodoChange = (e) => {
    setItemName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: itemName,
    });

    setItemName((itemName) => "");
  }
  return (
    <form className="container add-todo-container" onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleAddTodoChange}
        className="search add-todo"
        placeholder="What do you need to do?"
        value={itemName}
        onKeyPress={handleKeyPress}
      />
      <button className="add-todo-button" value="add item">
        ADD ITEM
      </button>
    </form>
  );
}
