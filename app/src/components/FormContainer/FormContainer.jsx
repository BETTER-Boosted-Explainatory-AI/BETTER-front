import * as React from 'react';
import { FormContainerStyle } from "./FormContainer.style";
import FormControl from '@mui/material/FormControl';

export default function FormContainer({ children, bgColor, borderRadius }) {
    return (
        <FormContainerStyle
            bgColor={bgColor}
            borderRadius={borderRadius}
        >
            <FormControl>
                {children}
            </FormControl>
        </FormContainerStyle>
    );
}