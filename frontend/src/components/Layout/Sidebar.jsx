import { useGeneralContext } from "../../context/GeneralContext";

export default function Sidebar() {

    const { showSideBar } = useGeneralContext();

  return (
    <div
      className={`z-[60] top-19 fixed right-2 bg-primary-hover-bg/80 backdrop-blur-md rounded-md p-2 h-full xxl:h-fit transition-transform duration-300 ease-in-out ${showSideBar ? "block" : "hidden"}`}
    >
      SideBar
    </div>
  );
}
