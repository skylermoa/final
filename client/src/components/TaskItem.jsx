import { useDispatch } from "react-redux";
import { getTasks, deleteTask } from "../features/tasks/taskSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    dispatch(getTasks());
  };

  return (
    <div>
      <span>{task.text}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;