import axios from "axios";
import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

import { SERVER_BASE_URL } from "../consts/api";

export const fetchModels = async (status) => {
  // const url = status
  //   ? `${SERVER_BASE_URL}/models?status=${status}`
  //   : `${SERVER_BASE_URL}/models`;

  const url = status ? `/models?status=${status}` : `/models`;

  // const response = await axios.get(url, { withCredentials: true });
  const response = await axiosInstance.get(url);
  return response.data;
};
export const getCurrentModel = async () => {
  // const response = await axios.get(`${SERVER_BASE_URL}/models/current`, {
  //   withCredentials: true,
  // });
  const response = await axiosInstance.get(`/models/current`);
  return response.data;
};

export const setCurrentModel = async (modelData) => {
  // const response = await axios.put(
  //   `${SERVER_BASE_URL}/models/current`,
  //   modelData,
  //   { withCredentials: true }
  // );
  const response = await axiosInstance.put(`/models/current`, modelData);
  return response.data;
};
