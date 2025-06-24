import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";

export const postQuery = async (file, current_model_id, graph_type) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('current_model_id', current_model_id);
  formData.append('graph_type', graph_type);

  return measurePerformance(
    () => axiosInstance.post(`/api/query`, formData).then(res => res.data),
    "postQuery"
  );
};
