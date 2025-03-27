import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';

const FormLabelComponent = ({ label }) => {

    return (
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#222831",
        }}>{label}</FormLabel>
    );
}

export default FormLabelComponent;