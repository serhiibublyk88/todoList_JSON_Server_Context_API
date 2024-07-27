import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUpdateTodo, useDeleteTodo, useTodos } from "../hooks";
import styles from "../App.module.css";

const TaskPage = () => {
  const { id } = useParams(); // Получение ID из URL
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const { setTodos } = useTodos();

  const updateTodo = useUpdateTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );
  const deleteTodo = useDeleteTodo(
    setTodos,
    setLoadingMessage,
    setIsProcessing
  );

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/todo/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodo(data);
      } catch (error) {
        console.error("Error fetching todo:", error);
        navigate("/404"); // Переход на страницу 404 в случае ошибки
      }
    };

    fetchTodo();
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      try {
        setIsProcessing(true);
        setLoadingMessage("Updating...");
        await updateTodo(id, updatedTodo); // Обновляем задачу
        setTodo(updatedTodo); // Обновляем состояние задачи локально
      } catch (error) {
        console.error("Error updating todo:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsProcessing(true);
      setLoadingMessage("Deleting...");
      await deleteTodo(id); // Удаляем задачу
      navigate("/"); // Возврат на главную страницу после удаления
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div className={styles.app}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Back
      </button>
      <h1 className={todo.completed ? styles.completed : styles.notCompleted}>
        {todo.title}
      </h1>
      <button
        onClick={handleUpdate}
        disabled={isProcessing}
        className={styles.updateButton}
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        disabled={isProcessing}
        className={styles.deleteButton}
      >
        Delete
      </button>
      {isProcessing && (
        <div className={styles.overlay}>
          <h2 className={styles.loadingMessage}>{loadingMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
