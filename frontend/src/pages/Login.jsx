import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleAuth } from "../utils/authFunction";
const Login = () => {
  return (
    <section className="flex items-center justify-center text-center h-full">
      <div className="form">
        <h2 className="form-header">Log In To Your Account</h2>
        <button className="account-btn" onClick={handleAuth}>
          <FaGithub />
          <span>Log In With Github</span>
        </button>
        <p className="text-gray-600">
          Don&apos;t Have An Account?{" "}
          <Link to={"/register"} className="form-link">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
