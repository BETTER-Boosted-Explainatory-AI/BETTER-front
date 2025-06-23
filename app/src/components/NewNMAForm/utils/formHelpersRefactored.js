export const createFormData = (mode, newModelData, uploadedModelData, filteredModels) => {
  const formData = new FormData();
  if (mode === "existing") {
    formData.append("model_id", newModelData.model);
    const model = filteredModels.find(m => m.model_id === newModelData.model);
    if (model && model.dataset) {
      formData.append("dataset", model.dataset);
    }
    // Add the model filename for existing models
    if (newModelData.modelFilename) {
      formData.append("model_filename", newModelData.modelFilename);
    } else if (model && model.file_name) {
      formData.append("model_filename", model.file_name);
    }
  } else {
    formData.append("model_id", uploadedModelData.model_id);
    if (uploadedModelData.model && uploadedModelData.model.name) {
      formData.append("model_filename", uploadedModelData.model.name);
    }
    formData.append("dataset", newModelData.dataset);
  }

  formData.append("graph_type", newModelData.graphType);
  formData.append("min_confidence", newModelData.confidence);
  formData.append("top_k", newModelData.topPredictions);

  return formData;
};

export const getFormTitle = (filteredModels, mode) => {
  if (filteredModels.length === 0 || mode === "upload") {
    return "Upload New Model";
  }
  if (mode === "existing") {
    return "Analyze Existing Model";
  }
  return "Upload or Analyze Model";
};

export const getAvailableGraphTypes = (selectedModel, graphTypes) => {
  return selectedModel
    ? graphTypes.filter(gt => !(selectedModel.graph_type || []).includes(gt))
    : [];
};
