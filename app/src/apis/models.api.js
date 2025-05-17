import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const fetchUsersModels = async (modelId = null) => {
  const response = await axios.post(`${SERVER_BASE_URL}/models`, modelId);
  return response.data;
};
