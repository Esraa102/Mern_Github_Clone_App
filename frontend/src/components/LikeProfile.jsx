import { UseAuthContext } from "../context/AuthContext";
import { CiHeart } from "react-icons/ci";
import toast from "react-hot-toast";

const LikeProfile = ({ userProfile }) => {
  const { user } = UseAuthContext();
  const handleLikeProfile = async () => {
    try {
      const res = await fetch(
        `/api/users/like/${userProfile.login}`,
        {
          method: "POST",
          credentials: "include",
        },
        { withCredentials: true }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  if (!user || userProfile.login === user?.username) return null;
  return (
    <button
      onClick={handleLikeProfile}
      className="flex gap-3 items-center repo-btn px-2 text-[17px]"
    >
      <CiHeart size={24} />
      <span>Like Profile</span>
    </button>
  );
};

export default LikeProfile;
