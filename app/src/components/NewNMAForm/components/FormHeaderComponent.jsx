import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TitleComponent from "../../TitleComponent/TitleComponent";
import Information from "../../Information/Information";
import { FormHeader, IconButton } from "../NewNMAForm.style";

const FormHeaderComponent = ({ filteredModels, mode, onModeChange, title }) => {
  const showBackButton = filteredModels.length > 0 && mode;

  return (
    <FormHeader>
      {showBackButton ? (
        <IconButton onClick={() => onModeChange(null)}>
          <ArrowBackIosIcon />
        </IconButton>
      ) : (
        <span style={{ width: 12, height: 20, display: "inline-block" }} />
      )}
      <TitleComponent title={title} flexStart="center" />
      <Information text="NMA (Neural Model Analysis) is a tool that allows you to analyze and visualize the behavior of neural networks." />
    </FormHeader>
  );
};

export default FormHeaderComponent;
