import * as React from 'react';
import { FormContainerStyle } from "./FormContainer.style";
import FormControl from '@mui/material/FormControl';
import TitleComponent from '../TitleComponent/TitleComponent';
import Subtitle from '../Subtitle/Subtitle';
const FormContainer = ({ children, bgColor, title, borderRadiusTop = 15, borderRadiusBottom = 15, width="88%", align="flex-statr"  }) => {
    return (
        <FormContainerStyle
            bgColor={bgColor}
            borderRadiusTop={borderRadiusTop}
            borderRadiusBottom={borderRadiusBottom}
            width={width}
            align={align}
        >
            <TitleComponent title={title} />
            <FormControl sx={{width: "100%", gap: "25px"}}>
                {children}
            </FormControl>
        </FormContainerStyle>
    );
}

export default FormContainer;