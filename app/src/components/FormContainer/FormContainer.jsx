import * as React from 'react';
import { FormContainerStyle } from "./FormContainer.style";
import FormControl from '@mui/material/FormControl';

const FormContainer = ({ children, bgColor, borderRadiusTop = 15, borderRadiusBottom = 15 }) => {
    return (
        <FormContainerStyle
            bgColor={bgColor}
            borderRadiusTop={borderRadiusTop}
            borderRadiusBottom={borderRadiusBottom}
        >
            <FormControl>
                {children}
            </FormControl>
        </FormContainerStyle>
    );
}

export default FormContainer;