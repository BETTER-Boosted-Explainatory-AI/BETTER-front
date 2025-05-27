import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const fetchModels = async (status) => {
  const url = status ? `/models?status=${status}` : `/models`;
  const response = await axiosInstance.get(url);
  return response.data;
};
export const getCurrentModel = async () => {
  const response = await axiosInstance.get(`/models/current`);
  return response.data;
};

export const setCurrentModel = async (modelData) => {
  const response = await axiosInstance.put(`/models/current`, modelData);
  return response.data;
};
