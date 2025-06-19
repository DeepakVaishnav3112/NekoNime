import { useGeneralContext } from "../../context/GeneralContext";
import AnimeCard from "../AnimeList/AnimeCard";
import Loader from "../Loader/Loader";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function AnimeSection({
  title,
  animeList,
  loading,
  visibleCards,
}) {
  const { setViewAllSection } = useGeneralContext();

  return (
    <div className="w-fit mt-2 sm:mt-0 pb-5 mb-5 border-b-2 border-primary border-dotted mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between pb-2 px-1 pe-4">
            <h2 className="text-md font-bold text-secondary">{title}</h2>
            <button
              className="flex gap-1 items-center text-primary font-medium text-xs cursor-pointer hover:text-secondary transition"
              onClick={() => setViewAllSection(title)}
            >
              View All <MdKeyboardArrowRight />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {animeList.slice(0, visibleCards).map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
