import axios from "axios";

const BASE_URL = "http://localhost:3000/user";

export const fetchUserProfileData = () => {
  return axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });
};
