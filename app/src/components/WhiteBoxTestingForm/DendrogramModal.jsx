import React, { useState, useContext, useEffect } from "react";
import LabelSelectionModal from "../LabelSelectionModal/LabelSelectionModal";
import { DendrogramContext } from "../../contexts/DendrogramProvider";

const DendrogramModal = ({
  isModalOpen,
  handleModalClose,
  labels,
  showAlert,
  updateAlertData,
  severity,
  message,
}) => {
  const { getSubDendrogram } = useContext(DendrogramContext);
  const [clickedLabels, setClickedLabels] = useState([]);
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const maxLabels = 5;
  const minLimit = 2;
  const onCardClick = (label) => {
    setClickedLabels((prevLabels) => {
      if (prevLabels.includes(label)) {
        return prevLabels.filter((l) => l !== label);
      } else if (prevLabels.length < maxLabels) {
        return [...prevLabels, label];
      }
      return prevLabels;
    });
  };

  useEffect(() => {
    if (shouldSubmit) {
      const submitData = async () => {
        if (clickedLabels.length < 2) {
          updateAlertData(true, "error", "Please select at least two label.");
          setShouldSubmit(false);
          return;
        }
        if (clickedLabels.length > maxLabels) {
          updateAlertData(
            true,
            "error",
            `You can only select up to ${maxLabels} labels.`
          );
          setShouldSubmit(false);
          return;
        }

        await getSubDendrogram({ selected_labels: clickedLabels }, true);
        handleModalClose();
        setShouldSubmit(false);
        setClickedLabels([]);
      };
      submitData();
    }
  }, [
    shouldSubmit,
    clickedLabels,
    updateAlertData,
    getSubDendrogram,
    handleModalClose,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShouldSubmit(true);
  };

  return (
    <>
      <LabelSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Select labels"
        labels={labels}
        selectedLabels={clickedLabels}
        onLabelToggle={onCardClick}
        maxLabels={maxLabels}
        showAlert={showAlert}
        alertSeverity={severity}
        alertMessage={message}
        onAlertClose={() => updateAlertData(false, "", "")}
        onSubmit={handleSubmit}
        submitButtonLabel="Select"
        showBackButton={false}
        minLimit={minLimit}
      />
    </>
  );
};

export default DendrogramModal;
