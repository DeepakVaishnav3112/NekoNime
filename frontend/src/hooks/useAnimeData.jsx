import { useState, useEffect } from "react";
import { fetchTrendingAnime, fetchUpcomingAnime, fetchLatestAnime } from "../services/animeService";

export default function useAnimeData() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    trending: [],
    upcoming: [],
    latest: [],
  });

  useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true);
            const [trendingRes, upcomingRes, latestRes] = await Promise.all([
                fetchTrendingAnime(),
                fetchUpcomingAnime(),
                fetchLatestAnime(),
            ]);
            // console.log(trendingRes.data);
            setData({
                trending: trendingRes.data,
                upcoming: upcomingRes.data,
                latest: latestRes.data,
            });
        } catch (error) {
            console.error("Animefetch failed: ", error);
        } finally {
            setLoading(false);
        }
    };

    loadData();
  }, []);

  return { ...data, loading };

}