import { createContext, useState, useCallback } from "react";

// Create the context
export const WhiteBoxTestingContext = createContext({
  formData: {
    sourceLabels: [],
    targetLabels: [],
  },
  alertData: {
    showAlert: false,
    severity: "",
    message: "",
  },
});

export function WhiteBoxTestingProvider({ children }) {
  const [formData, setFormData] = useState({
    sourceLabels: [],
    targetLabels: [],
  });
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: "",
  });

  const updateFormData = useCallback((label, group) => {
    setFormData((prev) => {
      const currentLabels = Array.isArray(prev[group]) ? prev[group] : [];
      const updatedLabels = currentLabels.includes(label)
        ? currentLabels.filter((l) => l !== label)
        : [...currentLabels, label];
      return {
        ...prev,
        [group]: updatedLabels,
      };
    });
  }, []);

  const updateAlertData = useCallback((showAlert, severity, message) => {
    setAlertData({
      showAlert,
      severity,
      message,
    });
  }, []);

  const resetAlertData = useCallback(() => {
    setAlertData({
      showAlert: false,
      severity: "",
      message: "",
    });
  }, []);

  const resetFormData = useCallback(() => {
    setFormData({
      sourceLabels: [],
      targetLabels: [],
    });
  });

  return (
    <WhiteBoxTestingContext.Provider
      value={{
        formData,
        updateFormData,
        alertData,
        updateAlertData,
        resetAlertData,
        resetFormData,
      }}
    >
      {children}
    </WhiteBoxTestingContext.Provider>
  );
}
