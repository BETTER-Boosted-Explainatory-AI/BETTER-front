import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId ? `/api/nma/${modelId}` : `/api/nma`;

  const response = await axiosInstance.post(url, formData);
  return response.data;
};