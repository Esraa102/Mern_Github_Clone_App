import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { UseAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const { setUser } = UseAuthContext();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      setUser(null);
      toast.success("Logged Out Sucessfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <button type="button" className="link" onClick={handleLogOut}>
      <MdLogout />
    </button>
  );
};

export default LogOut;
