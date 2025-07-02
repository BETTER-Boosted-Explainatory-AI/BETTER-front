import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CropFreeIcon from "@mui/icons-material/CropFree";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { ButtonsContainer, IconButtonStyled } from "./Dendrogram.style";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Tooltip from "@mui/material/Tooltip";

export const ButtonsStack = ({
  zoomIn,
  zoomOut,
  resetTransform,
  isLocked,
  setIsLocked,
  queryMode,
}) => {
  const tooltipText =
    "For better verbal explanations, please rename the clusters on lock mode.";

  return (
    <ButtonsContainer queryMode={queryMode}>
      <IconButtonStyled size="small" onClick={() => zoomIn(0.2)}>
        <AddIcon fontSize="small" />
      </IconButtonStyled>
      <IconButtonStyled size="small" onClick={() => zoomOut(0.2)}>
        <RemoveIcon fontSize="small" />
      </IconButtonStyled>
      <IconButtonStyled size="small" onClick={() => resetTransform()}>
        <CropFreeIcon fontSize="small" />
      </IconButtonStyled>
      <IconButtonStyled size="small" onClick={() => setIsLocked(!isLocked)}>
        {isLocked ? (
          <LockOutlineIcon fontSize="small" />
        ) : (
          <LockOpenIcon fontSize="small" />
        )}
      </IconButtonStyled>
      <Tooltip
        title={
          <span style={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>
            {tooltipText}
          </span>
        }
        arrow
      >
        <span>
          <IconButtonStyled size="small" disabled>
            <InfoOutlineIcon fontSize="large" />
          </IconButtonStyled>
        </span>
      </Tooltip>
    </ButtonsContainer>
  );
};
export default ButtonsStack;
