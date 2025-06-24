import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";

export const fetchSubDendrogram = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/dendrograms`, data).then(res => res.data),
    "fetchSubDendrogram"
  );
};

export const changeClusterName = async (data) => {
  return measurePerformance(
    () => axiosInstance.put(`/api/dendrograms/naming_clusters`, data).then(res => res.data),
    "changeClusterName"
  );
};

export const fetchCommonAncestorDendrogram = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/dendrograms/common_ancestor`, data).then(res => res.data),
    "fetchCommonAncestorDendrogram"
  );
};