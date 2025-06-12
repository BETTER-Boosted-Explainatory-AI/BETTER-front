import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import AlertComponent from "../AlertComponent/AlertComponent";
import { WhiteBoxTestingContext } from "../../contexts/WhiteBoxTestingProvider";
import LabelSelectionModal from "../LabelSelectionModal/LabelSelectionModal";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
const WhiteBoxTestingForm = ({
  maxLabels,
  handleCloseAlert,
  handleSubmit,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  isLoading,
}) => {
  const { currentModelData } = useContext(ModelContext);
  const { formData, updateFormData, alertData, updateAlertData } = useContext(
    WhiteBoxTestingContext
  );
  const { labels } = currentModelData;
  const [modalPage, setModalPage] = useState(1);
  const isSourcePage = modalPage === 1;

  const formInfo =
    "Select group of labels that belong to the same subgroup to get which images cause the model to connect them";

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

  const handleLabelToggle = (label) => {
    updateFormData(label, isSourcePage ? "sourceLabels" : "targetLabels");
  };

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="White-Box Testing"
        formInfo={formInfo}
      >
        <FormLabelComponent
          label="Get Common Ancestor Dendrogram"
          />
        <ButtonComponent
          label={isLoading ? "Testing..." : "Test"}
          onClickHandler={() => {
            setModalPage(1);
            handleModalOpen();
          }}
        />
        <FormLabelComponent
          label="Get Images"
          />
        <ButtonComponent
          label={isLoading ? "Testing..." : "Test"}
          onClickHandler={() => {
            setModalPage(1);
            handleModalOpen();
          }}
        />
        {!isModalOpen && alertData.showAlert && (
          <AlertComponent
            severity={alertData.severity}
            message={alertData.message}
            onClose={handleCloseAlert}
          />
        )}
      </FormContainer>
      {isModalOpen && (
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
      )}
    </>
  );
};

export default WhiteBoxTestingForm;
