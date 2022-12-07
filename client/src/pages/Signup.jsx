import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../features/auth/authSlice";

function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, fulfilled, rejected, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (rejected) {
      console.log(message);
    }
    if (fulfilled || user) {
      navigate("/profile");
    }
    dispatch(reset());
  }, [user, fulfilled, rejected, message, navigate, dispatch]);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    }
    dispatch(signup(userData));
  };

  return (
    <>
      <section>
        <h1>Sign Up</h1>
        <p>please fill in the appropriate fields</p>
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </>
  );
}

export default Signup;
