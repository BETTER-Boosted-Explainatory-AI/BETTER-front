import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId ? `/api/nma/${modelId}` : `/api/nma`;

  const response = await axiosInstance.post(url, formData, { timeout: 180000 });
  return response.data;
};

export const getUploadUrl = async (modelFile) => {
  const { upload_url, key, model_id } = await axiosInstance.post('/api/generate-upload-url',  { filename: modelFile.name });
  return { upload_url, key, model_id };
};

export const uploadModelToS3 = async (uploadUrl, file) => {
  const response = await axiosInstance.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return response.data;
};