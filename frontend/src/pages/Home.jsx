import { useEffect, useState } from "react";
import { fetchAnime } from "../services/animeService";
import useAnimeData from "../hooks/useAnimeData";
import AnimeSection from "../components/Anime/AnimeSection";
import { useGenreContext } from "../context/GenreContext";
import AnimeList from "../components/Anime/AnimeList";
import { useGeneralContext } from "../context/GeneralContext";
import { SECTION_TYPES } from "../utils/sections";

export default function Home() {
  const { selectedGenre } = useGenreContext();
  const { viewAllSection, searchAnimeList, search } =
    useGeneralContext();
  const { trending, upcoming, latest, loading } = useAnimeData();

  const [genreAnimeList, setGenreAnimeList] = useState([]);
  const [genreLoading, setGenreLoading] = useState(false);

  const [visibleCards, setVisibleCards] = useState(5);

  useEffect(() => {
    const loadGenreAnime = async () => {
      try {
        setGenreLoading(true);
        setGenreAnimeList([]);
        const genreRes = await fetchAnime(selectedGenre);
        setGenreAnimeList(genreRes.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setGenreLoading(false);
      }
    };

    selectedGenre && loadGenreAnime();
  }, [selectedGenre]);

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

  return (
    <div>
      <div className="relative flex flex-col lg:flex-row gap-2">
        <div className="sticky top-22 hidden lg:flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 2xl:w-1/4 h-fit px-1 sm:px-2">
          <div className="flex-1 w-full border-2 border-primary text-primary p-4 rounded-md">
            <h2 className="text-md font-bold">YOUR LISTS</h2>
          </div>
          <div className="flex-1 w-full bg-primary p-4 rounded-md">
            <h2 className="text-md font-bold text-white">YOUR LISTS</h2>
          </div>
        </div>

        <div className="lg:m-auto px-1 sm:px-2 py-2 sm:py-4">
          {selectedGenre ? (
            <AnimeList
              title={`${selectedGenre.toUpperCase()} ANIME`}
              animeList={genreAnimeList}
              loading={genreLoading}
            />
          ) : viewAllSection === SECTION_TYPES.TRENDING ? (
            <AnimeList
              title={SECTION_TYPES.TRENDING}
              animeList={trending}
              loading={loading}
            />
          ) : viewAllSection === SECTION_TYPES.UPCOMING ? (
            <AnimeList
              title={SECTION_TYPES.UPCOMING}
              animeList={upcoming}
              loading={loading}
            />
          ) : viewAllSection === SECTION_TYPES.LATEST ? (
            <AnimeList
              title={SECTION_TYPES.LATEST}
              animeList={latest}
              loading={loading}
            />
          ) : viewAllSection === SECTION_TYPES.SEARCH ? (
            <AnimeList
              title={
                <>
                  SEARCH RESULTS FOR{" "}
                  <span className="text-primary">{search.toUpperCase()}</span>
                </>
              }
              animeList={searchAnimeList}
              loading={loading}
            />
          ) : (
            <>
              <AnimeSection
                title={SECTION_TYPES.TRENDING}
                animeList={trending}
                loading={loading}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.UPCOMING}
                animeList={upcoming}
                loading={loading}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title={SECTION_TYPES.LATEST}
                animeList={latest}
                loading={loading}
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
