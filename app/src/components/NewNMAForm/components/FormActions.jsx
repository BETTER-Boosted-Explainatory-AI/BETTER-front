import React from "react";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";

const FormActions = ({ 
  mode, 
  isLoading, 
  uploadedModelData, 
  onUpload, 
  onSubmit,
  showAlert 
}) => {
  if (mode === "upload") {
    return (
      <ButtonComponent
        label="Upload Model"
        loading={isLoading}
        disabled={!uploadedModelData.model || !uploadedModelData.model_id}
        onClickHandler={async () => {
          if (!uploadedModelData.model) {
            showAlert("error", "Please select a model file first.");
            return;
          }
          await onUpload();
        }}
      />
    );
  }

  return (
    <ButtonComponent
      label="Analyse"
      onClickHandler={onSubmit}
      loading={isLoading}
    />
  );
};

export default FormActions;
