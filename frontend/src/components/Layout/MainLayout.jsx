import { useLocation } from "react-router-dom";
import { useGeneralContext } from "../../context/GeneralContext";
import FiltersSection from "./Navbar/FiltersSection";
import Navbar from "./Navbar/Navbar";
import { MdCancel } from "react-icons/md";
import { useRef, useState } from "react";
import AppAlert from "../Common/AppAlert";

export default function MainLayout({ children }) {
  const location = useLocation();
  const { dropDownOpen, isOffline, alert, showAlert } = useGeneralContext();

  return (
    <div className="relative font-primary">
      <Navbar isAnimePage={location.pathname.startsWith("/anime/")} />
      {dropDownOpen && <FiltersSection />}
      <main>{children}</main>
      {(alert.show || isOffline) && (
        <AppAlert
          type={isOffline ? "error" : alert.type}
          message={
            isOffline
              ? "You are offline! Please check your internet connection."
              : alert.message
          }
        />
      )}
    </div>
  );
}
