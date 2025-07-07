import { useLocation } from "react-router-dom";
import { useGeneralContext } from "../../context/GeneralContext";
import FiltersSection from "./Navbar/FiltersSection";
import Navbar from "./Navbar/Navbar";
import { MdCancel } from "react-icons/md";
import { useRef, useState } from "react";

export default function MainLayout({ children }) {
  const location = useLocation();
  const { dropDownOpen, isOffline } = useGeneralContext();
  const [showOfflineWarning, setShowOfflineWarning] = useState(true);

  const [animateOut, setAnimateOut] = useState(false);
  const warningRef = useRef(null);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setShowOfflineWarning(false), 300);
  };

  return (
    <div className="relative font-primary">
      <Navbar isAnimePage={location.pathname.startsWith("/anime/")} />
      {dropDownOpen && <FiltersSection />}
      <main>{children}</main>
      {isOffline && showOfflineWarning && (
        <div
          ref={warningRef}
          className={`fixed top-0 z-60 w-full overflow-hidden transition-all duration-300 ease-in-out ${
            animateOut ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-red-500 text-white">
            <span className="text-sm sm:text-base text-center w-full">
              You are offline! Please check your internet connection.
            </span>
            <button
              className="p-2 ml-2 text-white/80 hover:text-white hover:bg-red-700 rounded transition"
              onClick={handleClose}
            >
              <MdCancel className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
