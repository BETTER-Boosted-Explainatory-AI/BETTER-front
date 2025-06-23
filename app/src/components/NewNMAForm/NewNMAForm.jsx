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
import { postNma, initiateMultipartUpload, presignedPartUrl, uploadPartToS3, completeMultipartUpload } from "../../apis/nma.api";
import { ModelContext } from "../../contexts/ModelProvider";

const NewAnalyseForm = () => {
  const { models } = useContext(ModelContext);
  const [mode, setMode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "info",
    message: "",
  });
  const [newModelData, setNewModelData] = useState({
    model: null,
    dataset: "",
    confidence: 80,
    topPredictions: 4,
    graphType: "",
  });

  const [uploadedModelData, setUploadedModelData] = useState({
    model: null,
    upload_url: null,
    key: null,
    model_id: null,
    upload_id: null,
  });

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

  const uploadFileInChunks = async (file) => {
    if (!uploadedModelData.model_id) {
      console.error("No model ID available.");
      handleAlert("error", "Please select a model file.");
      return;
    }

    console.log("Uploading model:", uploadedModelData.model);
    setUploadProgress(0);
    const partCount = Math.ceil(file.size / CHUNK_SIZE);
    console.log("Total parts to upload:", partCount);
    let parts = [];

    try {

      for (let partNumber = 1; partNumber <= partCount; partNumber++) {
        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const blob = file.slice(start, end);

        console.log("upload id: ", uploadedModelData.upload_id, "and the key:", uploadedModelData.key);
        const res = await presignedPartUrl(
          uploadedModelData.upload_id,
          partNumber,
          uploadedModelData.key
        );

        uploadedModelData.upload_url = res.url;


        const uploadRes = await uploadPartToS3(res.url, blob, setUploadProgress);
        console.log("upload res: ",uploadRes);
        if (uploadRes.success) {
          console.log("Part uploaded successfully:", partNumber);
            parts.push({
            PartNumber: partNumber,
            ETag: uploadRes.etag
          });
        } else {
          console.error("Failed to upload part:", uploadRes.error);
          handleAlert("error", `Failed to upload part ${partNumber}. Please try again.`);
          setUploadProgress(0);
          return;
        }
      }

    await completeMultipartUpload(
      uploadedModelData.upload_id,
      parts,
      uploadedModelData.key
    );

    setUploadProgress(100);
    setMode("new");
    console.log("File uploaded successfully in chunks.");
    handleAlert("success", "Model uploaded successfully!");
    
  } catch (error) {
    console.error("Error uploading file:", error);
    handleAlert("error", "Failed to upload model. Please try again.");
    setUploadProgress(0);
  }
  };

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
    if (filteredModels.length === 0 && uploadProgress !== 100) {
      setMode("upload");
    }
    if (uploadProgress === 100 && mode !== "new") {
      setMode("new");
    }
  }, [filteredModels, uploadProgress, mode]);

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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadedModelData((prevData) => ({
      ...prevData,
      model: file,
    }));
    console.log("Selected file:", file);
    const result = await initiateMultipartUpload(file);
    console.log("initiateMultipartUpload result:", result);

    setUploadedModelData((prevData) => {
      const updated = {
        ...prevData,
        model: file,
        upload_id: result.upload_id,
        key: result.key,
        model_id: result.model_id,
      };
      // Log the updated state here
      console.log("Updated uploaded model data:", updated);
      return updated;
    });
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
    if (mode === "new" && !uploadedModelData.model_id) {
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
      const model = filteredModels.find((m) => m.model_id === newModelData.model);
      formData.append("dataset", model["dataset"]);

    } else {
      formData.append("model_id", uploadedModelData.model_id);
      formData.append("model_filename", uploadedModelData.model.name);
    }
    formData.append("dataset", newModelData.dataset);
    formData.append("graph_type", newModelData.graphType);
    formData.append("min_confidence", newModelData.confidence);
    formData.append("top_k", newModelData.topPredictions);

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
            uploadProgress={uploadProgress}
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
        label={"Upload Model"}
        // onClickHandler={() => uploadFileInChunks(uploadedModelData.model)}
        loading={isLoading}
        onClickHandler={async () => {
        setIsLoading(true);
        await uploadFileInChunks(uploadedModelData.model);
        setIsLoading(false);
    }}
      />
      ) : (
        <ButtonComponent
          label={"Analyse"}
          onClickHandler={handleSubmit}
          loading={isLoading}
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
