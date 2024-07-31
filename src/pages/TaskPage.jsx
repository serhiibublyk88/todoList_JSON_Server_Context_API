
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";
import styles from "../App.module.css";

const TaskPage = () => {
  const { id } = useParams();
  const { todos, updateTodo, deleteTodo, isProcessing } = useContext(TodoContext);
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTodo = todos.find(todo => todo.id === id);
    if (foundTodo) {
      setTodo(foundTodo);
    } else {
      navigate("/404");
    }
  }, [id, todos, navigate]);

  const handleCompleteToggle = () => {
    if (todo) {
      updateTodo(todo.id, { ...todo, completed: !todo.completed });
    }
  };

  const handleDelete = () => {
    if (todo) {
      deleteTodo(todo.id);
      navigate("/");
    }
  };

  if (!todo) return null;

  return (
    <div className={styles.app}>
      <h1>Task Details</h1>
      <div className={styles.todoItem}>
        <span className={styles.todoTitle}>{todo.title}</span>
        <span className={todo.completed ? styles.completed : styles.notCompleted}>
          {todo.completed ? "Completed" : "Not Completed"}
        </span>
        <button onClick={handleCompleteToggle} disabled={isProcessing}>
          {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button onClick={handleDelete} disabled={isProcessing}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
