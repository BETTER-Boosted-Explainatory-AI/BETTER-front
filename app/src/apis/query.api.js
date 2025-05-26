import axiosInstance from "./axiosInstance"; 

export const postQuery = async (file, current_model_id, graph_type) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('current_model_id', current_model_id);
  formData.append('graph_type', graph_type);

  const response = await axiosInstance.post(`/query`, formData)
  return response.data;
}