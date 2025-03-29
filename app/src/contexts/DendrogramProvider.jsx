import { createContext, useState, useEffect, useContext } from "react";
import { fetchSubDendrogram } from "../apis/dendrograms.api";
import { DatasetContext } from "./DatasetProvider";

// Create the context
export const DendrogramContext = createContext();

// Create the provider component as a named export instead of default
export function DendrogramProvider({ children }) {
    const { dataset } = useContext(DatasetContext);

    const [subDendrogram, setSubDendrogram] = useState(null);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSelectedLabels([
          "man", "woman", "baby", "boy", "girl",
          "maple_tree", "oak_tree", "pine_tree",
          "palm_tree", "willow_tree", "forest",
          "hamster", "mouse", "rabbit", "shrew", "squirrel"
        ]);
    }, []);
    
    useEffect(() => {
        // Only run this effect if both dataset and selectedLabels have values
        if (dataset && selectedLabels.length > 0) {
            const dendrogramData = {
                dataset,
                selected_labels: selectedLabels,
                z_filename: `dendrogram_dissimilarity_${dataset}`,
            };
            
            getSubDendrogram(dendrogramData);
        }
    }, [dataset, selectedLabels]);

    async function getSubDendrogram(data) {
        setLoading(true);
        try {
            const result = await fetchSubDendrogram(data);
            setSubDendrogram(result);
        } catch (error) {
            console.error("Error fetching sub-dendrogram:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLabelsChange = (newLabels) => {
        setSelectedLabels(newLabels);
    };

    const handleSubDendrogramChange = async (data) => {
        await getSubDendrogram(data);
    };

    return (
        <DendrogramContext.Provider value={{ 
            subDendrogram, 
            selectedLabels, 
            dataset, 
            loading, 
            handleLabelsChange, 
            handleSubDendrogramChange 
        }}>
            {children}
        </DendrogramContext.Provider>
    );
}