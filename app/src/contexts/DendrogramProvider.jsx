import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { fetchSubDendrogram } from "../apis/dendrograms.api";
import { ModelContext } from "./ModelProvider";

export const DendrogramContext = createContext();

export function DendrogramProvider({ children }) {
    const { modelData } = useContext(ModelContext);

    const [dendrogramData, setDendrogramData] = useState({
        subDendrogram: null,
        selectedLabels: [],
        loading: false,
    });

    useEffect(() => {
        if (modelData.dataset && dendrogramData.selectedLabels.length > 0) {
            const data = {
                dataset: modelData.dataset,
                selected_labels: dendrogramData.selectedLabels,
            };
            getSubDendrogram(data);
        }
        // eslint-disable-next-line
    }, [modelData.dataset, dendrogramData.selectedLabels]);

    const getSubDendrogram = useCallback(async (data) => {
        setDendrogramData(prev => ({ ...prev, loading: true }));
        try {
            const result = await fetchSubDendrogram(data);
            setDendrogramData(prev => ({ ...prev, subDendrogram: result }));
        } catch (error) {
            console.error("Error fetching sub-dendrogram:", error);
        } finally {
            setDendrogramData(prev => ({ ...prev, loading: false }));
        }
    }, []);

    const setSelectedLabels = useCallback((labels) => {
        setDendrogramData(prev => ({ ...prev, selectedLabels: labels }));
    }, []);

    return (
        <DendrogramContext.Provider value={{
            dendrogramData,
            setSelectedLabels,
            getSubDendrogram,
        }}>
            {children}
        </DendrogramContext.Provider>
    );
}