import axiosInstance from "./axiosInstance"; 

export const fetchSubDendrogram = async (data) => {
  const response = await axiosInstance.post(`/dendrograms`, data);
  return response.data;
}

export const changeClusterName = async (data) => {
  const response = await axiosInstance.put(`/dendrograms/naming_clusters`, data);
  return response.data;
}