import { useState } from "react";
import { useGenreContext } from "../../../context/GenreContext";
import SearchBar from "./SearchBar";
import { FaSearch } from "react-icons/fa";
import { useGeneralContext } from "../../../context/GeneralContext";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AuthTriggerButton from "../../Auth/AuthTriggerButton";
import { useAuthContext } from "../../../context/AuthContext";
import Sidebar from "../Sidebar";
import { useRef } from "react";
import { MdArrowForwardIos } from "react-icons/md";

export default function Navbar() {
  const { setSelectedGenre } = useGenreContext();
  const { setViewAllSection, showSideBar, setShowSideBar, setDropDownOpen } =
    useGeneralContext();
  const { user } = useAuthContext();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const naviate = useNavigate();
  const accountBtnRef = useRef(null);

  return (
    <nav
      className={`sticky top-0 w-full bg-white/30 backdrop-blur-md text-white ps-4 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 z-50 ${
        !user && "px-4 py-2"
      }`}
    >
      <div className="w-full sm:w-auto flex items-center justify-between gap-5">
        {/* Brand Name */}
        <h1
          className="text-primary text-2xl sm:text-3xl font-bold cursor-pointer leading-none text-shadow-lg"
          onClick={() => {
            setSelectedGenre("");
            setViewAllSection(null);
            setDropDownOpen(false);
            naviate("/");
          }}
        >
          Neko<span className="text-secondary">Nime</span>
        </h1>

        {/* Desktop Search Bar */}
        <div className="hidden sm:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Search Icon */}
          <button
            onClick={() => {
              setShowMobileSearch(!showMobileSearch);
              setShowSideBar(false);
            }}
            className={`sm:hidden border-2 border-primary text-primary text-xl p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition ${
              showMobileSearch ? "bg-primary text-white" : ""
            }`}
          >
            <FaSearch />
          </button>

          {/* Sign up and Login Buttons for mobile */}
          {!user && (
            <div className="sm:hidden text-black flex gap-2">
              <AuthTriggerButton
                btnText="Sign Up"
                mode="signup"
                buttonStyle="rounded-s-full text-primary border-3 border-primary hover:bg-primary hover:text-white"
                textStyle="group-hover:scale-110"
              />

              <AuthTriggerButton
                btnText="Login"
                mode="login"
                buttonStyle="text-sm px-4 py-2 bg-secondary text-primary-hover-text hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(160,247,255)]"
                textStyle="text-sm font-semibold ps-4"
              />
            </div>
          )}

          {/* Account Button for mobile */}
          {/* <div className="sm:hidden">
            <MdAccountCircle
              className={`cursor-pointer text-5xl hover:text-primary hover:scale-90 transition ${
                showSideBar ? "text-primary" : "text-secondary"
              }`}
              onClick={() => {
                setShowSideBar(!showSideBar);
                setDropDownOpen(false);
                setShowMobileSearch(false);
              }}
            />
          </div> */}
        </div>
      </div>

      {/* Sign up and Login Buttons for desktop */}
      {!user && (
        <div className="max-sm:hidden text-black flex gap-2">
          <AuthTriggerButton
            btnText="Sign Up"
            mode="signup"
            buttonStyle="rounded-s-full text-primary border-3 border-primary hover:bg-primary hover:text-white"
            textStyle="text-sm ps-4"
          />

          <AuthTriggerButton
            btnText="Login"
            mode="login"
            buttonStyle="text-sm px-4 py-2 bg-secondary text-primary-hover-text hover:bg-primary hover:rounded-sm hover:text-white hover:shadow-[0_0_15px_rgba(160,247,255)]"
            textStyle="text-sm font-semibold"
          />
        </div>
      )}

      {/* Account Button for deesktop */}
      {user && (
        <div className="relative">
          <div
            ref={accountBtnRef}
            className={`max-sm:hidden flex items-center gap-2 ps-3 pe-2 py-3 cursor-pointer hover:bg-secondary/30 transition duration-200 ${
              showSideBar && "bg-secondary/30"
            }`}
            onClick={() => {
              setShowSideBar(!showSideBar);
              setDropDownOpen(false);
            }}
          >
            <img
              src={user?.profilePicture}
              alt=""
              className="w-10 rounded-full border-3 border-secondary scale-110"
            />
            <MdArrowForwardIos className={`text-xl text-secondary transition-all duration-200 ${showSideBar && "rotate-90"}`} />
          </div>

          <Sidebar accountBtnRef={accountBtnRef} />
        </div>
      )}

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="w-full block sm:hidden">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}
