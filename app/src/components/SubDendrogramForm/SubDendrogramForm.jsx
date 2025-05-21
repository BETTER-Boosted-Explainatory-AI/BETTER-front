import React, { useContext, useState, useCallback } from "react";
import { DendrogramContext } from "../../contexts/DendrogramProvider";
import { ModelContext } from "../../contexts/ModelProvider";
import FormContainer from "../../components/FormContainer/FormContainer";
import FormLabelComponent from "../../components/FormComponents/FormLabelComponent/FormLabelComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormControl from "@mui/material/FormControl";
import ClickableCard from "../ClickableCard/ClickableCard";
import AlertComponent from "../AlertComponent/AlertComponent";
import CloseIconComponent from "../CloseIconComponent/CloseIconComponent";
import { LabelsContainer, ModalHeaderStyled, ModalFooterStyled } from "./SubDendrogramForm.style";

const SubDendrogramForm = () => {
  const { currentModelData } = useContext(ModelContext);
  const { labels } = currentModelData;

  const { dendrogramData, setSelectedLabels } = useContext(DendrogramContext);
  const { selectedLabels } = dendrogramData;
  const [clickedLabels, setClickedLabels] = useState(selectedLabels);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("Please select at least one label.");

  const maxLabels = 35;

  const handleModalOpen = useCallback(() => {
    console.log("Modal open triggered");
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    console.log("Modal close triggered");
    setIsModalOpen(false);
  }, []);

  const onCardClick = useCallback((label) => {
    setClickedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked labels len:", clickedLabels.length);

    if (clickedLabels.length === 0) {
      setShowAlert(true);
      setSeverity("error");
      setMessage("Please select at least one label.");
      return;
    }

    if (clickedLabels.length > maxLabels) {
      setShowAlert(true);
      setSeverity("error");
      setMessage(`Please select less than ${maxLabels} labels.`);
      return;
    }

    await setSelectedLabels(clickedLabels);
    handleModalClose();
  };

  return (
    <>
      <FormContainer
        bgColor="#e4eeef"
        borderRadiusTop="0"
        borderRadiusBottom="15"
        title="Change Labels in Dendrogram"
      >
        <ButtonComponent label="Select" onClickHandler={handleModalOpen} />
      </FormContainer>
      <ModalComponent
        isOpen={isModalOpen}
        handleClose={handleModalClose}
        modalHeight={"70vh"}
        modalWidth="70vw"
        hasStickyHeader={true}
      >
        {isModalOpen && (
          <FormControl
            sx={{
              width: "100%",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ModalHeaderStyled>
              <CloseIconComponent onCloseHandler={handleModalClose} top="1.5em" right="1em" />
              <FormLabelComponent label="Select labels" align={"center"} />
              {showAlert && (
                <AlertComponent
                  severity={severity}
                  message={message}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </ModalHeaderStyled>
            <LabelsContainer>
              {labels.map((label, index) => {
                const isSelected = clickedLabels.includes(label);

                return (
                  <ClickableCard
                    key={index}
                    label={label}
                    selected={isSelected}
                    onClick={() => onCardClick(label)}
                  />
                );
              })}
            </LabelsContainer>
            <ModalFooterStyled>
              <ButtonComponent label="Select" onClickHandler={handleSubmit} />
            </ModalFooterStyled>
          </FormControl>
        )}
      </ModalComponent>
    </>
  );
};

export default SubDendrogramForm;
