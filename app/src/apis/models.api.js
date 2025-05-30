import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const fetchModels = async (status) => {
  const url = status ? `/api/models?status=${status}` : `/models`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const getCurrentModel = async () => {
  const response = await axiosInstance.get(`/api/models/current`);
  return response.data;
};

export const setCurrentModel = async (modelData) => {
  const response = await axiosInstance.put(`/api/models/current`, modelData);
  return response.data;
};
