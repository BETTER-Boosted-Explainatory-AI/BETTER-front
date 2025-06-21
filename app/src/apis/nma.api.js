import axiosInstance from "./axiosInstance"; // Assuming you have an axios instance set up

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId ? `/api/nma/${modelId}` : `/api/nma`;

  const response = await axiosInstance.post(url, formData, { timeout: 180000 });
  return response.data;
};

export const initiateMultipartUpload = async (file) => {
  const res = await axiosInstance.post("/api/initiate-multipart-upload", {
    filename: file.name,
  });
  return res.data; // contains upload_id, model_id, key
};

export const presignedPartUrl = async (uploadId, partNumber, key) => {
  const res = await axiosInstance.post("/api/presigned-part-url", {
    upload_id: uploadId,
    part_number: partNumber,
    key: key,
  });
  return res.data; // contains presigned_url
};


export const uploadPartToS3 = async (uploadUrl, blob, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Set up progress tracking
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 98;
        onProgress(percentComplete);
      }
    };
    
    // Set up completion handler
    xhr.onload = () => {
      if (xhr.status === 200) {
        const etag = xhr.getResponseHeader('ETag').replace(/"/g, '');
        resolve({ success: true, etag: etag });
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    };
    
    // Set up error handler
    xhr.onerror = () => {
      reject(new Error('Network error occurred during upload'));
    };
    
    // Open and send the request
    xhr.open('PUT', uploadUrl);
    xhr.send(blob);
  });
};

export const completeMultipartUpload = async (uploadId, parts, key) => {
  const res = await axiosInstance.post("/api/complete-multipart-upload", {
    upload_id: uploadId,
    parts: parts,
    key: key,
  });
  return res.data; // contains model_id
};

