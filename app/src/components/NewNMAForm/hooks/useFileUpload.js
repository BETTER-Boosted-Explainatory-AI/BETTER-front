import { useState } from "react";
import {
  initiateMultipartUpload,
  presignedPartUrl,
  uploadPartToS3,
  completeMultipartUpload,
} from "../../../apis/nma.api";

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedModelData, setUploadedModelData] = useState({
    model: null,
    upload_url: null,
    key: null,
    model_id: null,
    upload_id: null,
  });

  const uploadFileInChunks = async (file, onSuccess, onError) => {
    if (!file) {
      onError("Please select a model file first.");
      return;
    }

    if (!uploadedModelData.model_id) {
      onError("Model initialization failed. Please select the file again.");
      return;
    }

    const partCount = Math.ceil(file.size / CHUNK_SIZE);
    let parts = [];
    const uploadedBytes = new Array(partCount).fill(0);
    const totalSize = file.size;

    const updateProgress = () => {
      const totalUploaded = uploadedBytes.reduce((sum, val) => sum + val, 0);
      const percentage = Math.floor((totalUploaded / totalSize) * 100);
      setUploadProgress(percentage);
    };

    setUploadProgress(0);

    try {
      for (let partNumber = 1; partNumber <= partCount; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const blob = file.slice(start, end);

        const res = await presignedPartUrl(
          uploadedModelData.upload_id,
          partNumber,
          uploadedModelData.key
        );

        setUploadedModelData(prev => ({ ...prev, upload_url: res.url }));

        const uploadRes = await uploadPartToS3(res.url, blob, (progressPercent) => {
          const estimatedUploadedBytes = (progressPercent / 100) * blob.size;
          uploadedBytes[partNumber - 1] = estimatedUploadedBytes;
          updateProgress();
        });

        if (uploadRes.success) {
          uploadedBytes[partNumber - 1] = blob.size;
          parts.push({
            PartNumber: partNumber,
            ETag: uploadRes.etag,
          });
          updateProgress();
        } else {
          throw new Error(`Part ${partNumber} failed.`);
        }
      }

      await completeMultipartUpload(
        uploadedModelData.upload_id,
        parts,
        uploadedModelData.key
      );

      setUploadProgress(100);
      onSuccess("Model uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      onError("Failed to upload model. Please try again.");
      setUploadProgress(0);
    }
  };

  const handleFileChange = async (file, onError) => {
    if (!file) return;
    
    setUploadedModelData(prev => ({ ...prev, model: file }));
    
    try {
      const result = await initiateMultipartUpload(file);
      setUploadedModelData(prev => ({
        ...prev,
        model: file,
        upload_id: result.upload_id,
        key: result.key,
        model_id: result.model_id,
      }));
    } catch (error) {
      console.error("Error initiating upload:", error);
      onError("Failed to initialize upload. Please try again.");
    }
  };

  return {
    uploadProgress,
    uploadedModelData,
    uploadFileInChunks,
    handleFileChange,
    setUploadedModelData,
  };
};
