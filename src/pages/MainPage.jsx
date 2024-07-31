
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import styles from "../App.module.css";

const MainPage = () => {
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    loadingMessage,
    isProcessing,
  } = useContext(TodoContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSorted) {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className={styles.app}>
      {isProcessing && (
        <div className={styles.overlay}>
          <h2 className={styles.loadingMessage}>{loadingMessage}</h2>
        </div>
      )}
      <h1>Todo List</h1>
      <TodoForm
        addTodo={addTodo}
        handleSearch={handleSearch}
        toggleSort={toggleSort}
        isSorted={isSorted}
        isProcessing={isProcessing}
      />
      <ul className={styles.todoList}>
        {filteredTodos.map(({ id, title, completed }) => (
          <TodoItem
            key={id}
            id={id}
            title={title}
            completed={completed}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            isProcessing={isProcessing}
          />
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
