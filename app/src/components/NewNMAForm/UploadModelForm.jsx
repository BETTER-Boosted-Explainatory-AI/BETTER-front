import React from 'react';
import FileUpload from '../FormComponents/FileUpload/FileUpload';
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import { FormSeperator } from "./NewNMAForm.style";

const UploadModelForm = ({ handleChange, uploadedModelData }) => {
  return (
        <FormSeperator>
          <FormLabelComponent label="model" />
          <FileUpload
            inputName="model"
            fileType={".keras"}
            handleFileChange={handleChange}
            files={uploadedModelData.model}
          />
        </FormSeperator>
  );
}

export default UploadModelForm;
