import React from 'react';
import FileUpload from '../FormComponents/FileUpload/FileUpload';
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import { FormSeperator } from "./NewNMAForm.style";

const UploadModelForm = ({ handleChange, uploadedModelData, uploadProgress }) => {
  return (
        <FormSeperator>
          <FormLabelComponent label="model" />
          <FileUpload
            inputName="model"
            fileType={".keras"}
            handleFileChange={handleChange}
            files={uploadedModelData.model}
          />
          {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
        </FormSeperator>
  );
}

export default UploadModelForm;
