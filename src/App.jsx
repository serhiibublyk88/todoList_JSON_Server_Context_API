<<<<<<< HEAD
import { useState, useCallback, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import {
  useFetchTodos,
  useAddTodo,
  useTodos,
  useDeleteTodo,
  useUpdateTodo,
} from "./hooks";
=======
// npx json-server db.json
import { useState, useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b
import styles from "./App.module.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
<<<<<<< HEAD
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    todos,
    setTodos,
    allServerTodos,
    setAllServerTodos,
    currentIndex,
    setCurrentIndex,
  } = useTodos();

  useFetchTodos(setAllServerTodos);

  const addTodo = useAddTodo(
    setTodos,
    allServerTodos,
    currentIndex,
    setCurrentIndex,
    setLoadingMessage,
    setIsProcessing
  );

  const deleteTodo = useDeleteTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );

  const updateTodo = useUpdateTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const toggleSort = useCallback(() => {
    setIsSorted((prev) => !prev);
  }, []);
=======

  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    loadingMessage,
    isProcessing,
  } = useContext(TodoContext);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSorted) {
    filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

<<<<<<< HEAD
  const navigate = useNavigate();

  const TaskPage = ({ todos, updateTodo, deleteTodo }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    useEffect(() => {
      const selectedTodo = todos.find((todo) => todo.id === id);
      if (selectedTodo) {
        setTodo(selectedTodo);
      } else {
        navigate("/404");
      }
    }, [id, todos, navigate]);

    const handleUpdate = () => {
      if (todo) {
        updateTodo(id, { ...todo, completed: !todo.completed });
      }
    };

    const handleDelete = () => {
      if (todo) {
        deleteTodo(id);
        navigate("/");
      }
    };

    if (!todo) return null;

    return (
      <div className={styles.taskPage}>
        {isProcessing && (
          <div className={styles.overlay}>
            <h2 className={styles.loadingMessage}>{loadingMessage}</h2>
          </div>
        )}
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back
        </button>
        <h1 className={todo.completed ? styles.completed : styles.notCompleted}>
          {todo.title}
        </h1>
        <button onClick={handleUpdate} disabled={isProcessing}>
          {todo.completed ? "Mark as Incomplete" : "Mark as Completed"}
        </button>
        <button onClick={handleDelete} disabled={isProcessing}>
          Delete
        </button>
      </div>
    );
  };

=======
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b
  return (
    <div className={styles.app}>
      {isProcessing && (
        <div className={styles.overlay}>
          <h2 className={styles.loadingMessage}>{loadingMessage}</h2>
        </div>
      )}
<<<<<<< HEAD
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <TodoForm
                addTodo={addTodo}
                handleSearch={handleSearch}
                toggleSort={toggleSort}
                isSorted={isSorted}
                isProcessing={isProcessing}
              />
              <ul className={styles.todoList}>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    {...todo}
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                    isProcessing={isProcessing}
                  />
                ))}
              </ul>
            </>
          }
        />
        <Route
          path="/task/:id"
          element={
            <TaskPage
              todos={todos}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          }
        />
        <Route path="/404" element={<div>404 - Not Found</div>} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
=======
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
>>>>>>> 854e523aa547ddbfc8722fe9f693aef3417ec13b
    </div>
  );
};

export default App;
