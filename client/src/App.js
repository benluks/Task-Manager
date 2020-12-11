import React from "react";
import "./App.css";
import TodoList from "./components/todoList";

function App() {
  // const [completedItems, setCompletedItems] = useState([]);

  return (
    <div className="App">
      <div className="container widget-container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
