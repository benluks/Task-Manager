import React, { useState } from "react";
import Search from "./search";
import AddTodo from "./addTodo";
import TodoItem from "./TodoItem";

export default function TodoList(props) {
  const [toDoItems, setToDoItems] = useState([]);
  const [complete, setComplete] = useState([]);
  const [showComplete, setShowComplete] = useState(true);
  const [searchTerms, setSearchTerms] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const addItem = (item) => {
    if (item.text) {
      item.position = toDoItems.length;
      setToDoItems((toDoItems) => [...toDoItems, item]);
    }
  };

  const handleDelete = (e) => {
    const ident = parseInt(e.currentTarget.id);
    setToDoItems(toDoItems.filter((item) => item.id !== ident));
    setComplete(complete.filter((item) => item.id !== ident));
  };

  const handleShowComplete = () => {
    setShowComplete((showComplete) => !showComplete);
  };

  const handleTaskComplete = (e) => {
    const id = parseInt(e.currentTarget.id);
    setToDoItems(
      toDoItems.map((item) => {
        if (item.id === id) {
          item["complete"] = !item.complete;
        }
        return item;
      })
    );
    setComplete([...toDoItems.filter((item) => item.complete)]);
  };

  const handleQueryChange = (e) => {
    const query = e.target.value;
    query ? setSearchActive(true) : setSearchActive(false);
    setSearchTerms((searchTerms) => query);
  };

  const emptySearch = () => {
    setSearchTerms("");
    setSearchActive(false);
  };

  let filteredToDos = toDoItems.filter((item) =>
    item.text.includes(searchTerms)
  );

  let filteredCompletes = complete.filter((item) =>
    item.text.includes(searchTerms)
  );

  return (
    <div>
      <Search
        className={`container search-container ${
          showComplete ? "show-complete" : ""
        }`}
        className2={`search-input-container ${searchActive ? "active" : ""}`}
        handleShowComplete={handleShowComplete}
        handleQueryChange={handleQueryChange}
        searchQuery={searchTerms}
        emptySearch={emptySearch}
      />
      <div
        className={`container todo-list-container completes-container ${
          showComplete ? "" : "hide-complete"
        } ${complete.length === 0 ? "empty" : ""}`}
      >
        {filteredCompletes.map((item, index) => (
          <TodoItem
            className={"to-do-item to-do-complete"}
            id={item.id}
            text={item.text}
            key={item.id}
            handleDelete={handleDelete}
            index={index}
            handleTaskComplete={handleTaskComplete}
          />
        ))}
      </div>
      <div
        className={`container todo-list-container main-list ${
          toDoItems.filter((item) => !item.complete).length === 0 ? "empty" : ""
        }`}
      >
        {" "}
        {filteredToDos.map((item, index) => (
          <TodoItem
            className={`to-do-item ${item.complete ? "complete " : ""}`}
            id={item.id}
            text={item.text}
            key={item.id}
            handleDelete={handleDelete}
            index={index}
            handleTaskComplete={handleTaskComplete}
          />
        ))}
      </div>

      <AddTodo onSubmit={addItem} />
    </div>
  );
}
