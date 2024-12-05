interface DoneList {
  id: number;
  title: string;
  completed: boolean;
}

const DoneTask = ({ tasks }: { tasks: DoneList[] }) => {
  return (
    <div className="flex flex-col space-y-4">
      {tasks
        .filter((item) => item.completed) // Filter only completed tasks
        .map((item) => (
          <div
            key={item.id} // Use unique key for each item
            className="text-left line-through px-6 py-4 bg-[#070814] text-[#78CFB0] rounded-md hover:bg-[#1E2A34] transition-colors duration-200"
          >
            {item.title}
          </div>
        ))}
      {/* Show a message if there are no completed tasks */}
      {tasks.filter((item) => item.completed).length === 0 && (
        <div className="text-[#78CFB0] px-6 py-4 bg-[#1E2A34] rounded-md">
          No completed tasks yet.
        </div>
      )}
    </div>
  );
};

export default DoneTask;
