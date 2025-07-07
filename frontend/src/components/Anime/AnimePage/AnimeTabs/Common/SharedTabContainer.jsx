import TabHeader from "./TabHeader";
import "../../../../../styles/scrollbar.css";
import { useEffect, useRef, useState } from "react";

export default function SharedTabContainer({
  heading,
  showBtn = false,
  dropDownOptions,
  selectedOption,
  setSelectedOption,
  children,
  isHeight = true,
  blendPosition = true,
}) {
  const scrollRef = useRef(null);
  const [showTopBlend, setShowTopBlend] = useState(false);
  const [showBottomBlend, setShowBottomBlend] = useState(true);

  const updateBlendVisibility = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopBlend(scrollTop > 0);
    setShowBottomBlend(scrollTop + clientHeight < scrollHeight - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateBlendVisibility();
    el.addEventListener("scroll", updateBlendVisibility);

    const observer = new ResizeObserver(updateBlendVisibility);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", updateBlendVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative group ">
      <TabHeader
        heading={heading}
        showBtn={showBtn}
        dropDownOptions={dropDownOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className={`${
          isHeight && "h-[400px]"
        } overflow-hidden overflow-y-auto custom-scrollbar mt-1`}
      >
        {children}
      </div>

      {/* Top and Bottom Blend */}
      {blendPosition && (
        <div
          className={`absolute top-[44px] w-full h-15 bg-gradient-to-b from-white to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
            showTopBlend ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      )}
      {blendPosition && (
        <div
          className={`absolute bottom-[-2px] w-full h-15 bg-gradient-to-t from-white to-transparent transition-opacity duration-300 pointer-events-none z-10 ${
            showBottomBlend ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      )}
    </div>
  );
}
