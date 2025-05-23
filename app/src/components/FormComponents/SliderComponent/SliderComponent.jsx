import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SliderStyle } from "./SliderComponent.style";

const SliderComponent = ({
  inputName,
  minValue = 0,
  maxValue = 100,
  initValue = 50,
  handleChange,
}) => {
  const [value, setValue] = React.useState(initValue);

  const onSliderChange = (event, newValue) => {
    setValue(newValue);
    handleChange({
      target: {
        name: inputName,
        value: newValue,
      },
    });
  };

  return (
    <Box>
      <SliderStyle
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={initValue}
        value={value}
        min={minValue}
        max={maxValue}
        name={inputName}
        onChange={onSliderChange}
      />
    </Box>
  );
};

export default SliderComponent;
