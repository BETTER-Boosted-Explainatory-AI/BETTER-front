import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const postWhiteBoxTesting = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/whitebox_testing`, data, { withCredentials: true });
  return response.data;
}
