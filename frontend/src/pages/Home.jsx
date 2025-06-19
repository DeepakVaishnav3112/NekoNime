import { useEffect, useState } from "react";
import {
  fetchAnime,
  fetchLatestAnime,
  fetchTrendingAnime,
  fetchUpcomingAnime,
} from "../services/animeService";
import AnimeSection from "../components/AnimeList/AnimeSection";
import { useGenreContext } from "../context/GenreContext";
import AnimeList from "../components/AnimeList/AnimeList";
import { useGeneralContext } from "../context/GeneralContext";

export default function Home() {
  const { selectedGenre } = useGenreContext();
  const { viewAllSection, searchAnimeList, search } = useGeneralContext();

  const [trendingAnimeList, setTrendingAnimeList] = useState([]);
  const [upcomingAnimeList, setUpcomingAnimeList] = useState([]);
  const [latestAnimeList, setLatestAnimeList] = useState([]);
  const [genreAnimeList, setGenreAnimeList] = useState([]);

  const [visibleCards, setVisibleCards] = useState(5);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadInitData = async () => {
      try {
        setLoading(true);
        const [trendingRes, upcomingRes, latestRes] = await Promise.all([
          fetchTrendingAnime(),
          fetchUpcomingAnime(),
          fetchLatestAnime(),
        ]);
        console.log(upcomingRes.data);
        setTrendingAnimeList(trendingRes.data);
        setUpcomingAnimeList(upcomingRes.data);
        setLatestAnimeList(latestRes.data);
        // console.log(upcomingRes.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitData();
  }, []);

  useEffect(() => {
    const loadGenreAnime = async () => {
      try {
        setLoading(true);
        setGenreAnimeList([]);
        const genreRes = await fetchAnime(selectedGenre);
        setGenreAnimeList(genreRes.data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
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
      <div className="flex flex-col lg:flex-row gap-2 px-1 sm:px-2 py-2 sm:py-4">

        <div className="hidden lg:flex gap-4 flex-col sm:flex-row lg:flex-col m-1 lg:w-1/3 2xl:w-1/4 h-fit">
          <div className="flex-1 w-full border-2 border-primary text-primary p-4 rounded-md">
            <h2 className="text-md font-bold">YOUR LISTS</h2>
          </div>
          <div className="flex-1 w-full bg-primary p-4 rounded-md">
            <h2 className="text-md font-bold text-white">YOUR LISTS</h2>
          </div>
        </div>

        <div className="lg:m-auto">
          {selectedGenre ? (
            <AnimeList
              title={`${selectedGenre} ANIME`}
              animeList={genreAnimeList}
              loading={loading}
            />
          ) : viewAllSection === "TRENDING NOW" ? (
            <AnimeList
              title={"TRENDING NOW"}
              animeList={trendingAnimeList}
              loading={loading}
            />
          ) : viewAllSection === "UPCOMING ANIME" ? (
            <AnimeList
              title={"UPCOMING ANIME"}
              animeList={upcomingAnimeList}
              loading={loading}
            />
          ) : viewAllSection === "LATEST ANIME" ? (
            <AnimeList
              title={"LATEST ANIME"}
              animeList={latestAnimeList}
              loading={loading}
            />
          ) : viewAllSection === "SEARCH RESULTS" ? (
            <AnimeList
              title={
                <>
                  SEARCH RESULTS FOR <span className="text-primary">{search.toUpperCase()}</span>
                </>
              }
              animeList={searchAnimeList}
              loading={loading}
            />
          ) : (
            <>
              <AnimeSection
                title="TRENDING NOW"
                animeList={trendingAnimeList}
                loading={loading}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title="UPCOMING ANIME"
                animeList={upcomingAnimeList}
                loading={loading}
                visibleCards={visibleCards}
              />
              <AnimeSection
                title="LATEST ANIME"
                animeList={latestAnimeList}
                loading={loading}
                visibleCards={visibleCards}
              />
            </>
          )}
        </div>

        <div className="hidden xxl:flex bg-primary w-1/6">SideBar</div>

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
