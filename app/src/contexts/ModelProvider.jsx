import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { getCurrentModel, setCurrentModel } from "../apis/models.api"; // changes to fetch corrent model
import { fetchLabels } from "../apis/datasets.api";
import { fetchModels } from "../apis/models.api";
import { UserContext } from "./UserProvider";

// Create the context
export const ModelContext = createContext({
  currentModelData: {
    model_id: null,
    graph_type: null,
    current_graph: null,
    dataset: null,
    labels: [],
    isLoading: true,
  },
  models: [],
  isModelsLoading: true,
  setModels: () => {},
  setCurrentModelData: () => {},
  changeCurrentModel: () => {},
});

export function ModelProvider({ children }) {
  const { user, loadedUser } = useContext(UserContext);
  const [models, setModels] = useState([]);
  const [isModelsLoading, setIsModelsLoading] = useState(true);

  const [currentModelData, setCurrentModelData] = useState({
    model_id: null,
    graph_type: null,
    current_graph: null,
    dataset: null,
    labels: [],
    isLoading: true,
  });

  const loadModelById = useCallback(async () => {
    try {
      setCurrentModelData((prevData) => ({
        ...prevData,
        isLoading: true,
      }));
      const model = await getCurrentModel();
      setCurrentModelData((prevData) => ({
        ...prevData,
        model_id: model.model_id ?? null,
        graph_type: model.graph_type ?? null,
        current_graph: Array.isArray(model.graph_type)
          ? model.graph_type.length === 1
            ? model.graph_type[0]
            : null
          : model.graph_type ?? null,
        dataset: model.dataset,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error loading model by ID:", error);
      setCurrentModelData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }
  }, []);


  useEffect(() => {
    if (currentModelData.model_id) return;
    if (!loadedUser) return;
    if (!user) return;
    loadModelById();
  }, [currentModelData.model_id, loadedUser, user, loadModelById]);
  
  useEffect(() => {
    const fetchAvailableModels = async () => {
      try {
        setIsModelsLoading(true);
        let status = "succeeded";
        const modelsData = await fetchModels(status);
        setModels(modelsData);
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setIsModelsLoading(false);
      }
    };
    if (loadedUser && user) {
      fetchAvailableModels();
    }
  }, [loadedUser, user]);

  useEffect(() => {
    const fetchLabelsData = async () => {
      if (currentModelData.dataset) {
        try {
          setCurrentModelData((prevData) => ({
            ...prevData,
            isLoading: true,
          }));

          const labels = await fetchLabels(currentModelData.dataset);

          setCurrentModelData((prevData) => ({
            ...prevData,
            labels,
            isLoading: false,
          }));
        } catch (error) {
          console.error("Error fetching labels:", error);
          setCurrentModelData((prevData) => ({
            ...prevData,
            isLoading: false,
          }));
        }
      }
    };

    fetchLabelsData();
  }, [currentModelData.dataset]);

  const changeCurrentModel = async (modelId, graphType) => {
    try {
      setCurrentModelData((prevData) => ({
        ...prevData,
        isLoading: true,
      }));

      const updatedModel = await setCurrentModel({
        model_id: modelId,
        graph_type: graphType,
      });

      setCurrentModelData((prevData) => ({
        ...prevData,
        model_id: updatedModel.model_id ?? null,
        graph_type: updatedModel.graph_type ?? null,
        current_graph:
          Array.isArray(updatedModel.graph_type) &&
          updatedModel.graph_type.length === 1
            ? updatedModel.graph_type[0]
            : null,
        dataset: updatedModel.dataset ?? null,
        labels:
          prevData.dataset !== updatedModel.dataset
            ? [] // Only reset if dataset changed
            : prevData.labels,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error changing current model:", error);
      setCurrentModelData((prevData) => ({
        ...prevData,
        isLoading: false,
      }));
    }
  };

  // The context value that will be provided
  const contextValue = {
    currentModelData,
    models,
    isModelsLoading,
    changeCurrentModel,
  };

  return (
    <ModelContext.Provider value={contextValue}>
      {children}
    </ModelContext.Provider>
  );
}
