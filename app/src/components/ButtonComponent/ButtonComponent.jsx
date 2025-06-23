import * as React from "react";
import Button from "@mui/material/Button";
import { ButtonContainer } from "./ButtonComponent.style";

const ButtonComponent = ({
  label,
  onClickHandler,
  loading = false,
}) => {
  return (<ButtonContainer> 
    <Button
      variant="contained"
      onClick={onClickHandler}
        disabled={loading}
        loading={loading}
        loadingPosition="end"
    >
      {label}
    </Button>
  </ButtonContainer>);
};

export default ButtonComponent;
