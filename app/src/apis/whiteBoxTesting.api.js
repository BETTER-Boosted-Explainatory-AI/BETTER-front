import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const postWhiteBoxTesting = async (data) => {
  const response = await axiosInstance.post(`/whitebox_testing`, data);
  return response.data;
}
