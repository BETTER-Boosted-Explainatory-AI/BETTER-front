import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(label, labels, theme) {
  return {
    fontWeight: labels.includes(label)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MultipleSelect = ({inputName, inputLabel, labels, selectedLabels, setSelectedLabels}) => {
  const theme = useTheme();


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLabels(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedLabels}
          onChange={handleChange}
          input={<OutlinedInput label="Label" />}
          MenuProps={MenuProps}
          name={inputName}
        >
          {labels.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedLabels, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;