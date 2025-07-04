import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextFieldComponent = ({
    inputName,
    inputValue,
    handleChange,
    inputLabel,
    inputType = "text"
}) => {
    return (
        <TextField
            label={inputLabel}
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
            name={inputName}
            type={inputType}
            InputProps={{
                sx: {
                    backgroundColor: "#fff",
                    color: "#222831",
                },
            }}
        />
    );
};


export default TextFieldComponent;