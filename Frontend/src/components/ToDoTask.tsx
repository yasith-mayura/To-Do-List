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
  return (
    <div className="flex-col justify-between items-center">
      {tasks
        .filter((item) => !item.completed) // Filter for incomplete tasks
        .map((item) => (
          <div
            className="text-left flex justify-between px-6 py-5 my-4 bg-[#070814] text-[#0AB6FF] rounded-md"
            key={item.id}
          >
            <div className="flex-grow">{item.title}</div>
            <div className="flex space-x-2">
              <button
                className="p-2 bg-[#181B25] rounded-md hover:bg-[#0AB6FF] transition"
                onClick={() => onCompleteTask(item.id)}
                aria-label="Complete Task"
              >
                <FaCheck className="text-[#FFFFFF]" />
              </button>
              <button
                className="p-2 bg-[#181B25] rounded-md hover:bg-[#FF0000] transition"
                onClick={() => onDeleteTask(item.id)}
                aria-label="Delete Task"
              >
                <MdDeleteOutline className="text-[#FFFFFF]" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ToDoTask;
