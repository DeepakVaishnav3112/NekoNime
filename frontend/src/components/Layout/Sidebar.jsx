import { useAuthContext } from "../../context/AuthContext";
import { useGeneralContext } from "../../context/GeneralContext";
import { TbLogout } from "react-icons/tb";
import { logout } from "../../services/authService";
import { useRef } from "react";
import { useEffect } from "react";

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

    if (showSideBar) window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideBar]);

  const handleLogout = async () => {
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
      className={`z-[60] top-16 right-0 fixed text-black bg-primary shadow-[0_0_15px_rgba(0,0,0,0.3)] w-[350px] ${
        showSideBar ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center gap-4 p-4 border-b-2 border-primary-hover-text">
        <img
          src={user.profilePicture}
          alt=""
          className="w-15 rounded-full border-2 border-primary-hover-text p-[2px]"
        />
        <span className="text-lg text-white">{user.username}</span>
      </div>

      <div
        className="flex items-center gap-2 px-8 py-4 text-white cursor-pointer hover:bg-primary-hover-bg"
        onClick={handleLogout}
      >
        <TbLogout className="text-xl" />
        <span>Logout</span>
      </div>
    </div>
  );
}
