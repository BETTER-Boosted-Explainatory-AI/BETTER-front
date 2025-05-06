import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';

const RadioComponent = ({inputName, children}) => {
    return (
        <RadioGroup
            aria-labelledby="demo-column-radio-buttons-group-label"
            name={inputName}
        >
            {children}
        </RadioGroup>
    );
}

export default RadioComponent;