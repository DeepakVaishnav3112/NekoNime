import axios from "axios";

const BASE_URL = "http://localhost:3000/api/review";

export const addOrUpdateRating = async (animeId, tierLabel) => {
  //   console.log(tierLabel);
  return axios.post(
    `${BASE_URL}/add-update`,
    { animeId, tier: tierLabel },
    { withCredentials: true }
  );
};

export const fetchAnimeReviewData = async (animeId) => {
  return axios.post(`${BASE_URL}/data`, { animeId }, { withCredentials: true });
};
