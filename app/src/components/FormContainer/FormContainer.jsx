import * as React from 'react';
import { FormContainerStyle } from "./FormContainer.style";

export default function FormContainer({ children, bgColor, borderRadius }) {
    return (
        <FormContainerStyle
            bgColor={bgColor}
            borderRadius={borderRadius}
        >
            {children}
        </FormContainerStyle>
    );
}