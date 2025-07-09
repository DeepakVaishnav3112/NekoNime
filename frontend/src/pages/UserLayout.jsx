import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { fetchUserProfileData } from "../services/userService";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function UserLayout() {
  const { user, authChecked } = useAuthContext();

  // if (!user || !authChecked) return <Navigate to="/" replace />;

  const [selectedTab, setSelectedTab] = useState("Profile");
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="sticky top-16 z-10 w-full bg-primary flex justify-center gap-10">
        {[
          { label: "Profile", Icon: MdOutlineAccountCircle },
          { label: "Watchlists", Icon: CiBoxList },
          { label: "Settings", Icon: MdOutlineSettings },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-1 p-4 border-b-3 cursor-pointer hover:text-primary-hover-text transition-all duration-200 ${
              selectedTab === tab.label
                ? "bg-secondary text-primary-hover-text border-primary-hover-text"
                : "text-white border-transparent"
            }`}
            onClick={() => {
              setSelectedTab(tab.label);
              navigate(`/user/${tab.label.toLowerCase()}`);
            }}
          >
            <tab.Icon className="text-2xl" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* {selectedTab} */}

      <Outlet />
    </div>
  );
}
