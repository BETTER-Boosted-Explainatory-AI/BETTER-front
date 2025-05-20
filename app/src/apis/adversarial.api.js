import axios from "axios";

import { SERVER_BASE_URL } from "../consts/api";

export const detectorGenerator = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/adversarial/generate`, data, { withCredentials: true });
  return response.data;
}

export const imageDetection = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/adversarial/detect`, data, { withCredentials: true });
  return response.data;
}

export const analyzeModel = async (data) => {
  const response = await axios.post(`${SERVER_BASE_URL}/adversarial/analyze`, data, { withCredentials: true });
  return response.data;
}