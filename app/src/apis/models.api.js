import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const fetchModels = async () => {
  const response = await axios.get(`${SERVER_BASE_URL}/models`);
  return response.data;
};

export const getCurrentModel = async () => {
  const response = await axios.get(`${SERVER_BASE_URL}/models/current`, { withCredentials: true });
  return response.data;
};

export const setCurrentModel = async (modelData) => {
  const response = await axios.put(`${SERVER_BASE_URL}/models/current`, modelData, { withCredentials: true });
  return response.data;
}
