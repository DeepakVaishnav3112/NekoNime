import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const fetchAnime = (selectedGenre) =>
  axios.get(
    selectedGenre
      ? `${BASE_URL}/anime?genre=${selectedGenre}`
      : `${BASE_URL}/anime`
  );

export const fetchTrendingAnime = () => axios.get(`${BASE_URL}/anime/trending`);

export const fetchUpcomingAnime = () => axios.get(`${BASE_URL}/anime/upcoming`);

export const fetchLatestAnime = () => axios.get(`${BASE_URL}/anime/latest`);

export const fetchSearchResults = (searchQuery) => axios.get(`${BASE_URL}/anime/search?q=${searchQuery}`);

export const fetchAnimeDetails = (animeId) => axios.get(`${BASE_URL}/anime/${animeId}`);

export const fetchAnimeCharacters = (animeId) => axios.get(`${BASE_URL}/anime/${animeId}/characters`);

export const fetchAnimeStaff = (animeId) => axios.get(`${BASE_URL}/anime/${animeId}/staff`);

export const fetchAnimeMoreInfo = (animeId) => axios.get(`${BASE_URL}/anime/${animeId}/moreinfo`);