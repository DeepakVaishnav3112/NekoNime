import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/Common/Loader";

export default function UserLayout() {
  const { user, authChecked } = useAuthContext();

  if (!authChecked) return <Loader />;

  if (!user) return <Navigate to="/" replace />;

  return (
    <div>
      <h2>User Panel</h2>

      <div>
        <NavLink to="profile" className="hover:underline">
          Profile
        </NavLink>
        <NavLink to="watchlists" className="hover:underline">
          WatchLists
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
