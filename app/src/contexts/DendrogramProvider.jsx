import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  fetchSubDendrogram,
  fetchCommonAncestorDendrogram,
} from "../apis/dendrograms.api";
import { ModelContext } from "./ModelProvider";

export const DendrogramContext = createContext();

export function DendrogramProvider({ children }) {
  const { currentModelData, isModelsLoading, models } =
    useContext(ModelContext);

  const [dendrogramData, setDendrogramData] = useState({
    subDendrogram: null,
    selectedLabels: [],
    loading: true,
    notFound: false,
  });
  const [dendrogramError, setDendrogramError] = useState(null);

  useEffect(() => {
    if (!currentModelData?.dataset) {
      setDendrogramData((prev) => ({
        ...prev,
        subDendrogram: null,
        loading: false,
        notFound: false,
      }));
    }
  }, [currentModelData]);

  const getSubDendrogram = useCallback(
    async (data, useCommonAncestor = false) => {
      while (currentModelData.isLoading || isModelsLoading) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (models.length === 0 || !currentModelData) {
        console.log("no models found");
        setDendrogramData((prev) => ({
          ...prev,
          subDendrogram: null,
          loading: false,
          notFound: true,
        }));
        return;
      }

      setDendrogramData((prev) => ({ ...prev, loading: true }));
      setDendrogramError(null);

      try {
        const subDendogramData = {
          model_id: currentModelData.model_id,
          graph_type: currentModelData.graph_type,
          selected_labels: data.selected_labels,
        };
        // const result = await fetchSubDendrogram(subDendogramData);
        let result;
        if (useCommonAncestor) {
          result = await fetchCommonAncestorDendrogram(subDendogramData);
        } else {
          result = await fetchSubDendrogram(subDendogramData);
        }

        setDendrogramData((prev) => ({
          ...prev,
          subDendrogram: result,
          selectedLabels: result.selected_labels || [],
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching sub-dendrogram:", error);
        setDendrogramData((prev) => ({
          ...prev,
          subDendrogram: null,
          loading: false,
          notFound: true,
        }));
        setDendrogramError(
          "Sub-dendrogram exceeds the maximum number of allowed leaves. Dendrogram has been reset."
        );
        setTimeout(() => {
          getSubDendrogram({ selected_labels: [] });
        }, 5000);
      }
    },
    [currentModelData]
  );

  useEffect(() => {
    if (currentModelData && currentModelData.dataset) {
      getSubDendrogram({ selected_labels: [] });
    }
  }, [currentModelData, getSubDendrogram]);

  const setSelectedLabels = useCallback(
    async (labels) => {
      await getSubDendrogram({ selected_labels: labels });
    },
    [getSubDendrogram]
  );

  const updateSubDendrogram = (newSubDendrogram) => {
    setDendrogramData((prev) => ({
      ...prev,
      subDendrogram: newSubDendrogram,
    }));
  };

  return (
    <DendrogramContext.Provider
      value={{
        dendrogramData,
        setSelectedLabels,
        getSubDendrogram,
        updateSubDendrogram,
        dendrogramError,
      }}
    >
      {children}
    </DendrogramContext.Provider>
  );
}
