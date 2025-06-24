import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";

export const fetchModels = async (status) => {
  const url = status ? `/api/models?status=${status}` : `/api/models`;
  return measurePerformance(
    () => axiosInstance.get(url).then(res => res.data),
    "fetchModels"
  );
};

export const getCurrentModel = async () => {
  return measurePerformance(
    () => axiosInstance.get(`/api/models/current`).then(res => res.data),
    "getCurrentModel"
  );
};

export const setCurrentModel = async (modelData) => {
  return measurePerformance(
    () => axiosInstance.put(`/api/models/current`, modelData).then(res => res.data),
    "setCurrentModel"
  );
};
