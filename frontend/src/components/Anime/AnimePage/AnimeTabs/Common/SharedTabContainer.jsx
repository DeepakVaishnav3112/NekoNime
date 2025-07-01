import TabHeader from "./TabHeader";
import "../../../../../styles/scrollbar.css";
import { useAnimeDetailsContext } from "../../../../../context/AnimeDetailsContext";

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
  return (
    <div className="relative group ">
      <TabHeader
        heading={heading}
        showBtn={showBtn}
        dropDownOptions={dropDownOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      <div
        className={`${
          isHeight && "h-[400px]"
        } overflow-hidden overflow-y-auto custom-scrollbar pb-5 mt-1`}
      >
        {children}
      </div>
      {blendPosition && (
        <div className="absolute bottom-[-2px] w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
      )}
    </div>
  );
}
