import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

interface Todolist {
  id: number;
  title: string;
  completed: boolean;
}

const ToDoTask = ({
  tasks,
  onDeleteTask,
  onCompleteTask,
}: {
  tasks: Todolist[];
  onDeleteTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
}) => {
  // const [toDoList, setToDoList] = useState<Todolist[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<Todolist[]>("http://localhost:9090/todo-service/todos")
  //     .then((res) => setToDoList(res.data));
  // }, []);

  // const deleteTodo = (todo: Todolist) => {
  //   const originalTodos = [...toDoList];
  //   setToDoList(toDoList.filter((t) => t.id !== todo.id));

  //   axios
  //     .delete("http://localhost:9090/todo-service/todos" + todo)
  //     .catch((err) => {
  //       console.log(err);
  //       setToDoList(originalTodos);
  //     });
  // };

  return (
    <>
      <div className="flex-col justify-between items-center ">
        {tasks
          .filter((item) => !item.completed)
          .map((item) => (
            <div className="text-left flex justify-between px-6 py-5 my-4 bg-[#070814] text-[#0AB6FF] rounded-md" key={item.id}>
              {item.title}
              <div className="flex text-[18px]">
                <div className="p-2 mr-1 bg-[#181B25] ">
                  <FaCheck onClick={() => onCompleteTask(item.id)} />
                </div>
                <div className="p-2 bg-[#181B25]">
                  <MdDeleteOutline onClick={() => onDeleteTask(item.id)} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ToDoTask;
