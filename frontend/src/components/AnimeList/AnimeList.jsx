import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Loader from "../Loader/Loader";
import AnimeCard from "./AnimeCard";
import { useGeneralContext } from "../../context/GeneralContext";

export default function AnimeList({ title, animeList, loading }) {
  const { setViewAllSection } = useGeneralContext();

  return (
    <div className="w-fit mt-2 sm:mt-0 pb-5 mb-5 mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between pb-2 px-1 pe-4">
            <h2 className="text-md font-bold text-secondary">
              {title} 
            </h2>

            { title === "TRENDING NOW" ||
            title === "UPCOMING ANIME" ||
            title === "LATEST ANIME" ? (
              <button
                className="flex gap-1 items-center text-primary font-medium text-xs cursor-pointer hover:text-secondary transition"
                onClick={() => setViewAllSection(null)}
              >
                Show Less <MdKeyboardArrowRight />
              </button>
            ) : null }

          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {animeList.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>

          <div className="flex justify-between pt-5 mt-5">
            <button title="Previous Page" className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer"><MdKeyboardArrowLeft /></button>
            <button title="Next Page" className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer"><MdKeyboardArrowRight /></button>
          </div>
        </>
      )}
    </div>
  );
}
