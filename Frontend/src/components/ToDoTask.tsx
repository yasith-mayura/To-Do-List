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
  completed = false,
}: {
  tasks: Todolist[];
  onDeleteTask: (id: number) => void;
  onCompleteTask: (id: number) => void;
  completed?: boolean;
}) => {
  return (
    <div className="flex-col justify-between items-center space-y-4">
      {tasks
        .filter((item) => item.completed === completed)
        .map((item) => (
          <div
            key={item.id}
            className={`transform transition-all duration-300 hover:scale-[1.01] 
              text-left flex justify-between items-center px-4 py-2 
              ${
                completed
                  ? "bg-gradient-to-r from-[#024732] to-[#02382b] text-emerald-300"
                  : "bg-gradient-to-r from-[#123b63] to-[#013262] text-[#16b0f8]"
              } 
              rounded-xl shadow-lg border border-[#2980B9] 
              w-full sm:px-6 sm:py-5 group`}
          >
            <div
              className={`flex-grow text-sm sm:text-base mr-2 truncate ${
                completed ? "line-through text-emerald-300" : "text-[#16b0f8]"
              }`}
            >
              {item.title}
            </div>
            <div className="flex space-x-2">
              {!completed && (
                <button
                  className="p-2 bg-[#405a75] rounded-md hover:bg-[#06e53e] 
                  transition duration-300 ease-in-out
                  w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
                  group-hover:bg-opacity-80"
                  onClick={() => onCompleteTask(item.id)}
                  aria-label="Complete Task"
                >
                  <FaCheck className="text-[#FFFFFF] text-sm sm:text-base" />
                </button>
              )}
              <button
                className="p-2 bg-[#405a75] rounded-md hover:bg-[#e51c06] 
                  transition duration-300 ease-in-out
                  w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
                  group-hover:bg-opacity-80"
                onClick={() => onDeleteTask(item.id)}
                aria-label="Delete Task"
              >
                <MdDeleteOutline className="text-[#FFFFFF] text-sm sm:text-base" />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ToDoTask;
