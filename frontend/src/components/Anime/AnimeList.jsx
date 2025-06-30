import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import Loader from "../Common/Loader";
import AnimeCard from "../Anime/AnimeCard";
import { useGeneralContext } from "../../context/GeneralContext";
import { SECTION_TYPES } from "../../utils/sections";
import { useEffect } from "react";

export default function AnimeList({
  title,
  animeList,
  loading,
  page,
  setPage,
}) {
  const { viewAllSection, setViewAllSection } = useGeneralContext();

  useEffect(() => {
    if (!viewAllSection) {
      setPage(1);
    }
  }, [viewAllSection]);

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

          {/* Pagination */}

            <div className="flex justify-between items-center pt-5 mt-5">
              {/* Previous Page */}
              <button
                title="Previous Page"
                className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer disabled:opacity-0"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page <= 1}
              >
                <MdKeyboardArrowLeft />
              </button>

              {/* Pages Buttons (previous, current and next) */}

              <div className="flex gap-2 text-white">
                {animeList?.pageInfo?.currentPage > 2 && (
                  <>
                    <button
                      className="text-xs p-2 px-4 rounded-full bg-secondary cursor-pointer hover:bg-primary/70 transition duration-300"
                      onClick={() => setPage(1)}
                    >
                      1
                    </button>

                    {animeList?.pageInfo.currentPage > 3 && (
                      <span className="text-secondary font-bold mt-3">
                        .....
                      </span>
                    )}
                  </>
                )}
                {animeList?.pageInfo?.currentPage > 1 && (
                  <button
                    className="text-xs p-2 px-4 rounded-full bg-secondary cursor-pointer hover:bg-primary/70 transition duration-300"
                    onClick={() =>
                      setPage(animeList?.pageInfo?.currentPage - 1)
                    }
                  >
                    {animeList?.pageInfo?.currentPage - 1}
                  </button>
                )}
                <button className="text-md font-bold p-2 px-4 rounded-full bg-primary-hover-bg cursor-pointer scale-120">
                  {animeList?.pageInfo?.currentPage}
                </button>
                {animeList?.pageInfo?.hasNextPage && (
                  <button
                    className="text-xs p-2 px-4 rounded-full bg-secondary cursor-pointer hover:bg-primary/70 transition duration-300"
                    onClick={() =>
                      setPage(animeList?.pageInfo?.currentPage + 1)
                    }
                  >
                    {animeList?.pageInfo?.currentPage + 1}
                  </button>
                )}
              </div>

              {/* Next Page */}
              <button
                title="Next Page"
                className="text-primary text-3xl p-1 border-2 border-primary rounded-md hover:bg-secondary hover:border-secondary hover:text-white transition cursor-pointer disabled:opacity-0"
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
