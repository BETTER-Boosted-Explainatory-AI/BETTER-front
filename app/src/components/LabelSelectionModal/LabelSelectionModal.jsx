import React, { useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import { FormControl } from "@mui/material";
import ClickableCard from "../ClickableCard/ClickableCard";
import AlertComponent from "../AlertComponent/AlertComponent";
import CloseIconComponent from "../CloseIconComponent/CloseIconComponent";
import FormLabelComponent from "../FormComponents/FormLabelComponent/FormLabelComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { SearchContainer, SearchInput, ParagraphContainer } from "./LabelSelectionModal.style";
import { Box } from "@mui/material";
import {
  LabelsContainer,
  ModalHeaderStyled,
  ModalFooterStyled,
  CounterStyled,
} from "../SubDendrogramForm/SubDendrogramForm.style";

const LabelSelectionModal = ({
  isOpen,
  onClose,
  title,
  labels,
  selectedLabels,
  onLabelToggle,
  maxLabels,
  showAlert,
  alertSeverity,
  alertMessage,
  onAlertClose,
  onNext,
  onBack,
  onSubmit,
  showBackButton = false,
  submitButtonLabel = "Submit",
  minLimit = 1,
  loading
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNextClicked, setIsNextClicked] = useState(false);
  const isOverLimit =
    selectedLabels.length > maxLabels || selectedLabels.length === 0;

  const isUnderLimit = selectedLabels.length < minLimit;

  const handleNextClick = () => {
    if (isNextClicked) {
      onSubmit({ preventDefault: () => {} });
    } else {
      setIsNextClicked(true);
      onNext();
    }
  };

  const handleBackClick = () => {
    setIsNextClicked(false); 
    onBack();
  }

  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={onClose}
      modalHeight={"70vh"}
      modalWidth="70vw"
      hasStickyHeader={true}
    >
      <ModalHeaderStyled showAlert={showAlert}>
        <CloseIconComponent onCloseHandler={onClose} top="1.5em" right="1em" />
        <SearchContainer>
          <FormLabelComponent label={title} align={"center"} />
          <SearchInput 
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <CounterStyled overLimit={isOverLimit} underLimit={isUnderLimit}>
          {selectedLabels.length}
        </CounterStyled>
        {showAlert && (
          <AlertComponent
            severity={alertSeverity}
            message={alertMessage}
            onClose={onAlertClose}
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
          {filteredLabels.length === 0 ? (
            <ParagraphContainer>    
              No labels found matching "{searchTerm}"
            </ParagraphContainer>
          ) : (
            filteredLabels
              .slice()
              .sort((labelA, labelB) => {
                const aFirst = selectedLabels.includes(labelA);
                const bFirst = selectedLabels.includes(labelB);
                if (aFirst === bFirst) return 0;
                return aFirst ? -1 : 1;
              })
              .map((label) => (
                <ClickableCard
                  key={label}
                  label={label}
                  selected={selectedLabels.includes(label)}
                  onClick={() => onLabelToggle(label)}
                />
              ))
          )}
        </LabelsContainer>
        <ModalFooterStyled>
          {onNext ? (
            <Box
              sx={{
                width: "95%",
                display: "flex",
                justifyContent: showBackButton ? "space-between" : "flex-end",
                gap: "1em"
              }}
            >
              {showBackButton && (
                <ButtonComponent label="Back" onClickHandler={handleBackClick} />
              )}
              <ButtonComponent
                label={isNextClicked ? submitButtonLabel : "Next"}
                onClickHandler={isNextClicked ? onSubmit : handleNextClick}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ButtonComponent
                label={submitButtonLabel}
                onClickHandler={onSubmit}
                loading={loading}
              />
            </Box>
          )}
        </ModalFooterStyled>
      </FormControl>
    </ModalComponent>
  );
};

export default LabelSelectionModal;
