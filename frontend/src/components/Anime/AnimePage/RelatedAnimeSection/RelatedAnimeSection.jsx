import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import SharedTabContainer from "../AnimeTabs/Common/SharedTabContainer";
import RelatedAnimeCard from "./RelatedAnimeCard";
import "../../../../styles/scrollbar.css";

export default function RelatedAnimeSection({ animeTitle, relations }) {
  const scrollRef = useRef(null);
  const [showLeftBlend, setShowLeftBlend] = useState(false);
  const [showRightBlend, setShowRightBlend] = useState(false);

  const updateBlendVisibility = () => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
    setShowLeftBlend(scrollLeft > 0);
    setShowRightBlend(scrollLeft + clientWidth < scrollWidth - 1); // -1 to handle float rounding
  };

  useEffect(() => {
    updateBlendVisibility(); // on mount

    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener("scroll", updateBlendVisibility);
    scrollEl.addEventListener("resize", updateBlendVisibility); // In case layout changes

    return () => {
      scrollEl.removeEventListener("scroll", updateBlendVisibility);
      scrollEl.removeEventListener("resize", updateBlendVisibility);
    };
  }, []);

  return (
    <SharedTabContainer
      heading={
        <>
          Related Anime For{" "}
          <span className="text-primary-hover-text font-medium">
            {animeTitle}
          </span>
        </>
      }
      isHeight={false}
      blendPosition={false}
    >
      <div className="relative">
        <div
          ref={scrollRef}
          className="snap-x snap-mandatory flex gap-2 mt-1 overflow-x-auto custom-scrollbar pb-2"
        >
          {relations?.map((relation) => (
            <RelatedAnimeCard key={relation.node.id} relation={relation} />
          ))}
        </div>

        {/* Right blend: show if not scrolled to the very end */}
        <div
          className={`absolute top-0 right-[-3px] w-10 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            showRightBlend ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Left blend: show if not at start */}
        <div
          className={`absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10 transition-opacity duration-300 ${
            showLeftBlend ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* <div className="absolute top-1/2 flex justify-between w-full text-2xl -translate-y-[100%] text-white z-60"> */}
          <div
            className={`bg-primary p-2 rounded-full ml-5 cursor-pointer hover:bg-secondary hover:scale-110 transition-all duration-200 absolute top-1/2 left-0 text-2xl -translate-y-[100%] text-white z-60 ${
              showLeftBlend ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              scrollRef.current.scrollLeft -= 200;
            }}
          >
            <MdKeyboardArrowLeft />
          </div>
          <div
            className={`bg-primary p-2 rounded-full mr-5 cursor-pointer hover:bg-secondary hover:scale-110 transition-all duration-200 absolute top-1/2 right-0 text-2xl -translate-y-[100%] text-white z-60 ${
              showRightBlend ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              scrollRef.current.scrollLeft += 200;
            }}
          >
            <MdKeyboardArrowRight />
          </div>
        </div>
      {/* </div> */}
    </SharedTabContainer>
  );
}
