import { NavLink } from "react-router-dom";
import { FaGithub, FaHome, FaHeart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { RiDoorLockFill } from "react-icons/ri";
import { UseAuthContext } from "../context/AuthContext";
import { LogOut } from ".";
const Sidebar = () => {
  const { user } = UseAuthContext();

  return (
    <aside className="h-screen fiexed top-0 left-0 flex items-center justify-between flex-col bg-glass py-4 px-2  md:px-6">
      <ul className="flex flex-col items-center gap-4 mt-6">
        <li className="text-3xl md:text-4xl">
          <FaGithub />
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `link ${isActive && "bg-slate-800"}`}
          >
            <FaHome />
          </NavLink>
        </li>
        {user ? (
          <>
            <li>
              <NavLink
                to="/likes"
                className={({ isActive }) =>
                  `link ${isActive && "bg-slate-800"}`
                }
              >
                <FaHeart />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `link ${isActive && "bg-slate-800"}`
                }
              >
                <MdExplore />
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `link ${isActive && "bg-slate-800"}`
                }
              >
                <IoMdLogIn />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `link ${isActive && "bg-slate-800"}`
                }
              >
                <RiDoorLockFill />
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {user && (
        <div>
          <a
            href={user.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-4 items-center mb-4"
          >
            <img
              src={user.avatarUrl}
              alt="profile-img"
              className="rounded-full object-cover h-[35px] w-[35px]"
            />
          </a>
          <LogOut />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
