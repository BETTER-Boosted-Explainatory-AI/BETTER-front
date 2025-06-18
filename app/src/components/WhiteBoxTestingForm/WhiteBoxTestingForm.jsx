import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import AlertComponent from "../AlertComponent/AlertComponent";
import { WhiteBoxTestingContext } from "../../contexts/WhiteBoxTestingProvider";
import LabelSelectionModal from "../LabelSelectionModal/LabelSelectionModal";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import DendrogramModal from "./DendrogramModal";
import WhiteBoxTestingModal from "./WhiteBoxTestingModal";

const WhiteBoxTestingForm = ({
  maxLabels,
  handleCloseAlert,
  handleSubmit,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  setwbtResult,
}) => {
  const { currentModelData } = useContext(ModelContext);
  const { formData, updateFormData, alertData, updateAlertData } = useContext(
    WhiteBoxTestingContext
  );
  const [modalPage, setModalPage] = useState(1);
  const [modalMode, setModalMode] = useState(null);

  const formInfo =
    "Select group of labels that belong to the same subgroup to get which images cause the model to connect them";

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="White-Box Testing"
        formInfo={formInfo}
      >
        <div>
          <FormLabelComponent label="Get Common Ancestor Dendrogram" />
          <ButtonComponent
            label={"Get Dendrogram"}
            onClickHandler={() => {
              handleModalOpen();
              setModalMode("dendrogram");
              setwbtResult(null);
            }}
          />
        </div>
        <div>
          <FormLabelComponent label="Get Misconnections Images" />
          <ButtonComponent
            label={"Get Images"}
            onClickHandler={() => {
              setModalMode("images");
              setModalPage(1);
              handleModalOpen();
            }}
          />
        </div>
        {!isModalOpen && alertData.showAlert && (
          <AlertComponent
            severity={alertData.severity}
            message={alertData.message}
            onClose={handleCloseAlert}
          />
        )}
      </FormContainer>
      {isModalOpen &&
        (modalMode === "dendrogram" ? (
          <DendrogramModal
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            labels={currentModelData.labels}
            showAlert={alertData.showAlert}
            updateAlertData={updateAlertData}
            severity={alertData.severity}
            message={alertData.message}
          />
        ) : (
          <WhiteBoxTestingModal
            maxLabels={maxLabels}
            handleCloseAlert={handleCloseAlert}
            handleSubmit={handleSubmit}
            isModalOpen={isModalOpen}
            handleModalClose={handleModalClose}
            formData={formData}
            updateAlertData={updateAlertData}
            modalPage={modalPage}
            setModalPage={setModalPage}
            updateFormData={updateFormData}
            labels={currentModelData.labels}
            alertData={alertData}
          />
        ))}
    </>
  );
};

export default WhiteBoxTestingForm;
