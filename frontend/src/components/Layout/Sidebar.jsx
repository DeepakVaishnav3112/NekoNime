import { useGeneralContext } from "../../context/GeneralContext";

export default function Sidebar() {

    const { showSideBar } = useGeneralContext();

  return (
    <div
      className={`z-[60] top-[72px] sm:top-[67px] fixed right-0 bg-primary-hover-bg/80 backdrop-blur-md rounded-l-md p-2 w-full xs:w-1/2 sm:w-1/3 lg:w-1/4 2xl:w-1/5 xxl:sticky h-full xxl:h-fit transition-transform duration-300 ease-in-out ${
        showSideBar ? "translate-x-0" : "translate-x-full xxl:translate-x-0"
      }`}
    >
      SideBar
    </div>
  );
}
