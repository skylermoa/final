import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, reset } from "../features/tasks/taskSlice";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, rejected, message } = useSelector((state) => state.task);

  useEffect(() => {
    if (rejected) {
      alert(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getTasks());
    dispatch(reset());
  }, [user, navigate, rejected, message, dispatch]);

  return (
    <>
      <section>
        <h1>Welcome {user.username}</h1>
        <p>Here are your tasks</p>
      </section>
      <TaskForm />
      <section>
        {tasks.length > 0 ? (
          tasks.map((task) => {
            return <TaskItem key={task._id} task={task} />;
          })
        ) : (
          <p>No tasks</p>
        )}
      </section>
    </>
  );
}

export default Profile;
