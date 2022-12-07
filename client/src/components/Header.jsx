import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSignout = () => {
    dispatch(signout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header>
      <h1>TaskerAide</h1>
      <nav>
        <ul>
          {user ? (
            <li>
              <button onClick={handleSignout}>Sign Out</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
