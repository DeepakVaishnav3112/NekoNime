import axios from "axios";

const BASE_URL = "http://localhost:3000/api/comment";

export const fetchComments = (animeId, page = 1) => {
  return axios.get(`${BASE_URL}/anime?animeId=${animeId}&page=${page}`);
};

export const addComment = (animeId, comment) => {
  return axios.post(
    `${BASE_URL}/add`,
    { animeId, comment },
    { withCredentials: true }
  );
};

export const deleteComment = (commentId) => {
  return axios.post(
    `${BASE_URL}/delete`,
    { commentId },
    { withCredentials: true }
  );
}