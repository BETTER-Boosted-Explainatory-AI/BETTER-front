import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId ? `/api/nma/${modelId}` : `/api/nma`;

  const response = await axiosInstance.post(url, formData, { timeout: 180000 });
  return response.data;
};

export const getUploadUrl = async (file) => {
  const res = await axiosInstance.post("/api/generate-upload-url", {
    filename: file.name,
  });
  return res.data; // contains upload_url, model_id, key
};

export const uploadModelToS3 = async (file, uploadUrl, onProgress) => {
  await axiosInstance.put(uploadUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percent); 
      }
    },
  });
};