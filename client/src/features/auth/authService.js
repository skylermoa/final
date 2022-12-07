import axios from "axios";

const signup = async (userData) => {
  const response = await axios.post("/api/users/signup", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signin = async (userData) => {
  const response = await axios.post("/api/users/signin", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const signout = () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  signin,
  signout,
};

export default authService;
