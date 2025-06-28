import { useEffect, useState } from "react";
import { useGeneralContext } from "../context/GeneralContext";
import { useGenreContext } from "../context/GenreContext";
import AnimeList from "../components/Anime/AnimeList";
import { SECTION_TYPES } from "../utils/sections";
import { fetchAnime, fetchSearchResults } from "../services/animeService";

export default function Browse() {
  const { selectedGenre } = useGenreContext();
  const { viewAllSection, searchAnimeList, setSearchAnimeList, search } =
    useGeneralContext();

  const [searchAnimePage, setSearchAnimePage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);

  const [genreAnimePage, setGenreAnimePage] = useState(1);
  const [genreAnimeList, setGenreAnimeList] = useState({
    list: [],
    pageInfo: {},
  });
  const [genreLoading, setGenreLoading] = useState(false);

  useEffect(() => {
    const loadGenreAnime = async () => {
      if (!selectedGenre) return;

      try {
        setGenreLoading(true);
        setGenreAnimeList([]);
        const genreRes = await fetchAnime(selectedGenre, genreAnimePage);
        setGenreAnimeList({
          list: genreRes.data.animeList,
          pageInfo: genreRes.data.pageInfo,
        });
      } catch (err) {
        console.error("Error fetching genre anime:", err);
      } finally {
        setGenreLoading(false);
      }
    };

    loadGenreAnime();
  }, [selectedGenre, genreAnimePage]);

  useEffect(() => {
    const loadSearchResults = async () => {
      if (viewAllSection !== SECTION_TYPES.SEARCH || !search.trim()) return;

      setSearchLoading(true);

      try {
        const res = await fetchSearchResults(search, searchAnimePage);
        setSearchAnimeList({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch search results:", err);
      } finally {
        setSearchLoading(false);
      }
    };

    loadSearchResults();
  }, [searchAnimePage, search, viewAllSection]);

  return (
    <>
      {selectedGenre ? (
        <AnimeList
          title={`${selectedGenre.toUpperCase()} ANIME`}
          animeList={genreAnimeList}
          loading={genreLoading}
          page={genreAnimePage}
          setPage={setGenreAnimePage}
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
          loading={searchLoading}
          page={searchAnimePage}
          setPage={setSearchAnimePage}
        />
      ) : (
        <p className="text-center text-secondary text-lg mt-10">
          Please search or select a genre to view results.
        </p>
      )}
    </>
  );
}
