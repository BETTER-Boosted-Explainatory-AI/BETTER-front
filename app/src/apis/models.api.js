import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const fetchModels = async (status) => {
  const url = status
    ? `${SERVER_BASE_URL}/models?status=${status}`
    : `${SERVER_BASE_URL}/models`;

  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};
export const getCurrentModel = async () => {
  const response = await axios.get(`${SERVER_BASE_URL}/models/current`, {
    withCredentials: true,
  });
  return response.data;
};

export const setCurrentModel = async (modelData) => {
  const response = await axios.put(
    `${SERVER_BASE_URL}/models/current`,
    modelData,
    { withCredentials: true }
  );
  return response.data;
};
