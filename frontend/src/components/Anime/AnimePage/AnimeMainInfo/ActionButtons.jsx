import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import CircleButton from "../../../Common/CircleButton";
import { IoShareSocial } from "react-icons/io5";
import { useAuthContext } from "../../../../context/AuthContext";
import { useGeneralContext } from "../../../../context/GeneralContext";

export default function ActionButtons() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState("bottom");
  const { user, authChecked } = useAuthContext();
  const { showAlert } = useGeneralContext();

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
    const dropdownHeight = 160; // estimated height
    setDropDownPosition(spaceBelow < dropdownHeight ? "top" : "bottom");
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      {/* Add to List Button */}
      <div ref={buttonRef} className="relative w-40 md:w-60">
        <button
          onClick={() => {
            setShowDropdown((prev) => {
              if (!prev) calculateDropdownPosition();
              return !prev;
            });
          }}
          className="group w-full flex text-white rounded-md overflow-hidden cursor-pointer"
        >
          <div className="flex-1 flex justify-center items-center gap-2 bg-primary group-hover:bg-secondary/80 transition-colors duration-300">
            <LuPlus className="text-xl" />
            <span className="max-md:text-xs">Add to List</span>
          </div>
          <div className="p-3 bg-primary-hover-bg group-hover:bg-secondary rounded-e-md transition-colors duration-300">
            <IoIosArrowDown />
          </div>
        </button>

        {/* Show Dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className={`absolute ${
              dropDownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            } left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10`}
          >
            {["Completed", "Watching", "Planning", "Dropped", "Custom"].map(
              (status) => (
                <button
                  key={status}
                  className="w-full text-left px-4 py-2 hover:bg-secondary/20 transition-colors text-sm"
                  onClick={() => {
                    console.log("Selected List:", status);
                    setShowDropdown(false);
                    if (!authChecked || !user) {
                      showAlert(
                        "Please login to add anime to your list!",
                        "warning"
                      );
                      return;
                    }
                  }}
                >
                  {status}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Share Button */}
      <CircleButton
        icon={IoShareSocial}
        onclick={() => console.log("Share")}
        title="Share"
        btnText="Share"
      />
    </div>
  );
}
