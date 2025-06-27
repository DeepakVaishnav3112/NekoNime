import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAnimeDetailsContext } from "../../../context/AnimeDetailsContext";

export default function TabHeader({ heading, showBtn }) {
  const { selectedLanguage, setSelectedLanguge } = useAnimeDetailsContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState("bottom");

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const calculateDropdownPosition = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 160;
    setDropDownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
  };

  return (
    <div className="flex items-center justify-between border-b-2 border-primary">
      <h2 className="text-md text-white bg-secondary rounded-t-md px-4 py-2">
        {heading}
      </h2>
      {showBtn && (
        <div ref={buttonRef} className="relative">
          <button
            onClick={() =>
              setShowDropdown((prev) => {
                if (!prev) calculateDropdownPosition();
                return !prev;
              })
            }
            className="flex items-center gap-2 px-4 py-2 border-2 border-b-0 border-primary rounded-t-md text-primary cursor-pointer transition duration-300 hover:bg-primary hover:text-white"
          >
            <span>{selectedLanguage || "Japanese"}</span>
            <IoIosArrowDown />
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className={`absolute ${
                dropDownPosition === "top"
                  ? "bottom-full mb-1"
                  : "top-full mt-1"
              } left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10`}
            >
              {["Japanese", "English"].map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    // console.log("Selected Language: ", language);
                    setShowDropdown(false);
                    setSelectedLanguge(language);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-secondary/20 transition-colors text-sm"
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
