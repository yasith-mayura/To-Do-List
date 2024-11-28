interface DoneList {
  id: number;
  title: string;
  completed: boolean;
}

const DoneTask = ({ tasks }: { tasks: DoneList[] }) => {
  // const [doneList, setDoneList] = useState<DoneList[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<DoneList[]>("http://localhost:9090/todo-service/dones")
  //     .then((res) => setDoneList(res.data));
  // }, []);

  return (
    <>
      <div className="flex-col justify-between ">
        {tasks
          .filter((item) => item.completed)
          .map((item) => (
            <div className=" text-left line-through px-6 py-5 mt-6 bg-[#070814] text-[#78CFB0] rounded-md">
              {item.title}
            </div>
          ))}
      </div>
    </>
  );
};

export default DoneTask;
