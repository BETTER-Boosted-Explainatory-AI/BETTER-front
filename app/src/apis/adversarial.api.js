import axiosInstance from "./axiosInstance"; 

export const detectorGenerator = async (data) => {
  const response = await axiosInstance.post(`/api/adversarial/generate`, data);
  return response.data;
}

export const imageDetection = async (data) => {
  const response = await axiosInstance.post(`/api/adversarial/detect`, data);
  return response.data;
}

export const analyzeModel = async (data) => {
  const response = await axiosInstance.post(`/api/adversarial/analyze`, data);
  return response.data;
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