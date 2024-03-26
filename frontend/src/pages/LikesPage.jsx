import { formatDate } from "../utils/formateDate";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

const LikesPage = () => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const getLikes = async () => {
      try {
        const { data } = await axios.get("/api/users/likes", {
          withCredentials: true,
        });
        console.log(data);
        setLikes(data.likedBy);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };
    getLikes();
  }, []);
  return (
    <section className="section">
      <div className="w-full mx-auto  overflow-x-auto shadow-md sm:rounded-lg bg-glass">
        {likes.length === 0 ? (
          <div className="text-center p-4 text-lg text-gray-400">
            You Have No Likes
          </div>
        ) : (
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right bg-transparent">
            <thead className="text-xs border-b border-b-gray-700  text-white uppercase bg-transparent">
              <tr>
                <th scope="col" className="th-head w-[5%]">
                  NO
                </th>
                <th scope="col" className="th-head w-[35%]">
                  Username
                </th>
                <th scope="col" className="th-head w-[30%]">
                  Date
                </th>
                <th scope="col" className="th-head w-[35%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {likes.map((user, index) => (
                <tr className="tr-row" key={user.username}>
                  <th scope="row" className="th-cell">
                    {index + 1}.
                  </th>
                  <td className="td">
                    <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                      <img
                        src={user.avatarUrl || "/assets/profile.png"}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                      <span className="text-sm md:text-lg capitalize">
                        {user.username}
                      </span>
                    </div>
                  </td>
                  <td className="td">
                    <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                      <FaHeart size={22} color="#f00" />
                      <span className="text-sm md:text-lg">
                        Liked Your Profile
                      </span>
                    </div>
                  </td>
                  <td className="td text-start">
                    {formatDate(user.likedDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default LikesPage;
