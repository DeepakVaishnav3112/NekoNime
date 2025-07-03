import { useState, useEffect } from "react";
import {
  fetchTrendingAnime,
  fetchUpcomingAnime,
  fetchLatestAnime,
  fetchSesaonTopRated,
} from "../services/animeService";

export default function useAnimeData() {
  const [sesaonTopRated, setSeasonTopRated] = useState();
  const [loadingSesaonTopRated, setLoadingSeasonTopRated] = useState(false);

  const [trendingPage, setTrendingPage] = useState(1);
  const [trending, setTrending] = useState({ list: [], pageInfo: {} });
  const [loadingTrending, setLoadingTrending] = useState(false);

  const [upcomingPage, setUpcomingPage] = useState(1);
  const [upcoming, setUpcoming] = useState({ list: [], pageInfo: {} });
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);

  const [latestPage, setLatestPage] = useState(1);
  const [latest, setLatest] = useState({ list: [], pageInfo: {} });
  const [loadingLatest, setLoadingLatest] = useState(false);

  useEffect(() => {
    const loadSeasonTopRated = async () => {
      setLoadingSeasonTopRated(true);
      try {
        const res = await fetchSesaonTopRated();
        // console.log(res.data);
        setSeasonTopRated(res.data);
      } catch (err) {
        console.error("Failed to fetch season top rated Anime Data:", err);
      } finally {
        setLoadingSeasonTopRated(false);
      }
    };

    loadSeasonTopRated();
  }, []);

  useEffect(() => {
    const loadTrending = async () => {
      setLoadingTrending(true);
      try {
        const res = await fetchTrendingAnime(trendingPage);
        // console.log("Trending: ",res.data);
        setTrending({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch trending Anime Data:", err);
      } finally {
        setLoadingTrending(false);
      }
    };

    loadTrending();
  }, [trendingPage]);

  useEffect(() => {
    const loadUpcoming = async () => {
      setLoadingUpcoming(true);
      try {
        const res = await fetchUpcomingAnime(upcomingPage);
        // console.log("Upcoming: ",res.data);
        setUpcoming({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch upcoming Anime Data:", err);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    loadUpcoming();
  }, [upcomingPage]);

  useEffect(() => {
    const loadLatest = async () => {
      setLoadingLatest(true);
      try {
        const res = await fetchLatestAnime(latestPage);
        // console.log("Latest: ",res.data);
        setLatest({
          list: res.data.animeList,
          pageInfo: res.data.pageInfo,
        });
      } catch (err) {
        console.error("Failed to fetch latest Anime Data:", err);
      } finally {
        setLoadingLatest(false);
      }
    };

    loadLatest();
  }, [latestPage]);

  return {
    sesaonTopRated,
    trending,
    upcoming,
    latest,
    loadingSesaonTopRated,
    loadingTrending,
    loadingUpcoming,
    loadingLatest,
    trendingPage,
    upcomingPage,
    latestPage,
    setTrendingPage,
    setUpcomingPage,
    setLatestPage,
  };
}
