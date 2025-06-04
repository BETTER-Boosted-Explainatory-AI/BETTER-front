import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getDetectorList } from "../apis/adversarial.api";
import { ModelContext } from "./ModelProvider";

export const DetectorContext = createContext();

export const DetectorProvider = ({ children }) => {
  const [chosenDetector, setChosenDetector] = useState("");
  const [detectorsList, setDetectorsList] = useState([]);
  const { currentModelData } = useContext(ModelContext);

 const refreshDetectorsList = useCallback(async () => {
    if (!currentModelData.model_id || !currentModelData.graph_type) return;
    try {
      const detectors = await getDetectorList(currentModelData.model_id, currentModelData.graph_type);
      setDetectorsList(detectors);
      if (detectors.length > 0) {
        setChosenDetector(detectors[0]);
        console.log("Setting chosenDetector to:", detectors[0]);
      }
    } catch (error) {
      setDetectorsList([]);
    }
  }, [currentModelData.model_id, currentModelData.graph_type]);

  useEffect(() => {
        setChosenDetector(""); // Reset when model/graph changes
        const fetchDetectors = async () => {
          if (!currentModelData.model_id || !currentModelData.graph_type) return;
          try {
            const detectors = await getDetectorList(currentModelData.model_id, currentModelData.graph_type);
            setDetectorsList(detectors);
            if (detectors.length > 0) {
              setChosenDetector(detectors[0]);
              console.log("Setting chosenDetector to:", detectors[0]);
            }
          } catch (error) {
            setDetectorsList([]);
          }
        };
        fetchDetectors();
  },[currentModelData.model_id, currentModelData.graph_type]);

  return (
    <DetectorContext.Provider value={{  chosenDetector, setChosenDetector, detectorsList, setDetectorsList, refreshDetectorsList }}>
      {children}
    </DetectorContext.Provider>
  );
};