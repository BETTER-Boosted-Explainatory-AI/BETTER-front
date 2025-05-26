import axios from "axios";
import axiosInstance from "./axiosInstance"; 

import { SERVER_BASE_URL } from "../consts/api";

export const detectorGenerator = async (data) => {
  // const response = await axios.post(`${SERVER_BASE_URL}/adversarial/generate`, data, { withCredentials: true });
  const response = await axiosInstance.post(`/adversarial/generate`, data);
  return response.data;
}

export const imageDetection = async (data) => {
  // const response = await axios.post(`${SERVER_BASE_URL}/adversarial/detect`, data, { withCredentials: true });
  const response = await axiosInstance.post(`/adversarial/detect`, data);
  return response.data;
}

export const analyzeModel = async (data) => {
  // const response = await axios.post(`${SERVER_BASE_URL}/adversarial/analyze`, data, { withCredentials: true });
  const response = await axiosInstance.post(`/adversarial/analyze`, data);
  return response.data;
}

export const DoesDetectorExist = async (current_model_id, graph_type) => {
  // const response = await axios.get(
  //   `${SERVER_BASE_URL}/adversarial/does_detector_exist`,
  //   {
  //     params: { current_model_id, graph_type },
  //     withCredentials: true,
  //   }
  // );
  const response = await axiosInstance.get(
    `/adversarial/does_detector_exist`,
    {
      params: { current_model_id, graph_type },
    }
  );
  return response.data;
};