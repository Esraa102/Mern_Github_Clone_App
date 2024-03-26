/* eslint-disable react-hooks/exhaustive-deps */
import { IoSearch } from "react-icons/io5";
import { Loading, ProfileInfo, Repos, SortRepos } from "../components";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [sortType, setSortType] = useState("recent");
  const [user, setUser] = useState("");
  const sortRepos = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // recent repo first
    } else if (sortType === "mostStars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // most stars repo first
    } else if (sortType === "mostForks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); // most forks repo first
    }
    setSortType(sortType);
    setRepos([...repos]);
  };
  const getUserAndRepos = async () => {
    setIsLoading(true);
    const fetchUser =
      user === ""
        ? "/api/users/profile/esraa102"
        : `/api/users/profile/${user}`;
    try {
      const { data } = await axios.get(fetchUser);
      if (!data.userProfile) {
        toast.error("User Not Found");
        throw new Error("User Not Found");
      }
      setUserProfile(data.userProfile);
      data.repos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setRepos(data.repos);

      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAndRepos();
    setSortType("recent");
  }, []);

  const getData = (e) => {
    setUserProfile(null);
    setRepos([]);
    e.preventDefault();
    getUserAndRepos();
    setSortType("recent");
  };

  return (
    <section className="section overflow-x-hidden">
      {/* Search User And Repos */}
      <form
        action=""
        onSubmit={getData}
        className="bg-glass w-full gap-4 md:w-[60%] mx-auto p-3 rounded-md flex flex-wrap items-center"
      >
        <div className="flex items-center w-full flex-1">
          <IoSearch className="text-2xl text-gray-400" />
          <input
            type="text"
            name="search"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="search user here..."
            className="bg-transparent border-none focus:outline-none p-2 flex-1"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 w-full  md:w-fit bg-main rounded-md"
        >
          Search
        </button>
      </form>
      {/* sort repos */}
      {repos.length > 0 && <SortRepos sortType={sortType} onSort={sortRepos} />}
      {/***********************************************************************/}
      <div className="flex flex-col gap-6 my-8 md:flex-row">
        <div className={`w-full md:w-[40%]`}>
          {isLoading ? <Loading /> : <ProfileInfo userProfile={userProfile} />}
        </div>
        <div
          className={`w-full md:w-[65%] bg-glass p-10 rounded-lg ${
            repos.length === 0 && "h-[200px] flex flex-col justify-center"
          }`}
        >
          {isLoading ? <Loading /> : <Repos repos={repos} />}
        </div>
      </div>
    </section>
  );
};

export default Home;
