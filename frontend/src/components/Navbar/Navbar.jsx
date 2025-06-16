import { useState } from "react";
import { useGenreContext } from "../../context/GenreContext";
import SearchBar from "./SearchBar";
import { FaSearch } from "react-icons/fa";
import { useGeneralContext } from "../../context/GeneralContext";

export default function Navbar() {
  const { setSelectedGenre } = useGenreContext();
  const { setViewAllSection } = useGeneralContext();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    // <nav className="sticky top-0 w-full bg-white/30 backdrop-blur-md text-white shadow-md px-6 py-4 flex items-center justify-between z-50">
    //   <div className="flex items-center gap-5">
    //     {/* Brand Name */}
    //     <h1
    //       className="text-primary text-3xl font-bold cursor-pointer leading-0 text-shadow-lg"
    //       onClick={() => setSelectedGenre("")}
    //     >
    //       Neko<span className="text-secondary">Nime</span>
    //     </h1>

    //     {/* Search Bar */}
    //     <SearchBar />
    //   </div>
    // </nav>

    <nav className="sticky top-0 w-full bg-white/30 backdrop-blur-md text-white shadow-md px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 z-50">
      <div className="w-full sm:w-auto flex items-center justify-between gap-5">
        {/* Brand Name */}
        <h1
          className="text-primary text-2xl sm:text-3xl font-bold cursor-pointer leading-none text-shadow-lg"
          onClick={() => {setSelectedGenre(""); setViewAllSection(null);}}
        >
          Neko<span className="text-secondary">Nime</span>
        </h1>

        {/* Desktop Search Bar */}
        <div className="hidden sm:block">
          <SearchBar />
        </div>

        {/* Mobile Search Icon */}
        <button onClick={() => setShowMobileSearch(!showMobileSearch)} className={`sm:hidden border-2 border-primary text-primary text-xl p-2 rounded-full cursor-pointer hover:bg-primary hover:text-white transition ${ showMobileSearch ? "bg-primary text-white" : "" }`}>
          <FaSearch />
        </button>
      </div>

      {/* Mobile Search Bar */}
      { showMobileSearch && (
        <div className="w-full block sm:hidden">
          <SearchBar />
        </div>
      )}
    </nav>
  );
}
