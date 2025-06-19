import React, { useState, useContext, useEffect } from "react";
import FormContainer from "../FormContainer/FormContainer";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import ExistingModelForm from "./ExistingModelForm";
import NewModelForm from "./NewModelForm";
import UploadModelForm from "./UploadModelForm";
import AlertComponent from "../AlertComponent/AlertComponent";
import Information from "../Information/Information";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TitleComponent from "../TitleComponent/TitleComponent";
import {
  FormSeperator,
  ChooseButton,
  ButtonsContainer,
  FormHeader,
  IconButton,
} from "./NewNMAForm.style";
import { postNma, getUploadUrl } from "../../apis/nma.api";
import { ModelContext } from "../../contexts/ModelProvider";

const NewAnalyseForm = () => {
  const { models } = useContext(ModelContext);
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "info",
    message: "",
  });
  const [newModelData, setNewModelData] = useState({
    model: null,
    dataset: "imagenet",
    confidence: 80,
    topPredictions: 4,
    graphType: "similarity",
  });

  const [uploadedModelData, setUploadedModelData] = useState({
    model: null,
    upload_url: null,
    key: null,
    model_id: null,
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
      setMode("upload");
    }
  }, [filteredModels.length]);

  const getFormTitle = () => {
    if (filteredModels.length === 0 || mode === "upload")
      return "Upload New Model";
    if (mode === "existing") return "Analyze Existing Model";
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
        confidence: 80,
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadedModelData((prevData) => ({
      ...prevData,
      model: file,
    }));
    console.log("Selected file:", file);
    const result = await getUploadUrl(file);
    console.log("Upload URL result:", result);
    // setUploadedModelData((prevData) => ({
    //   ...prevData,
    //   upload_url: result.upload_url,
    //   key: result.key,
    //   model_id: result.model_id,
    // }));
  };

  const handleModelUpload = async () => {
    if (!uploadedModelData.model) {
      console.error("Please upload a model file.");
      handleAlert("error", "Please upload a model file.");
      return;
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      console.error("Please select a explanation method.");
      handleAlert("error", "Please select a explanation method.");
      return;
    }
    if (mode === "new" && !newModelData.dataset) {
      console.error("Please select a dataset.");
      handleAlert("error", "Please select a dataset.");

      return;
    }
    if (
      (mode === "new" && newModelData.confidence < 70) ||
      newModelData.confidence > 95
    ) {
      console.error("Confidence must be between 70 and 95.");
      handleAlert("error", "Confidence must be between 70 and 95.");

      return;
    }
    if (
      (mode === "new" && newModelData.topPredictions < 2) ||
      newModelData.topPredictions > 5
    ) {
      console.error("Top confidence must be between 2 and 5.");
      handleAlert("error", "Top confidence must be between 2 and 5.");
      return;
    }

    if (mode === "existing") {
      formData.append("model_id", newModelData.model);
    } else {
      formData.append("model_file", newModelData.model);
    }
    formData.append("dataset", newModelData.dataset);
    formData.append("min_confidence", newModelData.confidence);
    formData.append("top_k", newModelData.topPredictions);
    formData.append("graph_type", newModelData.graphType);

    console.log("Submitting form data:", Object.fromEntries(formData.entries()));
    try {
      const res = await postNma(formData);
      handleAlert("success", "Analysis submitted successfully.");
      console.log("Analysis submitted successfully:", res);
      setIsLoading(false);
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
      setIsLoading(false);
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
    };
    if (mode === "upload") {
      return (
        <>
          <UploadModelForm
            handleChange={handleFileChange}
            uploadedModelData={uploadedModelData}
          />
        </>
      );
    }
    return;
  };

  return (
    // <FormContainer title={getFormTitle()}>
    <FormContainer showTitle={false}>
      <FormHeader>
        {filteredModels.length > 0 && mode ? (
          <IconButton onClick={() => handleModeChange(null)}>
            <ArrowBackIosIcon />
          </IconButton>
        ) : (
          <span style={{ width: 12, height: 20, display: "inline-block" }} />
        )}
        <TitleComponent title={getFormTitle()} flexStart={"center"} />
        <Information text="NMA (Neural Model Analysis) is a tool that allows you to analyze and visualize the behavior of neural networks." />
      </FormHeader>
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
                selected={mode === "upload"}
                onClick={() => handleModeChange("upload")}
              >
                New Model
              </ChooseButton>
            </ButtonsContainer>
          </>
        </FormSeperator>
      )}
      {renderForm()}
      { mode === "upload" ? (
              <ButtonComponent
        label={isLoading ? "loading..." : "Upload Model"}
        onClickHandler={handleSubmit}
      />
      ) : (
        <ButtonComponent
          label={isLoading ? "loading..." : "analyse"}
          onClickHandler={handleSubmit}
        />
      )}
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
