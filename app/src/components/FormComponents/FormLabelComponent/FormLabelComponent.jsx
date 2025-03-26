import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';

const FormLabelComponent = ({ title }) => {

    return (
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#222831",
        }}>{title}</FormLabel>
    );
}

export default FormLabelComponent;