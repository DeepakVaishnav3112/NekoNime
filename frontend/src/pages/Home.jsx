import { useEffect, useState } from "react";
import useAnimeData from "../hooks/useAnimeData";
import AnimeSection from "../components/Anime/AnimeSection";
import AnimeList from "../components/Anime/AnimeList";
import { useGeneralContext } from "../context/GeneralContext";
import { SECTION_TYPES } from "../utils/sections";
import AnimeCarousel from "../components/Common/AnimeCarousel";

export default function Home() {
  const { viewAllSection, setViewAllSection } = useGeneralContext();
  const {
    sesaonTopRated,
    trending,
    upcoming,
    latest,
    trendingPage,
    upcomingPage,
    latestPage,
    loadingSesaonTopRated,
    loadingTrending,
    loadingUpcoming,
    loadingLatest,
    setTrendingPage,
    setUpcomingPage,
    setLatestPage,
  } = useAnimeData();

  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    if (viewAllSection === null) {
      setTrendingPage(1);
      setUpcomingPage(1);
      setLatestPage(1);
    }
  }, [viewAllSection]);

  useEffect(() => {
    const updateCardCounter = () => {
      const width = window.innerWidth;
      if (width < 1280) {
        setVisibleCards(6);
      } else if (width < 1536) {
        setVisibleCards(4);
      } else {
        setVisibleCards(5);
      }
    };

    updateCardCounter();
    window.addEventListener("resize", updateCardCounter);
    return () => window.removeEventListener("resize", updateCardCounter);
  }, []);

  // console.log(sesaonTopRated);

  return (
    <div>
      <AnimeCarousel
        animeList={sesaonTopRated}
        loading={loadingSesaonTopRated}
      />

      <div
        className={`relative flex flex-col lg:flex-row gap-2 ${
          sesaonTopRated && "2xl:mt-[-140px]"
        }`}
      >
        <div className="sticky top-22 hidden lg:flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 2xl:w-1/4 h-fit px-1 sm:px-2">
          <div className="flex-1 w-full border-2 border-primary text-primary p-4 rounded-md">
            <h2 className="text-md font-bold">YOUR LISTS</h2>
          </div>
          <div className="flex-1 w-full bg-primary p-4 rounded-md">
            <h2 className="text-md font-bold text-white">YOUR LISTS</h2>
          </div>
        </div>

        <div className="lg:m-auto px-1 sm:px-2 py-2 sm:py-4 2xl:mt-[-20px]">
          {viewAllSection === SECTION_TYPES.TRENDING ? (
            <AnimeList
              title={SECTION_TYPES.TRENDING}
              animeList={trending}
              loading={loadingTrending}
              page={trendingPage}
              setPage={setTrendingPage}
            />
          ) : viewAllSection === SECTION_TYPES.UPCOMING ? (
            <AnimeList
              title={SECTION_TYPES.UPCOMING}
              animeList={upcoming}
              loading={loadingUpcoming}
              page={upcomingPage}
              setPage={setUpcomingPage}
            />
          ) : viewAllSection === SECTION_TYPES.LATEST ? (
            <AnimeList
              title={SECTION_TYPES.LATEST}
              animeList={latest}
              loading={loadingLatest}
              page={latestPage}
              setPage={setLatestPage}
            />
          ) : (
            <>
              <AnimeSection
                title={SECTION_TYPES.TRENDING}
                animeList={trending}
                loading={loadingTrending}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.UPCOMING}
                animeList={upcoming}
                loading={loadingUpcoming}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.LATEST}
                animeList={latest}
                loading={loadingLatest}
                visibleCards={visibleCards}
              />
            </>
          )}
        </div>

        <div className="flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 lg:hidden">
          <div className="flex-1 w-full border-2 border-primary text-primary p-4 rounded-md">
            <h2 className="text-md font-bold">YOUR LISTS</h2>
          </div>
          <div className="flex-1 w-full bg-primary p-4 rounded-md">
            <h2 className="text-md font-bold text-white">YOUR LISTS</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
