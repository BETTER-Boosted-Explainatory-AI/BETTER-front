import axios from "axios";
import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

import { SERVER_BASE_URL } from "../consts/api";

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  // const url = modelId
  //   ? `${SERVER_BASE_URL}/nma/${modelId}`
  //   : `${SERVER_BASE_URL}/nma`;

  const url = modelId ? `/nma/${modelId}` : `/nma`;

  // const response = await axios.post(url, formData, { withCredentials: true });
  const response = await axiosInstance.post(url, formData);
  return response.data;
};