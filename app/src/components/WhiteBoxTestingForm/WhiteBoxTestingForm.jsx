import React, { useContext, useState } from "react";
import FormContainer from "../../components/FormContainer/FormContainer";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { ModelContext } from "../../contexts/ModelProvider";
import ModalComponent from "../ModalComponent/ModalComponent";
import { FormControl } from "@mui/material";
import ClickableCard from "../ClickableCard/ClickableCard";
import AlertComponent from "../AlertComponent/AlertComponent";
import CloseIconComponent from "../CloseIconComponent/CloseIconComponent";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import { WhiteBoxTestingContext } from "../../contexts/WhiteBoxTestingProvider";
import { Box } from "@mui/material";
import {
  LabelsContainer,
  ModalHeaderStyled,
  ModalFooterStyled,
  CounterStyled,
} from "../SubDendrogramForm/SubDendrogramForm.style";

const WhiteBoxTestingForm = ({
  maxLabels,
  handleCloseAlert,
  handleSubmit,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
}) => {
  const { currentModelData } = useContext(ModelContext);
  const { formData, updateFormData, alertData, updateAlertData } = useContext(
    WhiteBoxTestingContext
  );
  const { labels } = currentModelData;

  const [modalPage, setModalPage] = useState(1);

  const isSourcePage = modalPage === 1;
  const selectedCount = isSourcePage
    ? formData.sourceLabels?.length || 0
    : formData.targetLabels?.length || 0;
  const isOverLimit = selectedCount > maxLabels || selectedCount === 0;

  const handleNext = () => {
    if ((formData.sourceLabels?.length || 0) === 0) {
      updateAlertData(
        true,
        "error",
        "Please select at least one source label."
      );
      return;
    } else if (selectedCount > maxLabels) {
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
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="White-Box Testing"
      >
        <ButtonComponent
          label="Start"
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
        <ModalComponent
          isOpen={isModalOpen}
          handleClose={handleModalClose}
          modalHeight={"70vh"}
          modalWidth="70vw"
          hasStickyHeader={true}
        >
          <ModalHeaderStyled showAlert={formData.showAlert}>
            <CloseIconComponent
              onCloseHandler={handleModalClose}
              top="1.5em"
              right="1em"
            />
            <FormLabelComponent
              label={
                modalPage === 1
                  ? "Select source labels"
                  : "Select target labels"
              }
              align={"center"}
            />
            <CounterStyled overLimit={isOverLimit}>
              {selectedCount}
            </CounterStyled>
            {alertData.showAlert && (
              <AlertComponent
                severity={alertData.severity}
                message={alertData.message}
                onClose={handleCloseAlert}
              />
            )}
          </ModalHeaderStyled>
          <FormControl
            sx={{
              width: "100%",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LabelsContainer>
              {labels.map((label, index) => {
                const isSelected =
                  modalPage === 1
                    ? formData.sourceLabels.includes(label)
                    : formData.targetLabels?.includes(label);

                return (
                  <ClickableCard
                    key={index}
                    label={label}
                    selected={isSelected}
                    onClick={() =>
                      updateFormData(
                        label,
                        modalPage === 1 ? "sourceLabels" : "targetLabels"
                      )
                    }
                  />
                );
              })}
            </LabelsContainer>
            <ModalFooterStyled>
              {modalPage === 1 ? (
                <Box
                  sx={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <ButtonComponent label="Next" onClickHandler={handleNext} />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "95%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <ButtonComponent label="Back" onClickHandler={handleBack} />
                  <ButtonComponent label="Test" onClickHandler={handleSubmit} />
                </Box>
              )}
            </ModalFooterStyled>
          </FormControl>
        </ModalComponent>
      )}
    </>
  );
};

export default WhiteBoxTestingForm;
