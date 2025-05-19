import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';

const FormLabelComponent = ({ label, align }) => {

    return (
        <FormLabel id="demo-row-radio-buttons-group-label" sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#222831",
            alignSelf: align ? align : "flex-start",
        }}>{label}</FormLabel>
    );
}

export default FormLabelComponent;