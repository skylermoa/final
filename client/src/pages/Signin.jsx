import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, reset } from "../features/auth/authSlice";

function Signin() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, fulfilled, rejected, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (rejected) {
      alert(message);
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
    };
    dispatch(signin(userData));
  };

  return (
    <>
      <section>
        <h1>Sign In</h1>
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
          <button type="submit">Sign In</button>
        </form>
      </section>
    </>
  );
}

export default Signin;
