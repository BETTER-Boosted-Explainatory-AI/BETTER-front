import * as React from "react";
import { FormContainerStyle } from "./FormContainer.style";
import FormControl from "@mui/material/FormControl";
import TitleComponent from "../TitleComponent/TitleComponent";
import Information from "../Information/Information";
const FormContainer = ({
  children,
  bgColor,
  title,
  borderRadiusTop = 15,
  borderRadiusBottom = 15,
  width = "88%",
  align = "flex-statr",
  dropShadow = false,
  showTitle = true,
  formInfo = "",
}) => {
  return (
    <FormContainerStyle
      bgColor={bgColor}
      borderRadiusTop={borderRadiusTop}
      borderRadiusBottom={borderRadiusBottom}
      width={width}
      align={align}
      dropShadow={dropShadow}
    >
      {showTitle && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TitleComponent title={title} />
          <Information text={formInfo} />
        </div>
      )}
      <FormControl sx={{ width: "100%", gap: "25px" }}>{children}</FormControl>
    </FormContainerStyle>
  );
};

export default FormContainer;
