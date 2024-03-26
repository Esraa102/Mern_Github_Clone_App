import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { handleAuth } from "../utils/authFunction";

const Register = () => {
  return (
    <section className="flex items-center justify-center text-center h-full">
      <div className="form">
        <h2 className="form-header">Create A New Account</h2>
        <button className="account-btn" onClick={handleAuth}>
          <FaGithub />
          <span>Create Github Account</span>
        </button>
        <p className="text-gray-600">
          Already Have An Account?{" "}
          <Link to={"/login"} className="form-link">
            SignIn
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
