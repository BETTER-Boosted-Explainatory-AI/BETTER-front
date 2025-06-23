import { useState } from "react";

export const useAlert = () => {
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "info",
    message: "",
  });

  const showAlert = (severity, message) => {
    setAlertData({
      showAlert: true,
      severity,
      message,
    });
  };

  const hideAlert = () => {
    setAlertData(prev => ({
      ...prev,
      showAlert: false,
      message: "",
    }));
  };

  return {
    alertData,
    showAlert,
    hideAlert,
  };
};
