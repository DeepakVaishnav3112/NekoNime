import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchSearchResults } from "../services/animeService";
import AnimeList from "../components/Anime/AnimeList";
import { useGeneralContext } from "../context/GeneralContext";

export default function Search() {
  const { searchAnimeList } = useGeneralContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [page, setPage] = useState(1);

  const [animeData, setAnimeData] = useState({
    list: [],
    pageInfo: {},
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAnime = async () => {
      if (!searchQuery) {
        return navigate("/");
      }

      if (searchAnimeList?.list?.length > 0) {
        return;
      }

      setLoading(true);
      try {
        let res = await fetchSearchResults(searchQuery, page);
        setAnimeData({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [searchQuery, page]);

  return (
    <div className="mt-4">
    <AnimeList
      title={searchQuery && `SEARCH RESULT FOR ${searchQuery.toUpperCase()}`}
      animeList={
        (searchAnimeList?.list?.length > 0 && searchAnimeList) || animeData
      }
      loading={loading}
      page={page}
      setPage={setPage}
    />
    </div>
  );
}
