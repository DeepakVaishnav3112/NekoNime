import { useState } from "react";
import { useGenreContext } from "../../../context/GenreContext";
import SearchBar from "./SearchBar";
import { FaSearch } from "react-icons/fa";
import { useGeneralContext } from "../../../context/GeneralContext";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { setSelectedGenre } = useGenreContext();
  const { setViewAllSection, showSideBar, setShowSideBar, setDropDownOpen } =
    useGeneralContext();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const naviate = useNavigate();

  return (
    <nav className="sticky top-0 w-full bg-white/30 backdrop-blur-md text-white shadow-md px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 z-50">
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

          {/* Account Button for mobile */}
          <div className="sm:hidden">
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
          </div>
        </div>
      </div>

      {/* Account Button for deesktop */}
      <div className="max-sm:hidden xxl:hidden">
        <MdAccountCircle
          className={`cursor-pointer text-4xl hover:text-primary hover:scale-90 transition ${
            showSideBar ? "text-primary" : "text-secondary"
          }`}
          onClick={() => {
            setShowSideBar(!showSideBar);
            setDropDownOpen(false);
          }}
        />
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="w-full block sm:hidden">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}
