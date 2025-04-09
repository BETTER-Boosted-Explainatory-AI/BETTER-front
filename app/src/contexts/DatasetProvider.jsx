import { createContext, useState, useEffect } from "react";
import { IMAGENET_LABELS, CIFAR100_LABELS} from "../consts/datasetsLabels";
// Create the context
export const DatasetContext = createContext();

// Create the provider component as a named export instead of default
export function DatasetProvider({ children }) {
    const [dataset, setDataset] = useState(null);
    const [labels, setLabels] = useState([]);
    
    useEffect(() => {
        setDataset("imagenet");
    }, []);
    
    useEffect(() => {
        if (dataset === "cifar100") {
            setLabels(CIFAR100_LABELS);
        } else if (dataset === "imagenet") {
            setLabels(IMAGENET_LABELS);
        }
        console.log("Labels: ", labels);    
    }, [dataset]);
    
    return (
        <DatasetContext.Provider value={{ 
            dataset, 
            labels, 
        }}>
            {children}
        </DatasetContext.Provider>
    );
}