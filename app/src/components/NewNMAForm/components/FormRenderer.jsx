import React from "react";
import ExistingModelForm from "../ExistingModelForm";
import NewModelForm from "../NewModelForm";
import UploadModelForm from "../UploadModelForm";

const FormRenderer = ({
  mode,
  newModelData,
  handleFormDataChange,
  filteredModels,
  handleModelSelect,
  availableGraphTypes,
  graphTypes,
  handleFileChange,
  uploadedModelData,
  uploadProgress,
}) => {
  switch (mode) {
    case "existing":
      return (
        <ExistingModelForm
          newModelData={newModelData}
          handleChange={handleFormDataChange}
          filteredModels={filteredModels}
          handleModelSelect={handleModelSelect}
          availableGraphTypes={availableGraphTypes}
        />
      );
    
    case "new":
      return (
        <NewModelForm
          newModelData={newModelData}
          graphTypes={graphTypes}
          handleChange={handleFormDataChange}
        />
      );
    
    case "upload":
      return (
        <UploadModelForm
          handleChange={handleFileChange}
          uploadedModelData={uploadedModelData}
          uploadProgress={uploadProgress}
        />
      );
    
    default:
      return null;
  }
};

export default FormRenderer;
