import React, { useState, useContext, useEffect } from "react";
import FormContainer from "../FormContainer/FormContainer";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ExistingModelForm from "./ExistingModelForm";
import NewModelForm from "./NewModelForm";
import AlertComponent from "../AlertComponent/AlertComponent";
import {
  FormSeperator,
  ChooseButton,
  ButtonsContainer,
} from "./NewAnalyseForm.style";
import { postNma } from "../../apis/nma.api";
import { ModelContext } from "../../contexts/ModelProvider";

const NewAnalyseForm = () => {
  const { models } = useContext(ModelContext);
  const [mode, setMode] = useState(null);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "info",
    message: "",
  });

  const [newModelData, setNewModelData] = useState({
    model: null,
    dataset: "imagenet",
    confidance: 80,
    topPredictions: 4,
    graphType: "similarity",
  });

  const graphTypes = ["similarity", "dissimilarity", "count"];
  const filteredModels = models.filter((m) => (m.graph_type?.length || 0) < 3);

  const selectedModel = filteredModels.find(
    (m) => m.model_id === newModelData.model
  );

  const availableGraphTypes = selectedModel
    ? graphTypes.filter((gt) => !(selectedModel.graph_type || []).includes(gt))
    : [];

  const onCloseAlert = () => {
    setAlertData((prev) => ({
      ...prev,
      showAlert: false,
      message: "",
    }));
  };

  const handleAlert = (severity, message) => {
    setAlertData({
      showAlert: true,
      severity,
      message,
    });
  };

  useEffect(() => {
    console.log("Filtered Models: ", filteredModels);
    if (filteredModels.length === 0) {
      setMode("new");
    }
  }, [filteredModels.length]);

  const getFormTitle = () => {
    if (filteredModels.length === 0 || mode === "new")
      return "Upload New Model";
    if (mode === "existing" && selectedModel) return "Analyze Existing Model";
    return "Upload or Analyze Model";
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

  const handleModeChange = (selectedMode) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setNewModelData({
        model: null,
        dataset: "imagenet",
        confidance: 80,
        topPredictions: 4,
        graphType: "similarity",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (mode === "existing" && !newModelData.model) {
      console.error("Please select a model.");
      handleAlert("error", "Please select a model.");
      return;
    }
    if (mode === "new" && !newModelData.model) {
      console.error("Please upload a model file.");
      handleAlert("error", "Please upload a model file.");

      return;
    }
    if (!newModelData.graphType) {
      console.error("Please select a graph type.");
      handleAlert("error", "Please select a graph type.");
      return;
    }
    if (mode === "new" && !newModelData.dataset) {
      console.error("Please select a dataset.");
      handleAlert("error", "Please select a dataset.");

      return;
    }
    if (
      (mode === "new" && newModelData.confidance < 70) ||
      newModelData.confidance > 95
    ) {
      console.error("Confidence must be between 70 and 95.");
      handleAlert("error", "Confidence must be between 70 and 95.");

      return;
    }
    if (
      (mode === "new" && newModelData.topPredictions < 2) ||
      newModelData.topPredictions > 5
    ) {
      console.error("Top confidance must be between 2 and 5.");
      handleAlert("error", "Top confidance must be between 2 and 5.");
      return;
    }

    if (mode === "existing") {
      formData.append("model_id", newModelData.model);
    } else {
      formData.append("model_file", newModelData.model);
    }
    formData.append("dataset", newModelData.dataset);
    formData.append("min_confidence", newModelData.confidance);
    formData.append("top_k", newModelData.topPredictions);
    formData.append("graph_type", newModelData.graphType);
    try {
      const res = await postNma(formData);
      handleAlert("success", "Analysis submitted successfully.");
    } catch (error) {
      console.error("Error preparing form data:", error);
      if (
        error?.response?.data?.detail &&
        error.response.data.detail.includes(
          "User already has a running NMA job"
        )
      ) {
        handleAlert(
          "error",
          "Please wait until the last model analyse is finished before uploading a new model."
        );
      } else {
        handleAlert("error", "Error preparing form data.");
      }
    }
  };

  const renderForm = () => {
    if (mode === "existing") {
      return (
        <>
          <ExistingModelForm
            newModelData={newModelData}
            handleChange={handleFormDataChange}
            filteredModels={filteredModels}
            handleModelSelect={handleModelSelect}
            availableGraphTypes={availableGraphTypes}
          />
        </>
      );
    }
    if (mode === "new") {
      return (
        <>
          <NewModelForm
            newModelData={newModelData}
            graphTypes={graphTypes}
            handleChange={handleFormDataChange}
          />
        </>
      );
    }
    return;
  };

  return (
    <FormContainer title={getFormTitle()}>
      {filteredModels.length > 0 && !mode && (
        <FormSeperator>
          <>
            <ButtonsContainer>
              <ChooseButton
                variant="outlined"
                selected={mode === "existing"}
                onClick={() => handleModeChange("existing")}
              >
                Existing Model
              </ChooseButton>
              <ChooseButton
                variant="outlined"
                selected={mode === "new"}
                onClick={() => handleModeChange("new")}
              >
                New Model
              </ChooseButton>
            </ButtonsContainer>
          </>
        </FormSeperator>
      )}
      {renderForm()}
      <ButtonComponent label="analyse" onClickHandler={handleSubmit} />
      {alertData.showAlert && (
        <AlertComponent
          severity={alertData.severity}
          message={alertData.message}
          onClose={onCloseAlert}
        />
      )}
    </FormContainer>
  );
};

export default NewAnalyseForm;
