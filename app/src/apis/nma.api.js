import axiosInstance from "./axiosInstance";
import { measurePerformance } from "../utils/performance";

export const postNma = async (formData) => {
  const modelId = formData.get("model_id");
  const url = modelId ? `/api/nma/${modelId}` : `/api/nma`;

  return measurePerformance(
    () => axiosInstance.post(url, formData, { timeout: 180000 }).then(res => res.data),
    "postNma"
  );
};

export const initiateMultipartUpload = async (file) => {
  return measurePerformance(
    () => axiosInstance.post("/api/initiate-multipart-upload", {
      filename: file.name,
    }).then(res => res.data),
    "initiateMultipartUpload"
  );
};

export const presignedPartUrl = async (uploadId, partNumber, key) => {
  return measurePerformance(
    () => axiosInstance.post("/api/presigned-part-url", {
      upload_id: uploadId,
      part_number: partNumber,
      key: key,
    }).then(res => res.data),
    "presignedPartUrl"
  );
};

// This one is custom XMLHttpRequest logic, so skip measurePerformance:
export const uploadPartToS3 = async (uploadUrl, blob, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 98;
        onProgress(percentComplete);
      }
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        const etag = xhr.getResponseHeader('ETag').replace(/"/g, '');
        resolve({ success: true, etag: etag });
      } else {
        reject(new Error(`Upload failed with status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Network error occurred during upload'));
    };
    xhr.open('PUT', uploadUrl);
    xhr.send(blob);
  });
};

export const completeMultipartUpload = async (uploadId, parts, key) => {
  return measurePerformance(
    () => axiosInstance.post("/api/complete-multipart-upload", {
      upload_id: uploadId,
      parts: parts,
      key: key,
    }).then(res => res.data),
    "completeMultipartUpload"
  );
};
