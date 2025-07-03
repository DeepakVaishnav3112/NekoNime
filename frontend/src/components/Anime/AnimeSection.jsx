import { useGeneralContext } from "../../context/GeneralContext";
import Loader from "../Common/Loader";
import { MdKeyboardArrowRight } from "react-icons/md";
import AnimeGrid from "./AnimeGrid";

export default function AnimeSection({
  title,
  animeList,
  loading,
  visibleCards,
}) {
  const { setViewAllSection } = useGeneralContext();

  return (
    <div className="w-fit pb-5 mb-5 border-b-2 border-primary border-dotted mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between pb-2 px-1 pe-4">
            <h2 className="text-xl font-bold text-secondary">{title}</h2>
            <button
              className="flex gap-1 items-center text-white bg-primary px-2 py-1 rounded-full font-medium text-xs cursor-pointer hover:text-secondary transition"
              onClick={() => {
                setViewAllSection(title);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              View All <MdKeyboardArrowRight />
            </button>
          </div>

          <AnimeGrid animeList={animeList} visibleCards={visibleCards} />
        </>
      )}
    </div>
  );
}
