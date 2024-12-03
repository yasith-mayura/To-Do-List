import { useEffect, useState } from "react";
import DoneTask from "./DoneTask";
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
      .get<Todolist[]>("http://10.0.184.32:9090/todo-service/todos",{
        timeout: 60000  // 60 seconds
      })
      .then((res) => setToDoList(res.data))
      .catch((err) => console.error("Error fetching todos", err));
  }, []);

  // const taskRef = useRef<HTMLInputElement>(null);
  // const newTodo = {
  //   title: "",
  //   completed: false,
  // };
  const [newTodo, setNewTodo] = useState({
    title: "",
    completed: false,
  });

  const addTask = () => {
    // if (taskRef.current !== null) {
    //   newTodo.title = taskRef.current.value;
    // }
    const originalTodos = [...toDoList];

    axios
      .post("http://10.0.184.32:9090/todo-service/todos", newTodo)
      .then((res) => setToDoList([res.data, ...toDoList]))
      .catch((err) => {
        console.log(err);
        setToDoList(originalTodos);
      });
  };

  const deleteTask = (id: number) => {
    const originalTodos = [...toDoList];
    setToDoList(toDoList.filter((t) => t.id !== id));

    axios
      .delete(`http://10.0.184.32:9090/todo-service/todos/${id}`)
      .catch((err) => {
        console.log(err);
        setToDoList(originalTodos);
      });
  };

  const completeTask = (id: number) => {
    const originalTodos = [...toDoList];
    const updatedTask = toDoList.find((t) => t.id === id);
    if (updatedTask) {
      const updatedTasks = toDoList.map((t) =>
        t.id === id ? { ...t, completed: true } : t
      );
      setToDoList(updatedTasks);
    }

    axios.put("http://10.0.184.32:9090/todo-service/todos/" + id).catch((err) => {
      console.log(err);
      setToDoList(originalTodos);
    });
  };

  return (
    <>
      <div className="w-1/2 bg-[#181925] p-6 rounded-lg ">
        <div className="flex justify-between py-4">
          <div className="border-2 border-[#0AB6FF] rounded-lg ">
            <input
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              // ref={taskRef}
              id="task"
              type="text"
              placeholder="Add a new task"
              className="bg-[#181925] w-96 rounded-lg p-2 text-[#FFFFFF]"
            />
          </div>
          <div className="flex justify-center items-center bg-[#0AB6FF] rounded-lg p-2 h-10 w-10">
            <FaPlus onClick={addTask} />
          </div>
        </div>
        <h3 className="text-[#FFFFFF]">Tasks to do - {toDoList.filter(t=>!t.completed).length} </h3>
        <div>
          <ToDoTask
            tasks={toDoList}
            onDeleteTask={deleteTask}
            onCompleteTask={completeTask}
          />
        </div>

        <h3 className="text-[#FFFFFF]">Done - {toDoList.filter(t=>t.completed).length}  </h3>
        <div>
          <DoneTask tasks={toDoList} />
        </div>
      </div>
    </>
  );
};

export default Background;
