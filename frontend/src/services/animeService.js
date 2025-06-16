import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchAnime = (selectedGenre) =>
  axios.get(
    selectedGenre
      ? `${BASE_URL}/anime?genre=${selectedGenre}`
      : `${BASE_URL}/anime`
  );

export const fetchTrendingAnime = () => axios.get(`${BASE_URL}/trending`);

export const fetchUpcomingAnime = () => axios.get(`${BASE_URL}/upcoming`);

export const fetchLatestAnime = () => axios.get(`${BASE_URL}/latest`);

export const fetchSearchResults = (searchQuery) => axios.get(`${BASE_URL}/search?q=${searchQuery}`);
