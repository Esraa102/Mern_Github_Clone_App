import { IoGitBranch } from "react-icons/io5";
import { FaCopy, FaRegStar } from "react-icons/fa";
import { formatDate } from "../utils/formateDate";
import { PROGRAMMING_LANGUAGE } from "../utils/constants";
import toast from "react-hot-toast";

const Repo = ({ repo }) => {
  const handleCloneRepo = async () => {
    try {
      await navigator.clipboard.writeText(repo.clone_url);
      toast.success("Repo url cloned to clipboard");
    } catch (error) {
      toast.error("Clipboard write failed");
    }
  };
  return (
    <li className="mb-10 ms-6 pl-3">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-white rounded-full -start-3 ring-8 ring-white ">
        <IoGitBranch className="text-blue-700 text-3xl" />
      </span>
      <div className="flex items-center gap-6 flex-wrap">
        <a
          href={`https://github.com/${repo.full_name}`}
          target="_blank"
          rel="noreferrer"
          className="mb-1 hover:text-blue-600 hover:underline transition text-xl font-semibold  text-white"
        >
          {repo.name}
        </a>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-yellow-500/70 tag">
            <FaRegStar />
            <span>{repo.stargazers_count}</span>
          </span>
          <span className="bg-violet-500/70 tag">
            <IoGitBranch />
            <span>{repo.forks_count}</span>
          </span>
          <button onClick={handleCloneRepo} className="bg-green-500/70 tag">
            <FaCopy /> <span>Clone</span>
          </button>
        </div>
      </div>
      <time className="block my-3 text-sm font-normal leading-none text-gray-400 ">
        Released on: {formatDate(repo.created_at)}
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 ">
        {repo.description
          ? repo.description.slice(0, 500)
          : "No Description Provided For This Repo"}
      </p>
      {PROGRAMMING_LANGUAGE[repo.language] ? (
        <img src={PROGRAMMING_LANGUAGE[repo.language]} alt={repo.language} />
      ) : null}
    </li>
  );
};

export default Repo;
