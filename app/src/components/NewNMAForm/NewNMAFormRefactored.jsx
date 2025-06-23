import React, { useState, useContext, useEffect } from "react";
import FormContainer from "../FormContainer/FormContainer";
import AlertComponent from "../AlertComponent/AlertComponent";
import { postNma } from "../../apis/nma.api";
import { ModelContext } from "../../contexts/ModelProvider";

// Custom hooks
import { useFileUploadRefactored } from "./hooks/useFileUploadRefactored";
import { useAlertRefactored } from "./hooks/useAlertRefactored";

// Utils
import { validateForm, GRAPH_TYPES } from "./utils/validationRefactored";
import { createFormData, getFormTitle, getAvailableGraphTypes } from "./utils/formHelpersRefactored";

// Components
import FormHeaderRefactored from "./components/FormHeaderRefactored";
import ModeSelectorRefactored from "./components/ModeSelectorRefactored";
import FormRendererRefactored from "./components/FormRendererRefactored";
import FormActionsRefactored from "./components/FormActionsRefactored";

const NewAnalyseFormRefactored = () => {
  const { models } = useContext(ModelContext);
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    // Custom hooks
  const { alertData, showAlert, hideAlert } = useAlertRefactored();
  const { 
    uploadProgress, 
    uploadedModelData, 
    uploadFileInChunks, 
    handleFileChange 
  } = useFileUploadRefactored();
  
  const [newModelData, setNewModelData] = useState({
    model: null,
    dataset: "",
    confidence: 80,
    topPredictions: 4,
    graphType: "",
  });

  // Computed values
  const filteredModels = models.filter((m) => (m.graph_type?.length || 0) < 3);
  const selectedModel = filteredModels.find(m => m.model_id === newModelData.model);
  const availableGraphTypes = getAvailableGraphTypes(selectedModel, GRAPH_TYPES);
  const formTitle = getFormTitle(filteredModels, mode);

  // Event handlers
  const handleModeChange = (selectedMode) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setNewModelData({
        model: null,
        dataset: "",
        confidence: 80,
        topPredictions: 4,
        graphType: "",
      });
    }
  };

  const handleFormDataChange = (event) => {
    const { name, value, files } = event.target;
    setNewModelData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleModelSelect = (event) => {
    const modelId = event.target.value;
    const model = filteredModels.find((m) => m.model_id === modelId);
    const availableTypes = model?.graphTypes || [];
    setNewModelData((prev) => ({
      ...prev,
      model: modelId,
      graphType: availableTypes[0] || "",
    }));
  };

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleFileChange(file, showAlert);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    await uploadFileInChunks(
      uploadedModelData.model,
      (message) => {
        setMode("new");
        showAlert("success", message);
      },
      (message) => showAlert("error", message)
    );
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validate form
    const validationError = validateForm(mode, newModelData, uploadedModelData);
    if (validationError) {
      showAlert("error", validationError);
      setIsLoading(false);
      return;
    }

    // Create form data
    const formData = createFormData(mode, newModelData, uploadedModelData, filteredModels);

    try {
      const res = await postNma(formData);
      showAlert("success", "Analysis submitted successfully.");
      console.log("Analysis submitted successfully:", res);
    } catch (error) {
      console.error("Error preparing form data:", error);
      if (
        error?.response?.data?.detail &&
        error.response.data.detail.includes("User already has a running NMA job")
      ) {
        showAlert(
          "error",
          "Please wait until the last model analyse is finished before uploading a new model."
        );
      } else {
        showAlert("error", "Error preparing form data.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (filteredModels.length === 0 && uploadProgress !== 100) {
      setMode("upload");
    }
    if (uploadProgress === 100 && mode !== "new") {
      setMode("new");
    }
  }, [filteredModels, uploadProgress, mode]);
  const renderForm = () => {
    return (
      <FormRendererRefactored
        mode={mode}
        newModelData={newModelData}
        handleFormDataChange={handleFormDataChange}
        filteredModels={filteredModels}
        handleModelSelect={handleModelSelect}
        availableGraphTypes={availableGraphTypes}
        graphTypes={GRAPH_TYPES}
        handleFileChange={handleFileSelection}
        uploadedModelData={uploadedModelData}
        uploadProgress={uploadProgress}
      />
    );
  };

  return (
    <FormContainer showTitle={false}>
      <FormHeaderRefactored
        filteredModels={filteredModels}
        mode={mode}
        onModeChange={handleModeChange}
        title={formTitle}
      />
      
      <ModeSelectorRefactored
        mode={mode}
        onModeChange={handleModeChange}
        filteredModels={filteredModels}
      />
      
      {renderForm()}
      
      <FormActionsRefactored
        mode={mode}
        isLoading={isLoading}
        uploadedModelData={uploadedModelData}
        onUpload={handleUpload}
        onSubmit={handleSubmit}
        showAlert={showAlert}
      />
      
      {alertData.showAlert && (
        <AlertComponent
          severity={alertData.severity}
          message={alertData.message}
          onClose={hideAlert}
        />
      )}
    </FormContainer>
  );
};

export default NewAnalyseFormRefactored;
