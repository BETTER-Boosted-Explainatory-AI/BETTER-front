import * as React from "react";
import RadioGroup from "@mui/material/RadioGroup";

const RadioComponent = ({ inputName, children, handleChange, value }) => {
  return (
    <RadioGroup
      aria-labelledby="demo-column-radio-buttons-group-label"
      name={inputName}
      onChange={handleChange}
      value={value}
    >
      {children}
    </RadioGroup>
  );
};

export default RadioComponent;
