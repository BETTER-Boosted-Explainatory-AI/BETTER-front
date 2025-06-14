import React from "react";
import LabelSelectionModal from "../LabelSelectionModal/LabelSelectionModal";

const WhiteBoxTestingModal = ({
  maxLabels,
  handleCloseAlert,
  handleSubmit,
  isModalOpen,
  handleModalClose,
  formData,
  updateAlertData,
  modalPage,
  setModalPage,
  updateFormData,
  labels,
  alertData,
}) => {
  const isSourcePage = modalPage === 1;
  const handleLabelToggle = (label) => {
    updateFormData(label, isSourcePage ? "sourceLabels" : "targetLabels");
  };

  const handleNext = () => {
    if ((formData.sourceLabels?.length || 0) === 0) {
      updateAlertData(
        true,
        "error",
        "Please select at least one source label."
      );
      return;
    } else if (formData.sourceLabels?.length > maxLabels) {
      updateAlertData(
        true,
        "error",
        `You can only select up to ${maxLabels} labels.`
      );
      return;
    }
    updateAlertData(false, "", "");
    setModalPage(2);
  };

  const handleBack = () => setModalPage(1);


  return (
    <>
      <LabelSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={isSourcePage ? "Select source labels" : "Select target labels"}
        labels={labels}
        selectedLabels={
          isSourcePage
            ? formData.sourceLabels || []
            : formData.targetLabels || []
        }
        onLabelToggle={handleLabelToggle}
        maxLabels={maxLabels}
        showAlert={alertData.showAlert}
        alertSeverity={alertData.severity}
        alertMessage={alertData.message}
        onAlertClose={handleCloseAlert}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        showBackButton={!isSourcePage}
        nextButtonLabel="Next"
        submitButtonLabel="Test"
      />
    </>
  );
};

export default WhiteBoxTestingModal;
