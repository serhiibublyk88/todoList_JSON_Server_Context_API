import PropTypes from "prop-types";
import styles from "../App.module.css";
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
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
