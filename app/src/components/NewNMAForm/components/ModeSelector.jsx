import React from "react";
import {
  FormSeperator,
  ChooseButton,
  ButtonsContainer,
} from "../NewNMAForm.style";

const ModeSelector = ({ mode, onModeChange, filteredModels }) => {
  if (filteredModels.length === 0 || mode) {
    return null;
  }

  return (
    <FormSeperator>
      <ButtonsContainer>
        <ChooseButton
          variant="outlined"
          selected={mode === "existing"}
          onClick={() => onModeChange("existing")}
        >
          Existing Model
        </ChooseButton>
        <ChooseButton
          variant="outlined"
          selected={mode === "upload"}
          onClick={() => onModeChange("upload")}
        >
          New Model
        </ChooseButton>
      </ButtonsContainer>
    </FormSeperator>
  );
};

export default ModeSelector;
