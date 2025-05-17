import { createContext, useState, useEffect, useCallback } from "react";
import { fetchUsersModels } from "../apis/models.api";
import {fetchLabels} from "../apis/datasets.api";
// Create the context

export const ModelContext = createContext({
  modelData: {
    model_id: null,
    graph_type: null,
    current_graph: null,
    dataset: null,
    labels: [],
  },
  setCurrentGraph: () => {},
  setDataset: () => {},
  resetModelData: () => {},
});


// Create the provider component as a named export
export function ModelProvider({ children }) {
  const [modelData, setModelData] = useState({
    model_id: null,
    graph_type: null,
    current_graph: null,
    dataset: null,
    labels: [],
  });

  // Load models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const model = await fetchUsersModels();
        setModelData(prevData => ({ ...prevData, model }));
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    
    fetchModels();
  }, []);

  // Set current_graph when graph_type array has exactly one item
  useEffect(() => {
    if (Array.isArray(modelData.graph_type) && modelData.graph_type.length === 1) {
      setModelData(prevData => ({
        ...prevData,
        current_graph: modelData.graph_type[0],
      }));
    }
  }, [modelData.graph_type]);

  // Fetch labels whenever dataset changes
  useEffect(() => {
    const fetchLabelsData = async () => {
      if (modelData.dataset) {
        try {
          const labels = await fetchLabels(modelData.dataset);
          setModelData(prevData => ({ ...prevData, labels }));
        } catch (error) {
          console.error("Error fetching labels:", error);
        }
      }
    };
    
    fetchLabelsData();
  }, [modelData.dataset]);

  // Memoized functions to avoid re-creation on each render
  const setCurrentGraph = useCallback((graph) => {
    setModelData(prevData => ({
      ...prevData,
      current_graph: graph,
    }));
  }, []);

  const setDataset = useCallback((dataset) => {
    setModelData(prevData => ({
      ...prevData,
      dataset,
      labels: [], // Reset labels when dataset changes
    }));
  }, []);

  const resetModelData = useCallback(() => {
    setModelData({
      model_id: null,
      graph_type: null,
      current_graph: null,
      dataset: null,
      labels: [],
    });
  }, []);

  const contextValue = {
    modelData,
    setCurrentGraph,
    setDataset,
    resetModelData,
  };

  return (
    <ModelContext.Provider value={contextValue}>
      {children}
    </ModelContext.Provider>
  );
}
