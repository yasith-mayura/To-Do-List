import { useEffect, useState } from "react";
import ToDoTask from "./ToDoTask";
import { FaListCheck, FaPlus } from "react-icons/fa6";
import axios from "axios";

interface Todolist {
  id: number;
  title: string;
  completed: boolean;
}

const Background = () => {
  const [toDoList, setToDoList] = useState<Todolist[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      // .get<Todolist[]>("http://localhost:9090/todo-service/todos/", {
      .get<Todolist[]>("https://yasithmayura.me/todo-service/todos/", {
        timeout: 60000, // 60 seconds
      })
      .then((res) => {
        setToDoList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching todos", err);
        setIsLoading(false);
      });
  }, []);

  const addTask = () => {
    if (!newTodo.title.trim()) return; // Prevent adding empty tasks

    const originalTodos = [...toDoList];

    axios
      // .post("http://localhost:9090/todo-service/todos/", newTodo)
      .post("https://yasithmayura.me/todo-service/todos/", newTodo)
      .then((res) => {
        setToDoList([res.data, ...toDoList]);
        setNewTodo({ title: "", completed: false }); // Reset input field
      })
      .catch((err) => {
        console.log(err);
        setToDoList(originalTodos);
      });
  };

  const deleteTask = (id: number) => {
    // const originalTodos = [...toDoList];
    setToDoList(toDoList.filter((t) => t.id !== id));

    axios
      // .delete(`http://localhost:9090/todo-service/todos/${id}`)
      .delete(`https://yasithmayura.me/todo-service/todos/${id}`)
      .then(() => {
        setToDoList((prev) => prev.filter((t) => t.id !== id)); // Optimistic UI update
      })
      .catch((err) => {
        console.error("Error deleting todo", err);
      });
  };

  const completeTask = (id: number) => {
    const originalTodos = [...toDoList]; // Backup the original list
    const updatedTask = toDoList.find((t) => t.id === id);

    if (updatedTask) {
      // Update the local state optimistically
      const updatedTasks = toDoList.map((t) =>
        t.id === id ? { ...t, completed: true } : t
      );
      setToDoList(updatedTasks);

      // Prepare the data to send to the backend
      const updatedTodo = { ...updatedTask, completed: true };

      // Send the update to the backend
      axios
        // .put(`http://localhost:9090/todo-service/todos/${id}`, updatedTodo)
        .put(`https://yasithmayura.me/todo-service/todos/${id}`, updatedTodo)
        .catch((err) => {
          console.error("Failed to update the task:", err);
          setToDoList(originalTodos); // Revert changes on failure
        });
    } else {
      console.warn(`Task with id ${id} not found`);
    }
  };

  return (
    <div className="min-h-screen bg-[#030714] flex justify-center p-4 w-full">
      <div
        className="w-full max-w-4xl bg-gradient-to-b from-[#072741] to-[#011528] 
      p-6 rounded-2xl shadow-2xl border border-[#2980B9]"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-2xl font-bold flex items-center">
            <FaListCheck className="mr-3 text-[#16b0f8]" />
            My Todo List
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 mb-6">
          <div className="w-full sm:w-auto border-2 border-[#3498DB] rounded-lg mb-2 sm:mb-0 flex-grow mr-4">
            <input
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              id="task"
              placeholder="What needs to be done?"
              className="bg-transparent w-full rounded-lg p-3 text-[#ECF0F1] 
              placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16b0f8]"
            />
          </div>
          <button
            onClick={addTask}
            className="bg-[#16b0f8] text-white p-3 rounded-lg 
            hover:bg-[#0e56bc] transition duration-300 ease-in-out 
            flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>

       
      {!isLoading && (
        <div className="space-y-6">
          {/* Tasks to do section */}
          <div>
            <h3 className="text-[#ECF0F1] text-lg mb-4 flex items-center">
              Tasks to do
              <span className="bg-[#16b0f8] text-white rounded-full px-2 ml-2">
                {toDoList.filter((t) => !t.completed).length}
              </span>
            </h3>
            <div 
              className="max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              <ToDoTask
                tasks={toDoList.filter((t) => !t.completed)}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
                completed={false}
              />
            </div>
          </div>

          {/* Completed tasks section */}
          <div>
            <h3 className="text-[#ECF0F1] text-lg mb-4 flex items-center">
              Completed
              <span className="bg-emerald-600 text-white rounded-full px-2 ml-2">
                {toDoList.filter((t) => t.completed).length}
              </span>
            </h3>
            <div 
              className="max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              <ToDoTask
                tasks={toDoList}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
                completed={true}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Background;
