import axios from "axios";
import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

import { SERVER_BASE_URL } from "../consts/api";

export const postWhiteBoxTesting = async (data) => {
  // const response = await axios.post(`${SERVER_BASE_URL}/whitebox_testing`, data, { withCredentials: true });
  const response = await axiosInstance.post(`/whitebox_testing`, data);
  return response.data;
}
