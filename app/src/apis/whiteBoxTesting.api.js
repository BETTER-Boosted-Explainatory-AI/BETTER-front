import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";

export const postWhiteBoxTesting = async (data) => {
  return measurePerformance(
    () => axiosInstance.post(`/api/whitebox_testing`, data).then(res => res.data),
    "postWhiteBoxTesting"
  );
};
