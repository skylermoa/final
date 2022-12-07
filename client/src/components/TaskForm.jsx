import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";

function TaskForm() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTask({ text }));
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text">Task</label>
      <input
        type="text"
        id="text"
        name="text"
        value={text}
        onChange={handleChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;