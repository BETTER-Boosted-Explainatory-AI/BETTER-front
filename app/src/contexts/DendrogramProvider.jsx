import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { fetchSubDendrogram } from "../apis/dendrograms.api";
import { ModelContext } from "./ModelProvider";

export const DendrogramContext = createContext();

export function DendrogramProvider({ children }) {
  const { currentModelData } = useContext(ModelContext);

  const [dendrogramData, setDendrogramData] = useState({
    subDendrogram: null,
    selectedLabels: [],
    loading: true,
  });

  const getSubDendrogram = useCallback(
    async (data) => {
      while (currentModelData.isLoading) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (!currentModelData.dataset) return;

      setDendrogramData((prev) => ({ ...prev, loading: true }));

      try {
        const subDendogramData = {
          model_id: currentModelData.model_id,
          graph_type: currentModelData.graph_type,
          selectedLabels: data.selected_labels,
        };
        const result = await fetchSubDendrogram(subDendogramData);
        setDendrogramData((prev) => ({
          ...prev,
          subDendrogram: result,
          selectedLabels: result.selected_labels || [],
          loading: false,
        }));
        console.log("Sub-dendrogram data:", result);
      } catch (error) {
        console.error("Error fetching sub-dendrogram:", error);
        setDendrogramData((prev) => ({ ...prev, loading: false }));
      }
    },
    [currentModelData]
  );

  useEffect(() => {
    if (currentModelData && currentModelData.dataset) {
      const data = {
        selected_labels: dendrogramData.selectedLabels,
      };
      getSubDendrogram(data);
    }
    // Only depend on currentModelData and getSubDendrogram to avoid infinite loop
  }, [currentModelData, getSubDendrogram]);

  const setSelectedLabels = useCallback((labels) => {
    setDendrogramData((prev) => ({ ...prev, selectedLabels: labels }));
  }, []);

  return (
    <DendrogramContext.Provider
      value={{
        dendrogramData,
        setSelectedLabels,
        getSubDendrogram,
      }}
    >
      {children}
    </DendrogramContext.Provider>
  );
}
