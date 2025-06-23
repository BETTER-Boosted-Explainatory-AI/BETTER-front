import React from "react";
import FileUpload from "../FormComponents/FileUpload/FileUpload";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import { FormSeperator } from "./NewNMAForm.style";
import LinearProgressWithLabel from "../LinearProgressWithLabel/LinearProgressWithLabel";

const UploadModelForm = ({
  handleChange,
  uploadedModelData,
  uploadProgress,
}) => {
  return (
    <FormSeperator>
      {uploadProgress === 0 && (
        <>
          <FormLabelComponent label="model" />
          <FileUpload
            inputName="model"
            fileType={".keras"}
            handleFileChange={handleChange}
            files={uploadedModelData.model}
          />
        </>
      )}
      {uploadProgress > 0 && <LinearProgressWithLabel value={uploadProgress} />}
    </FormSeperator>
  );
};

export default UploadModelForm;
