// Validation constants
export const CONFIDENCE_LIMITS = { MIN: 0.7, MAX: 0.95 };
export const TOP_PREDICTIONS_LIMITS = { MIN: 2, MAX: 5 };
export const GRAPH_TYPES = ["similarity", "dissimilarity", "count"];

// Validation functions
export const validateModelSelection = (mode, modelId, uploadedModelId) => {
  if (mode === "existing" && !modelId) {
    return "Please select a model.";
  }
  if (mode === "new" && !uploadedModelId) {
    return "Please upload a model file.";
  }
  return null;
};

export const validateGraphType = (graphType) => {
  if (!graphType) {
    return "Please select an explanation method.";
  }
  return null;
};

export const validateDataset = (mode, dataset) => {
  if (mode === "new" && !dataset) {
    return "Please select a dataset.";
  }
  return null;
};

export const validateConfidence = (confidence) => {
  if (confidence < CONFIDENCE_LIMITS.MIN || confidence > CONFIDENCE_LIMITS.MAX) {
    return `Confidence must be between ${CONFIDENCE_LIMITS.MIN} and ${CONFIDENCE_LIMITS.MAX}.`;
  }
  return null;
};

export const validateTopPredictions = (topPredictions) => {
  if (topPredictions < TOP_PREDICTIONS_LIMITS.MIN || topPredictions > TOP_PREDICTIONS_LIMITS.MAX) {
    return `Top confidence must be between ${TOP_PREDICTIONS_LIMITS.MIN} and ${TOP_PREDICTIONS_LIMITS.MAX}.`;
  }
  return null;
};

export const validateForm = (mode, newModelData, uploadedModelData) => {
  const validations = [
    validateModelSelection(mode, newModelData.model, uploadedModelData.model_id),
    validateGraphType(newModelData.graphType),
    validateDataset(mode, newModelData.dataset),
    validateConfidence(newModelData.confidence),
    validateTopPredictions(newModelData.topPredictions),
  ];

  return validations.find(error => error !== null) || null;
};
