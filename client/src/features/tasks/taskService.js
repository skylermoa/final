import axios from "axios";

const createTask = async (taskData, token) => {
  const response = await axios.post("/api/tasks", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getTasks = async (token) => {
  const response = await axios.get("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const deleteTask = async (id, token) => {
  const response = await axios.delete(`/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const taskService = {
  createTask,
  getTasks,
  deleteTask,
};

export default taskService;
