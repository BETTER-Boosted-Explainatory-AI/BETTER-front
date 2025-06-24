import { measurePerformance } from "../utils/performance";
import axiosInstance from "./axiosInstance"; 

export const detectorGenerator = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/adversarial/generate`, data).then(res => res.data),
    "detectorGenerator"
  );
};

export const imageDetection = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/adversarial/detect`, data).then(res => res.data),
    "imageDetection"
  );
};

export const analyzeModel = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/adversarial/analyze`, data).then(res => res.data),
    "analyzeModel"
  );
}

export const DoesDetectorExist = async (current_model_id, graph_type) => {
  const response = await axiosInstance.get(
    `/api/adversarial/does_detector_exist`,
    {
      params: { current_model_id, graph_type },
    }
  );
  return response.data;
};

export const getDetectorList = async (current_model_id, graph_type) => {
  const response = await axiosInstance.post(
    `/api/adversarial/get_detectors`, 
    { current_model_id, graph_type });
  return response.data;
}