import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Loader from "../Common/Loader";
import AnimeCard from "../Anime/AnimeCard";
import { useGeneralContext } from "../../context/GeneralContext";
import { SECTION_TYPES } from "../../utils/sections";

export default function AnimeList({
  title,
  animeList,
  loading,
  page,
  setPage,
}) {
  const { setViewAllSection } = useGeneralContext();

  return (
    <div className="w-fit mt-2 sm:mt-0 pb-5 mb-5 mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between pb-2 px-1 pe-4">
            <h2 className="text-md font-bold text-secondary">{title}</h2>

            {title === SECTION_TYPES.TRENDING ||
            title === SECTION_TYPES.UPCOMING ||
            title === SECTION_TYPES.LATEST ? (
              <button
                className="flex gap-1 items-center text-primary font-medium text-xs cursor-pointer hover:text-secondary transition"
                onClick={() => setViewAllSection(null)}
              >
                Show Less <MdKeyboardArrowRight />
              </button>
            ) : null}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {animeList?.list?.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>

          <div className="flex justify-between pt-5 mt-5">
            <button
              title="Previous Page"
              className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer disabled:opacity-0"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page <= 1}
            >
              <MdKeyboardArrowLeft />
            </button>
            <div className="text-center text-sm text-secondary pt-3">
              Page {animeList?.pageInfo?.currentPage} of{" "}
              {animeList?.pageInfo?.lastPage}
            </div>
            <button
              title="Next Page"
              className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!animeList?.pageInfo?.hasNextPage}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
