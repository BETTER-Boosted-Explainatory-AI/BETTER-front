import React from "react";
import { CloseIconContainer } from "./CloseIconComponent.style";
import CloseIcon from "@mui/icons-material/Close";

const ClosseIconComponent = ({ onCloseHandler, top, right }) => {
  return (
    <CloseIconContainer top={top} right={right}>
      <CloseIcon sx={{ color: "primary.main" }} onClick={onCloseHandler} />
    </CloseIconContainer>
  );
};
export default ClosseIconComponent;
