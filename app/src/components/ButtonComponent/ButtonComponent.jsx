import * as React from "react";
import Button from "@mui/material/Button";
import { ButtonContainer, ParagraphContainer } from "./ButtonComponent.style";

const ButtonComponent = ({
  label,
  onClickHandler,
  loading = false,
  hideParagraph = false,
}) => {
  return (
    <ButtonContainer>
      <Button
        variant="contained"
        onClick={onClickHandler}
        disabled={loading}
        loading={loading}
        loadingPosition="end"
      >
        {label}
      </Button>
      {loading && !hideParagraph && (
        <ParagraphContainer>Processing… please be patient.</ParagraphContainer>
      )}
    </ButtonContainer>
  );
};

export default ButtonComponent;
