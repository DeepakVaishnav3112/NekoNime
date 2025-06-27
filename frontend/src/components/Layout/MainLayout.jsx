import { useGeneralContext } from "../../context/GeneralContext";
import FiltersSection from "./Navbar/FiltersSection";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  const { dropDownOpen } = useGeneralContext();

  return (
    <div className="relative font-primary">
      <Navbar isAnimePage={location.pathname.startsWith("/anime/")}/>
      {dropDownOpen && <FiltersSection />}
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
