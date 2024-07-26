import { createContext, useState, useEffect } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [allServerTodos, setAllServerTodos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/todo")
      .then((response) => response.json())
      .then((data) => setAllServerTodos(data));
  }, []);

  const addTodo = () => {
    if (currentIndex >= allServerTodos.length) return;
    const newTodo = allServerTodos[currentIndex];
    setLoadingMessage("Loading...");
    setIsProcessing(true);

    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) => [...prevTodos, data]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setTimeout(() => {
          setIsProcessing(false);
          setLoadingMessage("");
        }, 2000);
      });
  };

  const updateTodo = (id, updatedTodo) => {
    setLoadingMessage("Updating...");
    setIsProcessing(true);

    fetch(`http://localhost:3000/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? data : todo))
        );
        setTimeout(() => {
          setIsProcessing(false);
          setLoadingMessage("");
        }, 2000);
      });
  };

  const deleteTodo = (id) => {
    setLoadingMessage("Deleting...");
    setIsProcessing(true);

    fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setTimeout(() => {
        setIsProcessing(false);
        setLoadingMessage("");
      }, 2000);
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        allServerTodos,
        setAllServerTodos,
        currentIndex,
        setCurrentIndex,
        loadingMessage,
        isProcessing,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
