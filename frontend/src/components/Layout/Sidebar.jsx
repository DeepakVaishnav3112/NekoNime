import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";
import { TbLogout } from "react-icons/tb";
import { logout } from "../../services/authService";
import { useRef, useEffect } from "react";

export default function Sidebar({ accountBtnRef }) {
  const { showSideBar, setShowSideBar } = useGeneralContext();
  const { user, setUser } = useAuthContext();

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !accountBtnRef.current.contains(e.target)
      ) {
        setShowSideBar(false);
      }
    };

    if (showSideBar) window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showSideBar]);

  const handleLogout = async (e) => {
    e.stopPropagation();

    try {
      const res = await logout();
      console.log(res.data);
      setUser(null);
    } catch (err) {
      console.log("failed to logout: ", err);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className={`z-[60] top-18 right-2 fixed text-black shadow-[0_0_15px_rgba(0,0,0,0.3)] w-[350px] ${
        showSideBar ? "block" : "hidden"
      }`}
    >
      {user && <div className="flex items-center gap-4 p-4 bg-white border-b-2 border-secondary/30 rounded-t-md">
        <img
          src={user.profilePicture}
          alt=""
          className="w-15 rounded-full p-[1px] border-3 border-primary"
        />
        <div className="flex flex-col">
        <span className="text-lg text-primary">{user.username}</span>
        <span className="text-sm text-secondary">{ user.email }</span>
        </div>
      </div>}

      <div
        className="flex items-center gap-2 px-8 py-4 text-white bg-primary cursor-pointer hover:bg-secondary rounded-b-md transition-all duration-200 ease-in-out"
        onClick={handleLogout}
      >
        <TbLogout className="text-xl" />
        <span>Logout</span>
      </div>
    </div>
  );
}
