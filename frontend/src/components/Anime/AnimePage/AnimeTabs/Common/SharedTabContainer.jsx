import TabHeader from "./TabHeader";
import "../../../../../styles/scrollbar.css";

export default function SharedTabContainer({
  heading,
  showBtn = false,
  children,
}) {
  return (
    <div className="relative group lg:px-3">
      <TabHeader heading={heading} showBtn={showBtn} />
      <div className="h-[400px] overflow-hidden overflow-y-auto custom-scrollbar pb-10 mt-1">
        {children}
      </div>
      <div className="absolute bottom-[-2px] w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
    </div>
  );
}
