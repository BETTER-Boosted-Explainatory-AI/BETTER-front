import React, { createContext, useState, useContext } from "react";

export const DetectorContext = createContext();

export const DetectorProvider = ({ children }) => {
  const [chosenDetector, setChosenDetector] = useState("");

  return (
    <DetectorContext.Provider value={{ chosenDetector, setChosenDetector }}>
      {children}
    </DetectorContext.Provider>
  );
};