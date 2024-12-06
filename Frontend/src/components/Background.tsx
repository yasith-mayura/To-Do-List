import { useEffect, useState } from "react";
import ToDoTask from "./ToDoTask";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

interface Todolist {
  id: number;
  title: string;
  completed: boolean;
}

const Background = () => {
  const [toDoList, setToDoList] = useState<Todolist[]>([]);

  useEffect(() => {
    axios
      // .get<Todolist[]>("http://localhost:9090/todo-service/todos/", {
      .get<Todolist[]>("https://yasithmayura.me/todo-service/todos/", {
        timeout: 60000, // 60 seconds
      })
      .then((res) => setToDoList(res.data))
      .catch((err) => console.error("Error fetching todos", err));
  }, []);

  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });

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
    <div className="w-1/2 bg-[#181925] p-6 rounded-lg">
      <div className="flex justify-between py-4">
        <div className="border-2 border-[#0AB6FF] rounded-lg">
          <input
            value={newTodo.title}
            onChange={(e) =>
              setNewTodo({ ...newTodo, title: e.target.value })
            }
            id="task"
            placeholder="Add a new task"
            className="bg-[#181925] w-96 rounded-lg p-2 text-[#FFFFFF]"
          />
        </div>
        <div className="flex justify-center items-center bg-[#0AB6FF] rounded-lg p-2 h-10 w-10">
          <FaPlus onClick={addTask} />
        </div>
      </div>

      <h3 className="text-[#FFFFFF]">
        Tasks to do - {toDoList.filter((t) => !t.completed).length}
      </h3>
      <div>
        <ToDoTask
          tasks={toDoList.filter((t) => !t.completed)}
          onDeleteTask={deleteTask}
          onCompleteTask={completeTask}
        />
      </div>

      <h3 className="text-[#FFFFFF]">
        Done - {toDoList.filter((t) => t.completed).length}
      </h3>
    </div>
  );
};

export default Background;
