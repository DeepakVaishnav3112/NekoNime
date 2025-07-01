import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDownMenu({
  options = [],
  selected,
  setSelected,
  className = "",
  buttonClass = "",
}) {
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

  const toggleDropdown = () => {
    if (!showDropdown) calculateDropdownPosition();
    setShowDropdown((prev) => !prev);
  };

  const calculateDropdownPosition = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    const dropdownHeight = 160;
    const spaceBelow = window.innerHeight - rect.bottom;
    setDropDownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
  };

  return (
    <div ref={buttonRef} className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        // className="flex items-center gap-2 text-[10px] xs:text-xs sm:text-sm px-4 py-2 border-2 border-b-0 border-primary rounded-t-md text-primary cursor-pointer transition duration-300 hover:bg-primary hover:text-white"
        className={`flex items-center gap-2 text-xs sm:text-sm px-4 py-2 border-2 border-b-0 border-primary rounded-t-md text-primary cursor-pointer transition duration-300 hover:bg-primary hover:text-white ${buttonClass}`}
      >
        <span>{selected}</span>
        <IoIosArrowDown />
      </button>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg ${
            dropDownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                // console.log("Selected Language: ", language);
                setShowDropdown(false);
                setSelected(option);
              }}
              className="w-full text-left px-4 py-2 hover:bg-secondary/20 transition-colors text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
