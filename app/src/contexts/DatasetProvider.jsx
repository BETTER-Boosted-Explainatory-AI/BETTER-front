import { createContext, useState, useEffect } from "react";
import { fetchDatasetLabels } from "../apis/datasets.api";

// Create the context
export const DatasetContext = createContext();

// Create the provider component as a named export instead of default
export function DatasetProvider({ children }) {
    const [dataset, setDataset] = useState(null);
    const [labels, setLabels] = useState([]);
    
    useEffect(() => {
        setDataset("cifar100");
        async function fetchLabels() {
            try {
                const result = await fetchDatasetLabels(dataset);
                setLabels(result);
            } catch (error) {
                console.error("Error fetching dataset labels:", error);
            }
        }
        console.log("Fetching labels for dataset:", dataset);
        if (dataset) {
            fetchLabels();
        }
    }, [dataset]); // Add dataset to the dependency array
    
    return (
        <DatasetContext.Provider value={{ 
            dataset, 
            labels, 
        }}>
            {children}
        </DatasetContext.Provider>
    );
}