import PropTypes from "prop-types";
import styles from "../App.module.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";

const TodoItem = ({ id, title, completed }) => {
  return (
    <li className={styles.todoItem}>
      <Link
        to={`/task/${id}`}
        className={`${styles.todoTitle} ${
          completed ? styles.completed : styles.notCompleted
        }`}
      >
        {title.length > 30 ? `${title.substring(0, 30)}...` : title}
      </Link>
=======

const TodoItem = ({
  id,
  title,
  completed,
  updateTodo,
  deleteTodo,
  isProcessing,
}) => {
  return (
    <li className={styles.todoItem}>
      <span className={styles.todoTitle}>{title}</span>
      <span className={completed ? styles.completed : styles.notCompleted}>
        {completed ? "Completed" : "Not Completed"}
      </span>
      <button
        onClick={() => updateTodo(id, { title, completed: !completed })}
        disabled={isProcessing}
      >
        Update
      </button>
      <button onClick={() => deleteTodo(id)} disabled={isProcessing}>
        Delete
      </button>
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b
    </li>
  );
};

TodoItem.propTypes = {
<<<<<<< HEAD
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
=======
  id: PropTypes.string.isRequired, // Обновлено с number на string
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool.isRequired,
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b
};

export default TodoItem;
