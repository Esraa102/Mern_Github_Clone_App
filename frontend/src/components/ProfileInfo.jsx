import { FaEye } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { RiUserFollowLine, RiUserFollowFill } from "react-icons/ri";
import { VscGistSecret } from "react-icons/vsc";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { formatDate } from "../utils/formateDate";
import LikeProfile from "./LikeProfile";

const ProfileInfo = ({ userProfile }) => {
  if (!userProfile) return;
  return (
    <>
      <div className="p-4 bg-glass rounded-lg">
        <div className="flex flex-wrap gap-4 justify-between mb-4">
          <a href={userProfile.html_url} target="_blank" rel="noreferrer">
            <img
              src={userProfile.avatar_url}
              alt="profile"
              className="w-[80px] h-[80px] rounded-full"
            />
          </a>
          <div className="flex gap-4 items-center flex-wrap">
            <LikeProfile userProfile={userProfile} />
            <a
              href={userProfile.html_url}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 items-center repo-btn px-2 text-[17px]"
            >
              <FaEye />
              <span>View on github</span>
            </a>
          </div>
        </div>
        {/* User Bio */}
        {userProfile.bio && (
          <div className=" gap-2 mb-3  text-lg">
            <p className="flex text-sm  text-gray-500 items-center gap-2 ">
              <TfiThought />
              <span>Bio</span>
            </p>
            <p>{userProfile.bio}</p>
          </div>
        )}
        {/* User Location  */}
        {userProfile.location && (
          <p className="flex items-center gap-2 mb-3 text-lg">
            <FaLocationDot />
            <span>{userProfile.location}</span>
          </p>
        )}
        {/* Twitter Username  */}
        {userProfile.twitter_username && (
          <a
            href={userProfile.twitter_username}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 mb-3  text-lg"
          >
            <FaXTwitter />
            <span className="text-blue-700 underline">
              {userProfile.twitter_username}
            </span>
          </a>
        )}
        {/* User  Memberence */}
        {userProfile.created_at && (
          <div className=" gap-2 mb-3  text-lg">
            <p className="text-sm text-gray-500">Member Since</p>
            <p>{formatDate(userProfile.created_at)}</p>
          </div>
        )}
        {/*  User  Full Name */}
        {userProfile.name && (
          <div className=" gap-2 mb-3  text-lg">
            <p className="text-sm text-gray-500">Full Name</p>
            <p>{userProfile.name}</p>
          </div>
        )}
        {/*  User   Email  */}
        {userProfile.email && (
          <div className=" gap-2 mb-3  text-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p>{userProfile.email}</p>
          </div>
        )}
        {/* User  Username */}
        {userProfile.login && (
          <div className=" gap-2 mb-3  text-lg">
            <p className="text-sm text-gray-500">Username</p>
            <p>{userProfile.login}</p>
          </div>
        )}
      </div>
      <div className="p-4 flex gap-4 flex-wrap justify-center">
        <div className="repo-btn w-[200px] flex gap-2 items-center px-4 text-lg">
          <RiUserFollowFill className=" text-violet-600" />
          <span>Followers: {userProfile.followers}</span>
        </div>
        <div className="repo-btn w-[200px] flex gap-2 items-center px-4 text-lg">
          <RiUserFollowLine className=" text-violet-600" />
          <span>Following: {userProfile.following}</span>
        </div>
        <div className="repo-btn flex w-[200px] gap-2 items-center px-4 text-lg">
          <FaSquarePollHorizontal className=" text-violet-600" />
          <span>Public Repos: {userProfile.public_repos}</span>
        </div>
        <div className="repo-btn flex w-[200px] gap-2 items-center px-4 text-lg">
          <VscGistSecret className=" text-violet-600" />
          <span>Public Gists: {userProfile.public_gists}</span>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
