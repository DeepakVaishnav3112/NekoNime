import { useEffect, useRef, useState } from "react";
import { fetchSearchResults } from "../../../services/animeService"
import { FaSearch } from "react-icons/fa";
import DropDown from "./DropDown";
import SearchSuggestions from "./SearchSuggestions";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useGenreContext } from "../../../context/GenreContext";

export default function SearchBar() {
  const {
    search,
    setSearch,
    setViewAllSection,
    setSearchAnimeList,
    setDropDownOpen,
    setShowSideBar,
  } = useGeneralContext();
  const { setSelectedGenre } = useGenreContext();

  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    // Debounce: Wait for 300ms after typing stops
    const delayDebounce = setTimeout(async () => {
      if (search.trim().length > 0) {
        setLoading(true);
        try {
          const res = await fetchSearchResults(search);
          setSearchResults(res.data);
        } catch (error) {
          console.log("Error fetching search results:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center rounded-full"
      ref={searchRef}
    >
      <div className="flex w-full sm:w-auto">
        <DropDown setIsSearchOpen={setIsSearchOpen} />

        {/* Search Input Box */}
        <input
          type="search"
          placeholder="Search anime..."
          value={search}
          className="flex-1 min-w-0 text-secondary font-medium px-3 py-2 focus:outline-none border-y-2 border-[#429EA6] w-full sm:w-64 md:w-80"
          onChange={(e) => {
            setSearch(e.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => {
            setIsSearchOpen(true);
            setDropDownOpen(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim().length > 0) {
              setSelectedGenre(null);
              setViewAllSection("SEARCH RESULTS");
              setSearchAnimeList(searchResults);
              setIsSearchOpen(false);
            }
          }}
        />

        {/* Search Button */}
        <button
          onClick={() => {
            if (search.trim().length > 0) {
              setSelectedGenre(null);
              setViewAllSection("SEARCH RESULTS");
              setSearchAnimeList(searchResults);
              setIsSearchOpen(false);
            }
            setShowSideBar(false);
          }}
          className="px-4 border-2 border-l-0 border-[#429EA6] rounded-e-full cursor-pointer hover:bg-primary text-primary hover:text-white transition"
        >
          <FaSearch />
        </button>
      </div>

      {/* Search Suggestions */}
      {isSearchOpen && (searchResults.length > 0 || loading) && (
        <SearchSuggestions
          searchResults={searchResults}
          loading={loading}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </div>
  );
}
