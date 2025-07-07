import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <h2>User Panel</h2>

      <div>
        <NavLink to="profile" className="hover:underline">Profile</NavLink>
        <NavLink to="watchlists" className="hover:underline">WatchLists</NavLink>
      </div>

      <Outlet />
    </div>
  )
}
